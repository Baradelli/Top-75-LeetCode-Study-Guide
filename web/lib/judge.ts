import { loadPyodideSingleton } from "./pyodide";
import type { ExamTestCase } from "./exams";

/**
 * LocalJudge: roda a solução do aluno contra os casos de teste, no navegador.
 *
 * JavaScript roda nativo (new Function) — sem a limitação ES5 do tracer,
 * já que aqui não precisamos de trace. Python roda no Pyodide.
 */
export interface CaseResult {
  pass: boolean;
  got?: string;
  error?: string;
}

export interface JudgeResult {
  results: CaseResult[];
  /** Erro global (sintaxe, função não encontrada) — nenhum caso rodou. */
  error: string | null;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length && a.every((item, i) => deepEqual(item, b[i]))
    );
  }
  if (
    a !== null &&
    b !== null &&
    typeof a === "object" &&
    typeof b === "object"
  ) {
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);
    return (
      keysA.length === keysB.length &&
      keysA.every((key) =>
        deepEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
        ),
      )
    );
  }
  return false;
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

export function judgeJavaScript(
  code: string,
  functionName: string,
  tests: ExamTestCase[],
): JudgeResult {
  let fn: unknown;
  try {
    fn = new Function(`"use strict";\n${code}\n;return ${functionName};`)();
  } catch (exc) {
    return { results: [], error: String(exc) };
  }
  if (typeof fn !== "function") {
    return {
      results: [],
      error: `Função ${functionName} não encontrada no seu código.`,
    };
  }
  const results = tests.map((test) => {
    try {
      const got = (fn as (...args: unknown[]) => unknown)(
        ...structuredClone(test.args),
      );
      return { pass: deepEqual(got, test.expected), got: safeStringify(got) };
    } catch (exc) {
      return { pass: false, error: String(exc) };
    }
  });
  return { results, error: null };
}

export async function judgePython(
  code: string,
  functionName: string,
  tests: ExamTestCase[],
): Promise<JudgeResult> {
  const pyodide = await loadPyodideSingleton();
  const payload = JSON.stringify({
    code,
    function: functionName,
    tests: tests.map((test) => ({ args: test.args, expected: test.expected })),
  });
  const script = `
import json

_payload = json.loads(${JSON.stringify(payload)})
_results = []
_error = None
_ns = {"__name__": "__exam__"}
try:
    exec(compile(_payload["code"], "<prova>", "exec"), _ns)
    _fn = _ns.get(_payload["function"])
    if not callable(_fn):
        _error = "Função %s não encontrada no seu código." % _payload["function"]
except BaseException as exc:
    _error = "%s: %s" % (type(exc).__name__, exc)

if _error is None:
    for _case in _payload["tests"]:
        try:
            _got = _fn(*_case["args"])
            try:
                _ok = json.loads(json.dumps(_got)) == _case["expected"]
                _repr = json.dumps(_got)
            except (TypeError, ValueError):
                _ok = False
                _repr = repr(_got)
            _results.append({"pass": _ok, "got": _repr})
        except BaseException as exc:
            _results.append(
                {"pass": False, "error": "%s: %s" % (type(exc).__name__, exc)}
            )

json.dumps({"results": _results, "error": _error})
`;
  const json = pyodide.runPython(script) as string;
  return JSON.parse(json) as JudgeResult;
}
