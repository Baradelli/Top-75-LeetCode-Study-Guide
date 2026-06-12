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
    importProgress: "Importar (JSON)",
    importError: "Arquivo inválido — não foi possível importar o progresso.",
    noProgressYet:
      "Você ainda não concluiu nada. Comece pela primeira seção e seu progresso aparece aqui.",
    examBadge: "🏁 PROVA FINAL",
    examCardTitle: "1 fácil + 1 médio + 1 difícil — problemas inéditos",
    examCardDesc:
      "Com casos de teste ocultos, como no LeetCode de verdade. É aqui que você confirma que sai da seção resolvendo qualquer problema do tema.",
    examPageTitle: "Prova final",
    examPageIntro:
      "Três problemas inéditos (não vistos nas aulas) para testar se você sai desta seção resolvendo qualquer problema do tema: um fácil, um médio e um difícil. Alguns casos de teste são ocultos — como no LeetCode de verdade. Resolva em Python ou JavaScript.",
    diffEasy: "Fácil",
    diffMedium: "Médio",
    diffHard: "Difícil",
    examApproved: "Aprovado ✓",
    seeOnLeetCode: "Ver no LeetCode ↗",
    needHint: "Preciso de uma dica",
    hideHint: "Esconder dica",
    runTests: "▶ Rodar testes",
    runningTests: "Rodando testes…",
    hiddenCase: "caso oculto",
    inputWord: "entrada",
    expectedWord: "esperado",
    gotWord: "obtido",
    examApprovedFull: "Aprovado! 🎉",
    tryFirst: "Tente primeiro",
    tryFirstIntro:
      "Antes de ler a teoria, tente resolver. Pode começar pela força bruta, pode errar — a ideia é sentir o problema. A teoria vem logo abaixo.",
    running: "Rodando…",
    seeSolution: "👀 Ver solução",
    hideSolution: "Esconder solução",
    hintLabel: "💡 Dica",
    casesPassedSuffix: "casos passaram",
    thenSeeTheory: "🎉 Agora veja a teoria por trás.",
    keepTrying: "Continue tentando — ou veja a dica/solução.",
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
    importProgress: "Import (JSON)",
    importError: "Invalid file — could not import progress.",
    noProgressYet:
      "You haven't completed anything yet. Start with the first section and your progress will show up here.",
    examBadge: "🏁 FINAL EXAM",
    examCardTitle: "1 easy + 1 medium + 1 hard — unseen problems",
    examCardDesc:
      "With hidden test cases, just like the real LeetCode. This is where you confirm you can leave the section solving any problem of the topic.",
    examPageTitle: "Final exam",
    examPageIntro:
      "Three unseen problems (not covered in the lessons) to test whether you leave this section able to solve any problem of the topic: one easy, one medium and one hard. Some test cases are hidden — like the real LeetCode. Solve in Python or JavaScript.",
    diffEasy: "Easy",
    diffMedium: "Medium",
    diffHard: "Hard",
    examApproved: "Passed ✓",
    seeOnLeetCode: "View on LeetCode ↗",
    needHint: "I need a hint",
    hideHint: "Hide hint",
    runTests: "▶ Run tests",
    runningTests: "Running tests…",
    hiddenCase: "hidden case",
    inputWord: "input",
    expectedWord: "expected",
    gotWord: "got",
    examApprovedFull: "Passed! 🎉",
    tryFirst: "Try it first",
    tryFirstIntro:
      "Before reading the theory, try to solve it. You can start with brute force, you can fail — the point is to feel the problem. The theory comes right below.",
    running: "Running…",
    seeSolution: "👀 See solution",
    hideSolution: "Hide solution",
    hintLabel: "💡 Hint",
    casesPassedSuffix: "cases passed",
    thenSeeTheory: "🎉 Now check out the theory behind it.",
    keepTrying: "Keep trying — or check the hint/solution.",
  },
} as const;

export type UIStrings = (typeof UI)[Locale];

export function t(locale: Locale): UIStrings {
  return UI[locale];
}
