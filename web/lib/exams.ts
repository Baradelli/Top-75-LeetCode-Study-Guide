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
  /** Para problemas de lista ligada: args que são listas + se o retorno é lista. */
  linked?: { listArgs: number[]; listReturn: boolean };
  /** Para problemas de árvore: args que são árvores (ordem de nível) + se o retorno é árvore. */
  tree?: { treeArgs: number[]; treeReturn: boolean };
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

  "linked-list": [
    {
      slug: "remove-duplicates-sorted",
      title: "Remove Duplicates from Sorted List",
      difficulty: "facil",
      leetcodeUrl:
        "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
      statement: `Dada a cabeça de uma lista ligada **ordenada**, remova os nós com valor duplicado, deixando cada valor só uma vez. Retorne a lista.

Exemplo: \`1 → 1 → 2 → 3 → 3\` → \`1 → 2 → 3\`.`,
      functionName: {
        python: "delete_duplicates",
        javascript: "deleteDuplicates",
      },
      starter: {
        python: `def delete_duplicates(head):
    # escreva sua solução aqui
    pass`,
        javascript: `function deleteDuplicates(head) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[1, 1, 2]], expected: [1, 2] },
        { args: [[1, 1, 2, 3, 3]], expected: [1, 2, 3] },
        { args: [[]], expected: [] },
        { args: [[1, 1, 1]], expected: [1], hidden: true },
        { args: [[1, 2, 3]], expected: [1, 2, 3], hidden: true },
      ],
      hint: "Como a lista é ordenada, duplicatas são vizinhas. Percorra com um ponteiro: se o nó atual tem o mesmo valor do próximo, pule o próximo (cur.next = cur.next.next); senão, avance. O(n), O(1).",
      linked: { listArgs: [0], listReturn: true },
    },
    {
      slug: "odd-even-list",
      title: "Odd Even Linked List",
      difficulty: "medio",
      leetcodeUrl: "https://leetcode.com/problems/odd-even-linked-list/",
      statement: `Reagrupe a lista para que todos os nós em posição **ímpar** (1ª, 3ª, 5ª...) venham primeiro, seguidos dos em posição **par** — mantendo a ordem relativa de cada grupo. Faça em O(1) de espaço. Retorne a lista.

Exemplo: \`1 → 2 → 3 → 4 → 5\` → \`1 → 3 → 5 → 2 → 4\`.`,
      functionName: { python: "odd_even_list", javascript: "oddEvenList" },
      starter: {
        python: `def odd_even_list(head):
    # escreva sua solução aqui
    pass`,
        javascript: `function oddEvenList(head) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[1, 2, 3, 4, 5]], expected: [1, 3, 5, 2, 4] },
        { args: [[2, 1, 3, 5, 6, 4, 7]], expected: [2, 3, 6, 7, 1, 5, 4] },
        { args: [[]], expected: [] },
        { args: [[1]], expected: [1], hidden: true },
        { args: [[1, 2]], expected: [1, 2], hidden: true },
      ],
      hint: "Mantenha dois 'fios': um costurando os nós ímpares (odd) e outro os pares (even), preservando a cabeça do fio par (even_head). Avance cada um pulando de dois em dois. No fim, ligue a cauda dos ímpares à cabeça dos pares.",
      linked: { listArgs: [0], listReturn: true },
    },
    {
      slug: "reverse-k-group",
      title: "Reverse Nodes in k-Group",
      difficulty: "dificil",
      leetcodeUrl:
        "https://leetcode.com/problems/reverse-nodes-in-k-group/",
      statement: `Inverta os nós da lista em **grupos de k**. Se o último grupo tiver menos de k nós, deixe-o como está. Retorne a lista.

Exemplo: \`1 → 2 → 3 → 4 → 5\`, \`k = 2\` → \`2 → 1 → 4 → 3 → 5\`. Com \`k = 3\` → \`3 → 2 → 1 → 4 → 5\`.`,
      functionName: { python: "reverse_k_group", javascript: "reverseKGroup" },
      starter: {
        python: `def reverse_k_group(head, k):
    # escreva sua solução aqui
    pass`,
        javascript: `function reverseKGroup(head, k) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[1, 2, 3, 4, 5], 2], expected: [2, 1, 4, 3, 5] },
        { args: [[1, 2, 3, 4, 5], 3], expected: [3, 2, 1, 4, 5] },
        { args: [[1, 2, 3, 4, 5], 1], expected: [1, 2, 3, 4, 5] },
        { args: [[1], 1], expected: [1], hidden: true },
        { args: [[1, 2, 3, 4], 2], expected: [2, 1, 4, 3], hidden: true },
        {
          args: [[1, 2, 3, 4, 5, 6, 7, 8], 3],
          expected: [3, 2, 1, 6, 5, 4, 7, 8],
          hidden: true,
        },
      ],
      hint: "Combine a reversão in-place com a verificação de grupo: primeiro confira se há k nós à frente (senão, pare e deixe como está). Reverta os k nós e conecte recursivamente ao resultado do resto da lista. A reversão de cada nó é a mesma da aula de reversão.",
      linked: { listArgs: [0], listReturn: true },
    },
  ],

  matrix: [
    {
      slug: "flood-fill",
      title: "Flood Fill",
      difficulty: "facil",
      leetcodeUrl: "https://leetcode.com/problems/flood-fill/",
      statement: `Dada uma imagem (grid de inteiros), uma posição inicial \`(sr, sc)\` e uma \`cor\` nova, pinte a região conectada à célula inicial (mesma cor original, vizinhança horizontal/vertical) com a cor nova. Retorne a imagem.

Exemplo: \`[[1,1,1],[1,1,0],[1,0,1]]\`, \`sr=1, sc=1, cor=2\` → \`[[2,2,2],[2,2,0],[2,0,1]]\`.`,
      functionName: { python: "flood_fill", javascript: "floodFill" },
      starter: {
        python: `def flood_fill(image, sr, sc, cor):
    # escreva sua solução aqui
    pass`,
        javascript: `function floodFill(image, sr, sc, cor) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2], expected: [[2, 2, 2], [2, 2, 0], [2, 0, 1]] },
        { args: [[[0, 0, 0], [0, 0, 0]], 0, 0, 5], expected: [[5, 5, 5], [5, 5, 5]] },
        { args: [[[1, 2], [3, 4]], 0, 0, 9], expected: [[9, 2], [3, 4]], hidden: true },
        { args: [[[0, 0, 0], [0, 1, 1]], 1, 1, 1], expected: [[0, 0, 0], [0, 1, 1]], hidden: true },
      ],
      hint: "É o flood fill (DFS/BFS) clássico: guarde a cor original da célula inicial; a partir dela, visite vizinhos que têm essa cor original e pinte-os com a nova. Cuidado com o caso em que a cor nova é igual à original (evite loop infinito retornando logo).",
    },
    {
      slug: "spiral-matrix-ii",
      title: "Spiral Matrix II",
      difficulty: "medio",
      leetcodeUrl: "https://leetcode.com/problems/spiral-matrix-ii/",
      statement: `Dado um inteiro \`n\`, gere uma matriz \`n × n\` preenchida com os números de \`1\` a \`n²\` em ordem **espiral** (horário, a partir do canto superior esquerdo).

Exemplo: \`n = 3\` → \`[[1,2,3],[8,9,4],[7,6,5]]\`.`,
      functionName: { python: "generate_matrix", javascript: "generateMatrix" },
      starter: {
        python: `def generate_matrix(n):
    # escreva sua solução aqui
    pass`,
        javascript: `function generateMatrix(n) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [3], expected: [[1, 2, 3], [8, 9, 4], [7, 6, 5]] },
        { args: [1], expected: [[1]] },
        { args: [2], expected: [[1, 2], [4, 3]], hidden: true },
        {
          args: [4],
          expected: [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]],
          hidden: true,
        },
      ],
      hint: "Mesma ideia do Spiral Matrix, mas ESCREVENDO em vez de ler: mantenha os quatro limites (top/bottom/left/right) e um contador que começa em 1. Preencha cada borda na ordem espiral, incrementando o contador, e encolha os limites.",
    },
    {
      slug: "surrounded-regions",
      title: "Surrounded Regions",
      difficulty: "dificil",
      leetcodeUrl: "https://leetcode.com/problems/surrounded-regions/",
      statement: `Num grid de \`"X"\` e \`"O"\`, capture todas as regiões de \`"O"\` que estão **totalmente cercadas** por \`"X"\` (trocando esses \`"O"\` por \`"X"\`). Um \`"O"\` **não** é capturado se estiver conectado a um \`"O"\` na **borda** do grid. Retorne o grid.

Exemplo: a região central de \`"O"\` cercada vira \`"X"\`; os \`"O"\` que tocam a borda permanecem.`,
      functionName: { python: "solve", javascript: "solve" },
      starter: {
        python: `def solve(board):
    # capture as regiões cercadas; retorne o board
    pass`,
        javascript: `function solve(board) {
  // capture as regiões cercadas; retorne o board
}`,
      },
      tests: [
        {
          args: [[["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]]],
          expected: [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]],
        },
        { args: [[["X"]]], expected: [["X"]] },
        {
          args: [[["O", "O"], ["O", "O"]]],
          expected: [["O", "O"], ["O", "O"]],
          hidden: true,
        },
        {
          args: [[["X", "O", "X"], ["O", "X", "O"], ["X", "O", "X"]]],
          expected: [["X", "O", "X"], ["O", "X", "O"], ["X", "O", "X"]],
          hidden: true,
        },
      ],
      hint: "Inverta o problema: em vez de achar os 'O' cercados, ache os que NÃO são. Faça DFS a partir de cada 'O' da BORDA, marcando todos os conectados como seguros. No fim, todo 'O' não-marcado vira 'X' (estava cercado) e os marcados voltam a ser 'O'.",
    },
  ],

  tree: [
    {
      slug: "symmetric-tree",
      title: "Symmetric Tree",
      difficulty: "facil",
      leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/",
      statement: `Verifique se uma árvore binária é **espelhada em torno do centro** (a subárvore esquerda é o espelho da direita).

Exemplo: \`[1,2,2,3,4,4,3]\` → \`true\`. \`[1,2,2,null,3,null,3]\` → \`false\`.`,
      functionName: { python: "is_symmetric", javascript: "isSymmetric" },
      starter: {
        python: `def is_symmetric(root):
    # escreva sua solução aqui
    pass`,
        javascript: `function isSymmetric(root) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[1, 2, 2, 3, 4, 4, 3]], expected: true },
        { args: [[1, 2, 2, null, 3, null, 3]], expected: false },
        { args: [[]], expected: true },
        { args: [[1]], expected: true, hidden: true },
        { args: [[1, 2, 2, 2, null, 2]], expected: false, hidden: true },
      ],
      hint: "Compare DUAS subárvores ao mesmo tempo, espelhadas: uma função mirror(a, b) que checa a.val == b.val e, recursivamente, mirror(a.left, b.right) e mirror(a.right, b.left). Comece com mirror(root, root).",
      tree: { treeArgs: [0], treeReturn: false },
    },
    {
      slug: "right-side-view",
      title: "Binary Tree Right Side View",
      difficulty: "medio",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/",
      statement: `Imagine-se olhando a árvore **pelo lado direito**. Retorne os valores dos nós que você consegue ver, de cima para baixo (o nó mais à direita de cada nível).

Exemplo: \`[1,2,3,null,5,null,4]\` → \`[1,3,4]\`.`,
      functionName: { python: "right_side_view", javascript: "rightSideView" },
      starter: {
        python: `def right_side_view(root):
    # escreva sua solução aqui
    pass`,
        javascript: `function rightSideView(root) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[1, 2, 3, null, 5, null, 4]], expected: [1, 3, 4] },
        { args: [[1, null, 3]], expected: [1, 3] },
        { args: [[]], expected: [] },
        { args: [[1, 2, 3, 4]], expected: [1, 3, 4], hidden: true },
        { args: [[1, 2]], expected: [1, 2], hidden: true },
      ],
      hint: "É um BFS por níveis (como o level order): para cada nível, o ÚLTIMO nó processado é o que se vê pela direita. Guarde-o. (Alternativa: DFS visitando a direita primeiro e pegando o primeiro nó de cada profundidade nova.)",
      tree: { treeArgs: [0], treeReturn: false },
    },
    {
      slug: "max-path-sum",
      title: "Binary Tree Maximum Path Sum",
      difficulty: "dificil",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
      statement: `Um **caminho** é qualquer sequência de nós conectados por arestas (não precisa passar pela raiz nem chegar a uma folha; vira no máximo um nó). Retorne a **maior soma** de valores ao longo de algum caminho. Os valores podem ser negativos.

Exemplo: \`[-10,9,20,null,null,15,7]\` → \`42\` (o caminho 15 → 20 → 7). \`[1,2,3]\` → \`6\`.`,
      functionName: { python: "max_path_sum", javascript: "maxPathSum" },
      starter: {
        python: `def max_path_sum(root):
    # escreva sua solução aqui
    pass`,
        javascript: `function maxPathSum(root) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[-10, 9, 20, null, null, 15, 7]], expected: 42 },
        { args: [[1, 2, 3]], expected: 6 },
        { args: [[-3]], expected: -3 },
        { args: [[2, -1]], expected: 2, hidden: true },
        { args: [[-2, -1]], expected: -1, hidden: true },
        { args: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]], expected: 48, hidden: true },
      ],
      hint: "DFS que retorna o 'ganho' máximo descendo por UM lado (val + max(ganho esq, ganho dir, 0)). Mas o melhor caminho pode VIRAR num nó usando os dois lados: a cada nó, atualize a resposta global com val + ganho_esq + ganho_dir. Use max(ganho, 0) para descartar lados negativos.",
      tree: { treeArgs: [0], treeReturn: false },
    },
  ],

  interval: [
    {
      slug: "summary-ranges",
      title: "Summary Ranges",
      difficulty: "facil",
      leetcodeUrl: "https://leetcode.com/problems/summary-ranges/",
      statement: `Dado um array \`nums\` **ordenado** de inteiros únicos, retorne a lista dos **intervalos** que cobrem exatamente os números, como strings. Um número solto vira \`"a"\`; uma sequência consecutiva vira \`"a->b"\`.

Exemplo: \`[0,1,2,4,5,7]\` → \`["0->2","4->5","7"]\`.`,
      functionName: { python: "summary_ranges", javascript: "summaryRanges" },
      starter: {
        python: `def summary_ranges(nums):
    # escreva sua solução aqui
    pass`,
        javascript: `function summaryRanges(nums) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[0, 1, 2, 4, 5, 7]], expected: ["0->2", "4->5", "7"] },
        { args: [[0, 2, 3, 4, 6, 8, 9]], expected: ["0", "2->4", "6", "8->9"] },
        { args: [[]], expected: [] },
        { args: [[-1]], expected: ["-1"], hidden: true },
        { args: [[0, 1, 2, 3, 4]], expected: ["0->4"], hidden: true },
      ],
      hint: "Percorra o array agrupando sequências consecutivas: marque o início de cada grupo e avance enquanto o próximo for o anterior + 1. Ao fechar o grupo, formate como 'a' (se sozinho) ou 'a->b'.",
    },
    {
      slug: "interval-intersections",
      title: "Interval List Intersections",
      difficulty: "medio",
      leetcodeUrl: "https://leetcode.com/problems/interval-list-intersections/",
      statement: `Dadas duas listas de intervalos \`A\` e \`B\`, **cada uma ordenada e sem sobreposições internas**, retorne a lista das **interseções** entre elas (também ordenada).

Exemplo: \`A = [[0,2],[5,10],[13,23],[24,25]]\`, \`B = [[1,5],[8,12],[15,24],[25,26]]\` → \`[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]\`.`,
      functionName: {
        python: "interval_intersection",
        javascript: "intervalIntersection",
      },
      starter: {
        python: `def interval_intersection(A, B):
    # escreva sua solução aqui
    pass`,
        javascript: `function intervalIntersection(A, B) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        {
          args: [[[0, 2], [5, 10], [13, 23], [24, 25]], [[1, 5], [8, 12], [15, 24], [25, 26]]],
          expected: [[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]],
        },
        { args: [[], [[1, 2]]], expected: [] },
        { args: [[[1, 3], [5, 9]], []], expected: [] },
        { args: [[[1, 7]], [[3, 10]]], expected: [[3, 7]], hidden: true },
      ],
      hint: "Dois ponteiros, um em cada lista. A interseção do par atual é [max(dos inícios), min(dos fins)] — só existe se max_início ≤ min_fim. Depois, avance o ponteiro do intervalo que TERMINA primeiro (ele não pode intersectar mais nada à frente).",
    },
    {
      slug: "car-pooling",
      title: "Car Pooling",
      difficulty: "dificil",
      leetcodeUrl: "https://leetcode.com/problems/car-pooling/",
      statement: `Um carro com \`capacidade\` lugares faz uma rota só para a frente. Cada viagem é \`[passageiros, de, até]\` (embarcam em \`de\`, descem em \`até\`). Retorne \`true\` se for possível fazer todas as viagens sem nunca exceder a capacidade.

Exemplo: \`trips = [[2,1,5],[3,3,7]]\`, \`capacidade = 4\` → \`false\` (em [3,5] há 5 passageiros); com \`capacidade = 5\` → \`true\`.`,
      functionName: { python: "car_pooling", javascript: "carPooling" },
      starter: {
        python: `def car_pooling(trips, capacidade):
    # escreva sua solução aqui
    pass`,
        javascript: `function carPooling(trips, capacidade) {
  // escreva sua solução aqui
}`,
      },
      tests: [
        { args: [[[2, 1, 5], [3, 3, 7]], 4], expected: false },
        { args: [[[2, 1, 5], [3, 3, 7]], 5], expected: true },
        { args: [[[2, 1, 5], [3, 5, 7]], 3], expected: true },
        { args: [[[3, 2, 7], [3, 7, 9], [8, 3, 9]], 11], expected: true, hidden: true },
        { args: [[[9, 0, 1], [3, 3, 7]], 4], expected: false, hidden: true },
      ],
      hint: "Varredura de eventos (como as salas de reunião): cada viagem gera um evento de +passageiros em 'de' e -passageiros em 'até'. Ordene os eventos por posição, faça a soma corrente e verifique se em algum ponto ela ultrapassa a capacidade.",
    },
  ],
};

export function getExam(section: string): ExamProblem[] | undefined {
  return EXAMS[section];
}
