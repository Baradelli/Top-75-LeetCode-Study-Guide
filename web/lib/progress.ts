"use client";

import { useSyncExternalStore } from "react";

/**
 * Progresso do aluno na v1: localStorage atrás de uma interface estreita
 * (ProgressStore), para que a v2 possa trocar por um banco sem mexer nos
 * componentes.
 */
export interface ProgressData {
  /** Chaves "secao/aula" das aulas concluídas. */
  completedLessons: string[];
  /** Chaves "secao/problema" dos problemas de prova aprovados. */
  passedExamProblems: string[];
}

export interface ProgressStore {
  get(): ProgressData;
  setLessonComplete(lessonKey: string, complete: boolean): void;
  setExamProblemPassed(problemKey: string): void;
  clear(): void;
  /** Substitui o progresso por um importado (ex.: arquivo JSON exportado). */
  importData(data: Partial<ProgressData>): void;
  subscribe(listener: () => void): () => void;
}

const STORAGE_KEY = "leetcode-course-progress-v1";
const EMPTY: ProgressData = { completedLessons: [], passedExamProblems: [] };

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function normalize(raw: Partial<ProgressData> | null): ProgressData {
  return {
    completedLessons: asStringArray(raw?.completedLessons),
    passedExamProblems: asStringArray(raw?.passedExamProblems),
  };
}

function createLocalStorageStore(): ProgressStore {
  const listeners = new Set<() => void>();
  // Cache para o snapshot ser referencialmente estável entre leituras.
  let cache: ProgressData | null = null;

  function read(): ProgressData {
    if (cache) return cache;
    if (typeof window === "undefined") return EMPTY;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      cache = raw ? normalize(JSON.parse(raw) as Partial<ProgressData>) : EMPTY;
    } catch {
      cache = EMPTY;
    }
    return cache;
  }

  function write(data: ProgressData) {
    cache = data;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Sem localStorage (ex.: modo privado restrito): progresso só em memória.
    }
    listeners.forEach((listener) => listener());
  }

  return {
    get: read,
    setLessonComplete(lessonKey, complete) {
      const current = read();
      const set = new Set(current.completedLessons);
      if (complete) {
        set.add(lessonKey);
      } else {
        set.delete(lessonKey);
      }
      write({ ...current, completedLessons: [...set] });
    },
    setExamProblemPassed(problemKey) {
      const current = read();
      if (current.passedExamProblems.includes(problemKey)) return;
      write({
        ...current,
        passedExamProblems: [...current.passedExamProblems, problemKey],
      });
    },
    clear() {
      write({ completedLessons: [], passedExamProblems: [] });
    },
    importData(data) {
      write(normalize(data));   // descarta o atual e adota o importado
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export const progressStore: ProgressStore = createLocalStorageStore();

export function lessonKey(section: string, lesson: string): string {
  return `${section}/${lesson}`;
}

/**
 * Hook de leitura do progresso. No servidor (e no primeiro render do cliente)
 * devolve o estado vazio, evitando divergência de hidratação.
 */
export function useProgress(): ProgressData {
  return useSyncExternalStore(
    progressStore.subscribe,
    progressStore.get,
    () => EMPTY,
  );
}

export function useLessonComplete(section: string, lesson: string) {
  const progress = useProgress();
  const key = lessonKey(section, lesson);
  const isComplete = progress.completedLessons.includes(key);
  const setComplete = (complete: boolean) =>
    progressStore.setLessonComplete(key, complete);
  return { isComplete, setComplete };
}

export function useExamProblem(section: string, problem: string) {
  const progress = useProgress();
  const key = lessonKey(section, problem);
  const isPassed = progress.passedExamProblems.includes(key);
  const markPassed = () => progressStore.setExamProblemPassed(key);
  return { isPassed, markPassed };
}

// --- Helpers puros (sem hooks) para resumir o progresso de uma seção. ---

export interface SectionProgress {
  totalLessons: number;
  completedLessons: number;
  examTotal: number;
  examPassed: number;
  hasExam: boolean;
  /** Aulas + prova (se houver) totalmente concluídas. */
  isComplete: boolean;
  /** 0–100, considerando aulas e prova com o mesmo peso por item. */
  percent: number;
}

export function isLessonDone(
  progress: ProgressData,
  section: string,
  lesson: string,
): boolean {
  return progress.completedLessons.includes(lessonKey(section, lesson));
}

export function computeSectionProgress(
  progress: ProgressData,
  section: string,
  lessonSlugs: string[],
  examProblemSlugs: string[],
): SectionProgress {
  const completedLessons = lessonSlugs.filter((slug) =>
    isLessonDone(progress, section, slug),
  ).length;
  const examPassed = examProblemSlugs.filter((slug) =>
    progress.passedExamProblems.includes(lessonKey(section, slug)),
  ).length;

  const totalItems = lessonSlugs.length + examProblemSlugs.length;
  const doneItems = completedLessons + examPassed;
  const percent =
    totalItems === 0 ? 0 : Math.round((doneItems / totalItems) * 100);

  return {
    totalLessons: lessonSlugs.length,
    completedLessons,
    examTotal: examProblemSlugs.length,
    examPassed,
    hasExam: examProblemSlugs.length > 0,
    isComplete: totalItems > 0 && doneItems === totalItems,
    percent,
  };
}
