export const LOCALES = ["pt", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Strings de interface por idioma. O conteúdo das aulas (MDX) é escrito em PT
 * primeiro e traduzido depois que cada seção for aprovada (ver PLAN.md).
 */
const UI = {
  pt: {
    courseTitle: "Curso de LeetCode e Algoritmos",
    courseSubtitle:
      "Aprenda os padrões de cada tipo de problema com visualizações passo a passo, múltiplas soluções e provas práticas.",
    sections: "Seções",
    lessons: "Aulas",
    soon: "Em breve",
    available: "Disponível",
    backToSections: "← Todas as seções",
    backToSection: "← Voltar para a seção",
    markComplete: "Marcar como concluída",
    completed: "Concluída ✓",
    patterns: "Padrões",
    noLessons: "As aulas desta seção ainda estão sendo preparadas.",
  },
  en: {
    courseTitle: "LeetCode & Algorithms Course",
    courseSubtitle:
      "Learn the patterns behind each problem type with step-by-step visualizations, multiple solutions and practice exams.",
    sections: "Sections",
    lessons: "Lessons",
    soon: "Coming soon",
    available: "Available",
    backToSections: "← All sections",
    backToSection: "← Back to section",
    markComplete: "Mark as complete",
    completed: "Completed ✓",
    patterns: "Patterns",
    noLessons: "Lessons for this section are still being prepared.",
  },
} as const;

export type UIStrings = (typeof UI)[Locale];

export function t(locale: Locale): UIStrings {
  return UI[locale];
}
