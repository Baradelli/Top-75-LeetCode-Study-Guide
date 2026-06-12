"use client";

import type { VisualizerProps } from "../TracePlayer";
import type { TraceValue } from "@/lib/trace";
import type { GridVisualConfig } from "@/lib/demos";

type Grid = TraceValue[][];

function asGrid(value: TraceValue | undefined): Grid | null {
  if (!Array.isArray(value)) return null;
  if (!value.every((row) => Array.isArray(row))) return null;
  return value as Grid;
}

function num(value: TraceValue | undefined): number | null {
  return typeof value === "number" ? value : null;
}

function truthy(value: TraceValue | undefined): boolean {
  return value === true || value === 1;
}

/**
 * Visualização de matriz/grid 2D: cada célula é um quadrado com o valor;
 * a célula atual (cursor) ganha um anel, células visitadas e o caminho de
 * backtracking são sombreados, e a "camada ativa" (espiral) pode ser
 * destacada por limites. Pensado para tornar DFS, backtracking e travessias
 * realmente visíveis.
 */
export default function GridTraceVisualizer({
  step,
  config,
}: VisualizerProps & { config: GridVisualConfig }) {
  const grid = asGrid(step.locals[config.gridVar]);
  const visited = config.visitedVar ? asGrid(step.locals[config.visitedVar]) : null;
  const path = config.pathVar ? asGrid(step.locals[config.pathVar]) : null;

  const curR = config.cursor ? num(step.locals[config.cursor.row]) : null;
  const curC = config.cursor ? num(step.locals[config.cursor.col]) : null;

  const bounds = config.bounds
    ? {
        top: num(step.locals[config.bounds.top]),
        bottom: num(step.locals[config.bounds.bottom]),
        left: num(step.locals[config.bounds.left]),
        right: num(step.locals[config.bounds.right]),
      }
    : null;

  const scalars = (config.scalarVars ?? [])
    .map((name) => ({ name, value: step.locals[name] }))
    .filter((s) => s.value !== undefined && s.value !== null);

  if (!grid) {
    return (
      <p className="text-sm text-zinc-500">
        A visualização começa quando a matriz é criada.
      </p>
    );
  }

  function inBounds(r: number, c: number): boolean {
    if (!bounds) return true;
    const { top, bottom, left, right } = bounds;
    if (top === null || bottom === null || left === null || right === null)
      return true;
    return r >= top && r <= bottom && c >= left && c <= right;
  }

  const hasBounds = bounds !== null;

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Visualização (grid)
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

      <div className="inline-flex max-w-full flex-col gap-1 overflow-x-auto">
        {grid.map((row, r) => (
          <div key={r} className="flex gap-1">
            {row.map((cell, c) => {
              const isCursor = r === curR && c === curC;
              const onPath = path !== null && truthy(path[r]?.[c]);
              const isVisited = visited !== null && truthy(visited[r]?.[c]);
              const dimByBounds = hasBounds && !inBounds(r, c);

              let cls =
                "border-zinc-300 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-300";
              if (onPath) {
                cls =
                  "border-emerald-500 bg-emerald-500/30 text-emerald-900 font-bold dark:text-emerald-100";
              } else if (isVisited) {
                cls =
                  "border-sky-400 bg-sky-400/15 text-sky-800 dark:text-sky-200";
              } else if (dimByBounds) {
                cls =
                  "border-zinc-200 bg-zinc-100 text-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-600";
              }

              return (
                <div
                  key={c}
                  className={`flex h-10 w-10 items-center justify-center rounded border font-mono text-sm transition ${cls} ${
                    isCursor ? "ring-2 ring-amber-500 ring-offset-1 dark:ring-offset-zinc-950" : ""
                  }`}
                >
                  {cell === "" ? "·" : String(cell)}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legenda */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
        <span>
          <span className="mr-1 inline-block h-3 w-3 rounded-sm ring-2 ring-amber-500 align-middle" />
          célula atual
        </span>
        {path && (
          <span>
            <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-emerald-500/40 align-middle" />
            caminho atual
          </span>
        )}
        {visited && (
          <span>
            <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-sky-400/30 align-middle" />
            visitado
          </span>
        )}
        {hasBounds && (
          <span>
            <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-zinc-200 align-middle dark:bg-zinc-800" />
            fora da camada
          </span>
        )}
      </div>
    </div>
  );
}
