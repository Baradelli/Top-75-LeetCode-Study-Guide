/**
 * Desafios "tente primeiro" embutidos nas aulas via <Challenge id="..." />.
 * A pessoa tenta resolver ANTES da teoria — sente a dificuldade, e aí o
 * ensino encaixa. Diferente da prova final: aqui não há casos ocultos nem
 * nota; há dica e botão "ver solução".
 */
export interface ChallengeTest {
  args: unknown[];
  expected: unknown;
}

export interface Challenge {
  title: string;
  /** Enunciado em markdown simples (negrito e código inline). */
  statement: string;
  functionName: { python: string; javascript: string };
  starter: { python: string; javascript: string };
  tests: ChallengeTest[];
  hint: string;
  /** Solução de referência, revelada sob demanda. */
  solution: { python: string; javascript: string };
  /** Uma frase com a ideia central da solução. */
  solutionIdea: string;
}

export const CHALLENGES: Record<string, Challenge> = {
  "two-sum": {
    title: "Two Sum",
    statement: `Dado um array \`nums\` e um número \`target\`, retorne os **índices** de dois números que somam \`target\`. Existe exatamente uma resposta.

Exemplo: \`nums = [2, 7, 11, 15]\`, \`target = 9\` → \`[0, 1]\` (porque 2 + 7 = 9).`,
    functionName: { python: "two_sum", javascript: "twoSum" },
    starter: {
      python: `def two_sum(nums, target):
    # tente resolver! não tem problema começar pela força bruta.
    pass`,
      javascript: `function twoSum(nums, target) {
  // tente resolver! não tem problema começar pela força bruta.
}`,
    },
    tests: [
      { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { args: [[3, 2, 4], 6], expected: [1, 2] },
      { args: [[3, 3], 6], expected: [0, 1] },
    ],
    hint: "A força bruta testa todos os pares (O(n²)). O que você está fazendo de novo a cada elemento? Procurando um valor... e se você LEMBRASSE os valores que já viu?",
    solution: {
      python: `def two_sum(nums, target):
    seen = {}
    for i in range(len(nums)):
        complement = target - nums[i]
        if complement in seen:
            return [seen[complement], i]
        seen[nums[i]] = i
    return []`,
      javascript: `function twoSum(nums, target) {
  var seen = {};
  for (var i = 0; i < nums.length; i++) {
    var complement = target - nums[i];
    if (seen[complement] !== undefined) {
      return [seen[complement], i];
    }
    seen[nums[i]] = i;
  }
  return [];
}`,
    },
    solutionIdea:
      "Um hash map lembra cada valor visto; a busca pelo complemento vira O(1). Uma passada, O(n).",
  },

  "container-with-most-water": {
    title: "Container With Most Water",
    statement: `Cada posição é uma parede de altura \`heights[i]\`. Escolha **duas** paredes que, com o eixo x, formem o recipiente com mais água. A água é limitada pela parede mais **baixa**: \`área = (j - i) × min(heights[i], heights[j])\`.

Exemplo: \`heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]\` → \`49\`.`,
    functionName: { python: "max_area", javascript: "maxArea" },
    starter: {
      python: `def max_area(heights):
    # tente resolver!
    pass`,
      javascript: `function maxArea(heights) {
  // tente resolver!
}`,
    },
    tests: [
      { args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { args: [[1, 1]], expected: 1 },
      { args: [[4, 3, 2, 1, 4]], expected: 16 },
    ],
    hint: "Testar todos os pares é O(n²). Comece com as paredes mais distantes (as pontas). Se uma parede é a mais baixa, faz sentido mantê-la? Que ponteiro vale a pena mover?",
    solution: {
      python: `def max_area(heights):
    left = 0
    right = len(heights) - 1
    best = 0
    while left < right:
        area = (right - left) * min(heights[left], heights[right])
        best = max(best, area)
        if heights[left] < heights[right]:
            left = left + 1
        else:
            right = right - 1
    return best`,
      javascript: `function maxArea(heights) {
  var left = 0;
  var right = heights.length - 1;
  var best = 0;
  while (left < right) {
    var area = (right - left) * Math.min(heights[left], heights[right]);
    best = Math.max(best, area);
    if (heights[left] < heights[right]) {
      left = left + 1;
    } else {
      right = right - 1;
    }
  }
  return best;
}`,
    },
    solutionIdea:
      "Two pointers das pontas: a cada passo abandone a parede mais baixa (manter ela só piora). O(n), O(1) de espaço.",
  },

  "best-time-stock": {
    title: "Best Time to Buy and Sell Stock",
    statement: `\`prices[i]\` é o preço de uma ação no dia \`i\`. Escolha um dia para **comprar** e um dia **posterior** para **vender**, maximizando o lucro. Se não der lucro, retorne \`0\`.

Exemplo: \`prices = [7, 1, 5, 3, 6, 4]\` → \`5\` (compra a 1, vende a 6).`,
    functionName: { python: "max_profit", javascript: "maxProfit" },
    starter: {
      python: `def max_profit(prices):
    # tente resolver!
    pass`,
      javascript: `function maxProfit(prices) {
  // tente resolver!
}`,
    },
    tests: [
      { args: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { args: [[7, 6, 4, 3, 1]], expected: 0 },
      { args: [[2, 4, 1]], expected: 2 },
    ],
    hint: "Todos os pares (compra, venda) é O(n²). Percorra os dias uma vez: para vender hoje com o maior lucro, qual é a única coisa do passado que você precisa lembrar?",
    solution: {
      python: `def max_profit(prices):
    min_price = prices[0]
    best = 0
    for i in range(1, len(prices)):
        best = max(best, prices[i] - min_price)
        min_price = min(min_price, prices[i])
    return best`,
      javascript: `function maxProfit(prices) {
  var minPrice = prices[0];
  var best = 0;
  for (var i = 1; i < prices.length; i++) {
    best = Math.max(best, prices[i] - minPrice);
    minPrice = Math.min(minPrice, prices[i]);
  }
  return best;
}`,
    },
    solutionIdea:
      "Carregue o menor preço já visto; o lucro de vender hoje é preço − mínimo. Uma passada, O(n), O(1).",
  },

  "product-except-self": {
    title: "Product of Array Except Self",
    statement: `Retorne um array onde \`answer[i]\` é o produto de **todos** os elementos exceto \`nums[i]\`. **Sem usar divisão**, em O(n).

Exemplo: \`nums = [1, 2, 3, 4]\` → \`[24, 12, 8, 6]\`.`,
    functionName: {
      python: "product_except_self",
      javascript: "productExceptSelf",
    },
    starter: {
      python: `def product_except_self(nums):
    # tente resolver! (sem divisão)
    pass`,
      javascript: `function productExceptSelf(nums) {
  // tente resolver! (sem divisão)
}`,
    },
    tests: [
      { args: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { args: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
    ],
    hint: "Dividir o produto total não vale (e quebra com zeros). 'Tudo exceto i' = (tudo à esquerda de i) × (tudo à direita de i). Dá para fazer em duas passadas?",
    solution: {
      python: `def product_except_self(nums):
    n = len(nums)
    answer = [1] * n
    prefix = 1
    for i in range(n):
        answer[i] = prefix
        prefix = prefix * nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        answer[i] = answer[i] * suffix
        suffix = suffix * nums[i]
    return answer`,
      javascript: `function productExceptSelf(nums) {
  var n = nums.length;
  var answer = [];
  for (var k = 0; k < n; k++) answer.push(1);
  var prefix = 1;
  for (var i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix = prefix * nums[i];
  }
  var suffix = 1;
  for (var j = n - 1; j >= 0; j--) {
    answer[j] = answer[j] * suffix;
    suffix = suffix * nums[j];
  }
  return answer;
}`,
    },
    solutionIdea:
      "Prefix (produto à esquerda) numa passada, suffix (à direita) na volta. O(n) tempo, O(1) de espaço extra.",
  },

  kadane: {
    title: "Maximum Subarray",
    statement: `Encontre o **subarray contíguo** (pelo menos um elemento) de **maior soma** e retorne essa soma. O array pode ter números negativos.

Exemplo: \`nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\` → \`6\` (o subarray \`[4, -1, 2, 1]\`).`,
    functionName: { python: "max_subarray", javascript: "maxSubarray" },
    starter: {
      python: `def max_subarray(nums):
    # tente resolver!
    pass`,
      javascript: `function maxSubarray(nums) {
  // tente resolver!
}`,
    },
    tests: [
      { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { args: [[1]], expected: 1 },
      { args: [[5, 4, -1, 7, 8]], expected: 23 },
      { args: [[-3, -1, -2]], expected: -1 },
    ],
    hint: "Testar todos os subarrays é O(n²). Percorra uma vez carregando 'a melhor soma que termina aqui'. Em cada elemento, vale a pena estender o que vinha de trás, ou recomeçar?",
    solution: {
      python: `def max_subarray(nums):
    current = nums[0]
    best = nums[0]
    for i in range(1, len(nums)):
        current = max(nums[i], current + nums[i])
        best = max(best, current)
    return best`,
      javascript: `function maxSubarray(nums) {
  var current = nums[0];
  var best = nums[0];
  for (var i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}`,
    },
    solutionIdea:
      "Kadane: em cada posição, estender (current + nums[i]) ou recomeçar (nums[i]). O(n), O(1).",
  },
};

export function getChallenge(id: string): Challenge | undefined {
  return CHALLENGES[id];
}
