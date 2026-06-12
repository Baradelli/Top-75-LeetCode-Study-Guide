/**
 * Registry de demonstrações trace & replay usadas nas aulas via
 * <TraceDemo id="..." />. Cada demo define o código nas duas linguagens e a
 * configuração da visualização — de array (`array`) ou de string (`string`).
 *
 * O código JS é ES5 (limitação atual do interpretador de trace).
 */
export interface ArrayVisualConfig {
  /** Variável que contém o array principal. */
  arrayVar: string;
  /** Variáveis que são índices no array principal (ponteiros). */
  pointerVars?: string[];
  /** Sombrear o intervalo ativo [left..right] (ex.: busca binária). */
  window?: { left: string; right: string };
  /** Variável de dicionário/hash map para exibir como chips. */
  mapVar?: string;
  /** Rótulo do hash map (ex.: "valor → índice"). */
  mapLabel?: string;
  /** Variáveis escalares em destaque acima do array. */
  scalarVars?: string[];
  /** Arrays secundários exibidos abaixo do principal (ex.: answer). */
  extraArrayVars?: string[];
  /** true = renderizar o array principal como barras de altura. */
  bars?: boolean;
}

export interface BitVisualConfig {
  /** Variáveis numéricas a exibir em binário. */
  numberVars: string[];
  /** Largura em bits (default 8). */
  bitWidth?: number;
  /** Variáveis escalares em destaque. */
  scalarVars?: string[];
}

export interface LinkedVisualConfig {
  /** Array com os valores dos nós, na ordem de armazenamento. */
  valuesVar: string;
  /** Array de índices "próximo" (next); -1 representa null/None. */
  nextVar: string;
  /** Variáveis que são índices de nó (ponteiros: head, prev, curr...). */
  pointerVars?: string[];
  /** Variáveis escalares em destaque. */
  scalarVars?: string[];
}

export interface TreeVisualConfig {
  /** Array com os valores dos nós (índice = id do nó). */
  valuesVar: string;
  /** Array de índices do filho esquerdo (-1 = nenhum). */
  leftVar: string;
  /** Array de índices do filho direito (-1 = nenhum). */
  rightVar: string;
  /** Índice do nó raiz (default 0). */
  rootIndex?: number;
  /** Variável que é o índice do nó atual (cursor). */
  cursorVar?: string;
  /** Array 0/1 por nó: visitados (sombreados). */
  visitedVar?: string;
  /** Variáveis escalares em destaque. */
  scalarVars?: string[];
}

export interface IntervalVisualConfig {
  /** Array de intervalos [início, fim]. */
  intervalsVar: string;
  /** Índice do intervalo atual (cursor). */
  cursorVar?: string;
  /** Array de intervalos resultado (desenhado abaixo). */
  resultVar?: string;
  /** Variáveis escalares em destaque (ex.: novo intervalo). */
  scalarVars?: string[];
}

export interface HeapVisualConfig {
  /** Array que armazena o heap (desenhado como árvore binária completa). */
  heapVar: string;
  /** Índice do nó atual sendo ajustado (sift-up/down). */
  cursorVar?: string;
  /** Variáveis escalares em destaque. */
  scalarVars?: string[];
}

export interface GraphVisualConfig {
  /** Lista de adjacência: adj[i] é o array de vizinhos do nó i. */
  adjVar: string;
  /** Rótulos opcionais dos nós (array); por padrão usa o índice. */
  labelsVar?: string;
  /** Índice do nó atual (cursor). */
  cursorVar?: string;
  /** Array 0/1 por nó: visitados. */
  visitedVar?: string;
  /** true = grafo dirigido (desenha setas). */
  directed?: boolean;
  /** Variáveis escalares em destaque. */
  scalarVars?: string[];
}

export interface GridVisualConfig {
  /** Matriz 2D principal (números ou letras). */
  gridVar: string;
  /** Célula atual destacada (variáveis de linha e coluna). */
  cursor?: { row: string; col: string };
  /** Matriz 2D booleana: células visitadas (sombreadas). */
  visitedVar?: string;
  /** Matriz 2D booleana: caminho atual (backtracking) — destaque forte. */
  pathVar?: string;
  /** Camada ativa (espiral): variáveis dos limites. */
  bounds?: { top: string; bottom: string; left: string; right: string };
  /** Variáveis escalares em destaque. */
  scalarVars?: string[];
}

export interface StringVisualConfig {
  /** Variável que contém a string principal. */
  stringVar: string;
  /** Variáveis que são índices na string (ponteiros coloridos). */
  pointerVars?: string[];
  /** Sombrear o intervalo [left..right] como uma janela. */
  window?: { left: string; right: string };
  /** Variável de dicionário/contagem para exibir como chips. */
  mapVar?: string;
  mapLabel?: string;
  /** Variáveis escalares em destaque. */
  scalarVars?: string[];
  /** Variável que é uma pilha (lista/array de chars) renderizada à parte. */
  stackVar?: string;
}

export type DemoDefinition =
  | { python: string; javascript: string; array: ArrayVisualConfig }
  | { python: string; javascript: string; string: StringVisualConfig }
  | { python: string; javascript: string; bit: BitVisualConfig }
  | { python: string; javascript: string; linked: LinkedVisualConfig }
  | { python: string; javascript: string; grid: GridVisualConfig }
  | { python: string; javascript: string; tree: TreeVisualConfig }
  | { python: string; javascript: string; interval: IntervalVisualConfig }
  | { python: string; javascript: string; heap: HeapVisualConfig }
  | { python: string; javascript: string; graph: GraphVisualConfig };

