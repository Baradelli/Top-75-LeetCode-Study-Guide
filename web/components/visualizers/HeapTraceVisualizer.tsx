"use client";

import type { VisualizerProps } from "../TracePlayer";
import type { TraceValue } from "@/lib/trace";
import type { HeapVisualConfig } from "@/lib/demos";

function asArray(value: TraceValue | undefined): TraceValue[] | null {
  return Array.isArray(value) ? value : null;
}

/**
 * Visualização de heap: o array é desenhado como uma árvore binária COMPLETA
 * (os filhos de i são 2i+1 e 2i+2), em SVG. Destaca o nó sendo ajustado
 * (sift-up/down). Mostra também o array por baixo, para a pessoa ligar as duas
 * representações — a chave para entender por que push/pop são O(log n).
 */
export default function HeapTraceVisualizer({
  step,
  config,
}: VisualizerProps & { config: HeapVisualConfig }) {
  const heap = asArray(step.locals[config.heapVar]);
  const cursor =
    config.cursorVar && typeof step.locals[config.cursorVar] === "number"
      ? (step.locals[config.cursorVar] as number)
      : null;

  const scalars = (config.scalarVars ?? [])
    .map((name) => ({ name, value: step.locals[name] }))
    .filter((s) => s.value !== undefined && s.value !== null);

  if (!heap) {
    return (
      <p className="text-sm text-zinc-500">
        A visualização começa quando o heap é criado.
      </p>
    );
  }

  const n = heap.length;
  const levels = n === 0 ? 0 : Math.floor(Math.log2(n)) + 1;
  const X_GAP = 40;
  const Y_GAP = 56;
  const PAD = 20;
  const width = Math.max(1, Math.pow(2, levels - 1)) * X_GAP + PAD * 2;
  const height = levels * Y_GAP + PAD;

  function pos(i: number): { x: number; y: number } {
    const level = Math.floor(Math.log2(i + 1));
    const posInLevel = i - (Math.pow(2, level) - 1);
    const countInLevel = Math.pow(2, level);
    const x = ((posInLevel + 0.5) / countInLevel) * (width - PAD * 2) + PAD;
    const y = level * Y_GAP + PAD;
    return { x, y };
  }

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Visualização (heap)
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

      {n === 0 ? (
        <p className="text-sm text-zinc-400">(heap vazio)</p>
      ) : (
        <div className="overflow-x-auto">
          <svg width={width} height={height} className="block">
            {heap.map((_, i) => {
              const p = pos(i);
              return [i * 2 + 1, i * 2 + 2].map((ch) =>
                ch < n ? (
                  <line
                    key={`${i}-${ch}`}
                    x1={p.x}
                    y1={p.y}
                    x2={pos(ch).x}
                    y2={pos(ch).y}
                    className="stroke-zinc-300 dark:stroke-zinc-700"
                    strokeWidth={2}
                  />
                ) : null,
              );
            })}
            {heap.map((val, i) => {
              const p = pos(i);
              const isCursor = i === cursor;
              const isRoot = i === 0;
              return (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={15}
                    className={
                      isCursor
                        ? "fill-amber-400 stroke-amber-600"
                        : isRoot
                          ? "fill-emerald-400/30 stroke-emerald-500"
                          : "fill-white stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600"
                    }
                    strokeWidth={isCursor ? 3 : 2}
                  />
                  <text
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`font-mono text-xs ${
                      isCursor
                        ? "fill-amber-950"
                        : "fill-zinc-700 dark:fill-zinc-200"
                    }`}
                  >
                    {String(val)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      <div className="mt-2 font-mono text-xs text-zinc-500">
        array: [{heap.map((v) => String(v)).join(", ")}]
      </div>
      <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-zinc-500">
        <span>
          <span className="mr-1 inline-block h-3 w-3 rounded-full bg-emerald-400/50 align-middle" />
          topo (raiz)
        </span>
        {config.cursorVar && (
          <span>
            <span className="mr-1 inline-block h-3 w-3 rounded-full bg-amber-400 align-middle" />
            ajustando
          </span>
        )}
      </div>
    </div>
  );
}
