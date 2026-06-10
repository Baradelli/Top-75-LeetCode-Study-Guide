import { loadPyodideSingleton } from "./pyodide";
import { MAX_TRACE_STEPS, type TraceResult } from "./trace";

/**
 * Tracer de Python: executa o código do usuário dentro do Pyodide com
 * sys.settrace ligado e devolve o trace completo (linha, variáveis, stdout)
 * como JSON, no formato comum definido em trace.ts.
 */
const TRACER_SCRIPT = `
import sys
import io
import json

_MAX_STEPS = ${MAX_TRACE_STEPS}
_MAX_DEPTH = 4
_MAX_ITEMS = 64


def _jsonable(value, depth=0):
    if depth > _MAX_DEPTH:
        return repr(value)
    if value is None or isinstance(value, (bool, int, float, str)):
        if isinstance(value, float) and (value != value or value in (float("inf"), float("-inf"))):
            return repr(value)
        return value
    if isinstance(value, (list, tuple)):
        return [_jsonable(v, depth + 1) for v in list(value)[:_MAX_ITEMS]]
    if isinstance(value, set):
        return sorted([_jsonable(v, depth + 1) for v in list(value)[:_MAX_ITEMS]], key=str)
    if isinstance(value, dict):
        return {str(k): _jsonable(v, depth + 1) for k, v in list(value.items())[:_MAX_ITEMS]}
    return repr(value)


def run_traced(code):
    steps = []
    stdout = io.StringIO()
    error = None
    truncated = False

    class _StopTracing(Exception):
        pass

    def tracer(frame, event, arg):
        nonlocal truncated
        if frame.f_code.co_filename != "<user>":
            return None
        if event in ("line", "return"):
            if len(steps) >= _MAX_STEPS:
                truncated = True
                raise _StopTracing()
            local_vars = {
                name: _jsonable(val)
                for name, val in frame.f_locals.items()
                if not name.startswith("__") and not callable(val)
            }
            steps.append(
                {
                    "line": frame.f_lineno,
                    "event": "return" if event == "return" else "line",
                    "locals": local_vars,
                    "stdout": stdout.getvalue(),
                }
            )
        return tracer

    compiled = None
    try:
        compiled = compile(code, "<user>", "exec")
    except SyntaxError as exc:
        error = "SyntaxError: %s (linha %s)" % (exc.msg, exc.lineno)

    if compiled is not None:
        module_scope = {"__name__": "__main__"}
        real_stdout = sys.stdout
        sys.stdout = stdout
        sys.settrace(tracer)
        try:
            exec(compiled, module_scope)
        except _StopTracing:
            pass
        except BaseException as exc:
            error = "%s: %s" % (type(exc).__name__, exc)
        finally:
            sys.settrace(None)
            sys.stdout = real_stdout

    return json.dumps(
        {
            "steps": steps,
            "stdout": stdout.getvalue(),
            "error": error,
            "truncated": truncated,
        }
    )
`;

let tracerReady = false;

export async function tracePython(code: string): Promise<TraceResult> {
  const pyodide = await loadPyodideSingleton();
  if (!tracerReady) {
    pyodide.runPython(TRACER_SCRIPT);
    tracerReady = true;
  }
  const runTraced = pyodide.globals.get("run_traced") as (
    code: string,
  ) => string;
  const json = runTraced(code);
  return JSON.parse(json) as TraceResult;
}

/**
 * Execução simples (sem trace), para o CodeRunner: roda o código e devolve
 * stdout/erro.
 */
export async function runPython(
  code: string,
): Promise<{ stdout: string; error: string | null }> {
  const pyodide = await loadPyodideSingleton();
  const escaped = JSON.stringify(code);
  const script = `
import sys, io, json
_buf = io.StringIO()
_real = sys.stdout
sys.stdout = _buf
_err = None
try:
    exec(compile(${escaped}, "<user>", "exec"), {"__name__": "__main__"})
except BaseException as exc:
    _err = "%s: %s" % (type(exc).__name__, exc)
finally:
    sys.stdout = _real
json.dumps({"stdout": _buf.getvalue(), "error": _err})
`;
  const json = pyodide.runPython(script) as string;
  return JSON.parse(json) as { stdout: string; error: string | null };
}
