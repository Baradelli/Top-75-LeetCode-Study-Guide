"use client";

import { useEffect, useState, type ComponentType } from "react";
import { tracePython } from "@/lib/tracer-py";
import { traceJavaScript } from "@/lib/tracer-js";
import type { TraceResult, TraceStep } from "@/lib/trace";
import { LanguageToggle, type CourseLanguage } from "./CodeRunner";

export interface VisualizerProps {
  step: TraceStep;
  language: CourseLanguage;
}

interface TracePlayerProps {
  python: string;
  javascript: string;
  /** Visualização específica do problema, alimentada pelo passo atual. */
  visualizer?: ComponentType<VisualizerProps>;
}

const SPEEDS = [
  { label: "0.5x", ms: 1600 },
  { label: "1x", ms: 800 },
  { label: "2x", ms: 400 },
  { label: "4x", ms: 200 },
];

type TraceOutcome = { trace?: TraceResult; error?: string };

/**
 * Player de trace & replay: executa o código uma vez (Pyodide ou
 * js-interpreter), grava cada passo e reproduz com controles de
 * play/pause/avançar/voltar, destacando a linha atual no código e
 * alimentando a visualização do problema.
 */
export default function TracePlayer({
  python,
  javascript,
  visualizer: Visualizer,
}: TracePlayerProps) {
  const [language, setLanguage] = useState<CourseLanguage>("python");
  // Cache por linguagem: ausência de entrada = ainda carregando (derivado,
  // sem setState síncrono em effect).
  const [outcomes, setOutcomes] = useState<
    Partial<Record<CourseLanguage, TraceOutcome>>
  >({});
  const [rawStepIndex, setRawStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);

  const outcome = outcomes[language];
  const loading = !outcome;

  useEffect(() => {
    if (outcomes[language]) return;
    let cancelled = false;
    (async () => {
      let result: TraceOutcome;
      try {
        const trace =
          language === "python"
            ? await tracePython(python)
            : await Promise.resolve().then(() => traceJavaScript(javascript));
        result = { trace };
      } catch (exc) {
        result = { error: String(exc) };
      }
      if (!cancelled) {
        setOutcomes((prev) => ({ ...prev, [language]: result }));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [language, python, javascript, outcomes]);

  const trace = outcome?.trace ?? null;
  const loadError = outcome?.error ?? null;
  const steps = trace?.steps ?? [];
  const stepIndex = Math.min(rawStepIndex, Math.max(0, steps.length - 1));
  const step = steps[stepIndex];
  const atEnd = steps.length > 0 && stepIndex >= steps.length - 1;
  // "Tocando" de verdade só quando ainda há passos à frente — a pausa no
  // final é derivada, sem setState em effect.
  const effectivelyPlaying = playing && !atEnd;

  useEffect(() => {
    if (!effectivelyPlaying) return;
    const timer = setInterval(() => {
      setRawStepIndex((index) => Math.min(index + 1, steps.length - 1));
    }, SPEEDS[speedIndex].ms);
    return () => clearInterval(timer);
  }, [effectivelyPlaying, speedIndex, steps.length]);

  function handleLanguageChange(next: CourseLanguage) {
    setLanguage(next);
    setRawStepIndex(0);
    setPlaying(false);
  }

  const code = language === "python" ? python : javascript;
  const lines = code.split("\n");

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <LanguageToggle language={language} onChange={handleLanguageChange} />
        <span className="text-xs text-zinc-500">
          Execução real, gravada passo a passo
        </span>
      </div>

      {loading && (
        <div className="flex items-center gap-3 px-4 py-10 text-sm text-zinc-500">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-emerald-500" />
          {language === "python"
            ? "Carregando Python no navegador (primeira vez demora alguns segundos)…"
            : "Executando…"}
        </div>
      )}

      {loadError && (
        <div className="px-4 py-6 font-mono text-sm text-red-500">
          {loadError}
        </div>
      )}

      {trace && step && (
        <>
          <div className="grid md:grid-cols-2">
            {/* Código com linha atual destacada */}
            <div className="overflow-x-auto bg-zinc-950 py-3 font-mono text-sm leading-6">
              {lines.map((text, index) => {
                const lineNumber = index + 1;
                const isCurrent = lineNumber === step.line;
                return (
                  <div
                    key={lineNumber}
                    className={`flex px-3 ${
                      isCurrent
                        ? "bg-emerald-500/20 text-white"
                        : "text-zinc-300"
                    }`}
                  >
                    <span className="w-8 shrink-0 select-none text-right text-zinc-600">
                      {lineNumber}
                    </span>
                    <span className="w-5 shrink-0 select-none text-center text-emerald-400">
                      {isCurrent ? "▶" : ""}
                    </span>
                    <pre className="whitespace-pre">{text || " "}</pre>
                  </div>
                );
              })}
            </div>

            {/* Visualização + variáveis */}
            <div className="border-t border-zinc-200 p-4 md:border-l md:border-t-0 dark:border-zinc-800">
              {Visualizer && <Visualizer step={step} language={language} />}
              <VariablesPanel step={step} />
              {step.stdout && (
                <div className="mt-4">
                  <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Saída
                  </h4>
                  <pre className="rounded-md bg-zinc-950 px-3 py-2 font-mono text-sm text-emerald-400">
                    {step.stdout}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Controles */}
          <div className="flex flex-wrap items-center gap-3 border-t border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-1">
              <ControlButton
                label="⏮"
                title="Reiniciar"
                onClick={() => {
                  setPlaying(false);
                  setRawStepIndex(0);
                }}
              />
              <ControlButton
                label="◀"
                title="Passo anterior"
                onClick={() => {
                  setPlaying(false);
                  setRawStepIndex(Math.max(0, stepIndex - 1));
                }}
              />
              <button
                onClick={() => {
                  if (atEnd) {
                    setRawStepIndex(0);
                    setPlaying(true);
                  } else {
                    setPlaying((p) => !p);
                  }
                }}
                className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-500"
              >
                {effectivelyPlaying ? "❚❚ Pausar" : "▶ Reproduzir"}
              </button>
              <ControlButton
                label="▶|"
                title="Próximo passo"
                onClick={() => {
                  setPlaying(false);
                  setRawStepIndex(Math.min(steps.length - 1, stepIndex + 1));
                }}
              />
            </div>

            <input
              type="range"
              min={0}
              max={Math.max(0, steps.length - 1)}
              value={stepIndex}
              onChange={(event) => {
                setPlaying(false);
                setRawStepIndex(Number(event.target.value));
              }}
              className="min-w-32 flex-1 accent-emerald-600"
            />

            <span className="font-mono text-xs text-zinc-500">
              passo {stepIndex + 1}/{steps.length}
            </span>

            <select
              value={speedIndex}
              onChange={(event) => setSpeedIndex(Number(event.target.value))}
              className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800"
            >
              {SPEEDS.map((speed, index) => (
                <option key={speed.label} value={index}>
                  {speed.label}
                </option>
              ))}
            </select>
          </div>

          {(trace.truncated || trace.error) && (
            <div className="border-t border-zinc-200 px-4 py-2 text-xs text-amber-600 dark:border-zinc-800">
              {trace.truncated && "Trace cortado no limite de passos. "}
              {trace.error && `Erro durante a execução: ${trace.error}`}
            </div>
          )}
        </>
      )}

      {trace && !step && !loading && (
        <div className="px-4 py-6 text-sm text-zinc-500">
          Nenhum passo registrado.{" "}
          {trace.error && (
            <span className="font-mono text-red-500">{trace.error}</span>
          )}
        </div>
      )}
    </div>
  );
}

function ControlButton({
  label,
  title,
  onClick,
}: {
  label: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      {label}
    </button>
  );
}

function VariablesPanel({ step }: { step: TraceStep }) {
  const entries = Object.entries(step.locals);
  return (
    <div className="mt-4">
      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Variáveis
      </h4>
      {entries.length === 0 ? (
        <p className="text-sm text-zinc-500">(nenhuma ainda)</p>
      ) : (
        <table className="w-full text-left font-mono text-sm">
          <tbody>
            {entries.map(([name, value]) => (
              <tr
                key={name}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
              >
                <td className="py-1 pr-4 text-sky-600 dark:text-sky-400">
                  {name}
                </td>
                <td className="py-1 text-zinc-700 dark:text-zinc-300">
                  {JSON.stringify(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
