"use client";

import type { VisualizerProps } from "../TracePlayer";
import type { TraceValue } from "@/lib/trace";
import type { BitVisualConfig } from "@/lib/demos";

/** Bits de um inteiro (não-negativo) em largura fixa, do mais ao menos significativo. */
function toBits(value: number, width: number): number[] {
  const bits: number[] = [];
  // Trata como inteiro de `width` bits (two's complement para negativos).
  const n = value < 0 ? value >>> 0 : value;
  for (let i = width - 1; i >= 0; i--) {
    bits.push((Math.floor(n / Math.pow(2, i)) % 2 + 2) % 2);
  }
  return bits;
}

/**
 * Visualização de manipulação de bits: cada variável numérica vira uma linha
 * de células 0/1 (largura fixa), destacando os bits ligados. Ideal para ver
 * XOR, máscaras e o truque n & (n-1) em ação.
 */
export default function BitTraceVisualizer({
  step,
  config,
}: VisualizerProps & { config: BitVisualConfig }) {
  const width = config.bitWidth ?? 8;

  const numbers = config.numberVars
    .map((name) => ({ name, value: step.locals[name] }))
    .filter((v) => typeof v.value === "number") as {
    name: string;
    value: number;
  }[];

  const scalars = (config.scalarVars ?? [])
    .map((name) => ({ name, value: step.locals[name] }))
    .filter((s) => s.value !== undefined && s.value !== null) as {
    name: string;
    value: TraceValue;
  }[];

  if (numbers.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        A visualização começa quando os valores existem.
      </p>
    );
  }

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Visualização (bits)
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

      <div className="space-y-2">
        {numbers.map(({ name, value }) => {
          const bits = toBits(value, width);
          return (
            <div key={name} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-right font-mono text-sm">
                <span className="text-sky-600 dark:text-sky-400">{name}</span>
                <span className="text-zinc-400"> ={value}</span>
              </span>
              <div className="flex gap-0.5">
                {bits.map((bit, i) => (
                  <div
                    key={i}
                    className={`flex h-7 w-6 items-center justify-center rounded font-mono text-sm ${
                      bit === 1
                        ? "bg-emerald-500 font-bold text-white"
                        : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800"
                    }`}
                  >
                    {bit}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 font-mono text-xs text-zinc-400">
        {width} bits, do mais significativo (esq.) ao menos (dir.)
      </p>
    </div>
  );
}
