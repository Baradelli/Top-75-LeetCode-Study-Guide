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

function repeatStr(chunk: string, times: number): string {
  return chunk.repeat(times);
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

  string: [
    {
      slug: "first-unique-character",
      title: "First Unique Character in a String",
      difficulty: "facil",
      leetcodeUrl:
        "https://leetcode.com/problems/first-unique-character-in-a-string/",
      statement: `Dada uma string \`s\`, retorne o **índice do primeiro caractere que não se repete**. Se não existir nenhum, retorne \`-1\`.

Exemplo: \`s = "leetcode"\` → \`0\` (o 'l' é o primeiro que aparece uma única vez). \`s = "aabb"\` → \`-1\`.`,
      functionName: {
        python: "first_uniq_char",
        javascript: "firstUniqChar",
      },
      starter: {
        python: `def first_uniq_char(s):
    # escreva sua solução aqui
    pass`,
        javascript: `function firstUniqChar(s) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: ["leetcode"], expected: 0 },
        { args: ["loveleetcode"], expected: 2 },
        { args: ["aabb"], expected: -1 },
        { args: ["z"], expected: 0, hidden: true },
        { args: ["aadadaad"], expected: -1, hidden: true },
        {
          args: [repeatStr("a", 10000) + "b"],
          expected: 10000,
          hidden: true,
        },
      ],
      hint: "Duas passadas: na primeira, conte a frequência de cada caractere (hash map); na segunda, percorra a string e retorne o índice do primeiro com contagem 1. O(n) de tempo, O(1) de espaço (no máximo 26 letras).",
    },
    {
      slug: "find-all-anagrams",
      title: "Find All Anagrams in a String",
      difficulty: "medio",
      leetcodeUrl:
        "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
      statement: `Dadas duas strings \`s\` e \`p\`, retorne uma lista com os **índices iniciais** de todos os anagramas de \`p\` dentro de \`s\` (em ordem crescente).

Exemplo: \`s = "cbaebabacd"\`, \`p = "abc"\` → \`[0, 6]\` (os trechos "cba" e "bac" são anagramas de "abc").`,
      functionName: { python: "find_anagrams", javascript: "findAnagrams" },
      starter: {
        python: `def find_anagrams(s, p):
    # escreva sua solução aqui
    pass`,
        javascript: `function findAnagrams(s, p) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: ["cbaebabacd", "abc"], expected: [0, 6] },
        { args: ["abab", "ab"], expected: [0, 1, 2] },
        { args: ["a", "ab"], expected: [], hidden: true },
        { args: ["aa", "bb"], expected: [], hidden: true },
        {
          args: [repeatStr("z", 10000) + "ab", "ab"],
          expected: [10000],
          hidden: true,
        },
      ],
      hint: "Junte os dois padrões da seção: uma janela deslizante de tamanho len(p) carregando um mapa de frequência como estado. A cada passo, um char entra e um sai; quando a frequência da janela bate com a de p, registre o índice. O(n).",
    },
    {
      slug: "longest-valid-parentheses",
      title: "Longest Valid Parentheses",
      difficulty: "dificil",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-valid-parentheses/",
      statement: `Dada uma string \`s\` contendo apenas \`(\` e \`)\`, retorne o **comprimento da maior substring de parênteses válidos** (corretamente fechados).

Exemplo: \`s = ")()())"\` → \`4\` (a substring "()()"). \`s = "(()"\` → \`2\`.`,
      functionName: {
        python: "longest_valid_parentheses",
        javascript: "longestValidParentheses",
      },
      starter: {
        python: `def longest_valid_parentheses(s):
    # escreva sua solução aqui
    pass`,
        javascript: `function longestValidParentheses(s) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: ["(()"], expected: 2 },
        { args: [")()())"], expected: 4 },
        { args: [""], expected: 0 },
        { args: ["()(()"], expected: 2, hidden: true },
        { args: ["()(())"], expected: 6, hidden: true },
        { args: [repeatStr("()", 5000)], expected: 10000, hidden: true },
      ],
      hint: "Uma pilha de índices, inicializada com -1 como “âncora”. Empilhe a posição de cada '('; a cada ')', desempilhe e meça a distância até o novo topo (o último índice não casado). Quando a pilha esvazia, empilhe o ')' atual como nova âncora.",
    },
  ],

  binary: [
    {
      slug: "single-number",
      title: "Single Number",
      difficulty: "facil",
      leetcodeUrl: "https://leetcode.com/problems/single-number/",
      statement: `Num array \`nums\`, **todo** elemento aparece duas vezes, exceto um, que aparece uma vez. Encontre esse único. Tente fazer em O(n) tempo e O(1) de espaço extra.

Exemplo: \`nums = [4, 1, 2, 1, 2]\` → \`4\`.`,
      functionName: { python: "single_number", javascript: "singleNumber" },
      starter: {
        python: `def single_number(nums):
    # escreva sua solução aqui
    pass`,
        javascript: `function singleNumber(nums) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[2, 2, 1]], expected: 1 },
        { args: [[4, 1, 2, 1, 2]], expected: 4 },
        { args: [[1]], expected: 1 },
        { args: [[7, 3, 7, 3, 9]], expected: 9, hidden: true },
        {
          args: [
            (() => {
              const a: number[] = [];
              for (let x = 1; x <= 10000; x++) a.push(x, x);
              a.push(42424);
              return a;
            })(),
          ],
          expected: 42424,
          hidden: true,
        },
      ],
      hint: "XOR é a chave: a ^ a = 0 e a ^ 0 = a. Faça o XOR de todos os elementos — os pares se cancelam e sobra exatamente o número solitário. O(n) tempo, O(1) espaço.",
    },
    {
      slug: "search-range",
      title: "Find First and Last Position of Element in Sorted Array",
      difficulty: "medio",
      leetcodeUrl:
        "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      statement: `Dado um array \`nums\` **ordenado** (com repetições) e um \`target\`, retorne \`[primeiro, último]\` índice onde \`target\` aparece, ou \`[-1, -1]\` se não existir. Espera-se O(log n).

Exemplo: \`nums = [5,7,7,8,8,10]\`, \`target = 8\` → \`[3, 4]\`.`,
      functionName: { python: "search_range", javascript: "searchRange" },
      starter: {
        python: `def search_range(nums, target):
    # escreva sua solução aqui
    pass`,
        javascript: `function searchRange(nums, target) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[5, 7, 7, 8, 8, 10], 8], expected: [3, 4] },
        { args: [[5, 7, 7, 8, 8, 10], 6], expected: [-1, -1] },
        { args: [[], 0], expected: [-1, -1] },
        { args: [[1], 1], expected: [0, 0], hidden: true },
        { args: [[2, 2], 2], expected: [0, 1], hidden: true },
        {
          args: [
            (() => {
              const a: number[] = [];
              for (let x = 0; x < 100000; x++) a.push(x);
              for (let k = 0; k < 5; k++) a.push(100000);
              return a;
            })(),
            100000,
          ],
          expected: [100000, 100004],
          hidden: true,
        },
      ],
      hint: "Faça DUAS buscas binárias: uma que, ao achar o alvo, continua indo para a ESQUERDA (acha o primeiro), e outra que continua para a DIREITA (acha o último). Cada uma é O(log n).",
    },
    {
      slug: "koko-bananas",
      title: "Koko Eating Bananas",
      difficulty: "dificil",
      leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
      statement: `Koko tem pilhas de bananas (\`piles[i]\`) e \`h\` horas. Numa velocidade \`k\` (bananas/hora), cada hora ela escolhe uma pilha e come até \`k\` dela (se a pilha tem menos, come tudo e descansa o resto da hora). Retorne a **menor** \`k\` que permite comer todas as bananas em \`h\` horas.

Exemplo: \`piles = [3, 6, 7, 11]\`, \`h = 8\` → \`4\`.`,
      functionName: { python: "min_eating_speed", javascript: "minEatingSpeed" },
      starter: {
        python: `def min_eating_speed(piles, h):
    # escreva sua solução aqui
    pass`,
        javascript: `function minEatingSpeed(piles, h) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[3, 6, 7, 11], 8], expected: 4 },
        { args: [[30, 11, 23, 4, 20], 5], expected: 30 },
        { args: [[30, 11, 23, 4, 20], 6], expected: 23 },
        { args: [[1], 1], expected: 1, hidden: true },
        { args: [[1000000000], 2], expected: 500000000, hidden: true },
        { args: [[312884470], 312884469], expected: 2, hidden: true },
      ],
      hint: "Busca binária no ESPAÇO DE RESPOSTAS: a velocidade k vai de 1 a max(piles). Para um k candidato, dá para checar em O(n) se Koko termina em h horas (some teto(pilha/k)). Quanto maior k, menos horas — então busque a menor k que cabe em h. O(n log(max)).",
    },
  ],
};

export function getExam(section: string): ExamProblem[] | undefined {
  return EXAMS[section];
}
