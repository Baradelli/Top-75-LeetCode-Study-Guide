"use client";

import { useState } from "react";

export interface QuizQuestion {
  question: string;
  options: string[];
  /** Índice da alternativa correta em options. */
  answer: number;
  /** Por que a resposta certa é certa (mostrada após responder). */
  explanation: string;
}

interface QuizProps {
  title?: string;
  questions: QuizQuestion[];
}

/**
 * Quiz de múltipla escolha com feedback imediato e explicação do porquê,
 * usado dentro das aulas MDX. Sem persistência na v1 — o objetivo é fixação.
 */
export default function Quiz({ title = "Quiz de fixação", questions }: QuizProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    questions.map(() => null),
  );

  const answered = answers.filter((a) => a !== null).length;
  const correct = answers.filter(
    (a, i) => a !== null && a === questions[i].answer,
  ).length;
  const done = answered === questions.length;

  function select(questionIndex: number, optionIndex: number) {
    setAnswers((prev) => {
      if (prev[questionIndex] !== null) return prev; // resposta é definitiva
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  }

  function reset() {
    setAnswers(questions.map(() => null));
  }

  return (
    <div className="my-8 rounded-xl border border-violet-300 bg-violet-50/50 p-5 dark:border-violet-900 dark:bg-violet-950/20">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-violet-800 dark:text-violet-300">
          🧠 {title}
        </h3>
        <span className="font-mono text-sm text-zinc-500">
          {answered}/{questions.length}
        </span>
      </div>

      <div className="mt-4 space-y-6">
        {questions.map((q, qi) => {
          const chosen = answers[qi];
          return (
            <div key={qi}>
              <p className="font-medium">
                {qi + 1}. {q.question}
              </p>
              <div className="mt-2 space-y-1.5">
                {q.options.map((option, oi) => {
                  const isChosen = chosen === oi;
                  const isCorrect = oi === q.answer;
                  const revealed = chosen !== null;
                  let style =
                    "border-zinc-300 hover:border-violet-400 dark:border-zinc-700";
                  if (revealed && isCorrect) {
                    style =
                      "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
                  } else if (revealed && isChosen && !isCorrect) {
                    style = "border-red-500 bg-red-50 dark:bg-red-950/40";
                  } else if (revealed) {
                    style = "border-zinc-200 opacity-60 dark:border-zinc-800";
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => select(qi, oi)}
                      disabled={revealed}
                      className={`block w-full rounded-lg border px-3 py-2 text-left text-sm transition ${style}`}
                    >
                      <span className="mr-2 font-mono text-zinc-400">
                        {String.fromCharCode(97 + oi)})
                      </span>
                      {option}
                      {revealed && isCorrect && " ✓"}
                      {revealed && isChosen && !isCorrect && " ✗"}
                    </button>
                  );
                })}
              </div>
              {chosen !== null && (
                <p
                  className={`mt-2 rounded-lg px-3 py-2 text-sm ${
                    chosen === q.answer
                      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                      : "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200"
                  }`}
                >
                  {chosen === q.answer ? "Correto! " : "Não foi dessa vez. "}
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {done && (
        <div className="mt-5 flex items-center justify-between rounded-lg bg-violet-100 px-4 py-3 dark:bg-violet-950/50">
          <span className="font-medium text-violet-900 dark:text-violet-200">
            Resultado: {correct}/{questions.length}{" "}
            {correct === questions.length
              ? "— perfeito! 🎉"
              : correct >= questions.length * 0.7
                ? "— mandou bem!"
                : "— vale reler a teoria acima."}
          </span>
          <button
            onClick={reset}
            className="rounded-md border border-violet-400 px-3 py-1 text-sm text-violet-700 hover:bg-violet-200 dark:text-violet-300 dark:hover:bg-violet-900"
          >
            Refazer
          </button>
        </div>
      )}
    </div>
  );
}
