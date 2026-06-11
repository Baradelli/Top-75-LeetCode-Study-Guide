"use client";

import type { VisualizerProps } from "../TracePlayer";
import type { TraceValue } from "@/lib/trace";
import type { ArrayVisualConfig } from "@/lib/demos";

const POINTER_COLORS = [
  { text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500", bg: "bg-emerald-500/20" },
  { text: "text-amber-600 dark:text-amber-400", border: "border-amber-500", bg: "bg-amber-500/20" },
  { text: "text-sky-600 dark:text-sky-400", border: "border-sky-500", bg: "bg-sky-500/20" },
  { text: "text-rose-600 dark:text-rose-400", border: "border-rose-500", bg: "bg-rose-500/20" },
];

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
 * Visualização genérica de algoritmos sobre arrays: células ou barras com
 * ponteiros coloridos, escalares em destaque, hash map e arrays secundários —
 * tudo configurado por demo em lib/demos.ts.
 */
export default function ArrayTraceVisualizer({
  step,
  config,
}: VisualizerProps & { config: ArrayVisualConfig }) {
  const array = asNumberArray(step.locals[config.arrayVar]);
  const map = config.mapVar ? asRecord(step.locals[config.mapVar]) : null;

  // Ponteiros presentes neste passo (variável existe e é número).
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

  if (!array) {
    return (
      <p className="text-sm text-zinc-500">
        A visualização começa quando a função recebe o array.
      </p>
    );
  }

  const maxValue = Math.max(...array.map((v) => Math.abs(v)), 1);

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Visualização
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

      {/* Array principal: barras ou células */}
      {config.bars ? (
        <div className="flex items-end gap-1" style={{ minHeight: 140 }}>
          {array.map((value, index) => {
            const pointer = pointers.find((p) => p.value === index);
            return (
              <div key={index} className="flex flex-col items-center justify-end">
                <span className="mb-0.5 font-mono text-[10px] text-zinc-500">
                  {value}
                </span>
                <div
                  className={`w-8 rounded-t-sm border ${
                    pointer
                      ? `${pointer.color.border} ${pointer.color.bg}`
                      : "border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800"
                  }`}
                  style={{ height: Math.max(6, (Math.abs(value) / maxValue) * 110) }}
                />
                <span
                  className={`mt-1 font-mono text-xs ${
                    pointer ? `font-bold ${pointer.color.text}` : "text-zinc-400"
                  }`}
                >
                  {pointer ? `${pointer.name}` : index}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1">
          {array.map((value, index) => {
            const pointer = pointers.find((p) => p.value === index);
            const isInMap =
              map !== null &&
              Object.values(map).some((mapIndex) => mapIndex === index);
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-md border font-mono text-sm transition ${
                    pointer
                      ? `${pointer.color.border} ${pointer.color.bg} font-bold`
                      : isInMap
                        ? "border-sky-400 bg-sky-400/10"
                        : "border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {value}
                </div>
                <span
                  className={`mt-1 font-mono text-xs ${
                    pointer ? `font-bold ${pointer.color.text}` : "text-zinc-400"
                  }`}
                >
                  {pointer ? `${pointer.name}=${index}` : index}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Arrays secundários (ex.: answer em prefix product) */}
      {(config.extraArrayVars ?? []).map((name) => {
        const extra = asNumberArray(step.locals[name]);
        if (!extra) return null;
        return (
          <div key={name} className="mt-3">
            <span className="text-xs text-zinc-500">
              <code className="font-mono">{name}</code>:
            </span>
            <div className="mt-1 flex flex-wrap gap-1">
              {extra.map((value, index) => (
                <div
                  key={index}
                  className="flex h-9 w-12 items-center justify-center rounded-md border border-violet-300 bg-violet-400/10 font-mono text-xs dark:border-violet-800"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Hash map */}
      {config.mapVar && (
        <div className="mt-4">
          <span className="text-xs text-zinc-500">
            hash map <code className="font-mono">{config.mapVar}</code>
            {config.mapLabel ? ` (${config.mapLabel})` : ""}:
          </span>
          <div className="mt-1 flex min-h-10 flex-wrap items-center gap-2">
            {map && Object.keys(map).length > 0 ? (
              Object.entries(map).map(([key, value]) => (
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
      )}
    </div>
  );
}
