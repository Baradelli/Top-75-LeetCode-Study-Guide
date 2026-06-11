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

/**
 * Problemas de lista ligada: quais args (por índice) são listas dadas como
 * array, e se o retorno é uma lista. O juiz converte array↔ListNode, para o
 * aluno escrever código idiomático com `.next`.
 */
export interface LinkedSpec {
  listArgs: number[];
  listReturn: boolean;
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

const JS_LINKED_PRELUDE = `
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}
function __arrToList(a) {
  var dummy = new ListNode(0); var c = dummy;
  for (var i = 0; i < a.length; i++) { c.next = new ListNode(a[i]); c = c.next; }
  return dummy.next;
}
function __listToArr(h) {
  var r = []; var seen = 0;
  while (h) { r.push(h.val); h = h.next; if (++seen > 100000) break; }
  return r;
}
`;

export function judgeJavaScript(
  code: string,
  functionName: string,
  tests: ExamTestCase[],
  linked?: LinkedSpec,
): JudgeResult {
  let runner: (
    args: unknown[],
    listArgs: number[],
    listReturn: boolean,
  ) => unknown;
  try {
    const body = linked
      ? `"use strict";\n${JS_LINKED_PRELUDE}\n${code}\n;return function(__a,__la,__lr){` +
        `for(var i=0;i<__a.length;i++){if(__la.indexOf(i)>=0)__a[i]=__arrToList(__a[i]);}` +
        `var out=${functionName}.apply(null,__a);return __lr?__listToArr(out):out;};`
      : `"use strict";\n${code}\n;return function(__a){return ${functionName}.apply(null,__a);};`;
    const built = new Function(body)();
    if (typeof built !== "function") {
      return {
        results: [],
        error: `Função ${functionName} não encontrada no seu código.`,
      };
    }
    runner = built as typeof runner;
  } catch (exc) {
    return { results: [], error: String(exc) };
  }
  const results = tests.map((test) => {
    try {
      const got = runner(
        structuredClone(test.args),
        linked?.listArgs ?? [],
        linked?.listReturn ?? false,
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
  linked?: LinkedSpec,
): Promise<JudgeResult> {
  const pyodide = await loadPyodideSingleton();
  const payload = JSON.stringify({
    code,
    function: functionName,
    tests: tests.map((test) => ({ args: test.args, expected: test.expected })),
    listArgs: linked?.listArgs ?? [],
    listReturn: linked?.listReturn ?? false,
  });
  const script = `
import json

_payload = json.loads(${JSON.stringify(payload)})
_results = []
_error = None

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def __arr_to_list(a):
    dummy = ListNode(0)
    c = dummy
    for x in a:
        c.next = ListNode(x)
        c = c.next
    return dummy.next

def __list_to_arr(h):
    r = []
    seen = 0
    while h is not None:
        r.append(h.val)
        h = h.next
        seen += 1
        if seen > 100000:
            break
    return r

_ns = {"__name__": "__exam__", "ListNode": ListNode}
_list_args = set(_payload["listArgs"])
_list_return = _payload["listReturn"]
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
            _args = [
                __arr_to_list(a) if i in _list_args else a
                for i, a in enumerate(_case["args"])
            ]
            _got = _fn(*_args)
            if _list_return:
                _got = __list_to_arr(_got)
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
