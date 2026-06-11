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
  | { python: string; javascript: string; string: StringVisualConfig };

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
};

export type DemoId = keyof typeof DEMOS;
