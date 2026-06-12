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
    prevLesson: "Aula anterior",
    nextLesson: "Próxima aula",
    allLessons: "Todas as aulas da seção",
    goToExam: "Ir para a prova final",
    profile: "Meu progresso",
    overallProgress: "Progresso geral",
    continueLearning: "Continuar de onde parei",
    startCourse: "Começar o curso",
    lessonsWord: "aulas",
    examPassed: "prova ✓",
    examPending: "prova pendente",
    examWord: "prova",
    notStarted: "Não iniciada",
    sectionComplete: "Seção concluída ✓",
    sectionsCompleteSuffix: "seções concluídas",
    viewProgress: "Ver progresso completo",
    clearProgress: "Limpar progresso",
    clearConfirm:
      "Apagar todo o seu progresso? Esta ação não pode ser desfeita.",
    exportProgress: "Exportar (JSON)",
    noProgressYet:
      "Você ainda não concluiu nada. Comece pela primeira seção e seu progresso aparece aqui.",
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
    prevLesson: "Previous lesson",
    nextLesson: "Next lesson",
    allLessons: "All lessons in this section",
    goToExam: "Go to final exam",
    profile: "My progress",
    overallProgress: "Overall progress",
    continueLearning: "Continue where I left off",
    startCourse: "Start the course",
    lessonsWord: "lessons",
    examPassed: "exam ✓",
    examPending: "exam pending",
    examWord: "exam",
    notStarted: "Not started",
    sectionComplete: "Section complete ✓",
    sectionsCompleteSuffix: "sections complete",
    viewProgress: "View full progress",
    clearProgress: "Clear progress",
    clearConfirm: "Erase all your progress? This cannot be undone.",
    exportProgress: "Export (JSON)",
    noProgressYet:
      "You haven't completed anything yet. Start with the first section and your progress will show up here.",
  },
} as const;

export type UIStrings = (typeof UI)[Locale];

export function t(locale: Locale): UIStrings {
  return UI[locale];
}
