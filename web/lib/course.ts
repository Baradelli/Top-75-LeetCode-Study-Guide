import { getLessons } from "./sections";
import { getExam } from "./exams";

/**
 * Junta seção + aulas + prova num só lugar, para os componentes de progresso
 * computarem o resumo sem importar `sections` e `exams` separadamente.
 */
export function sectionLessonSlugs(section: string): string[] {
  return getLessons(section).map((lesson) => lesson.slug);
}

export function sectionExamSlugs(section: string): string[] {
  return (getExam(section) ?? []).map((problem) => problem.slug);
}
