import Interpreter from "js-interpreter";
import {
  MAX_TRACE_STEPS,
  type TraceResult,
  type TraceStep,
  type TraceValue,
} from "./trace";

/**
 * Tracer de JavaScript: interpreta o código com js-interpreter (ES5) passo a
 * passo, registrando um TraceStep sempre que um statement entra no topo da
 * pilha de execução, no mesmo formato do tracer Python.
 *
 * Limitação conhecida (documentada no PLAN.md): o interpretador é ES5, então
 * o código das aulas em JS usa var/objetos simples. Suporte a JS moderno via
 * instrumentação de AST é uma evolução futura.
 */

/** Limite de micro-passos do interpretador (cada statement gera vários). */
const MAX_MICRO_STEPS = 200_000;

const STATEMENT_TYPES = new Set([
  "VariableDeclaration",
  "ExpressionStatement",
  "ReturnStatement",
  "IfStatement",
  "ForStatement",
  "WhileStatement",
  "DoWhileStatement",
  "ForInStatement",
  "BreakStatement",
  "ContinueStatement",
  "ThrowStatement",
  "SwitchStatement",
]);

function toTraceValue(
  interpreter: Interpreter,
  value: unknown,
): TraceValue {
  if (
    value === null ||
    typeof value === "boolean" ||
    typeof value === "string"
  ) {
    return value;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : String(value);
  }
  if (value === undefined) {
    return null;
  }
  try {
    const native = interpreter.pseudoToNative(value);
    if (typeof native === "function") return "function";
    return JSON.parse(JSON.stringify(native)) as TraceValue;
  } catch {
    return "[objeto]";
  }
}

function collectScopeVariables(
  interpreter: Interpreter,
  scope: Interpreter.Scope | null,
  globalBaseline: Set<string>,
): Record<string, TraceValue> {
  const result: Record<string, TraceValue> = {};
  let current = scope;
  while (current) {
    const isGlobal = current.parentScope === null;
    for (const name of Object.keys(current.object.properties)) {
      if (name in result) continue; // sombreamento: escopo interno vence
      if (name === "arguments" || name === "this") continue;
      if (isGlobal && globalBaseline.has(name)) continue;
      const value = current.object.properties[name];
      // Funções declaradas não entram no painel de variáveis.
      if (
        value !== null &&
        typeof value === "object" &&
        (value as Interpreter.PseudoObject).class === "Function"
      ) {
        continue;
      }
      result[name] = toTraceValue(interpreter, value);
    }
    current = current.parentScope;
  }
  return result;
}

function findCurrentScope(
  stack: Interpreter.State[],
): Interpreter.Scope | null {
  for (let i = stack.length - 1; i >= 0; i--) {
    const scope = stack[i].scope;
    if (scope) return scope;
  }
  return null;
}

function formatLogValue(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

export function traceJavaScript(code: string): TraceResult {
  let stdout = "";
  let error: string | null = null;
  let truncated = false;
  const steps: TraceStep[] = [];

  let interpreter: Interpreter;
  try {
    interpreter = new Interpreter(code, (interp, globalObject) => {
      const consoleObj = interp.nativeToPseudo({});
      interp.setProperty(globalObject, "console", consoleObj);
      interp.setProperty(
        consoleObj,
        "log",
        interp.createNativeFunction((...args: unknown[]) => {
          stdout +=
            args
              .map((a) => formatLogValue(interp.pseudoToNative(a)))
              .join(" ") + "\n";
        }),
      );
    });
  } catch (exc) {
    return {
      steps: [],
      stdout: "",
      error: String(exc),
      truncated: false,
    };
  }

  // Tudo que existe no escopo global antes de rodar é builtin, não do usuário.
  const globalBaseline = new Set(
    Object.keys(interpreter.globalScope.object.properties),
  );

  let lastSignature = "";
  let microSteps = 0;

  try {
    let running = true;
    while (running) {
      running = interpreter.step();
      microSteps++;
      if (microSteps > MAX_MICRO_STEPS || steps.length >= MAX_TRACE_STEPS) {
        truncated = true;
        break;
      }
      const stack = interpreter.stateStack;
      const top = stack[stack.length - 1];
      if (!top || !top.node.loc || !STATEMENT_TYPES.has(top.node.type)) {
        continue;
      }
      const line = top.node.loc.start.line;
      const scope = findCurrentScope(stack);
      const locals = collectScopeVariables(
        interpreter,
        scope,
        globalBaseline,
      );
      const event: TraceStep["event"] =
        top.node.type === "ReturnStatement" ? "return" : "line";
      const signature = `${line}|${stack.length}|${event}|${JSON.stringify(locals)}`;
      if (signature === lastSignature) continue;
      lastSignature = signature;
      steps.push({ line, event, locals, stdout });
    }
  } catch (exc) {
    error = String(exc);
  }

  return { steps, stdout, error, truncated };
}

/** Execução simples (sem trace) para o CodeRunner. */
export function runJavaScript(code: string): {
  stdout: string;
  error: string | null;
} {
  const result = traceJavaScript(code);
  return { stdout: result.stdout, error: result.error };
}
