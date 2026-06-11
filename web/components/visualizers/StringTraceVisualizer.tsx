"use client";

import type { VisualizerProps } from "../TracePlayer";
import type { TraceValue } from "@/lib/trace";
import type { StringVisualConfig } from "@/lib/demos";

const POINTER_COLORS = [
  { text: "text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-500" },
  { text: "text-amber-600 dark:text-amber-400", ring: "ring-amber-500" },
  { text: "text-sky-600 dark:text-sky-400", ring: "ring-sky-500" },
  { text: "text-rose-600 dark:text-rose-400", ring: "ring-rose-500" },
];

/** Aceita string ("abc") ou lista de chars (["a","b","c"]). */
function asChars(value: TraceValue | undefined): string[] | null {
  if (typeof value === "string") return value.split("");
  if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
    return value as string[];
  }
  return null;
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
 * Visualização genérica de algoritmos sobre strings: caracteres em células,
 * ponteiros coloridos, sombreamento de janela [left..right], mapa de
 * frequência e pilha — configurados por demo em lib/demos.ts.
 */
export default function StringTraceVisualizer({
  step,
  config,
}: VisualizerProps & { config: StringVisualConfig }) {
  const chars = asChars(step.locals[config.stringVar]);
  const map = config.mapVar ? asRecord(step.locals[config.mapVar]) : null;
  const stack = config.stackVar ? asChars(step.locals[config.stackVar]) : null;

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

  const winLeft =
    config.window && typeof step.locals[config.window.left] === "number"
      ? (step.locals[config.window.left] as number)
      : null;
  const winRight =
    config.window && typeof step.locals[config.window.right] === "number"
      ? (step.locals[config.window.right] as number)
      : null;

  if (!chars) {
    return (
      <p className="text-sm text-zinc-500">
        A visualização começa quando a função recebe a string.
      </p>
    );
  }

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

      <div className="flex flex-wrap gap-1">
        {chars.map((char, index) => {
          const pointer = pointers.find((p) => p.value === index);
          const inWindow =
            winLeft !== null &&
            winRight !== null &&
            index >= winLeft &&
            index <= winRight;
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`flex h-11 w-9 items-center justify-center rounded-md border font-mono text-sm transition ${
                  pointer
                    ? `border-transparent ring-2 ${pointer.color.ring} font-bold`
                    : "border-zinc-300 dark:border-zinc-700"
                } ${
                  inWindow
                    ? "bg-emerald-500/10"
                    : "bg-white dark:bg-transparent"
                }`}
              >
                {char === " " ? "␣" : char}
              </div>
              <span
                className={`mt-1 font-mono text-xs ${
                  pointer
                    ? `font-bold ${pointer.color.text}`
                    : "text-zinc-400"
                }`}
              >
                {pointer ? pointer.name : index}
              </span>
            </div>
          );
        })}
      </div>

      {/* Pilha */}
      {config.stackVar && (
        <div className="mt-4">
          <span className="text-xs text-zinc-500">
            pilha <code className="font-mono">{config.stackVar}</code> (topo à
            direita):
          </span>
          <div className="mt-1 flex min-h-10 flex-wrap items-center gap-1">
            {stack && stack.length > 0 ? (
              stack.map((char, index) => (
                <div
                  key={index}
                  className={`flex h-9 w-9 items-center justify-center rounded-md border font-mono text-sm ${
                    index === stack.length - 1
                      ? "border-violet-500 bg-violet-400/20 font-bold"
                      : "border-violet-300 bg-violet-400/10 dark:border-violet-800"
                  }`}
                >
                  {char}
                </div>
              ))
            ) : (
              <span className="text-sm text-zinc-400">(vazia)</span>
            )}
          </div>
        </div>
      )}

      {/* Mapa de frequência / visto */}
      {config.mapVar && (
        <div className="mt-4">
          <span className="text-xs text-zinc-500">
            <code className="font-mono">{config.mapVar}</code>
            {config.mapLabel ? ` (${config.mapLabel})` : ""}:
          </span>
          <div className="mt-1 flex min-h-10 flex-wrap items-center gap-2">
            {map && Object.keys(map).length > 0 ? (
              Object.entries(map).map(([key, value]) => (
                <span
                  key={key}
                  className="rounded-md border border-sky-400 bg-sky-400/10 px-2 py-1 font-mono text-sm"
                >
                  {key === " " ? "␣" : key} → {JSON.stringify(value)}
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
