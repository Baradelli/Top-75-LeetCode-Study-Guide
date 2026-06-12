"use client";

import { computeSectionProgress, useProgress } from "@/lib/progress";
import { examLabel } from "@/lib/useCourseProgress";
import { t, type Locale } from "@/lib/i18n";

/**
 * Resumo compacto do progresso de uma seção: barra + "x/y aulas · prova ...".
 * Usado nos cards da home e no topo da página da seção. Os slugs vêm do
 * servidor (dados estáticos); o estado de conclusão vem do localStorage.
 */
export default function SectionProgress({
  locale,
  section,
  lessonSlugs,
  examSlugs,
}: {
  locale: Locale;
  section: string;
  lessonSlugs: string[];
  examSlugs: string[];
}) {
  const progress = useProgress();
  const strings = t(locale);
  const stats = computeSectionProgress(
    progress,
    section,
    lessonSlugs,
    examSlugs,
  );

  if (stats.totalLessons === 0 && stats.examTotal === 0) return null;

  const lessonsLabel = `${stats.completedLessons}/${stats.totalLessons} ${strings.lessonsWord}`;
  const provaLabel = examLabel(stats, strings.examWord, strings.examPassed);

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-500">
          {stats.isComplete ? (
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              {strings.sectionComplete}
            </span>
          ) : (
            <>
              {lessonsLabel}
              {provaLabel ? ` · ${provaLabel}` : ""}
            </>
          )}
        </span>
        <span className="font-mono text-zinc-400">{stats.percent}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${stats.percent}%` }}
        />
      </div>
    </div>
  );
}
