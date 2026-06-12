"use client";

import type { VisualizerProps } from "../TracePlayer";
import type { TraceValue } from "@/lib/trace";
import type { GraphVisualConfig } from "@/lib/demos";

function asAdj(value: TraceValue | undefined): number[][] | null {
  if (!Array.isArray(value)) return null;
  const out: number[][] = [];
  for (const row of value) {
    if (!Array.isArray(row)) return null;
    out.push(row.filter((x) => typeof x === "number") as number[]);
  }
  return out;
}

function asArray(value: TraceValue | undefined): TraceValue[] | null {
  return Array.isArray(value) ? value : null;
}

/**
 * Visualização de grafo com layout circular: os nós são distribuídos num
 * círculo e as arestas desenhadas como linhas (com setas, se dirigido). O nó
 * atual ganha um anel e os visitados são sombreados. Mostra o DFS/BFS/
 * ordenação topológica "andando" pelo grafo.
 */
export default function GraphTraceVisualizer({
  step,
  config,
}: VisualizerProps & { config: GraphVisualConfig }) {
  const adj = asAdj(step.locals[config.adjVar]);
  const labels = config.labelsVar ? asArray(step.locals[config.labelsVar]) : null;
  const cursor =
    config.cursorVar && typeof step.locals[config.cursorVar] === "number"
      ? (step.locals[config.cursorVar] as number)
      : null;
  const visited = config.visitedVar ? asArray(step.locals[config.visitedVar]) : null;

  const scalars = (config.scalarVars ?? [])
    .map((name) => ({ name, value: step.locals[name] }))
    .filter((s) => s.value !== undefined && s.value !== null);

  if (!adj) {
    return (
      <p className="text-sm text-zinc-500">
        A visualização começa quando o grafo é criado.
      </p>
    );
  }

  const n = adj.length;
  const SIZE = 240;
  const R = 90;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const NODE_R = 16;

  // Posição circular de cada nó (topo = nó 0, sentido horário).
  const pos = (i: number) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / Math.max(1, n);
    return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
  };

  const directed = config.directed === true;

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Visualização (grafo{directed ? " dirigido" : ""})
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

      <svg width={SIZE} height={SIZE} className="block">
        <defs>
          <marker
            id="seta"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 Z" className="fill-zinc-400 dark:fill-zinc-600" />
          </marker>
        </defs>

        {/* arestas */}
        {adj.map((vizinhos, i) =>
          vizinhos.map((j) => {
            if (j < 0 || j >= n) return null;
            // num grafo não-dirigido, desenha cada aresta uma vez (i < j)
            if (!directed && i > j) return null;
            const a = pos(i);
            const b = pos(j);
            // encurta a linha para a seta não entrar no nó
            const dx = b.x - a.x, dy = b.y - a.y;
            const len = Math.max(1, Math.hypot(dx, dy));
            const ex = b.x - (dx / len) * NODE_R;
            const ey = b.y - (dy / len) * NODE_R;
            return (
              <line
                key={`${i}-${j}`}
                x1={a.x}
                y1={a.y}
                x2={ex}
                y2={ey}
                className="stroke-zinc-300 dark:stroke-zinc-700"
                strokeWidth={2}
                markerEnd={directed ? "url(#seta)" : undefined}
              />
            );
          }),
        )}

        {/* nós */}
        {adj.map((_, i) => {
          const p = pos(i);
          const isCursor = i === cursor;
          const isVisited =
            visited !== null && (visited[i] === 1 || visited[i] === true);
          let circle = "fill-white stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600";
          let text = "fill-zinc-700 dark:fill-zinc-200";
          if (isCursor) {
            circle = "fill-amber-400 stroke-amber-600";
            text = "fill-amber-950";
          } else if (isVisited) {
            circle = "fill-sky-400/30 stroke-sky-500";
            text = "fill-sky-800 dark:fill-sky-200";
          }
          const label = labels && labels[i] !== undefined ? String(labels[i]) : String(i);
          return (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                className={circle}
                strokeWidth={isCursor ? 3 : 2}
              />
              <text
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                className={`${text} font-mono text-xs`}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-2 flex flex-wrap gap-x-4 text-xs text-zinc-500">
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
