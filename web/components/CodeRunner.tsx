"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { runPython } from "@/lib/tracer-py";
import { runJavaScript } from "@/lib/tracer-js";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
      Carregando editor…
    </div>
  ),
});

export type CourseLanguage = "python" | "javascript";

interface CodeRunnerProps {
  python: string;
  javascript: string;
  /** Altura do editor em pixels. */
  height?: number;
}

interface RunOutput {
  stdout: string;
  error: string | null;
}

/**
 * Editor de código com toggle Python/JavaScript e execução no navegador.
 * Python roda no Pyodide; JavaScript no interpretador ES5 do curso.
 */
export default function CodeRunner({
  python,
  javascript,
  height = 320,
}: CodeRunnerProps) {
  const [language, setLanguage] = useState<CourseLanguage>("python");
  const [code, setCode] = useState<Record<CourseLanguage, string>>({
    python,
    javascript,
  });
  const [output, setOutput] = useState<RunOutput | null>(null);
  const [running, setRunning] = useState(false);

  async function handleRun() {
    setRunning(true);
    setOutput(null);
    try {
      const result =
        language === "python"
          ? await runPython(code.python)
          : runJavaScript(code.javascript);
      setOutput(result);
    } catch (exc) {
      setOutput({ stdout: "", error: String(exc) });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <LanguageToggle language={language} onChange={setLanguage} />
        <button
          onClick={handleRun}
          disabled={running}
          className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
        >
          {running
            ? language === "python"
              ? "Carregando Python…"
              : "Executando…"
            : "▶ Executar"}
        </button>
      </div>
      <div style={{ height }}>
        <MonacoEditor
          language={language}
          value={code[language]}
          onChange={(value) =>
            setCode((prev) => ({ ...prev, [language]: value ?? "" }))
          }
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            tabSize: language === "python" ? 4 : 2,
          }}
        />
      </div>
      {output && (
        <div className="border-t border-zinc-200 bg-zinc-950 px-4 py-3 font-mono text-sm dark:border-zinc-800">
          {output.stdout && (
            <pre className="whitespace-pre-wrap text-emerald-400">
              {output.stdout}
            </pre>
          )}
          {output.error && (
            <pre className="whitespace-pre-wrap text-red-400">
              {output.error}
              {language === "javascript" && output.error.includes("SyntaxError")
                ? "\nDica: o executor de JavaScript do curso suporta ES5 — use var em vez de let/const."
                : ""}
            </pre>
          )}
          {!output.stdout && !output.error && (
            <pre className="text-zinc-500">(sem saída)</pre>
          )}
        </div>
      )}
    </div>
  );
}

export function LanguageToggle({
  language,
  onChange,
}: {
  language: CourseLanguage;
  onChange: (language: CourseLanguage) => void;
}) {
  const options: { value: CourseLanguage; label: string }[] = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
  ];
  return (
    <div className="flex gap-1 rounded-lg bg-zinc-200 p-1 dark:bg-zinc-800">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-md px-3 py-1 text-sm font-medium transition ${
            language === option.value
              ? "bg-white text-zinc-900 shadow dark:bg-zinc-600 dark:text-white"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
