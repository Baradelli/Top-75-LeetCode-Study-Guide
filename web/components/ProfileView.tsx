"use client";

import Link from "next/link";
import { progressStore, useProgress } from "@/lib/progress";
import { examLabel, useCourseProgress } from "@/lib/useCourseProgress";
import { t, type Locale } from "@/lib/i18n";

export default function ProfileView({ locale }: { locale: Locale }) {
  const progress = useProgress();
  const strings = t(locale);
  const {
    perSection,
    overallPercent,
    sectionsComplete,
    totalSections,
    continueTarget,
    hasAnyProgress,
  } = useCourseProgress();

  function handleExport() {
    const blob = new Blob([JSON.stringify(progress, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "progresso-leetcode.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleClear() {
    if (window.confirm(strings.clearConfirm)) {
      progressStore.clear();
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{strings.profile}</h1>

      {/* Resumo geral */}
      <div className="mt-6 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm font-medium text-zinc-500">
              {strings.overallProgress}
            </span>
            <p className="text-xs text-zinc-500">
              {sectionsComplete}/{totalSections}{" "}
              {strings.sectionsCompleteSuffix}
            </p>
          </div>
          <span className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {overallPercent}%
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${overallPercent}%` }}
          />
        </div>

        {!hasAnyProgress ? (
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            {strings.noProgressYet}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          {continueTarget ? (
            <Link
              href={`/${locale}/${continueTarget.section}/${continueTarget.lesson}`}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
            >
              {hasAnyProgress ? strings.continueLearning : strings.startCourse} →
            </Link>
          ) : (
            <span className="rounded-lg bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              🎉 100%
            </span>
          )}
          {hasAnyProgress && (
            <>
              <button
                onClick={handleExport}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {strings.exportProgress}
              </button>
              <button
                onClick={handleClear}
                className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"
              >
                {strings.clearProgress}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Progresso por seção */}
      <div className="mt-8 space-y-3">
        {perSection.map(({ section, stats }) => (
          <Link
            key={section.slug}
            href={`/${locale}/${section.slug}`}
            className="block rounded-xl border border-zinc-200 p-4 transition hover:border-emerald-500 dark:border-zinc-800 dark:hover:border-emerald-500"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{section.title}</h3>
              <span className="font-mono text-sm text-zinc-400">
                {stats.percent}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              {stats.isComplete ? (
                <span className="text-emerald-600 dark:text-emerald-400">
                  {strings.sectionComplete}
                </span>
              ) : (
                <>
                  {stats.completedLessons}/{stats.totalLessons}{" "}
                  {strings.lessonsWord}
                  {examLabel(stats, strings.examWord, strings.examPassed)
                    ? ` · ${examLabel(stats, strings.examWord, strings.examPassed)}`
                    : ""}
                </>
              )}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
