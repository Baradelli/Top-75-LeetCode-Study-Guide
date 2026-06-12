"use client";

import type { VisualizerProps } from "../TracePlayer";
import type { TraceValue } from "@/lib/trace";
import type { IntervalVisualConfig } from "@/lib/demos";

type Interval = [number, number];

function asIntervals(value: TraceValue | undefined): Interval[] | null {
  if (!Array.isArray(value)) return null;
  const out: Interval[] = [];
  for (const item of value) {
    if (
      Array.isArray(item) &&
      item.length >= 2 &&
      typeof item[0] === "number" &&
      typeof item[1] === "number"
    ) {
      out.push([item[0], item[1]]);
    } else {
      return null;
    }
  }
  return out;
}

const WIDTH = 360;
const BAR_H = 18;
const GAP = 6;

/**
 * Visualização de intervalos como barras numa linha do tempo compartilhada:
 * a posição e o comprimento de cada barra são o [início, fim]. Sobreposições
 * ficam óbvias (barras que se cruzam na horizontal). Destaca o intervalo
 * atual e mostra o resultado (merge/inserção) numa faixa abaixo.
 */
export default function IntervalTraceVisualizer({
  step,
  config,
}: VisualizerProps & { config: IntervalVisualConfig }) {
  const intervals = asIntervals(step.locals[config.intervalsVar]);
  const result = config.resultVar
    ? asIntervals(step.locals[config.resultVar])
    : null;
  const cursor =
    config.cursorVar && typeof step.locals[config.cursorVar] === "number"
      ? (step.locals[config.cursorVar] as number)
      : null;

  const scalars = (config.scalarVars ?? [])
    .map((name) => ({ name, value: step.locals[name] }))
    .filter((s) => s.value !== undefined && s.value !== null);

  if (!intervals) {
    return (
      <p className="text-sm text-zinc-500">
        A visualização começa quando os intervalos existem.
      </p>
    );
  }

  // Escala de tempo compartilhada entre entrada e resultado.
  const all = [...intervals, ...(result ?? [])];
  const starts = all.map((iv) => iv[0]);
  const ends = all.map((iv) => iv[1]);
  const minT = starts.length ? Math.min(...starts) : 0;
  const maxT = ends.length ? Math.max(...ends) : 1;
  const span = Math.max(1, maxT - minT);
  const x = (t: number) => ((t - minT) / span) * WIDTH;

  const bar = (iv: Interval, key: string, kind: "in" | "cur" | "res") => {
    const left = x(iv[0]);
    const w = Math.max(2, x(iv[1]) - x(iv[0]));
    const cls =
      kind === "cur"
        ? "bg-amber-400 border-amber-600 text-amber-950"
        : kind === "res"
          ? "bg-emerald-500/30 border-emerald-500 text-emerald-900 dark:text-emerald-100"
          : "bg-sky-400/20 border-sky-400 text-sky-800 dark:text-sky-200";
    return (
      <div key={key} className="relative" style={{ height: BAR_H + GAP }}>
        <div
          className={`absolute flex items-center justify-center rounded border font-mono text-[10px] ${cls}`}
          style={{ left, width: w, height: BAR_H }}
          title={`[${iv[0]}, ${iv[1]}]`}
        >
          {w > 26 ? `${iv[0]},${iv[1]}` : ""}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Visualização (intervalos)
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

      <div style={{ width: WIDTH }}>
        <div className="mb-1 text-xs text-zinc-500">entrada</div>
        {intervals.map((iv, idx) =>
          bar(iv, `in-${idx}`, idx === cursor ? "cur" : "in"),
        )}

        {result && (
          <>
            <div className="my-1 border-t border-dashed border-zinc-300 dark:border-zinc-700" />
            <div className="mb-1 text-xs text-zinc-500">resultado</div>
            {result.length === 0 ? (
              <p className="text-sm text-zinc-400">(vazio)</p>
            ) : (
              result.map((iv, idx) => bar(iv, `res-${idx}`, "res"))
            )}
          </>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
        {config.cursorVar && (
          <span>
            <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-amber-400 align-middle" />
            atual
          </span>
        )}
        {result && (
          <span>
            <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-emerald-500/40 align-middle" />
            resultado
          </span>
        )}
        <span className="font-mono">
          linha do tempo: {minT}…{maxT}
        </span>
      </div>
    </div>
  );
}
