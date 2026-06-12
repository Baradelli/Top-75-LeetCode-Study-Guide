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

/**
 * Problemas de árvore binária: quais args (por índice) são árvores dadas em
 * ordem de nível (com null/None para nós ausentes, formato do LeetCode), e se
 * o retorno é uma árvore. O juiz converte array↔TreeNode.
 */
export interface TreeSpec {
  treeArgs: number[];
  treeReturn: boolean;
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

const JS_TREE_PRELUDE = `
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}
function __arrToTree(a) {
  if (!a.length || a[0] === null) return null;
  var root = new TreeNode(a[0]); var q = [root]; var head = 0; var i = 1;
  while (i < a.length) {
    var node = q[head++];
    if (i < a.length) { if (a[i] !== null) { node.left = new TreeNode(a[i]); q.push(node.left); } i++; }
    if (i < a.length) { if (a[i] !== null) { node.right = new TreeNode(a[i]); q.push(node.right); } i++; }
  }
  return root;
}
function __treeToArr(root) {
  if (!root) return [];
  var res = []; var q = [root]; var head = 0;
  while (head < q.length) {
    var n = q[head++];
    if (n === null) { res.push(null); continue; }
    res.push(n.val); q.push(n.left); q.push(n.right);
  }
  while (res.length && res[res.length - 1] === null) res.pop();
  return res;
}
`;

export function judgeJavaScript(
  code: string,
  functionName: string,
  tests: ExamTestCase[],
  linked?: LinkedSpec,
  tree?: TreeSpec,
): JudgeResult {
  let runner: (args: unknown[]) => unknown;
  try {
    const prelude =
      (linked ? JS_LINKED_PRELUDE : "") + (tree ? JS_TREE_PRELUDE : "");
    const convertArgs =
      (linked
        ? `var __la=${JSON.stringify(linked.listArgs)};for(var i=0;i<__a.length;i++){if(__la.indexOf(i)>=0)__a[i]=__arrToList(__a[i]);}`
        : "") +
      (tree
        ? `var __ta=${JSON.stringify(tree.treeArgs)};for(var j=0;j<__a.length;j++){if(__ta.indexOf(j)>=0)__a[j]=__arrToTree(__a[j]);}`
        : "");
    const convertOut =
      (linked?.listReturn ? `out=__listToArr(out);` : "") +
      (tree?.treeReturn ? `out=__treeToArr(out);` : "");
    const body =
      `"use strict";\n${prelude}\n${code}\n;return function(__a){` +
      `${convertArgs}var out=${functionName}.apply(null,__a);${convertOut}return out;};`;
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
      const got = runner(structuredClone(test.args));
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
  tree?: TreeSpec,
): Promise<JudgeResult> {
  const pyodide = await loadPyodideSingleton();
  const payload = JSON.stringify({
    code,
    function: functionName,
    tests: tests.map((test) => ({ args: test.args, expected: test.expected })),
    listArgs: linked?.listArgs ?? [],
    listReturn: linked?.listReturn ?? false,
    treeArgs: tree?.treeArgs ?? [],
    treeReturn: tree?.treeReturn ?? false,
  });
  const script = `
import json
from collections import deque as __deque

_payload = json.loads(${JSON.stringify(payload)})
_results = []
_error = None

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

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

def __arr_to_tree(a):
    if not a or a[0] is None:
        return None
    root = TreeNode(a[0])
    q = __deque([root])
    i = 1
    while i < len(a):
        node = q.popleft()
        if i < len(a):
            if a[i] is not None:
                node.left = TreeNode(a[i])
                q.append(node.left)
            i += 1
        if i < len(a):
            if a[i] is not None:
                node.right = TreeNode(a[i])
                q.append(node.right)
            i += 1
    return root

def __tree_to_arr(root):
    if root is None:
        return []
    res = []
    q = __deque([root])
    while q:
        n = q.popleft()
        if n is None:
            res.append(None)
            continue
        res.append(n.val)
        q.append(n.left)
        q.append(n.right)
    while res and res[-1] is None:
        res.pop()
    return res

_ns = {"__name__": "__exam__", "ListNode": ListNode, "TreeNode": TreeNode}
_list_args = set(_payload["listArgs"])
_list_return = _payload["listReturn"]
_tree_args = set(_payload["treeArgs"])
_tree_return = _payload["treeReturn"]
try:
    exec(compile(_payload["code"], "<prova>", "exec"), _ns)
    _fn = _ns.get(_payload["function"])
    if not callable(_fn):
        _error = "Função %s não encontrada no seu código." % _payload["function"]
except BaseException as exc:
    _error = "%s: %s" % (type(exc).__name__, exc)

def __convert_arg(i, a):
    if i in _list_args:
        return __arr_to_list(a)
    if i in _tree_args:
        return __arr_to_tree(a)
    return a

if _error is None:
    for _case in _payload["tests"]:
        try:
            _args = [__convert_arg(i, a) for i, a in enumerate(_case["args"])]
            _got = _fn(*_args)
            if _list_return:
                _got = __list_to_arr(_got)
            elif _tree_return:
                _got = __tree_to_arr(_got)
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
