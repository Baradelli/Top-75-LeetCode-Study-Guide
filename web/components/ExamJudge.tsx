"use client";

import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import type { ExamProblem } from "@/lib/exams";
import { judgeJavaScript, judgePython, type JudgeResult } from "@/lib/judge";
import { useExamProblem } from "@/lib/progress";
import { LanguageToggle, type CourseLanguage } from "./CodeRunner";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
      Carregando editor…
    </div>
  ),
});

const DIFFICULTY_STYLE = {
  facil: {
    label: "Fácil",
    style:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  medio: {
    label: "Médio",
    style:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  },
  dificil: {
    label: "Difícil",
    style: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  },
} as const;

/** Render mínimo de markdown inline (negrito e código) do enunciado. */
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
                  className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-900"
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
 * Um problema da prova final: enunciado, editor, testes visíveis e ocultos.
 * Aprovação (todos os casos passando) é persistida no progresso.
 */
export default function ExamJudge({
  section,
  problem,
}: {
  section: string;
  problem: ExamProblem;
}) {
  const [language, setLanguage] = useState<CourseLanguage>("python");
  const [code, setCode] = useState<Record<CourseLanguage, string>>({
    python: problem.starter.python,
    javascript: problem.starter.javascript,
  });
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { isPassed, markPassed } = useExamProblem(section, problem.slug);

  const difficulty = DIFFICULTY_STYLE[problem.difficulty];

  async function handleRun() {
    setRunning(true);
    setResult(null);
    try {
      const judged =
        language === "python"
          ? await judgePython(
              code.python,
              problem.functionName.python,
              problem.tests,
              problem.linked,
              problem.tree,
            )
          : judgeJavaScript(
              code.javascript,
              problem.functionName.javascript,
              problem.tests,
              problem.linked,
              problem.tree,
            );
      setResult(judged);
      const allPassed =
        judged.error === null &&
        judged.results.length === problem.tests.length &&
        judged.results.every((r) => r.pass);
      if (allPassed) markPassed();
    } catch (exc) {
      setResult({ results: [], error: String(exc) });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficulty.style}`}
          >
            {difficulty.label}
          </span>
          <h3 className="text-lg font-semibold">{problem.title}</h3>
          {isPassed && (
            <span className="ml-auto rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-semibold text-white">
              Aprovado ✓
            </span>
          )}
        </div>
        <div className="mt-2 text-sm">
          <InlineMarkdown text={problem.statement} />
        </div>
        <div className="mt-1 flex items-center gap-4 text-xs">
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 hover:underline dark:text-sky-400"
          >
            Ver no LeetCode ↗
          </a>
          <button
            onClick={() => setShowHint((v) => !v)}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            {showHint ? "Esconder dica" : "Preciso de uma dica"}
          </button>
        </div>
        {showHint && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            💡 {problem.hint}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <LanguageToggle language={language} onChange={setLanguage} />
        <button
          onClick={handleRun}
          disabled={running}
          className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
        >
          {running ? "Rodando testes…" : "▶ Rodar testes"}
        </button>
      </div>

      <div style={{ height: 300 }}>
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
        <div className="border-t border-zinc-200 px-5 py-4 dark:border-zinc-800">
          {result.error ? (
            <pre className="whitespace-pre-wrap font-mono text-sm text-red-500">
              {result.error}
            </pre>
          ) : (
            <TestResults problem={problem} result={result} />
          )}
        </div>
      )}
    </div>
  );
}

function TestResults({
  problem,
  result,
}: {
  problem: ExamProblem;
  result: JudgeResult;
}) {
  const passed = result.results.filter((r) => r.pass).length;
  const total = problem.tests.length;
  const allPassed = passed === total;
  let hiddenCounter = 0;

  function previewArgs(args: unknown[]): string {
    const json = JSON.stringify(args).slice(1, -1);
    return json.length > 80 ? json.slice(0, 80) + "…" : json;
  }

  return (
    <div>
      <p
        className={`mb-3 rounded-lg px-3 py-2 text-sm font-semibold ${
          allPassed
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
            : "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200"
        }`}
      >
        {allPassed
          ? `Aprovado! ${passed}/${total} casos passaram. 🎉`
          : `${passed}/${total} casos passaram.`}
      </p>
      <ul className="space-y-1.5 font-mono text-sm">
        {result.results.map((caseResult, index) => {
          const test = problem.tests[index];
          const icon = caseResult.pass ? "✅" : "❌";
          if (test.hidden) {
            hiddenCounter++;
            return (
              <li key={index} className="text-zinc-500">
                {icon} caso oculto {hiddenCounter}
              </li>
            );
          }
          return (
            <li key={index} className="text-zinc-700 dark:text-zinc-300">
              {icon} entrada: {previewArgs(test.args)} · esperado:{" "}
              {JSON.stringify(test.expected)}
              {!caseResult.pass && (
                <span className="text-red-500">
                  {" "}
                  · {caseResult.error ?? `obtido: ${caseResult.got}`}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
