"use client";

import { useMemo } from "react";
import TracePlayer, { type VisualizerProps } from "./TracePlayer";
import ArrayTraceVisualizer from "./visualizers/ArrayTraceVisualizer";
import StringTraceVisualizer from "./visualizers/StringTraceVisualizer";
import BitTraceVisualizer from "./visualizers/BitTraceVisualizer";
import LinkedListVisualizer from "./visualizers/LinkedListVisualizer";
import { DEMOS } from "@/lib/demos";

/**
 * Demonstração trace & replay usada nas aulas MDX: <TraceDemo id="two-sum" />.
 * Busca código e configuração visual no registry lib/demos.ts e escolhe o
 * visualizador certo (array ou string).
 */
export default function TraceDemo({ id }: { id: string }) {
  const demo = DEMOS[id];

  const Visualizer = useMemo(() => {
    if (!demo) return undefined;
    if ("array" in demo) {
      const config = demo.array;
      function ArrayBound(props: VisualizerProps) {
        return <ArrayTraceVisualizer {...props} config={config} />;
      }
      return ArrayBound;
    }
    if ("bit" in demo) {
      const config = demo.bit;
      function BitBound(props: VisualizerProps) {
        return <BitTraceVisualizer {...props} config={config} />;
      }
      return BitBound;
    }
    if ("linked" in demo) {
      const config = demo.linked;
      function LinkedBound(props: VisualizerProps) {
        return <LinkedListVisualizer {...props} config={config} />;
      }
      return LinkedBound;
    }
    const config = demo.string;
    function StringBound(props: VisualizerProps) {
      return <StringTraceVisualizer {...props} config={config} />;
    }
    return StringBound;
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
