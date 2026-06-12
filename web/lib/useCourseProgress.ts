"use client";

import { SECTIONS, getLessons, type Section } from "./sections";
import { sectionExamSlugs, sectionLessonSlugs } from "./course";
import {
  computeSectionProgress,
  isLessonDone,
  useProgress,
  type ProgressData,
  type SectionProgress,
} from "./progress";

export interface CourseProgress {
  perSection: { section: Section; stats: SectionProgress }[];
  totalItems: number;
  doneItems: number;
  overallPercent: number;
  sectionsComplete: number;
  totalSections: number;
  /** Próxima aula não concluída (ou null se tudo feito). */
  continueTarget: { section: string; lesson: string } | null;
  hasAnyProgress: boolean;
}

/** Seções que já têm conteúdo (aulas escritas). */
function sectionsWithContent(): Section[] {
  return SECTIONS.filter((section) => getLessons(section.slug).length > 0);
}

/**
 * Primeira aula não concluída na ordem do curso (helper puro, fora do render
 * para não reatribuir variável durante a renderização).
 */
function findContinueTarget(
  progress: ProgressData,
): { section: string; lesson: string } | null {
  for (const section of sectionsWithContent()) {
    for (const lesson of getLessons(section.slug)) {
      if (!isLessonDone(progress, section.slug, lesson.slug)) {
        return { section: section.slug, lesson: lesson.slug };
      }
    }
  }
  return null;
}

/**
 * Hook que agrega o progresso de todo o curso (usado pela home e pelo perfil),
 * a partir do localStorage. Mantém uma única fonte da verdade da agregação.
 */
export function useCourseProgress(): CourseProgress {
  const progress = useProgress();
  const sections = sectionsWithContent();

  const perSection = sections.map((section) => ({
    section,
    stats: computeSectionProgress(
      progress,
      section.slug,
      sectionLessonSlugs(section.slug),
      sectionExamSlugs(section.slug),
    ),
  }));

  const totalItems = perSection.reduce(
    (sum, { stats }) => sum + stats.totalLessons + stats.examTotal,
    0,
  );
  const doneItems = perSection.reduce(
    (sum, { stats }) => sum + stats.completedLessons + stats.examPassed,
    0,
  );
  const sectionsComplete = perSection.filter(
    ({ stats }) => stats.isComplete,
  ).length;

  return {
    perSection,
    totalItems,
    doneItems,
    overallPercent:
      totalItems === 0 ? 0 : Math.round((doneItems / totalItems) * 100),
    sectionsComplete,
    totalSections: sections.length,
    continueTarget: findContinueTarget(progress),
    hasAnyProgress: doneItems > 0,
  };
}

/**
 * Rótulo curto do estado da prova de uma seção: "prova ✓" se aprovada, ou
 * "prova: k/n" com o progresso parcial.
 */
export function examLabel(
  stats: SectionProgress,
  examWord: string,
  passedWord: string,
): string | null {
  if (!stats.hasExam) return null;
  if (stats.examPassed === stats.examTotal) return passedWord;
  return `${examWord}: ${stats.examPassed}/${stats.examTotal}`;
}
