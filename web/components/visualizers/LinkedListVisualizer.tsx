"use client";

import type { VisualizerProps } from "../TracePlayer";
import type { TraceValue } from "@/lib/trace";
import type { LinkedVisualConfig } from "@/lib/demos";

const POINTER_COLORS = [
  { text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500", bg: "bg-emerald-500/15" },
  { text: "text-amber-600 dark:text-amber-400", border: "border-amber-500", bg: "bg-amber-500/15" },
  { text: "text-sky-600 dark:text-sky-400", border: "border-sky-500", bg: "bg-sky-500/15" },
  { text: "text-rose-600 dark:text-rose-400", border: "border-rose-500", bg: "bg-rose-500/15" },
];

function asNumberArray(value: TraceValue | undefined): number[] | null {
  if (!Array.isArray(value)) return null;
  if (!value.every((v) => typeof v === "number")) return null;
  return value as number[];
}

/**
 * Visualização de lista ligada a partir de dois arrays: `valores[i]` é o valor
 * do nó i e `next[i]` é o índice do próximo (-1 = None). Mostra cada nó como
 * uma caixa com o ponteiro "próximo" abaixo, e os ponteiros (head/prev/curr/
 * slow/fast) como etiquetas coloridas sobre o nó que apontam. Ideal para ver
 * a reversão (os "próximos" invertendo) e os ponteiros lento/rápido.
 */
export default function LinkedListVisualizer({
  step,
  config,
}: VisualizerProps & { config: LinkedVisualConfig }) {
  const valores = asNumberArray(step.locals[config.valuesVar]);
  const next = asNumberArray(step.locals[config.nextVar]);

  const pointers = (config.pointerVars ?? [])
    .map((name, index) => ({
      name,
      value: step.locals[name],
      color: POINTER_COLORS[index % POINTER_COLORS.length],
    }))
    .filter((p) => typeof p.value === "number") as {
    name: string;
    value: number;
    color: (typeof POINTER_COLORS)[number];
  }[];

  const scalars = (config.scalarVars ?? [])
    .map((name) => ({ name, value: step.locals[name] }))
    .filter((s) => s.value !== undefined && s.value !== null);

  const nullPointers = pointers.filter((p) => p.value === -1);

  if (!valores || !next) {
    return (
      <p className="text-sm text-zinc-500">
        A visualização começa quando a lista é criada.
      </p>
    );
  }

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Visualização (lista ligada)
      </h4>

      {scalars.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {scalars.map((s) => (
            <span key={s.name}>
              {s.name}:{" "}
              <strong className="font-mono">{JSON.stringify(s.value)}</strong>
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-start gap-x-1 gap-y-4">
        {valores.map((value, i) => {
          const here = pointers.filter((p) => p.value === i);
          const target = next[i];
          return (
            <div key={i} className="flex flex-col items-center">
              {/* etiquetas de ponteiros que apontam para este nó */}
              <div className="mb-1 flex min-h-5 flex-col items-center gap-0.5">
                {here.map((p) => (
                  <span
                    key={p.name}
                    className={`rounded px-1.5 text-xs font-bold ${p.color.text}`}
                  >
                    ↓ {p.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-md border-2 font-mono text-sm ${
                    here.length > 0
                      ? `${here[0].color.border} ${here[0].color.bg} font-bold`
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {value}
                </div>
                {/* seta para o próximo */}
                <span className="mx-1 font-mono text-xs text-zinc-400">
                  {target === -1 ? "→∅" : "→"}
                </span>
              </div>
              <span className="mt-1 font-mono text-xs text-zinc-400">
                nó {i}
              </span>
              <span className="font-mono text-[10px] text-zinc-400">
                next={target === -1 ? "∅" : target}
              </span>
            </div>
          );
        })}
      </div>

      {nullPointers.length > 0 && (
        <p className="mt-3 text-xs text-zinc-500">
          ponteiros em ∅ (None):{" "}
          {nullPointers.map((p) => (
            <span key={p.name} className={`font-bold ${p.color.text}`}>
              {p.name}{" "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
