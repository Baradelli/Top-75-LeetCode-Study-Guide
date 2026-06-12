"use client";

import type { VisualizerProps } from "../TracePlayer";
import type { TraceValue } from "@/lib/trace";
import type { TreeVisualConfig } from "@/lib/demos";

function asArray(value: TraceValue | undefined): TraceValue[] | null {
  return Array.isArray(value) ? value : null;
}

function num(value: TraceValue | undefined): number | null {
  return typeof value === "number" ? value : null;
}

interface Laid {
  index: number;
  x: number;
  depth: number;
}

/**
 * Visualização de árvore binária a partir de três arrays (valores, esq, dir),
 * com esq[i]/dir[i] = índice do filho (-1 = nenhum). Calcula o layout
 * (x = posição in-order, y = profundidade), desenha as arestas em SVG, e
 * destaca o nó atual (anel) e os visitados (cor). Torna a recursão em árvore
 * — descer, voltar, visitar em ordem — concreta.
 */
export default function TreeTraceVisualizer({
  step,
  config,
}: VisualizerProps & { config: TreeVisualConfig }) {
  const valores = asArray(step.locals[config.valuesVar]);
  const esq = asArray(step.locals[config.leftVar]);
  const dir = asArray(step.locals[config.rightVar]);
  const root = config.rootIndex ?? 0;
  const cursor = config.cursorVar ? num(step.locals[config.cursorVar]) : null;
  const visited = config.visitedVar ? asArray(step.locals[config.visitedVar]) : null;

  const scalars = (config.scalarVars ?? [])
    .map((name) => ({ name, value: step.locals[name] }))
    .filter((s) => s.value !== undefined && s.value !== null);

  if (!valores || !esq || !dir || valores.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        A visualização começa quando a árvore é criada.
      </p>
    );
  }

  // Layout: x por ordem in-order, profundidade por nível. Travessia iterativa
  // com proteção contra índices inválidos.
  const layout = new Map<number, Laid>();
  let xCounter = 0;
  let maxDepth = 0;
  const visit = (index: number, depth: number, guard: number): void => {
    if (index < 0 || index >= valores.length || guard > valores.length) return;
    const l = num(esq[index]);
    const r = num(dir[index]);
    if (l !== null && l >= 0) visit(l, depth + 1, guard + 1);
    layout.set(index, { index, x: xCounter++, depth });
    if (depth > maxDepth) maxDepth = depth;
    if (r !== null && r >= 0) visit(r, depth + 1, guard + 1);
  };
  visit(root, 0, 0);

  const laidNodes = [...layout.values()];
  if (laidNodes.length === 0) {
    return <p className="text-sm text-zinc-500">Árvore vazia.</p>;
  }

  const X_GAP = 46;
  const Y_GAP = 60;
  const PAD = 24;
  const width = xCounter * X_GAP + PAD;
  const height = (maxDepth + 1) * Y_GAP + PAD;
  const cx = (n: Laid) => n.x * X_GAP + PAD;
  const cy = (n: Laid) => n.depth * Y_GAP + PAD;

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Visualização (árvore)
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

      <div className="overflow-x-auto">
        <svg width={width} height={height} className="block">
          {/* arestas */}
          {laidNodes.map((n) => {
            const children = [num(esq[n.index]), num(dir[n.index])];
            return children.map((ch, k) =>
              ch !== null && ch >= 0 && layout.has(ch) ? (
                <line
                  key={`${n.index}-${k}`}
                  x1={cx(n)}
                  y1={cy(n)}
                  x2={cx(layout.get(ch)!)}
                  y2={cy(layout.get(ch)!)}
                  className="stroke-zinc-300 dark:stroke-zinc-700"
                  strokeWidth={2}
                />
              ) : null,
            );
          })}
          {/* nós */}
          {laidNodes.map((n) => {
            const isCursor = n.index === cursor;
            const isVisited = visited !== null && (visited[n.index] === 1 || visited[n.index] === true);
            let fill = "fill-white dark:fill-zinc-900";
            let stroke = "stroke-zinc-400 dark:stroke-zinc-600";
            let text = "fill-zinc-700 dark:fill-zinc-200";
            if (isCursor) {
              fill = "fill-amber-400";
              stroke = "stroke-amber-600";
              text = "fill-amber-950";
            } else if (isVisited) {
              fill = "fill-sky-400/30 dark:fill-sky-500/20";
              stroke = "stroke-sky-500";
              text = "fill-sky-800 dark:fill-sky-200";
            }
            return (
              <g key={n.index}>
                <circle
                  cx={cx(n)}
                  cy={cy(n)}
                  r={16}
                  className={`${fill} ${stroke}`}
                  strokeWidth={isCursor ? 3 : 2}
                />
                <text
                  x={cx(n)}
                  y={cy(n)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`${text} font-mono text-xs`}
                >
                  {String(valores[n.index])}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
        {config.cursorVar && (
          <span>
            <span className="mr-1 inline-block h-3 w-3 rounded-full bg-amber-400 align-middle" />
            nó atual
          </span>
        )}
        {visited && (
          <span>
            <span className="mr-1 inline-block h-3 w-3 rounded-full bg-sky-400/40 align-middle" />
            visitado
          </span>
        )}
      </div>
    </div>
  );
}
