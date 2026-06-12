/**
 * Traduções em inglês do conteúdo (textos voltados ao usuário). O conteúdo PT
 * continua sendo a fonte da verdade nos arquivos sections.ts / challenges.ts /
 * exams.ts; aqui ficam só os textos EN, por seção, num arquivo separado por
 * seção (para tradução paralela sem conflito). Tudo cai no PT se faltar.
 */
import type { Locale } from "./i18n";

export interface ChallengeEn {
  title?: string;
  statement?: string;
  hint?: string;
  solutionIdea?: string;
}

export interface ExamProblemEn {
  title?: string;
  statement?: string;
  hint?: string;
}

export interface SectionEn {
  title?: string;
  description?: string;
  patterns?: string[];
  /** lessonSlug → { title, description } */
  lessons?: Record<string, { title?: string; description?: string }>;
  /** challengeId → textos EN */
  challenges?: Record<string, ChallengeEn>;
  /** examSlug → textos EN */
  exams?: Record<string, ExamProblemEn>;
}

import { comeceAquiEn } from "./en/comece-aqui";
import { fundamentosEn } from "./en/fundamentos";
import { arrayEn } from "./en/array";
import { stringEn } from "./en/string";
import { binaryEn } from "./en/binary";
import { linkedListEn } from "./en/linked-list";
import { matrixEn } from "./en/matrix";
import { intervalEn } from "./en/interval";
import { treeEn } from "./en/tree";
import { heapEn } from "./en/heap";
import { graphEn } from "./en/graph";
import { dynamicProgrammingEn } from "./en/dynamic-programming";

export const CONTENT_EN: Record<string, SectionEn> = {
  "comece-aqui": comeceAquiEn,
  fundamentos: fundamentosEn,
  array: arrayEn,
  string: stringEn,
  binary: binaryEn,
  "linked-list": linkedListEn,
  matrix: matrixEn,
  interval: intervalEn,
  tree: treeEn,
  heap: heapEn,
  graph: graphEn,
  "dynamic-programming": dynamicProgrammingEn,
};

/** Escolhe o valor EN se locale=en e existir; senão o PT. */
export function pick<T>(locale: Locale, pt: T, en: T | undefined | null): T {
  return locale === "en" && en != null ? en : pt;
}

/** Acha a seção que contém um desafio (pelo id) e devolve seus textos EN. */
export function challengeEn(id: string): ChallengeEn | undefined {
  for (const section of Object.values(CONTENT_EN)) {
    if (section.challenges && section.challenges[id]) {
      return section.challenges[id];
    }
  }
  return undefined;
}

/** Acha a seção que contém um problema de prova (pelo slug) e devolve EN. */
export function examProblemEn(slug: string): ExamProblemEn | undefined {
  for (const section of Object.values(CONTENT_EN)) {
    if (section.exams && section.exams[slug]) {
      return section.exams[slug];
    }
  }
  return undefined;
}
