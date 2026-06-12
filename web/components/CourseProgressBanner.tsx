"use client";

import Link from "next/link";
import { useCourseProgress } from "@/lib/useCourseProgress";
import { t, type Locale } from "@/lib/i18n";

/**
 * Banner no topo da home: progresso geral do curso (barra + %), quantas seções
 * já foram concluídas e um atalho para continuar de onde parou. Lê o
 * localStorage; antes da hidratação mostra 0% sem divergência.
 */
export default function CourseProgressBanner({ locale }: { locale: Locale }) {
  const strings = t(locale);
  const {
    overallPercent,
    sectionsComplete,
    totalSections,
    continueTarget,
    hasAnyProgress,
  } = useCourseProgress();

  // Sem nada feito ainda: não polui a home — só um CTA discreto para começar.
  if (!hasAnyProgress) {
    return (
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {strings.noProgressYet}
        </span>
        {continueTarget && (
          <Link
            href={`/${locale}/${continueTarget.section}/${continueTarget.lesson}`}
            className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
          >
            {strings.startCourse} →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            {strings.overallProgress}
          </span>
          <p className="text-xs text-zinc-500">
            {sectionsComplete}/{totalSections} {strings.sectionsCompleteSuffix}
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
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {continueTarget ? (
          <Link
            href={`/${locale}/${continueTarget.section}/${continueTarget.lesson}`}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
          >
            {strings.continueLearning} →
          </Link>
        ) : (
          <span className="rounded-lg bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
            🎉 100%
          </span>
        )}
        <Link
          href={`/${locale}/perfil`}
          className="text-sm text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
        >
          {strings.viewProgress}
        </Link>
      </div>
    </div>
  );
}
