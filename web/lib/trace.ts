/**
 * Formato comum de trace produzido pelos tracers de Python e JavaScript.
 * Cada passo representa uma linha prestes a executar (ou um retorno),
 * com um snapshot das variáveis visíveis naquele momento.
 */
export type TraceValue =
  | null
  | boolean
  | number
  | string
  | TraceValue[]
  | { [key: string]: TraceValue };

export interface TraceStep {
  /** Linha do código-fonte (1-based). */
  line: number;
  event: "line" | "return";
  /** Variáveis locais visíveis neste passo, já serializadas. */
  locals: Record<string, TraceValue>;
  /** Saída acumulada de print/console.log até este passo. */
  stdout: string;
}

export interface TraceResult {
  steps: TraceStep[];
  stdout: string;
  error: string | null;
  /** true se o trace foi cortado por atingir o limite de passos. */
  truncated: boolean;
}

/** Limite de passos para nunca travar a UI com loops grandes/infinitos. */
export const MAX_TRACE_STEPS = 2000;
