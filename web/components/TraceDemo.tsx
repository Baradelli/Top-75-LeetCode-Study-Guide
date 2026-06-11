"use client";

import { useMemo } from "react";
import TracePlayer, { type VisualizerProps } from "./TracePlayer";
import ArrayTraceVisualizer from "./visualizers/ArrayTraceVisualizer";
import { DEMOS } from "@/lib/demos";

/**
 * Demonstração trace & replay usada nas aulas MDX: <TraceDemo id="two-sum" />.
 * Busca código e configuração visual no registry lib/demos.ts.
 */
export default function TraceDemo({ id }: { id: string }) {
  const demo = DEMOS[id];

  const Visualizer = useMemo(() => {
    if (!demo) return undefined;
    function BoundVisualizer(props: VisualizerProps) {
      return <ArrayTraceVisualizer {...props} config={demo.visual} />;
    }
    return BoundVisualizer;
  }, [demo]);

  if (!demo) {
    return (
      <p className="my-4 rounded-lg border border-red-300 px-4 py-3 text-sm text-red-600">
        Demo &quot;{id}&quot; não encontrada no registry.
      </p>
    );
  }

  return (
    <TracePlayer
      python={demo.python}
      javascript={demo.javascript}
      visualizer={Visualizer}
    />
  );
}
