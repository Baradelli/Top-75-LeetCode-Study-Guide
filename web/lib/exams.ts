/**
 * Provas finais por seção: 1 problema fácil, 1 médio e 1 difícil, sempre
 * INÉDITOS (fora dos problemas resolvidos nas aulas), com casos de teste
 * visíveis e ocultos rodando no LocalJudge.
 */
export type Difficulty = "facil" | "medio" | "dificil";

export interface ExamTestCase {
  args: unknown[];
  expected: unknown;
  /** Casos ocultos mostram só passou/falhou, sem entrada/saída. */
  hidden?: boolean;
}

export interface ExamProblem {
  slug: string;
  title: string;
  difficulty: Difficulty;
  leetcodeUrl: string;
  /** Enunciado em markdown simples (parágrafos e código inline). */
  statement: string;
  functionName: { python: string; javascript: string };
  starter: { python: string; javascript: string };
  tests: ExamTestCase[];
  /** Dica de padrão, revelada sob demanda. */
  hint: string;
}

function repeated(length: number, fill: (index: number) => number): number[] {
  return Array.from({ length }, (_, index) => fill(index));
}

export const EXAMS: Record<string, ExamProblem[]> = {
  array: [
    {
      slug: "majority-element",
      title: "Majority Element",
      difficulty: "facil",
      leetcodeUrl: "https://leetcode.com/problems/majority-element/",
      statement: `Dado um array \`nums\` de tamanho n, retorne o **elemento majoritário** — o elemento que aparece mais de ⌊n/2⌋ vezes. Pode assumir que ele sempre existe no array.

Exemplo: \`nums = [2, 2, 1, 1, 1, 2, 2]\` → resposta \`2\` (aparece 4 vezes em 7).`,
      functionName: {
        python: "majority_element",
        javascript: "majorityElement",
      },
      starter: {
        python: `def majority_element(nums):
    # escreva sua solução aqui
    pass`,
        javascript: `function majorityElement(nums) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[3, 2, 3]], expected: 3 },
        { args: [[2, 2, 1, 1, 1, 2, 2]], expected: 2 },
        { args: [[1]], expected: 1, hidden: true },
        { args: [[5, 5, 5, 2, 2]], expected: 5, hidden: true },
        {
          args: [repeated(20001, (i) => (i % 2 === 0 ? 7 : i))],
          expected: 7,
          hidden: true,
        },
      ],
      hint: "Um hash map de contagens resolve em O(n). Para O(1) de espaço, pesquise o algoritmo de votação de Boyer-Moore.",
    },
    {
      slug: "subarray-sum-equals-k",
      title: "Subarray Sum Equals K",
      difficulty: "medio",
      leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
      statement: `Dado um array de inteiros \`nums\` (com positivos e negativos) e um inteiro \`k\`, retorne **quantos subarrays contíguos** somam exatamente \`k\`.

Exemplo: \`nums = [1, 1, 1]\`, \`k = 2\` → resposta \`2\` (os subarrays [1,1] começando nos índices 0 e 1).

Atenção: com números negativos, sliding window não funciona — pense em somas de prefixo.`,
      functionName: { python: "subarray_sum", javascript: "subarraySum" },
      starter: {
        python: `def subarray_sum(nums, k):
    # escreva sua solução aqui
    pass`,
        javascript: `function subarraySum(nums, k) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[1, 1, 1], 2], expected: 2 },
        { args: [[1, 2, 3], 3], expected: 2 },
        { args: [[1, -1, 0], 0], expected: 3, hidden: true },
        { args: [[3, 4, 7, 2, -3, 1, 4, 2], 7], expected: 4, hidden: true },
        {
          args: [repeated(10000, () => 1), 5],
          expected: 9996,
          hidden: true,
        },
      ],
      hint: "Combine o padrão de soma de prefixo com o hash map do two-sum: quantas vezes já vi a soma de prefixo (soma_atual - k)?",
    },
    {
      slug: "trapping-rain-water",
      title: "Trapping Rain Water",
      difficulty: "dificil",
      leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
      statement: `Dado um array \`height\` representando um mapa de elevação onde a largura de cada barra é 1, calcule **quanta água** fica presa entre as barras depois de chover.

Exemplo: \`height = [0,1,0,2,1,0,1,3,2,1,2,1]\` → resposta \`6\`.

A água acima de cada posição é limitada pela menor das maiores barras à esquerda e à direita.`,
      functionName: { python: "trap", javascript: "trap" },
      starter: {
        python: `def trap(height):
    # escreva sua solução aqui
    pass`,
        javascript: `function trap(height) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
        { args: [[4, 2, 0, 3, 2, 5]], expected: 9 },
        { args: [[]], expected: 0, hidden: true },
        { args: [[1, 2, 3, 4, 5]], expected: 0, hidden: true },
        { args: [[3, 0, 3, 0, 3]], expected: 6, hidden: true },
        {
          args: [repeated(10000, (i) => (i % 3 === 0 ? 100 : 0))],
          expected: 666600,
          hidden: true,
        },
      ],
      hint: "Versão O(n) de espaço: arrays de máximo à esquerda e à direita. Versão O(1): two pointers convergindo, avançando sempre o lado da barra menor.",
    },
  ],
};

export function getExam(section: string): ExamProblem[] | undefined {
  return EXAMS[section];
}