export const DEMOS: Record<string, DemoDefinition> = {
  // ---------------------------------------------------------------- ARRAY ---
  "two-sum": {
    python: `def two_sum(nums, target):
    seen = {}
    for i in range(len(nums)):
        complement = target - nums[i]
        if complement in seen:
            return [seen[complement], i]
        seen[nums[i]] = i
    return []

resultado = two_sum([2, 7, 11, 15], 9)
print(resultado)`,
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
}

var resultado = twoSum([2, 7, 11, 15], 9);
console.log(resultado);`,
    array: {
      arrayVar: "nums",
      pointerVars: ["i"],
      mapVar: "seen",
      mapLabel: "valor → índice",
      scalarVars: ["target", "complement"],
    },
  },

  "container-with-most-water": {
    python: `def max_area(heights):
    left = 0
    right = len(heights) - 1
    best = 0
    while left < right:
        width = right - left
        h = min(heights[left], heights[right])
        area = width * h
        best = max(best, area)
        if heights[left] < heights[right]:
            left = left + 1
        else:
            right = right - 1
    return best

resultado = max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])
print(resultado)`,
    javascript: `function maxArea(heights) {
  var left = 0;
  var right = heights.length - 1;
  var best = 0;
  while (left < right) {
    var width = right - left;
    var h = Math.min(heights[left], heights[right]);
    var area = width * h;
    best = Math.max(best, area);
    if (heights[left] < heights[right]) {
      left = left + 1;
    } else {
      right = right - 1;
    }
  }
  return best;
}

var resultado = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);
console.log(resultado);`,
    array: {
      arrayVar: "heights",
      pointerVars: ["left", "right"],
      scalarVars: ["area", "best"],
      bars: true,
    },
  },

  "best-time-stock": {
    python: `def max_profit(prices):
    min_price = prices[0]
    best = 0
    for i in range(1, len(prices)):
        profit = prices[i] - min_price
        best = max(best, profit)
        min_price = min(min_price, prices[i])
    return best

resultado = max_profit([7, 1, 5, 3, 6, 4])
print(resultado)`,
    javascript: `function maxProfit(prices) {
  var minPrice = prices[0];
  var best = 0;
  for (var i = 1; i < prices.length; i++) {
    var profit = prices[i] - minPrice;
    best = Math.max(best, profit);
    minPrice = Math.min(minPrice, prices[i]);
  }
  return best;
}

