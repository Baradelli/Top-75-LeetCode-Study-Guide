"use client";

import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { getChallenge } from "@/lib/challenges";
import { judgeJavaScript, judgePython, type JudgeResult } from "@/lib/judge";
import { LanguageToggle, type CourseLanguage } from "./CodeRunner";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
      Carregando editor…
    </div>
  ),
});

/** Markdown inline mínimo (negrito e código) do enunciado. */
function InlineMarkdown({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((paragraph, pi) => (
        <p key={pi} className="my-2 leading-7 text-zinc-700 dark:text-zinc-300">
          {paragraph.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith("`") && part.endsWith("`")) {
              return (
                <code
                  key={i}
                  className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-800"
                >
                  {part.slice(1, -1)}
                </code>
              );
            }
            return <Fragment key={i}>{part}</Fragment>;
          })}
        </p>
      ))}
    </>
  );
}

/**
 * Desafio "tente primeiro": editor + testes visíveis, com dica e botão para
 * revelar a solução. Aparece no topo da aula, antes da teoria — a pessoa tenta
 * resolver e sente a dificuldade, para o ensino fazer sentido.
 */
export default function Challenge({ id }: { id: string }) {
  const challenge = getChallenge(id);
  const [language, setLanguage] = useState<CourseLanguage>("python");
  const [code, setCode] = useState<Record<CourseLanguage, string>>(() => ({
    python: challenge?.starter.python ?? "",
    javascript: challenge?.starter.javascript ?? "",
  }));
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  if (!challenge) {
    return (
      <p className="my-4 rounded-lg border border-red-300 px-4 py-3 text-sm text-red-600">
        Desafio &quot;{id}&quot; não encontrado.
      </p>
    );
  }

  async function handleRun() {
    if (!challenge) return;
    setRunning(true);
    setResult(null);
    try {
      const judged =
        language === "python"
          ? await judgePython(
              code.python,
              challenge.functionName.python,
              challenge.tests,
              challenge.linked,
            )
          : judgeJavaScript(
              code.javascript,
              challenge.functionName.javascript,
              challenge.tests,
              challenge.linked,
            );
      setResult(judged);
    } catch (exc) {
      setResult({ results: [], error: String(exc) });
    } finally {
      setRunning(false);
    }
  }

  const passed = result?.results.filter((r) => r.pass).length ?? 0;
  const total = challenge.tests.length;
  const allPassed = result !== null && !result.error && passed === total;

  return (
    <div className="my-6 overflow-hidden rounded-xl border-2 border-sky-300 dark:border-sky-900">
      <div className="border-b border-sky-200 bg-sky-50 px-5 py-4 dark:border-sky-900 dark:bg-sky-950/30">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <h3 className="font-bold text-sky-900 dark:text-sky-200">
            Tente primeiro: {challenge.title}
          </h3>
        </div>
        <p className="mt-1 text-sm text-sky-800/80 dark:text-sky-300/80">
          Antes de ler a teoria, tente resolver. Pode começar pela força bruta,
          pode errar — a ideia é sentir o problema. A teoria vem logo abaixo.
        </p>
        <div className="mt-2 text-sm">
          <InlineMarkdown text={challenge.statement} />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <LanguageToggle language={language} onChange={setLanguage} />
        <button
          onClick={handleRun}
          disabled={running}
          className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
        >
          {running ? "Rodando…" : "▶ Rodar testes"}
        </button>
      </div>

      <div style={{ height: 260 }}>
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

      {result && (
        <div className="border-t border-zinc-200 px-5 py-3 dark:border-zinc-800">
          {result.error ? (
            <pre className="whitespace-pre-wrap font-mono text-sm text-red-500">
              {result.error}
            </pre>
          ) : (
            <>
              <p
                className={`mb-2 text-sm font-semibold ${
                  allPassed
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {allPassed
                  ? `Mandou bem! ${passed}/${total} casos passaram. 🎉 Agora veja a teoria por trás.`
                  : `${passed}/${total} casos passaram. Continue tentando — ou veja a dica/solução.`}
              </p>
              <ul className="space-y-1 font-mono text-sm">
                {result.results.map((r, i) => (
                  <li
                    key={i}
                    className="text-zinc-700 dark:text-zinc-300"
                  >
                    {r.pass ? "✅" : "❌"} {JSON.stringify(challenge.tests[i].args).slice(1, -1)} →{" "}
                    {JSON.stringify(challenge.tests[i].expected)}
                    {!r.pass && (
                      <span className="text-red-500">
                        {" "}
                        · {r.error ?? `obtido: ${r.got}`}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3 border-t border-zinc-200 bg-zinc-50 px-5 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
        <button
          onClick={() => setShowHint((v) => !v)}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {showHint ? "Esconder dica" : "💡 Dica"}
        </button>
        <button
          onClick={() => setShowSolution((v) => !v)}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {showSolution ? "Esconder solução" : "👀 Ver solução"}
        </button>
      </div>

      {showHint && (
        <div className="border-t border-zinc-200 bg-amber-50 px-5 py-3 text-sm text-amber-900 dark:border-zinc-800 dark:bg-amber-950/30 dark:text-amber-200">
          💡 {challenge.hint}
        </div>
      )}

      {showSolution && (
        <div className="border-t border-zinc-200 px-5 py-3 dark:border-zinc-800">
          <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
            {challenge.solutionIdea}
          </p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 font-mono text-sm text-zinc-200">
            {language === "python"
              ? challenge.solution.python
              : challenge.solution.javascript}
          </pre>
        </div>
      )}
    </div>
  );
}
