"use client";

import type { VisualizerProps } from "../TracePlayer";
import type { TraceValue } from "@/lib/trace";

function asNumberArray(value: TraceValue | undefined): number[] | null {
  if (!Array.isArray(value)) return null;
  if (!value.every((item) => typeof item === "number")) return null;
  return value as number[];
}

function asRecord(
  value: TraceValue | undefined,
): Record<string, TraceValue> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, TraceValue>;
  }
  return null;
}

/**
 * Visualização do two-sum: células do array com o ponteiro `i`, o alvo, o
 * complemento procurado e o conteúdo do hash map `seen` a cada passo.
 */
export default function TwoSumVisualizer({ step }: VisualizerProps) {
  const nums = asNumberArray(step.locals.nums);
  const target = step.locals.target;
  const i = typeof step.locals.i === "number" ? step.locals.i : null;
  const complement = step.locals.complement;
  const seen = asRecord(step.locals.seen);

  if (!nums) {
    return (
      <p className="text-sm text-zinc-500">
        A visualização começa quando a função recebe o array.
      </p>
    );
  }

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Visualização
      </h4>

      <div className="mb-3 flex flex-wrap gap-4 text-sm">
        {typeof target === "number" && (
          <span>
            alvo: <strong className="font-mono">{target}</strong>
          </span>
        )}
        {typeof complement === "number" && (
          <span>
            procurando complemento:{" "}
            <strong className="font-mono text-amber-600 dark:text-amber-400">
              {complement}
            </strong>
          </span>
        )}
      </div>

      {/* Células do array com o ponteiro i */}
      <div className="flex flex-wrap gap-1">
        {nums.map((value, index) => {
          const isCurrent = index === i;
          const isInMap =
            seen !== null &&
            Object.values(seen).some((mapIndex) => mapIndex === index);
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-md border font-mono text-sm transition ${
                  isCurrent
                    ? "border-emerald-500 bg-emerald-500/20 font-bold"
                    : isInMap
                      ? "border-sky-400 bg-sky-400/10"
                      : "border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {value}
              </div>
              <span
                className={`mt-1 font-mono text-xs ${
                  isCurrent
                    ? "font-bold text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-400"
                }`}
              >
                {isCurrent ? `i=${index}` : index}
              </span>
            </div>
          );
        })}
      </div>

      {/* Hash map */}
      <div className="mt-4">
        <span className="text-xs text-zinc-500">
          hash map <code className="font-mono">seen</code> (valor → índice):
        </span>
        <div className="mt-1 flex min-h-10 flex-wrap items-center gap-2">
          {seen && Object.keys(seen).length > 0 ? (
            Object.entries(seen).map(([key, value]) => (
              <span
                key={key}
                className="rounded-md border border-sky-400 bg-sky-400/10 px-2 py-1 font-mono text-sm"
              >
                {key} → {JSON.stringify(value)}
              </span>
            ))
          ) : (
            <span className="text-sm text-zinc-400">(vazio)</span>
          )}
        </div>
      </div>
    </div>
  );
}
