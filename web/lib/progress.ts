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
}

export interface ProgressStore {
  get(): ProgressData;
  setLessonComplete(lessonKey: string, complete: boolean): void;
  subscribe(listener: () => void): () => void;
}

const STORAGE_KEY = "leetcode-course-progress-v1";
const EMPTY: ProgressData = { completedLessons: [] };

function createLocalStorageStore(): ProgressStore {
  const listeners = new Set<() => void>();
  // Cache para o snapshot ser referencialmente estável entre leituras.
  let cache: ProgressData | null = null;

  function read(): ProgressData {
    if (cache) return cache;
    if (typeof window === "undefined") return EMPTY;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      cache = raw ? (JSON.parse(raw) as ProgressData) : EMPTY;
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
