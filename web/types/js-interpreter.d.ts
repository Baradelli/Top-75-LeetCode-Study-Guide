declare module "js-interpreter" {
  namespace Interpreter {
    interface PseudoObject {
      properties: Record<string, unknown>;
      class?: string;
    }
    interface Scope {
      object: PseudoObject;
      parentScope: Scope | null;
    }
    interface AstNode {
      type: string;
      loc?: {
        start: { line: number; column: number };
        end: { line: number; column: number };
      };
    }
    interface State {
      node: AstNode;
      scope?: Scope;
      done?: boolean;
    }
  }

  class Interpreter {
    constructor(
      code: string,
      initFunc?: (
        interpreter: Interpreter,
        globalObject: Interpreter.PseudoObject,
      ) => void,
    );
    step(): boolean;
    run(): boolean;
    stateStack: Interpreter.State[];
    globalScope: Interpreter.Scope;
    globalObject: Interpreter.PseudoObject;
    value: unknown;
    pseudoToNative(pseudoObj: unknown): unknown;
    nativeToPseudo(nativeObj: unknown): unknown;
    createNativeFunction(
      fn: (...args: unknown[]) => unknown,
      isConstructor?: boolean,
    ): unknown;
    setProperty(
      obj: Interpreter.PseudoObject | unknown,
      name: string,
      value: unknown,
    ): void;
  }

  export = Interpreter;
}