var resultado = maxProfit([7, 1, 5, 3, 6, 4]);
console.log(resultado);`,
    array: {
      arrayVar: "prices",
      pointerVars: ["i"],
      scalarVars: ["min_price", "minPrice", "profit", "best"],
      bars: true,
    },
  },

  "product-except-self": {
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
    return answer

resultado = product_except_self([1, 2, 3, 4])
print(resultado)`,
    javascript: `function productExceptSelf(nums) {
  var n = nums.length;
  var answer = [];
  for (var k = 0; k < n; k++) {
    answer.push(1);
  }
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
}

var resultado = productExceptSelf([1, 2, 3, 4]);
console.log(resultado);`,
    array: {
      arrayVar: "nums",
      pointerVars: ["i", "j"],
      scalarVars: ["prefix", "suffix"],
      extraArrayVars: ["answer"],
    },
  },

  kadane: {
    python: `def max_subarray(nums):
    current = nums[0]
    best = nums[0]
    for i in range(1, len(nums)):
        current = max(nums[i], current + nums[i])
        best = max(best, current)
    return best

resultado = max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])
print(resultado)`,
    javascript: `function maxSubarray(nums) {
  var current = nums[0];
  var best = nums[0];
  for (var i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}

var resultado = maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(resultado);`,
    array: {
      arrayVar: "nums",
      pointerVars: ["i"],
      scalarVars: ["current", "best"],
    },
  },

  // --------------------------------------------------------------- STRING ---
  "longest-substring": {
    python: `def longest_unique(s):
    seen = {}
    left = 0
    best = 0
    for right in range(len(s)):
        while s[right] in seen:
            del seen[s[left]]
            left = left + 1
        seen[s[right]] = right
        best = max(best, right - left + 1)
    return best

resultado = longest_unique("abcabcbb")
print(resultado)`,
    javascript: `function longestUnique(s) {
  var seen = {};
  var left = 0;
  var best = 0;
  for (var right = 0; right < s.length; right++) {
    while (seen[s[right]] !== undefined) {
      delete seen[s[left]];
      left = left + 1;
    }
    seen[s[right]] = right;
    best = Math.max(best, right - left + 1);
  }
  return best;
}

var resultado = longestUnique("abcabcbb");
console.log(resultado);`,
    string: {
      stringVar: "s",
      pointerVars: ["left", "right"],
      window: { left: "left", right: "right" },
      mapVar: "seen",
      mapLabel: "char → último índice",
      scalarVars: ["best"],
    },
  },

  "valid-palindrome": {
    python: `def is_palindrome(s):
    left = 0
    right = len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left = left + 1
        right = right - 1
    return True

resultado = is_palindrome("racecar")
print(resultado)`,
    javascript: `function isPalindrome(s) {
  var left = 0;
  var right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left = left + 1;
    right = right - 1;
  }
  return true;
}

var resultado = isPalindrome("racecar");
console.log(resultado);`,
    string: {
      stringVar: "s",
      pointerVars: ["left", "right"],
    },
  },

  "palindromic-substrings": {
    python: `def count_palindromes(s):
    total = 0
    for center in range(len(s)):
        # palindromo de comprimento impar (centro num char)
        left = center
        right = center
        while left >= 0 and right < len(s) and s[left] == s[right]:
            total = total + 1
            left = left - 1
            right = right + 1
        # palindromo de comprimento par (centro entre dois chars)
        left = center
        right = center + 1
        while left >= 0 and right < len(s) and s[left] == s[right]:
            total = total + 1
            left = left - 1
            right = right + 1
    return total

resultado = count_palindromes("aaa")
print(resultado)`,
    javascript: `function countPalindromes(s) {
  var total = 0;
  for (var center = 0; center < s.length; center++) {
    // palindromo de comprimento impar (centro num char)
    var left = center;
    var right = center;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      total = total + 1;
      left = left - 1;
      right = right + 1;
    }
    // palindromo de comprimento par (centro entre dois chars)
    left = center;
    right = center + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      total = total + 1;
      left = left - 1;
      right = right + 1;
    }
  }
  return total;
}

var resultado = countPalindromes("aaa");
console.log(resultado);`,
    string: {
      stringVar: "s",
      pointerVars: ["left", "right"],
      scalarVars: ["center", "total"],
    },
  },

  "valid-parentheses": {
    python: `def is_valid(s):
    pares = {")": "(", "]": "[", "}": "{"}
    pilha = []
    for i in range(len(s)):
        c = s[i]
        if c in pares:
            topo = pilha.pop() if pilha else "#"
            if topo != pares[c]:
                return False
        else:
            pilha.append(c)
    return len(pilha) == 0

resultado = is_valid("([]{})")
print(resultado)`,
    javascript: `function isValid(s) {
  var pares = { ")": "(", "]": "[", "}": "{" };
  var pilha = [];
  for (var i = 0; i < s.length; i++) {
    var c = s[i];
    if (pares[c] !== undefined) {
      var topo = pilha.length > 0 ? pilha.pop() : "#";
      if (topo !== pares[c]) {
        return false;
      }
    } else {
      pilha.push(c);
    }
  }
  return pilha.length === 0;
}

var resultado = isValid("([]{})");
console.log(resultado);`,
    string: {
      stringVar: "s",
      pointerVars: ["i"],
      scalarVars: ["c"],
      stackVar: "pilha",
    },
  },

  // --------------------------------------------------------------- BINARY ---
  "binary-search": {
    python: `def binary_search(nums, target):
    left = 0
    right = len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

resultado = binary_search([1, 3, 5, 7, 9, 11, 13], 11)
print(resultado)`,
    javascript: `function binarySearch(nums, target) {
  var left = 0;
  var right = nums.length - 1;
  while (left <= right) {
    var mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

var resultado = binarySearch([1, 3, 5, 7, 9, 11, 13], 11);
console.log(resultado);`,
    array: {
      arrayVar: "nums",
      pointerVars: ["left", "right", "mid"],
      window: { left: "left", right: "right" },
      scalarVars: ["target", "mid"],
    },
  },

  "search-rotated": {
    python: `def search(nums, target):
    left = 0
    right = len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:        # metade esquerda ordenada
            if nums[left] <= target and target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:                              # metade direita ordenada
            if nums[mid] < target and target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1

resultado = search([4, 5, 6, 7, 0, 1, 2], 0)
print(resultado)`,
    javascript: `function search(nums, target) {
  var left = 0;
  var right = nums.length - 1;
  while (left <= right) {
    var mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[left] <= nums[mid]) {         // metade esquerda ordenada
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {                               // metade direita ordenada
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

var resultado = search([4, 5, 6, 7, 0, 1, 2], 0);
console.log(resultado);`,
    array: {
      arrayVar: "nums",
      pointerVars: ["left", "right", "mid"],
      window: { left: "left", right: "right" },
      scalarVars: ["target", "mid"],
    },
  },

  "hamming-weight": {
    python: `def count_ones(n):
    count = 0
    while n != 0:
        n = n & (n - 1)   # apaga o bit 1 mais à direita
        count = count + 1
    return count

resultado = count_ones(156)   # 10011100 -> 4 bits ligados
print(resultado)`,
    javascript: `function countOnes(n) {
  var count = 0;
  while (n !== 0) {
    n = n & (n - 1); // apaga o bit 1 mais à direita
    count = count + 1;
  }
  return count;
}

var resultado = countOnes(156); // 10011100 -> 4 bits ligados
console.log(resultado);`,
    bit: {
      numberVars: ["n"],
      bitWidth: 8,
      scalarVars: ["count"],
    },
  },

  "missing-number": {
    python: `def missing_number(nums):
    res = len(nums)
    for i in range(len(nums)):
        res = res ^ i ^ nums[i]   # cada par índice/valor se cancela
    return res

resultado = missing_number([3, 0, 1])   # falta o 2
print(resultado)`,
    javascript: `function missingNumber(nums) {
  var res = nums.length;
  for (var i = 0; i < nums.length; i++) {
    res = res ^ i ^ nums[i]; // cada par índice/valor se cancela
  }
  return res;
}

var resultado = missingNumber([3, 0, 1]); // falta o 2
console.log(resultado);`,
    bit: {
      numberVars: ["res"],
      bitWidth: 8,
      scalarVars: ["i"],
    },
  },

  // ----------------------------------------------------------- LINKED LIST ---
  // Representamos a lista por dois arrays: `valores[i]` é o valor do nó i, e
  // `prox[i]` é o índice do próximo nó (-1 = None). Assim o motor consegue
  // serializar a lista a cada passo. No editor das aulas usamos ListNode real.
  "reverse-list": {
    python: `valores = [1, 2, 3, 4, 5]
prox = [1, 2, 3, 4, -1]   # prox[i] = índice do próximo nó (-1 = None)

prev = -1
curr = 0                   # começa na cabeça (índice 0)
while curr != -1:
    seguinte = prox[curr]  # 1) guarda o próximo
    prox[curr] = prev      # 2) inverte o ponteiro deste nó
    prev = curr            # 3) avança prev
    curr = seguinte        # 4) avança curr
# prev é a nova cabeça
print(valores[prev])`,
    javascript: `var valores = [1, 2, 3, 4, 5];
var prox = [1, 2, 3, 4, -1]; // prox[i] = índice do próximo nó (-1 = None)

var prev = -1;
var curr = 0;                // começa na cabeça (índice 0)
while (curr !== -1) {
  var seguinte = prox[curr]; // 1) guarda o próximo
  prox[curr] = prev;         // 2) inverte o ponteiro deste nó
  prev = curr;               // 3) avança prev
  curr = seguinte;           // 4) avança curr
}
// prev é a nova cabeça
console.log(valores[prev]);`,
    linked: {
      valuesVar: "valores",
      nextVar: "prox",
      pointerVars: ["prev", "curr", "seguinte"],
    },
  },

  "fast-slow-middle": {
    python: `valores = [1, 2, 3, 4, 5, 6]
prox = [1, 2, 3, 4, 5, -1]

slow = 0
fast = 0
# fast anda 2x mais rápido; quando ele chega ao fim, slow está no meio
while fast != -1 and prox[fast] != -1:
    slow = prox[slow]
    fast = prox[prox[fast]]
print(valores[slow])`,
    javascript: `var valores = [1, 2, 3, 4, 5, 6];
var prox = [1, 2, 3, 4, 5, -1];

var slow = 0;
var fast = 0;
// fast anda 2x mais rápido; quando ele chega ao fim, slow está no meio
while (fast !== -1 && prox[fast] !== -1) {
  slow = prox[slow];
  fast = prox[prox[fast]];
}
console.log(valores[slow]);`,
    linked: {
      valuesVar: "valores",
      nextVar: "prox",
      pointerVars: ["slow", "fast"],
    },
  },

  // ----------------------------------------------------------------- GRID ---
  "spiral-matrix": {
    python: `def espiral(matriz):
    top = 0
    bottom = len(matriz) - 1
    left = 0
    right = len(matriz[0]) - 1
    linha = 0
    coluna = 0
    resultado = []
    while top <= bottom and left <= right:
        coluna = left                       # topo: esquerda -> direita
        while coluna <= right:
            linha = top
            resultado.append(matriz[linha][coluna])
            coluna = coluna + 1
        top = top + 1
        linha = top                         # direita: cima -> baixo
        while linha <= bottom:
            coluna = right
            resultado.append(matriz[linha][coluna])
            linha = linha + 1
        right = right - 1
        if top <= bottom:
            coluna = right                  # base: direita -> esquerda
            while coluna >= left:
                linha = bottom
                resultado.append(matriz[linha][coluna])
                coluna = coluna - 1
            bottom = bottom - 1
        if left <= right:
            linha = bottom                  # esquerda: baixo -> cima
            while linha >= top:
                coluna = left
                resultado.append(matriz[linha][coluna])
                linha = linha - 1
            left = left + 1
    return resultado

print(espiral([[1, 2, 3], [8, 9, 4], [7, 6, 5]]))`,
    javascript: `function espiral(matriz) {
  var top = 0;
  var bottom = matriz.length - 1;
  var left = 0;
  var right = matriz[0].length - 1;
  var linha = 0;
  var coluna = 0;
  var resultado = [];
  while (top <= bottom && left <= right) {
    coluna = left;                       // topo: esquerda -> direita
    while (coluna <= right) {
      linha = top;
      resultado.push(matriz[linha][coluna]);
      coluna = coluna + 1;
    }
    top = top + 1;
    linha = top;                         // direita: cima -> baixo
    while (linha <= bottom) {
      coluna = right;
      resultado.push(matriz[linha][coluna]);
      linha = linha + 1;
    }
    right = right - 1;
    if (top <= bottom) {
      coluna = right;                    // base: direita -> esquerda
      while (coluna >= left) {
        linha = bottom;
        resultado.push(matriz[linha][coluna]);
        coluna = coluna - 1;
      }
      bottom = bottom - 1;
    }
    if (left <= right) {
      linha = bottom;                    // esquerda: baixo -> cima
      while (linha >= top) {
        coluna = left;
        resultado.push(matriz[linha][coluna]);
        linha = linha - 1;
      }
      left = left + 1;
    }
  }
  return resultado;
}

console.log(espiral([[1, 2, 3], [8, 9, 4], [7, 6, 5]]));`,
    grid: {
      gridVar: "matriz",
      cursor: { row: "linha", col: "coluna" },
      bounds: { top: "top", bottom: "bottom", left: "left", right: "right" },
    },
  },

  "number-of-islands": {
    python: `def dfs(grid, visitado, r, c):
    if r < 0 or c < 0 or r >= len(grid) or c >= len(grid[0]):
        return
    if visitado[r][c] == 1 or grid[r][c] == 0:
        return
    visitado[r][c] = 1                 # marca a terra como visitada
    dfs(grid, visitado, r + 1, c)      # inunda os 4 vizinhos
    dfs(grid, visitado, r - 1, c)
    dfs(grid, visitado, r, c + 1)
    dfs(grid, visitado, r, c - 1)

def contar_ilhas(grid):
    linhas = len(grid)
    colunas = len(grid[0])
    visitado = [[0] * colunas for _ in range(linhas)]
    ilhas = 0
    for i in range(linhas):
        for j in range(colunas):
            if grid[i][j] == 1 and visitado[i][j] == 0:
                ilhas = ilhas + 1      # nova ilha encontrada
                dfs(grid, visitado, i, j)
    return ilhas

mapa = [[1, 1, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1]]
print(contar_ilhas(mapa))`,
    javascript: `function dfs(grid, visitado, r, c) {
  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) return;
  if (visitado[r][c] === 1 || grid[r][c] === 0) return;
  visitado[r][c] = 1;                  // marca a terra como visitada
  dfs(grid, visitado, r + 1, c);       // inunda os 4 vizinhos
  dfs(grid, visitado, r - 1, c);
  dfs(grid, visitado, r, c + 1);
  dfs(grid, visitado, r, c - 1);
}

function contarIlhas(grid) {
  var linhas = grid.length;
  var colunas = grid[0].length;
  var visitado = [];
  for (var k = 0; k < linhas; k++) {
    var linha = [];
    for (var m = 0; m < colunas; m++) linha.push(0);
    visitado.push(linha);
  }
  var ilhas = 0;
  for (var i = 0; i < linhas; i++) {
    for (var j = 0; j < colunas; j++) {
      if (grid[i][j] === 1 && visitado[i][j] === 0) {
        ilhas = ilhas + 1;             // nova ilha encontrada
        dfs(grid, visitado, i, j);
      }
    }
  }
  return ilhas;
}

var mapa = [[1, 1, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1]];
console.log(contarIlhas(mapa));`,
    grid: {
      gridVar: "grid",
      cursor: { row: "r", col: "c" },
      visitedVar: "visitado",
      scalarVars: ["ilhas"],
    },
  },

  "word-search": {
    python: `def dfs(grid, caminho, palavra, r, c, i):
    if i == len(palavra):
        return True                                   # achou a palavra inteira
    if r < 0 or c < 0 or r >= len(grid) or c >= len(grid[0]):
        return False
    if caminho[r][c] == 1 or grid[r][c] != palavra[i]:
        return False
    caminho[r][c] = 1                                  # entra no caminho
    achou = (dfs(grid, caminho, palavra, r + 1, c, i + 1) or
             dfs(grid, caminho, palavra, r - 1, c, i + 1) or
             dfs(grid, caminho, palavra, r, c + 1, i + 1) or
             dfs(grid, caminho, palavra, r, c - 1, i + 1))
    caminho[r][c] = 0                                  # backtrack: sai do caminho
    return achou

letras = [["A", "B", "C"], ["S", "F", "C"], ["A", "D", "E"]]
caminho = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
print(dfs(letras, caminho, "ABFD", 0, 0, 0))`,
    javascript: `function dfs(grid, caminho, palavra, r, c, i) {
  if (i === palavra.length) return true;              // achou a palavra inteira
  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) return false;
  if (caminho[r][c] === 1 || grid[r][c] !== palavra[i]) return false;
  caminho[r][c] = 1;                                  // entra no caminho
  var achou =
    dfs(grid, caminho, palavra, r + 1, c, i + 1) ||
    dfs(grid, caminho, palavra, r - 1, c, i + 1) ||
    dfs(grid, caminho, palavra, r, c + 1, i + 1) ||
    dfs(grid, caminho, palavra, r, c - 1, i + 1);
  caminho[r][c] = 0;                                  // backtrack: sai do caminho
  return achou;
}

var letras = [["A", "B", "C"], ["S", "F", "C"], ["A", "D", "E"]];
var caminho = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
console.log(dfs(letras, caminho, "ABFD", 0, 0, 0));`,
    grid: {
      gridVar: "grid",
      cursor: { row: "r", col: "c" },
      pathVar: "caminho",
      scalarVars: ["palavra", "i"],
    },
  },

  "bfs-grid": {
    python: `grid = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]]  # 1 = parede
visitado = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
fila = [[0, 0]]      # começa no canto; a fila guarda quem visitar
visitado[0][0] = 1
r = 0
c = 0
direcoes = [[1, 0], [-1, 0], [0, 1], [0, -1]]
while len(fila) > 0:
    atual = fila.pop(0)            # tira o mais antigo (FIFO)
    r = atual[0]
    c = atual[1]
    for d in direcoes:
        nr = r + d[0]
        nc = c + d[1]
        if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]):
            if visitado[nr][nc] == 0 and grid[nr][nc] == 0:
                visitado[nr][nc] = 1   # marca ao ENTRAR na fila
                fila.append([nr, nc])
print("visitou todos os alcançáveis")`,
    javascript: `var grid = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]]; // 1 = parede
var visitado = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
var fila = [[0, 0]];     // começa no canto; a fila guarda quem visitar
visitado[0][0] = 1;
var r = 0;
var c = 0;
var direcoes = [[1, 0], [-1, 0], [0, 1], [0, -1]];
var cabeca = 0;
while (cabeca < fila.length) {
  var atual = fila[cabeca];        // tira o mais antigo (FIFO)
  cabeca = cabeca + 1;
  r = atual[0];
  c = atual[1];
  for (var k = 0; k < direcoes.length; k++) {
    var nr = r + direcoes[k][0];
    var nc = c + direcoes[k][1];
    if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
      if (visitado[nr][nc] === 0 && grid[nr][nc] === 0) {
        visitado[nr][nc] = 1;       // marca ao ENTRAR na fila
        fila.push([nr, nc]);
      }
    }
  }
}
console.log("visitou todos os alcançáveis");`,
    grid: {
      gridVar: "grid",
      cursor: { row: "r", col: "c" },
      visitedVar: "visitado",
    },
  },

  // ----------------------------------------------------------------- TREE ---
  // Árvore representada por três arrays: valores[i], esquerda[i], direita[i]
  // (índice do filho, -1 = None). No editor das aulas usamos TreeNode real.
  "tree-traversal": {
    python: `def dfs(valores, esquerda, direita, visitado, no, resultado):
    if no == -1:
        return
    visitado[no] = 1
    resultado.append(valores[no])              # visita (pré-ordem)
    dfs(valores, esquerda, direita, visitado, esquerda[no], resultado)
    dfs(valores, esquerda, direita, visitado, direita[no], resultado)

valores = [1, 2, 3, 4, 5, 6]
esquerda = [1, 3, -1, -1, -1, -1]
direita = [2, 4, 5, -1, -1, -1]
visitado = [0, 0, 0, 0, 0, 0]
resultado = []
dfs(valores, esquerda, direita, visitado, 0, resultado)
print(resultado)`,
    javascript: `function dfs(valores, esquerda, direita, visitado, no, resultado) {
  if (no === -1) return;
  visitado[no] = 1;
  resultado.push(valores[no]);                 // visita (pré-ordem)
  dfs(valores, esquerda, direita, visitado, esquerda[no], resultado);
  dfs(valores, esquerda, direita, visitado, direita[no], resultado);
}

var valores = [1, 2, 3, 4, 5, 6];
var esquerda = [1, 3, -1, -1, -1, -1];
var direita = [2, 4, 5, -1, -1, -1];
var visitado = [0, 0, 0, 0, 0, 0];
var resultado = [];
dfs(valores, esquerda, direita, visitado, 0, resultado);
console.log(resultado);`,
    tree: {
      valuesVar: "valores",
      leftVar: "esquerda",
      rightVar: "direita",
      cursorVar: "no",
      visitedVar: "visitado",
      scalarVars: ["resultado"],
    },
  },

  "tree-bfs": {
    python: `valores = [1, 2, 3, 4, 5, 6]
esquerda = [1, 3, -1, -1, -1, -1]
direita = [2, 4, 5, -1, -1, -1]
visitado = [0, 0, 0, 0, 0, 0]
fila = [0]            # começa pela raiz; processa nível por nível
cabeca = 0
no = 0
resultado = []
while cabeca < len(fila):
    no = fila[cabeca]
    cabeca = cabeca + 1
    visitado[no] = 1
    resultado.append(valores[no])
    if esquerda[no] != -1:
        fila.append(esquerda[no])
    if direita[no] != -1:
        fila.append(direita[no])
print(resultado)`,
    javascript: `var valores = [1, 2, 3, 4, 5, 6];
var esquerda = [1, 3, -1, -1, -1, -1];
var direita = [2, 4, 5, -1, -1, -1];
var visitado = [0, 0, 0, 0, 0, 0];
var fila = [0];        // começa pela raiz; processa nível por nível
var cabeca = 0;
var no = 0;
var resultado = [];
while (cabeca < fila.length) {
  no = fila[cabeca];
  cabeca = cabeca + 1;
  visitado[no] = 1;
  resultado.push(valores[no]);
  if (esquerda[no] !== -1) fila.push(esquerda[no]);
  if (direita[no] !== -1) fila.push(direita[no]);
}
console.log(resultado);`,
    tree: {
      valuesVar: "valores",
      leftVar: "esquerda",
      rightVar: "direita",
      cursorVar: "no",
      visitedVar: "visitado",
      scalarVars: ["resultado"],
    },
  },

  "bst-search": {
    python: `valores = [8, 3, 10, 1, 6, 14]
esquerda = [1, 3, -1, -1, -1, -1]
direita = [2, 4, 5, -1, -1, -1]
visitado = [0, 0, 0, 0, 0, 0]
alvo = 6
no = 0
encontrado = -1
while no != -1:
    visitado[no] = 1
    if valores[no] == alvo:
        encontrado = no
        no = -1                       # achou: para
    elif alvo < valores[no]:
        no = esquerda[no]             # alvo é menor: vai para a esquerda
    else:
        no = direita[no]              # alvo é maior: vai para a direita
print(encontrado)`,
    javascript: `var valores = [8, 3, 10, 1, 6, 14];
var esquerda = [1, 3, -1, -1, -1, -1];
var direita = [2, 4, 5, -1, -1, -1];
var visitado = [0, 0, 0, 0, 0, 0];
var alvo = 6;
var no = 0;
var encontrado = -1;
while (no !== -1) {
  visitado[no] = 1;
  if (valores[no] === alvo) {
    encontrado = no;
    no = -1;                          // achou: para
  } else if (alvo < valores[no]) {
    no = esquerda[no];                // alvo é menor: vai para a esquerda
  } else {
    no = direita[no];                 // alvo é maior: vai para a direita
  }
}
console.log(encontrado);`,
    tree: {
      valuesVar: "valores",
      leftVar: "esquerda",
      rightVar: "direita",
      cursorVar: "no",
      visitedVar: "visitado",
      scalarVars: ["alvo"],
    },
  },

  // ------------------------------------------------------------- INTERVAL ---
  "merge-intervals": {
    python: `intervalos = [[1, 3], [2, 6], [8, 10], [15, 18]]
intervalos.sort(key=lambda x: x[0])    # 1º passo: ordenar por início
resultado = []
i = 0
while i < len(intervalos):
    inicio = intervalos[i][0]
    fim = intervalos[i][1]
    if resultado and inicio <= resultado[-1][1]:
        # sobrepõe o último do resultado: estende o fim
        resultado[-1][1] = max(resultado[-1][1], fim)
    else:
        resultado.append([inicio, fim])   # não sobrepõe: novo bloco
    i = i + 1
print(resultado)`,
    javascript: `var intervalos = [[1, 3], [2, 6], [8, 10], [15, 18]];
intervalos.sort(function (a, b) { return a[0] - b[0]; }); // ordenar por início
var resultado = [];
var i = 0;
while (i < intervalos.length) {
  var inicio = intervalos[i][0];
  var fim = intervalos[i][1];
  if (resultado.length && inicio <= resultado[resultado.length - 1][1]) {
    // sobrepõe o último do resultado: estende o fim
    resultado[resultado.length - 1][1] = Math.max(resultado[resultado.length - 1][1], fim);
  } else {
    resultado.push([inicio, fim]);          // não sobrepõe: novo bloco
  }
  i = i + 1;
}
console.log(resultado);`,
    interval: {
      intervalsVar: "intervalos",
      cursorVar: "i",
      resultVar: "resultado",
    },
  },

  "insert-interval": {
    python: `intervalos = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]]
novo = [4, 8]
resultado = []
i = 0
n = len(intervalos)
# 1) os que terminam ANTES do novo começar: passam direto
while i < n and intervalos[i][1] < novo[0]:
    resultado.append(intervalos[i])
    i = i + 1
# 2) os que SOBREPÕEM o novo: fundem-se nele
while i < n and intervalos[i][0] <= novo[1]:
    novo = [min(novo[0], intervalos[i][0]), max(novo[1], intervalos[i][1])]
    i = i + 1
resultado.append(novo)
# 3) os que vêm DEPOIS: passam direto
while i < n:
    resultado.append(intervalos[i])
    i = i + 1
print(resultado)`,
    javascript: `var intervalos = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]];
var novo = [4, 8];
var resultado = [];
var i = 0;
var n = intervalos.length;
// 1) os que terminam ANTES do novo começar: passam direto
while (i < n && intervalos[i][1] < novo[0]) {
  resultado.push(intervalos[i]);
  i = i + 1;
}
// 2) os que SOBREPÕEM o novo: fundem-se nele
while (i < n && intervalos[i][0] <= novo[1]) {
  novo = [Math.min(novo[0], intervalos[i][0]), Math.max(novo[1], intervalos[i][1])];
  i = i + 1;
}
resultado.push(novo);
// 3) os que vêm DEPOIS: passam direto
while (i < n) {
  resultado.push(intervalos[i]);
  i = i + 1;
}
console.log(resultado);`,
    interval: {
      intervalsVar: "intervalos",
      cursorVar: "i",
      resultVar: "resultado",
      scalarVars: ["novo"],
    },
  },

  // ----------------------------------------------------------------- HEAP ---
  "heap-push": {
    python: `heap = []
valores = [5, 3, 8, 1, 4, 7, 2]
i = -1
for v in valores:
    heap.append(v)          # entra na última posição
    i = len(heap) - 1
    while i > 0:            # sobe enquanto for menor que o pai (sift-up)
        pai = (i - 1) // 2
        if heap[pai] <= heap[i]:
            break
        heap[pai], heap[i] = heap[i], heap[pai]
        i = pai
print(heap)`,
    javascript: `var heap = [];
var valores = [5, 3, 8, 1, 4, 7, 2];
var i = -1;
for (var k = 0; k < valores.length; k++) {
  heap.push(valores[k]);    // entra na última posição
  i = heap.length - 1;
  while (i > 0) {           // sobe enquanto for menor que o pai (sift-up)
    var pai = (i - 1) >> 1;
    if (heap[pai] <= heap[i]) break;
    var t = heap[pai]; heap[pai] = heap[i]; heap[i] = t;
    i = pai;
  }
}
console.log(heap);`,
    heap: {
      heapVar: "heap",
      cursorVar: "i",
    },
  },

  "heap-pop": {
    python: `heap = [1, 3, 2, 7, 4, 8, 5]   # já é um min-heap válido
saida = []
i = 0
while len(heap) > 0:
    saida.append(heap[0])         # o menor está sempre no topo
    ultimo = heap.pop()
    if len(heap) > 0:
        heap[0] = ultimo          # move o último para o topo...
        i = 0
        n = len(heap)
        while True:               # ...e desce até a posição certa (sift-down)
            menor = i
            e = 2 * i + 1
            d = 2 * i + 2
            if e < n and heap[e] < heap[menor]:
                menor = e
            if d < n and heap[d] < heap[menor]:
                menor = d
            if menor == i:
                break
            heap[menor], heap[i] = heap[i], heap[menor]
            i = menor
print(saida)`,
    javascript: `var heap = [1, 3, 2, 7, 4, 8, 5]; // já é um min-heap válido
var saida = [];
var i = 0;
while (heap.length > 0) {
  saida.push(heap[0]);            // o menor está sempre no topo
  var ultimo = heap.pop();
  if (heap.length > 0) {
    heap[0] = ultimo;             // move o último para o topo...
    i = 0;
    var n = heap.length;
    while (true) {                // ...e desce até a posição certa (sift-down)
      var menor = i;
      var e = 2 * i + 1;
      var d = 2 * i + 2;
      if (e < n && heap[e] < heap[menor]) menor = e;
      if (d < n && heap[d] < heap[menor]) menor = d;
      if (menor === i) break;
      var t = heap[menor]; heap[menor] = heap[i]; heap[i] = t;
      i = menor;
    }
  }
}
console.log(saida);`,
    heap: {
      heapVar: "heap",
      cursorVar: "i",
    },
  },

  // ---------------------------------------------------------------- GRAPH ---
  "graph-dfs": {
    python: `adj = [[1, 2], [0, 3], [0, 3], [1, 2, 4], [3, 5], [4]]
visitado = [0, 0, 0, 0, 0, 0]
ordem = []

def dfs(adj, visitado, ordem, no):
    visitado[no] = 1
    ordem.append(no)
    for viz in adj[no]:           # explora cada vizinho ainda não visitado
        if visitado[viz] == 0:
            dfs(adj, visitado, ordem, viz)

dfs(adj, visitado, ordem, 0)
print(ordem)`,
    javascript: `var adj = [[1, 2], [0, 3], [0, 3], [1, 2, 4], [3, 5], [4]];
var visitado = [0, 0, 0, 0, 0, 0];
var ordem = [];

function dfs(adj, visitado, ordem, no) {
  visitado[no] = 1;
  ordem.push(no);
  for (var k = 0; k < adj[no].length; k++) {  // explora cada vizinho não visitado
    var viz = adj[no][k];
    if (visitado[viz] === 0) {
      dfs(adj, visitado, ordem, viz);
    }
  }
}

dfs(adj, visitado, ordem, 0);
console.log(ordem);`,
    graph: {
      adjVar: "adj",
      cursorVar: "no",
      visitedVar: "visitado",
      scalarVars: ["ordem"],
    },
  },

  "graph-bfs": {
    python: `adj = [[1, 2], [0, 3], [0, 3], [1, 2, 4], [3, 5], [4]]
visitado = [0, 0, 0, 0, 0, 0]
fila = [0]
visitado[0] = 1
no = 0
ordem = []
cabeca = 0
while cabeca < len(fila):
    no = fila[cabeca]
    cabeca = cabeca + 1
    ordem.append(no)
    for viz in adj[no]:
        if visitado[viz] == 0:
            visitado[viz] = 1     # marca ao ENTRAR na fila
            fila.append(viz)
print(ordem)`,
    javascript: `var adj = [[1, 2], [0, 3], [0, 3], [1, 2, 4], [3, 5], [4]];
var visitado = [0, 0, 0, 0, 0, 0];
var fila = [0];
visitado[0] = 1;
var no = 0;
var ordem = [];
var cabeca = 0;
while (cabeca < fila.length) {
  no = fila[cabeca];
  cabeca = cabeca + 1;
  ordem.push(no);
  for (var k = 0; k < adj[no].length; k++) {
    var viz = adj[no][k];
    if (visitado[viz] === 0) {
      visitado[viz] = 1;        // marca ao ENTRAR na fila
      fila.push(viz);
    }
  }
}
console.log(ordem);`,
    graph: {
      adjVar: "adj",
      cursorVar: "no",
      visitedVar: "visitado",
      scalarVars: ["ordem"],
    },
  },

  "topological-sort": {
    python: `adj = [[1, 2], [3], [3], [4], []]   # dirigido: 0->1, 0->2, 1->3, 2->3, 3->4
indeg = [0, 1, 1, 2, 1]               # quantas arestas chegam em cada nó
visitado = [0, 0, 0, 0, 0]
fila = [0]                            # começa pelos nós sem dependências (in-degree 0)
no = 0
ordem = []
cabeca = 0
while cabeca < len(fila):
    no = fila[cabeca]
    cabeca = cabeca + 1
    visitado[no] = 1
    ordem.append(no)                  # adiciona à ordem topológica
    for viz in adj[no]:
        indeg[viz] = indeg[viz] - 1   # "removeu" a aresta no->viz
        if indeg[viz] == 0:           # viz não tem mais dependências
            fila.append(viz)
print(ordem)`,
    javascript: `var adj = [[1, 2], [3], [3], [4], []]; // dirigido: 0->1,0->2,1->3,2->3,3->4
var indeg = [0, 1, 1, 2, 1];           // quantas arestas chegam em cada nó
var visitado = [0, 0, 0, 0, 0];
var fila = [0];                        // começa pelos nós sem dependências
var no = 0;
var ordem = [];
var cabeca = 0;
while (cabeca < fila.length) {
  no = fila[cabeca];
  cabeca = cabeca + 1;
  visitado[no] = 1;
  ordem.push(no);                      // adiciona à ordem topológica
  for (var k = 0; k < adj[no].length; k++) {
    var viz = adj[no][k];
    indeg[viz] = indeg[viz] - 1;       // "removeu" a aresta no->viz
    if (indeg[viz] === 0) {            // viz não tem mais dependências
      fila.push(viz);
    }
  }
}
console.log(ordem);`,
    graph: {
      adjVar: "adj",
      cursorVar: "no",
      visitedVar: "visitado",
      directed: true,
      scalarVars: ["indeg", "ordem"],
    },
  },
};

export type DemoId = keyof typeof DEMOS;
