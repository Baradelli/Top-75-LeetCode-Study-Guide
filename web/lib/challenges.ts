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
  /** Para problemas de lista ligada: args que são listas + se o retorno é lista. */
  linked?: { listArgs: number[]; listReturn: boolean };
  /** Para problemas de árvore: args que são árvores (ordem de nível) + se o retorno é árvore. */
  tree?: { treeArgs: number[]; treeReturn: boolean };
}

export const CHALLENGES: Record<string, Challenge> = {
  "climb-stairs": {
    title: "Climbing Stairs",
    statement: `Você sobe uma escada de \`n\` degraus dando passos de **1 ou 2** degraus por vez. De quantas maneiras distintas dá para chegar ao topo?

Exemplo: \`n = 3\` → \`3\` (1+1+1, 1+2, 2+1).`,
    functionName: { python: "climb_stairs", javascript: "climbStairs" },
    starter: {
      python: `def climb_stairs(n):
    # de quantas formas chegar ao degrau n?
    pass`,
      javascript: `function climbStairs(n) {
  // de quantas formas chegar ao degrau n?
}`,
    },
    tests: [
      { args: [2], expected: 2 },
      { args: [3], expected: 3 },
      { args: [5], expected: 8 },
      { args: [1], expected: 1 },
      { args: [10], expected: 89 },
    ],
    hint: "Para chegar ao degrau i, você veio do degrau i-1 (passo de 1) ou do i-2 (passo de 2). Logo formas(i) = formas(i-1) + formas(i-2) — é Fibonacci! Comece dos casos-base (degrau 0 e 1) e suba preenchendo.",
    solution: {
      python: `def climb_stairs(n):
    if n <= 2:
        return n
    anterior, atual = 1, 2     # formas de chegar aos degraus 1 e 2
    for _ in range(3, n + 1):
        anterior, atual = atual, anterior + atual
    return atual`,
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  var anterior = 1, atual = 2;   // formas de chegar aos degraus 1 e 2
  for (var i = 3; i <= n; i++) {
    var prox = anterior + atual;
    anterior = atual;
    atual = prox;
  }
  return atual;
}`,
    },
    solutionIdea:
      "formas(i) = formas(i-1) + formas(i-2) (Fibonacci). Guardando só os dois últimos: O(n) tempo, O(1) espaço.",
  },

  "house-robber": {
    title: "House Robber",
    statement: `Casas em fila, cada uma com um valor em \`nums\`. Você não pode roubar **duas casas adjacentes**. Retorne o **máximo** que dá para roubar.

Exemplo: \`[2,7,9,3,1]\` → \`12\` (roubar as casas 2, 9 e 1 → 2+9+1).`,
    functionName: { python: "rob", javascript: "rob" },
    starter: {
      python: `def rob(nums):
    # máximo sem roubar casas adjacentes
    pass`,
      javascript: `function rob(nums) {
  // máximo sem roubar casas adjacentes
}`,
    },
    tests: [
      { args: [[2, 7, 9, 3, 1]], expected: 12 },
      { args: [[2, 1, 1, 2]], expected: 4 },
      { args: [[5]], expected: 5 },
      { args: [[]], expected: 0 },
      { args: [[2, 100, 9, 3, 100]], expected: 200 },
    ],
    hint: "Em cada casa, DECIDA: roubar (valor + melhor até a casa i-2, pois não pode a adjacente) ou pular (melhor até i-1). dp[i] = max(dp[i-1], nums[i] + dp[i-2]). É o padrão 'incluir ou excluir'.",
    solution: {
      python: `def rob(nums):
    pular, roubar = 0, 0    # melhor sem a casa atual, melhor com ela
    for x in nums:
        # ao chegar numa casa: ou pulo (mantenho 'roubar' anterior)
        # ou roubo (x + 'pular' anterior, que exclui a adjacente)
        pular, roubar = roubar, max(roubar, pular + x)
    return roubar`,
      javascript: `function rob(nums) {
  var pular = 0, roubar = 0;   // melhor sem a casa atual, melhor com ela
  for (var i = 0; i < nums.length; i++) {
    var novoRoubar = Math.max(roubar, pular + nums[i]);
    pular = roubar;
    roubar = novoRoubar;
  }
  return roubar;
}`,
    },
    solutionIdea:
      "Incluir/excluir: dp[i] = max(dp[i-1], nums[i] + dp[i-2]). Dois acumuladores → O(n) tempo, O(1) espaço.",
  },

  "coin-change": {
    title: "Coin Change",
    statement: `Dadas moedas de valores \`coins\` (quantidade ilimitada de cada) e um \`amount\`, retorne o **menor número de moedas** que soma exatamente \`amount\`, ou \`-1\` se for impossível.

Exemplo: \`coins = [1,2,5]\`, \`amount = 11\` → \`3\` (5+5+1).`,
    functionName: { python: "coin_change", javascript: "coinChange" },
    starter: {
      python: `def coin_change(coins, amount):
    # menor número de moedas para somar amount (ou -1)
    pass`,
      javascript: `function coinChange(coins, amount) {
  // menor número de moedas para somar amount (ou -1)
}`,
    },
    tests: [
      { args: [[1, 2, 5], 11], expected: 3 },
      { args: [[2], 3], expected: -1 },
      { args: [[1], 0], expected: 0 },
      { args: [[1, 3, 4, 5], 7], expected: 2 },
      { args: [[2, 5, 10, 1], 27], expected: 4 },
    ],
    hint: "dp[a] = menor nº de moedas para formar o valor a. Para cada valor a de 1 até amount, tente cada moeda m ≤ a: dp[a] = min(dp[a], dp[a - m] + 1). Como cada moeda é ilimitada, isto é o 'knapsack ilimitado'. Inicialize dp com um valor 'infinito'.",
    solution: {
      python: `def coin_change(coins, amount):
    INF = amount + 1
    dp = [INF] * (amount + 1)
    dp[0] = 0                       # 0 moedas para formar 0
    for a in range(1, amount + 1):
        for m in coins:
            if m <= a:
                dp[a] = min(dp[a], dp[a - m] + 1)
    return dp[amount] if dp[amount] != INF else -1`,
      javascript: `function coinChange(coins, amount) {
  var INF = amount + 1;
  var dp = [];
  for (var k = 0; k <= amount; k++) dp.push(INF);
  dp[0] = 0;                        // 0 moedas para formar 0
  for (var a = 1; a <= amount; a++) {
    for (var j = 0; j < coins.length; j++) {
      var m = coins[j];
      if (m <= a) dp[a] = Math.min(dp[a], dp[a - m] + 1);
    }
  }
  return dp[amount] !== INF ? dp[amount] : -1;
}`,
    },
    solutionIdea:
      "Knapsack ilimitado: dp[a] = min sobre moedas de dp[a-m]+1. O(amount × moedas) tempo, O(amount) espaço.",
  },

  "unique-paths": {
    title: "Unique Paths",
    statement: `Um robô está no canto superior esquerdo de um grid \`m × n\` e quer chegar ao canto inferior direito, movendo-se só para **baixo** ou para a **direita**. Quantos caminhos distintos existem?

Exemplo: \`m = 3\`, \`n = 7\` → \`28\`.`,
    functionName: { python: "unique_paths", javascript: "uniquePaths" },
    starter: {
      python: `def unique_paths(m, n):
    # quantos caminhos do topo-esquerda ao fundo-direita?
    pass`,
      javascript: `function uniquePaths(m, n) {
  // quantos caminhos do topo-esquerda ao fundo-direita?
}`,
    },
    tests: [
      { args: [3, 7], expected: 28 },
      { args: [3, 2], expected: 3 },
      { args: [1, 1], expected: 1 },
      { args: [3, 3], expected: 6 },
      { args: [7, 3], expected: 28 },
    ],
    hint: "DP em grid: dp[r][c] = caminhos até a célula (r,c). A primeira linha e a primeira coluna têm 1 caminho cada (só dá para vir em linha reta). Para o resto: dp[r][c] = dp[r-1][c] + dp[r][c-1] (veio de cima ou da esquerda).",
    solution: {
      python: `def unique_paths(m, n):
    dp = [[1] * n for _ in range(m)]   # 1ª linha/coluna = 1
    for r in range(1, m):
        for c in range(1, n):
            dp[r][c] = dp[r - 1][c] + dp[r][c - 1]
    return dp[m - 1][n - 1]`,
      javascript: `function uniquePaths(m, n) {
  var dp = [];
  for (var i = 0; i < m; i++) { var row = []; for (var j = 0; j < n; j++) row.push(1); dp.push(row); }
  for (var r = 1; r < m; r++) {
    for (var c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
}`,
    },
    solutionIdea:
      "DP 2D: dp[r][c] = dp[r-1][c] + dp[r][c-1], com bordas = 1. O(m·n) tempo, O(m·n) espaço.",
  },

  "longest-common-subsequence": {
    title: "Longest Common Subsequence",
    statement: `Dadas duas strings \`text1\` e \`text2\`, retorne o comprimento da **maior subsequência comum** (caracteres na mesma ordem, não necessariamente contíguos).

Exemplo: \`"abcde"\` e \`"ace"\` → \`3\` (a subsequência "ace").`,
    functionName: {
      python: "longest_common_subsequence",
      javascript: "longestCommonSubsequence",
    },
    starter: {
      python: `def longest_common_subsequence(text1, text2):
    # comprimento da maior subsequência comum
    pass`,
      javascript: `function longestCommonSubsequence(text1, text2) {
  // comprimento da maior subsequência comum
}`,
    },
    tests: [
      { args: ["abcde", "ace"], expected: 3 },
      { args: ["abc", "abc"], expected: 3 },
      { args: ["abc", "def"], expected: 0 },
      { args: ["bsbininm", "jmjkbkjkv"], expected: 1 },
      { args: ["ezupkr", "ubmrapg"], expected: 2 },
    ],
    hint: "DP 2D: dp[i][j] = LCS dos primeiros i chars de text1 e j de text2. Se text1[i-1] == text2[j-1], os caracteres casam: dp[i][j] = dp[i-1][j-1] + 1. Senão, pule um dos dois: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
    solution: {
      python: `def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1    # casaram
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
      javascript: `function longestCommonSubsequence(text1, text2) {
  var m = text1.length, n = text2.length;
  var dp = [];
  for (var i = 0; i <= m; i++) { var row = []; for (var j = 0; j <= n; j++) row.push(0); dp.push(row); }
  for (var a = 1; a <= m; a++) {
    for (var b = 1; b <= n; b++) {
      if (text1[a - 1] === text2[b - 1]) {
        dp[a][b] = dp[a - 1][b - 1] + 1;    // casaram
      } else {
        dp[a][b] = Math.max(dp[a - 1][b], dp[a][b - 1]);
      }
    }
  }
  return dp[m][n];
}`,
    },
    solutionIdea:
      "DP 2D em strings: casam → diagonal+1; senão → max(cima, esquerda). O(m·n) tempo e espaço.",
  },

  "connected-components": {
    title: "Number of Connected Components",
    statement: `Há \`n\` nós (numerados de \`0\` a \`n-1\`) e uma lista de \`edges\` (arestas não-dirigidas). Retorne o **número de componentes conexos** (grupos de nós ligados entre si).

Exemplo: \`n = 5\`, \`edges = [[0,1],[1,2],[3,4]]\` → \`2\` (o grupo {0,1,2} e o grupo {3,4}).`,
    functionName: { python: "count_components", javascript: "countComponents" },
    starter: {
      python: `def count_components(n, edges):
    # quantos grupos de nós conectados existem?
    pass`,
      javascript: `function countComponents(n, edges) {
  // quantos grupos de nós conectados existem?
}`,
    },
    tests: [
      { args: [5, [[0, 1], [1, 2], [3, 4]]], expected: 2 },
      { args: [5, [[0, 1], [1, 2], [2, 3], [3, 4]]], expected: 1 },
      { args: [4, []], expected: 4 },
      { args: [1, []], expected: 1 },
    ],
    hint: "Duas abordagens: (1) construa a lista de adjacência e faça DFS/BFS a partir de cada nó não visitado — cada início de busca é um componente novo. (2) Union-Find: comece com n grupos e una os nós de cada aresta; cada união bem-sucedida reduz a contagem em 1.",
    solution: {
      python: `def count_components(n, edges):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]   # compressão de caminho
            x = parent[x]
        return x
    comp = n
    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb     # une dois grupos
            comp -= 1           # um grupo a menos
    return comp`,
      javascript: `function countComponents(n, edges) {
  var parent = [];
  for (var i = 0; i < n; i++) parent.push(i);
  function find(x) {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  }
  var comp = n;
  for (var e = 0; e < edges.length; e++) {
    var ra = find(edges[e][0]), rb = find(edges[e][1]);
    if (ra !== rb) { parent[ra] = rb; comp -= 1; }
  }
  return comp;
}`,
    },
    solutionIdea:
      "Union-Find: começa com n grupos; cada aresta que une dois grupos diferentes reduz a contagem. Quase O(n + e).",
  },

  "course-schedule": {
    title: "Course Schedule",
    statement: `Há \`numCourses\` cursos (\`0\` a \`numCourses-1\`) e \`prerequisites\`, onde \`[a, b]\` significa "para fazer \`a\`, é preciso fazer \`b\` antes". Retorne \`true\` se é possível concluir **todos** os cursos.

Exemplo: \`2\`, \`[[1,0]]\` → \`true\`. \`2\`, \`[[1,0],[0,1]]\` → \`false\` (dependência circular).`,
    functionName: { python: "can_finish", javascript: "canFinish" },
    starter: {
      python: `def can_finish(num_courses, prerequisites):
    # dá para concluir todos os cursos? (sem ciclo de dependências)
    pass`,
      javascript: `function canFinish(numCourses, prerequisites) {
  // dá para concluir todos os cursos? (sem ciclo de dependências)
}`,
    },
    tests: [
      { args: [2, [[1, 0]]], expected: true },
      { args: [2, [[1, 0], [0, 1]]], expected: false },
      { args: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]], expected: true },
      { args: [3, [[0, 1], [1, 2], [2, 0]]], expected: false },
      { args: [1, []], expected: true },
    ],
    hint: "Concluir todos os cursos é possível se, e só se, o grafo de dependências NÃO tem ciclo. Use ordenação topológica (Kahn): comece pelos cursos com in-degree 0, processe-os removendo suas arestas; se conseguir processar TODOS, não há ciclo.",
    solution: {
      python: `from collections import deque

def can_finish(num_courses, prerequisites):
    adj = [[] for _ in range(num_courses)]
    indeg = [0] * num_courses
    for a, b in prerequisites:
        adj[b].append(a)        # b precisa vir antes de a
        indeg[a] += 1
    fila = deque([i for i in range(num_courses) if indeg[i] == 0])
    processados = 0
    while fila:
        x = fila.popleft()
        processados += 1
        for viz in adj[x]:
            indeg[viz] -= 1
            if indeg[viz] == 0:
                fila.append(viz)
    return processados == num_courses   # processou todos ⇒ sem ciclo`,
      javascript: `function canFinish(numCourses, prerequisites) {
  var adj = [], indeg = [];
  for (var i = 0; i < numCourses; i++) { adj.push([]); indeg.push(0); }
  for (var e = 0; e < prerequisites.length; e++) {
    var a = prerequisites[e][0], b = prerequisites[e][1];
    adj[b].push(a);             // b precisa vir antes de a
    indeg[a] += 1;
  }
  var fila = [], cabeca = 0;
  for (var j = 0; j < numCourses; j++) if (indeg[j] === 0) fila.push(j);
  var processados = 0;
  while (cabeca < fila.length) {
    var x = fila[cabeca++];
    processados += 1;
    for (var k = 0; k < adj[x].length; k++) {
      var viz = adj[x][k];
      indeg[viz] -= 1;
      if (indeg[viz] === 0) fila.push(viz);
    }
  }
  return processados === numCourses;  // processou todos ⇒ sem ciclo
}`,
    },
    solutionIdea:
      "Ordenação topológica (Kahn): processa cursos sem dependências e remove suas arestas. Se sobra algum não processado, há ciclo. O(V + E).",
  },

  "graph-valid-tree": {
    title: "Graph Valid Tree",
    statement: `Dados \`n\` nós e uma lista de \`edges\` não-dirigidas, retorne \`true\` se o grafo forma uma **árvore válida** (totalmente conectado e **sem ciclos**).

Exemplo: \`n = 5\`, \`edges = [[0,1],[0,2],[0,3],[1,4]]\` → \`true\`. Com \`[[0,1],[1,2],[2,3],[1,3],[1,4]]\` → \`false\` (tem ciclo).`,
    functionName: { python: "valid_tree", javascript: "validTree" },
    starter: {
      python: `def valid_tree(n, edges):
    # é uma árvore? (conectado e sem ciclos)
    pass`,
      javascript: `function validTree(n, edges) {
  // é uma árvore? (conectado e sem ciclos)
}`,
    },
    tests: [
      { args: [5, [[0, 1], [0, 2], [0, 3], [1, 4]]], expected: true },
      { args: [5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]], expected: false },
      { args: [4, [[0, 1], [2, 3]]], expected: false },
      { args: [1, []], expected: true },
      { args: [2, [[0, 1]]], expected: true },
    ],
    hint: "Uma árvore com n nós tem EXATAMENTE n-1 arestas e é conectada. Atalho com Union-Find: se houver mais ou menos que n-1 arestas, já não é. Senão, una os nós de cada aresta — se alguma aresta ligar dois nós JÁ no mesmo grupo, há ciclo (não é árvore).",
    solution: {
      python: `def valid_tree(n, edges):
    if len(edges) != n - 1:
        return False            # árvore tem exatamente n-1 arestas
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra == rb:
            return False         # já conectados ⇒ ciclo
        parent[ra] = rb
    return True                  # n-1 arestas + sem ciclo ⇒ conectado`,
      javascript: `function validTree(n, edges) {
  if (edges.length !== n - 1) return false;   // árvore tem n-1 arestas
  var parent = [];
  for (var i = 0; i < n; i++) parent.push(i);
  function find(x) {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  }
  for (var e = 0; e < edges.length; e++) {
    var ra = find(edges[e][0]), rb = find(edges[e][1]);
    if (ra === rb) return false;               // já conectados ⇒ ciclo
    parent[ra] = rb;
  }
  return true;                                 // n-1 arestas + sem ciclo
}`,
    },
    solutionIdea:
      "Árvore = n-1 arestas + sem ciclo (o que garante conectado). Union-Find detecta o ciclo: unir dois nós já no mesmo grupo é uma aresta extra.",
  },

  "rotting-oranges": {
    title: "Rotting Oranges",
    statement: `Num grid, \`0\` = vazio, \`1\` = laranja fresca, \`2\` = laranja podre. A cada minuto, toda laranja podre apodrece as frescas **adjacentes** (horizontal/vertical). Retorne o número de minutos até **nenhuma** laranja fresca restar, ou \`-1\` se for impossível.

Exemplo: \`[[2,1,1],[1,1,0],[0,1,1]]\` → \`4\`.`,
    functionName: { python: "oranges_rotting", javascript: "orangesRotting" },
    starter: {
      python: `def oranges_rotting(grid):
    # minutos até todas apodrecerem, ou -1
    pass`,
      javascript: `function orangesRotting(grid) {
  // minutos até todas apodrecerem, ou -1
}`,
    },
    tests: [
      { args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expected: 4 },
      { args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expected: -1 },
      { args: [[[0, 2]]], expected: 0 },
      { args: [[[1]]], expected: -1 },
      { args: [[[2, 2], [1, 1]]], expected: 1 },
    ],
    hint: "É um BFS MULTI-FONTE: coloque TODAS as laranjas podres na fila no início (tempo 0) e propague as ondas simultaneamente. O número de 'camadas' do BFS é o tempo. No fim, se ainda houver laranja fresca (inalcançável), retorne -1.",
    solution: {
      python: `from collections import deque

def oranges_rotting(grid):
    R, C = len(grid), len(grid[0])
    fila = deque()
    frescas = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == 2:
                fila.append((r, c, 0))   # todas as podres começam juntas
            elif grid[r][c] == 1:
                frescas += 1
    minutos = 0
    while fila:
        r, c, t = fila.popleft()
        minutos = max(minutos, t)
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                frescas -= 1
                fila.append((nr, nc, t + 1))
    return minutos if frescas == 0 else -1`,
      javascript: `function orangesRotting(grid) {
  var R = grid.length, C = grid[0].length;
  var fila = [], cabeca = 0, frescas = 0;
  for (var r = 0; r < R; r++) {
    for (var c = 0; c < C; c++) {
      if (grid[r][c] === 2) fila.push([r, c, 0]); // todas as podres começam juntas
      else if (grid[r][c] === 1) frescas += 1;
    }
  }
  var minutos = 0;
  var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (cabeca < fila.length) {
    var item = fila[cabeca++];
    var cr = item[0], cc = item[1], t = item[2];
    minutos = Math.max(minutos, t);
    for (var k = 0; k < 4; k++) {
      var nr = cr + dirs[k][0], nc = cc + dirs[k][1];
      if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] === 1) {
        grid[nr][nc] = 2;
        frescas -= 1;
        fila.push([nr, nc, t + 1]);
      }
    }
  }
  return frescas === 0 ? minutos : -1;
}`,
    },
    solutionIdea:
      "BFS multi-fonte: todas as podres entram na fila no tempo 0 e propagam em camadas; o nº de camadas é o tempo. Se sobra fresca, -1. O(m·n).",
  },

  "kth-largest": {
    title: "Kth Largest Element in an Array",
    statement: `Retorne o **k-ésimo MAIOR** elemento de \`nums\` (o k-ésimo na ordem decrescente, contando repetições).

Exemplo: \`nums = [3,2,1,5,6,4]\`, \`k = 2\` → \`5\`.

(Em Python há \`heapq\`; em JS, a solução inclui uma pequena classe de heap, já que a linguagem não tem uma nativa.)`,
    functionName: { python: "find_kth_largest", javascript: "findKthLargest" },
    starter: {
      python: `import heapq

def find_kth_largest(nums, k):
    # dica: um min-heap de tamanho k
    pass`,
      javascript: `function findKthLargest(nums, k) {
  // dica: um min-heap de tamanho k (você pode ordenar para passar, mas tente o heap)
}`,
    },
    tests: [
      { args: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
      { args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
      { args: [[1], 1], expected: 1 },
      { args: [[7, 6, 5, 4, 3, 2, 1], 7], expected: 1 },
    ],
    hint: "Mantenha um MIN-heap de tamanho k com os maiores vistos: empurre cada número e, se o heap passar de k, remova o menor (o topo). No fim, o topo do heap é o k-ésimo maior. O(n log k).",
    solution: {
      python: `import heapq

def find_kth_largest(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h)   # descarta o menor: sobram os k maiores
    return h[0]                # o topo é o k-ésimo maior`,
      javascript: `function Heap(cmp) { this.a = []; this.cmp = cmp; }
Heap.prototype.size = function () { return this.a.length; };
Heap.prototype.peek = function () { return this.a[0]; };
Heap.prototype.push = function (x) {
  var a = this.a, c = this.cmp; a.push(x); var i = a.length - 1;
  while (i > 0) { var p = (i - 1) >> 1; if (c(a[p], a[i]) <= 0) break; var t = a[p]; a[p] = a[i]; a[i] = t; i = p; }
};
Heap.prototype.pop = function () {
  var a = this.a, c = this.cmp, top = a[0], last = a.pop();
  if (a.length) { a[0] = last; var i = 0, n = a.length;
    for (;;) { var l = 2*i+1, r = 2*i+2, s = i;
      if (l < n && c(a[l], a[s]) < 0) s = l; if (r < n && c(a[r], a[s]) < 0) s = r;
      if (s === i) break; var t = a[s]; a[s] = a[i]; a[i] = t; i = s; } }
  return top;
};
function findKthLargest(nums, k) {
  var h = new Heap(function (a, b) { return a - b; }); // min-heap
  for (var i = 0; i < nums.length; i++) {
    h.push(nums[i]);
    if (h.size() > k) h.pop();   // descarta o menor: sobram os k maiores
  }
  return h.peek();               // o topo é o k-ésimo maior
}`,
    },
    solutionIdea:
      "Min-heap de tamanho k com os k maiores vistos; o topo é o k-ésimo maior. O(n log k) tempo, O(k) espaço.",
  },

  "merge-k-sorted": {
    title: "Merge k Sorted Lists",
    statement: `Dadas \`k\` listas **ordenadas** (aqui, como arrays), funda todas numa **única lista ordenada** e retorne-a.

Exemplo: \`[[1,4,5],[1,3,4],[2,6]]\` → \`[1,1,2,3,4,4,5,6]\`.

(Este é o "merge k" que você viu na seção Lista Ligada — agora com a ferramenta certa: o heap.)`,
    functionName: { python: "merge_k", javascript: "mergeK" },
    starter: {
      python: `import heapq

def merge_k(lists):
    # funda as k listas ordenadas numa só
    pass`,
      javascript: `function mergeK(lists) {
  // funda as k listas ordenadas numa só
}`,
    },
    tests: [
      { args: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
      { args: [[]], expected: [] },
      { args: [[[]]], expected: [] },
      { args: [[[1], [0]]], expected: [0, 1] },
    ],
    hint: "O próximo menor do resultado é sempre a cabeça de alguma das listas. Mantenha um MIN-heap com a cabeça de cada lista (guardando de qual lista e posição veio); retire a menor, adicione-a ao resultado e empurre a próxima daquela mesma lista. O(N log k).",
    solution: {
      python: `import heapq

def merge_k(lists):
    h = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(h, (lst[0], i, 0))   # (valor, qual lista, índice)
    res = []
    while h:
        val, i, j = heapq.heappop(h)
        res.append(val)
        if j + 1 < len(lists[i]):
            heapq.heappush(h, (lists[i][j + 1], i, j + 1))
    return res`,
      javascript: `function Heap(cmp) { this.a = []; this.cmp = cmp; }
Heap.prototype.size = function () { return this.a.length; };
Heap.prototype.push = function (x) {
  var a = this.a, c = this.cmp; a.push(x); var i = a.length - 1;
  while (i > 0) { var p = (i - 1) >> 1; if (c(a[p], a[i]) <= 0) break; var t = a[p]; a[p] = a[i]; a[i] = t; i = p; }
};
Heap.prototype.pop = function () {
  var a = this.a, c = this.cmp, top = a[0], last = a.pop();
  if (a.length) { a[0] = last; var i = 0, n = a.length;
    for (;;) { var l = 2*i+1, r = 2*i+2, s = i;
      if (l < n && c(a[l], a[s]) < 0) s = l; if (r < n && c(a[r], a[s]) < 0) s = r;
      if (s === i) break; var t = a[s]; a[s] = a[i]; a[i] = t; i = s; } }
  return top;
};
function mergeK(lists) {
  var h = new Heap(function (a, b) { return a[0] - b[0]; }); // por valor
  for (var i = 0; i < lists.length; i++) {
    if (lists[i].length) h.push([lists[i][0], i, 0]);   // [valor, lista, índice]
  }
  var res = [];
  while (h.size() > 0) {
    var item = h.pop();
    var val = item[0], li = item[1], j = item[2];
    res.push(val);
    if (j + 1 < lists[li].length) h.push([lists[li][j + 1], li, j + 1]);
  }
  return res;
}`,
    },
    solutionIdea:
      "Min-heap com a cabeça de cada lista; retira a menor e repõe a próxima daquela lista. O(N log k), onde N = total de elementos.",
  },

  "running-median": {
    title: "Find Median from Data Stream",
    statement: `Os números chegam um a um (um fluxo). Retorne a lista das **medianas** após cada número inserido. (Mediana de uma quantidade par de elementos é a média dos dois centrais.)

Exemplo: \`[1, 2, 3]\` → \`[1, 1.5, 2]\`. \`[5, 15, 1, 3]\` → \`[5, 10.0, 5, 4.0]\`.`,
    functionName: { python: "running_median", javascript: "runningMedian" },
    starter: {
      python: `import heapq

def running_median(nums):
    # mantenha duas metades equilibradas; retorne a mediana após cada inserção
    pass`,
      javascript: `function runningMedian(nums) {
  // mantenha duas metades equilibradas; retorne a mediana após cada inserção
}`,
    },
    tests: [
      { args: [[1, 2, 3]], expected: [1, 1.5, 2] },
      { args: [[5, 15, 1, 3]], expected: [5, 10, 5, 4] },
      { args: [[2, 2, 2]], expected: [2, 2, 2] },
      { args: [[1, 2]], expected: [1, 1.5] },
    ],
    hint: "Use DOIS heaps: um MAX-heap com a metade menor e um MIN-heap com a metade maior, mantendo os tamanhos equilibrados. A mediana é o topo do max-heap (tamanhos ímpares) ou a média dos dois topos (pares). Cada inserção é O(log n).",
    solution: {
      python: `import heapq

def running_median(nums):
    baixo = []   # max-heap (valores negados): metade menor
    alto = []    # min-heap: metade maior
    res = []
    for x in nums:
        heapq.heappush(baixo, -x)
        heapq.heappush(alto, -heapq.heappop(baixo))   # passa o maior da metade baixa
        if len(alto) > len(baixo):
            heapq.heappush(baixo, -heapq.heappop(alto))  # reequilibra
        if len(baixo) > len(alto):
            res.append(-baixo[0])
        else:
            res.append((-baixo[0] + alto[0]) / 2)
    return res`,
      javascript: `function Heap(cmp) { this.a = []; this.cmp = cmp; }
Heap.prototype.size = function () { return this.a.length; };
Heap.prototype.peek = function () { return this.a[0]; };
Heap.prototype.push = function (x) {
  var a = this.a, c = this.cmp; a.push(x); var i = a.length - 1;
  while (i > 0) { var p = (i - 1) >> 1; if (c(a[p], a[i]) <= 0) break; var t = a[p]; a[p] = a[i]; a[i] = t; i = p; }
};
Heap.prototype.pop = function () {
  var a = this.a, c = this.cmp, top = a[0], last = a.pop();
  if (a.length) { a[0] = last; var i = 0, n = a.length;
    for (;;) { var l = 2*i+1, r = 2*i+2, s = i;
      if (l < n && c(a[l], a[s]) < 0) s = l; if (r < n && c(a[r], a[s]) < 0) s = r;
      if (s === i) break; var t = a[s]; a[s] = a[i]; a[i] = t; i = s; } }
  return top;
};
function runningMedian(nums) {
  var baixo = new Heap(function (a, b) { return b - a; }); // max-heap: metade menor
  var alto = new Heap(function (a, b) { return a - b; });  // min-heap: metade maior
  var res = [];
  for (var k = 0; k < nums.length; k++) {
    baixo.push(nums[k]);
    alto.push(baixo.pop());                 // passa o maior da metade baixa
    if (alto.size() > baixo.size()) baixo.push(alto.pop()); // reequilibra
    if (baixo.size() > alto.size()) res.push(baixo.peek());
    else res.push((baixo.peek() + alto.peek()) / 2);
  }
  return res;
}`,
    },
    solutionIdea:
      "Dois heaps equilibrados (max-heap da metade menor, min-heap da maior); a mediana sai dos topos. Inserção O(log n).",
  },

  "merge-intervals": {
    title: "Merge Intervals",
    statement: `Dada uma lista de intervalos \`[início, fim]\`, **funda** todos os que se sobrepõem e retorne a lista resultante (ordenada por início).

Exemplo: \`[[1,3],[2,6],[8,10],[15,18]]\` → \`[[1,6],[8,10],[15,18]]\` (o [1,3] e o [2,6] se sobrepõem → [1,6]).`,
    functionName: { python: "merge", javascript: "merge" },
    starter: {
      python: `def merge(intervalos):
    # funda os intervalos que se sobrepõem
    pass`,
      javascript: `function merge(intervalos) {
  // funda os intervalos que se sobrepõem
}`,
    },
    tests: [
      { args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { args: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
      { args: [[[1, 4]]], expected: [[1, 4]] },
      { args: [[[1, 4], [2, 3]]], expected: [[1, 4]] },
    ],
    hint: "O primeiro movimento quase sempre é ORDENAR por início. Aí, percorrendo, dois intervalos se sobrepõem quando o início do atual é ≤ o fim do último do resultado — nesse caso, estenda o fim; senão, comece um bloco novo.",
    solution: {
      python: `def merge(intervalos):
    intervalos.sort(key=lambda x: x[0])
    resultado = []
    for inicio, fim in intervalos:
        if resultado and inicio <= resultado[-1][1]:
            resultado[-1][1] = max(resultado[-1][1], fim)
        else:
            resultado.append([inicio, fim])
    return resultado`,
      javascript: `function merge(intervalos) {
  intervalos.sort(function (a, b) { return a[0] - b[0]; });
  var resultado = [];
  for (var i = 0; i < intervalos.length; i++) {
    var inicio = intervalos[i][0], fim = intervalos[i][1];
    if (resultado.length && inicio <= resultado[resultado.length - 1][1]) {
      resultado[resultado.length - 1][1] = Math.max(resultado[resultado.length - 1][1], fim);
    } else {
      resultado.push([inicio, fim]);
    }
  }
  return resultado;
}`,
    },
    solutionIdea:
      "Ordena por início e varre: sobrepõe (início ≤ fim do último) → estende; senão → novo bloco. O(n log n) pelo sort.",
  },

  "insert-interval": {
    title: "Insert Interval",
    statement: `Dada uma lista de intervalos **ordenada e sem sobreposições** e um \`novo\` intervalo, insira-o (fundindo se necessário) mantendo a lista ordenada e sem sobreposições.

Exemplo: \`intervalos = [[1,3],[6,9]]\`, \`novo = [2,5]\` → \`[[1,5],[6,9]]\`.`,
    functionName: { python: "insert", javascript: "insert" },
    starter: {
      python: `def insert(intervalos, novo):
    # insira 'novo' mantendo ordenado e sem sobreposições
    pass`,
      javascript: `function insert(intervalos, novo) {
  // insira 'novo' mantendo ordenado e sem sobreposições
}`,
    },
    tests: [
      { args: [[[1, 3], [6, 9]], [2, 5]], expected: [[1, 5], [6, 9]] },
      { args: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], expected: [[1, 2], [3, 10], [12, 16]] },
      { args: [[], [5, 7]], expected: [[5, 7]] },
      { args: [[[1, 5]], [2, 3]], expected: [[1, 5]] },
    ],
    hint: "Como já está ordenado, pense em três fases: (1) copie os intervalos que terminam ANTES do novo começar; (2) funda no novo todos que o SOBREPÕEM (ajustando min do início e max do fim); (3) adicione o novo fundido e copie o resto.",
    solution: {
      python: `def insert(intervalos, novo):
    resultado = []
    i = 0
    n = len(intervalos)
    while i < n and intervalos[i][1] < novo[0]:
        resultado.append(intervalos[i])
        i += 1
    while i < n and intervalos[i][0] <= novo[1]:
        novo = [min(novo[0], intervalos[i][0]), max(novo[1], intervalos[i][1])]
        i += 1
    resultado.append(novo)
    while i < n:
        resultado.append(intervalos[i])
        i += 1
    return resultado`,
      javascript: `function insert(intervalos, novo) {
  var resultado = [];
  var i = 0;
  var n = intervalos.length;
  while (i < n && intervalos[i][1] < novo[0]) { resultado.push(intervalos[i]); i++; }
  while (i < n && intervalos[i][0] <= novo[1]) {
    novo = [Math.min(novo[0], intervalos[i][0]), Math.max(novo[1], intervalos[i][1])];
    i++;
  }
  resultado.push(novo);
  while (i < n) { resultado.push(intervalos[i]); i++; }
  return resultado;
}`,
    },
    solutionIdea:
      "Três fases sobre a lista já ordenada: antes / sobreposição (funde) / depois. Uma passada, O(n).",
  },

  "erase-overlap-intervals": {
    title: "Non-overlapping Intervals",
    statement: `Dada uma lista de intervalos, retorne o **número mínimo** de intervalos a **remover** para que os restantes não se sobreponham.

Exemplo: \`[[1,2],[2,3],[3,4],[1,3]]\` → \`1\` (remover [1,3] basta).`,
    functionName: {
      python: "erase_overlap_intervals",
      javascript: "eraseOverlapIntervals",
    },
    starter: {
      python: `def erase_overlap_intervals(intervalos):
    # mínimo de remoções para não haver sobreposição
    pass`,
      javascript: `function eraseOverlapIntervals(intervalos) {
  // mínimo de remoções para não haver sobreposição
}`,
    },
    tests: [
      { args: [[[1, 2], [2, 3], [3, 4], [1, 3]]], expected: 1 },
      { args: [[[1, 2], [1, 2], [1, 2]]], expected: 2 },
      { args: [[[1, 2], [2, 3]]], expected: 0 },
      { args: [[[1, 100], [11, 22], [1, 11], [2, 12]]], expected: 2 },
    ],
    hint: "Estratégia gulosa: ordene por FIM. Vá mantendo os que cabem (o início ≥ fim do último mantido) — assim você conserva o máximo de intervalos. Cada intervalo que NÃO cabe é uma remoção. (Manter quem termina mais cedo deixa mais espaço para os próximos.)",
    solution: {
      python: `def erase_overlap_intervals(intervalos):
    intervalos.sort(key=lambda x: x[1])
    remocoes = 0
    fim = float("-inf")
    for inicio, f in intervalos:
        if inicio >= fim:
            fim = f          # cabe: mantém
        else:
            remocoes += 1    # sobrepõe: remove
    return remocoes`,
      javascript: `function eraseOverlapIntervals(intervalos) {
  intervalos.sort(function (a, b) { return a[1] - b[1]; });
  var remocoes = 0;
  var fim = -Infinity;
  for (var i = 0; i < intervalos.length; i++) {
    if (intervalos[i][0] >= fim) {
      fim = intervalos[i][1];   // cabe: mantém
    } else {
      remocoes += 1;            // sobrepõe: remove
    }
  }
  return remocoes;
}`,
    },
    solutionIdea:
      "Guloso: ordena por fim e mantém quem cabe (início ≥ último fim); o resto conta como remoção. Manter os que terminam cedo maximiza o que sobra. O(n log n).",
  },

  "min-meeting-rooms": {
    title: "Meeting Rooms II",
    statement: `Dada uma lista de reuniões \`[início, fim]\`, retorne o **número mínimo de salas** necessárias para realizar todas (duas reuniões que se sobrepõem no tempo precisam de salas diferentes).

Exemplo: \`[[0,30],[5,10],[15,20]]\` → \`2\`.`,
    functionName: {
      python: "min_meeting_rooms",
      javascript: "minMeetingRooms",
    },
    starter: {
      python: `def min_meeting_rooms(intervalos):
    # número mínimo de salas para todas as reuniões
    pass`,
      javascript: `function minMeetingRooms(intervalos) {
  // número mínimo de salas para todas as reuniões
}`,
    },
    tests: [
      { args: [[[0, 30], [5, 10], [15, 20]]], expected: 2 },
      { args: [[[7, 10], [2, 4]]], expected: 1 },
      { args: [[[1, 5], [5, 10]]], expected: 1 },
      { args: [[[1, 5], [2, 6], [3, 7]]], expected: 3 },
      { args: [[]], expected: 0 },
    ],
    hint: "O nº de salas é a sobreposição MÁXIMA num instante. Separe os inícios e os fins em duas listas ordenadas e faça uma varredura com dois ponteiros: um início antes do próximo fim → +1 sala; senão → uma sala liberou (-1). O pico é a resposta. (Um min-heap dos fins é a outra abordagem clássica.)",
    solution: {
      python: `def min_meeting_rooms(intervalos):
    if not intervalos:
        return 0
    inicios = sorted(iv[0] for iv in intervalos)
    fins = sorted(iv[1] for iv in intervalos)
    salas = 0
    maximo = 0
    i = 0
    j = 0
    while i < len(inicios):
        if inicios[i] < fins[j]:
            salas += 1          # começou antes de a anterior terminar
            i += 1
            maximo = max(maximo, salas)
        else:
            salas -= 1          # uma reunião terminou: libera sala
            j += 1
    return maximo`,
      javascript: `function minMeetingRooms(intervalos) {
  if (intervalos.length === 0) return 0;
  var inicios = intervalos.map(function (iv) { return iv[0]; }).sort(function (a, b) { return a - b; });
  var fins = intervalos.map(function (iv) { return iv[1]; }).sort(function (a, b) { return a - b; });
  var salas = 0, maximo = 0, i = 0, j = 0;
  while (i < inicios.length) {
    if (inicios[i] < fins[j]) {
      salas += 1;            // começou antes de a anterior terminar
      i += 1;
      maximo = Math.max(maximo, salas);
    } else {
      salas -= 1;            // uma reunião terminou: libera sala
      j += 1;
    }
  }
  return maximo;
}`,
    },
    solutionIdea:
      "Varredura de eventos: inícios e fins ordenados; início antes do próximo fim → +1 sala. O pico de salas simultâneas é a resposta. O(n log n).",
  },

  "max-depth": {
    title: "Maximum Depth of Binary Tree",
    statement: `Retorne a **profundidade máxima** de uma árvore binária (número de nós no caminho mais longo da raiz até uma folha). A árvore é dada como \`root\` (cada nó tem \`.val\`, \`.left\`, \`.right\`).

Exemplo: \`[3,9,20,null,null,15,7]\` → \`3\`. (Para testar, passamos a árvore em ordem de nível.)`,
    functionName: { python: "max_depth", javascript: "maxDepth" },
    starter: {
      python: `def max_depth(root):
    # root é um TreeNode (root.val, root.left, root.right) ou None
    pass`,
      javascript: `function maxDepth(root) {
  // root é um TreeNode (root.val, root.left, root.right) ou null
}`,
    },
    tests: [
      { args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { args: [[]], expected: 0 },
      { args: [[1, 2, null, 3, null, 4]], expected: 4 },
      { args: [[1]], expected: 1 },
    ],
    hint: "Pense recursivamente: a profundidade de uma árvore é 1 (a raiz) + a maior profundidade entre as subárvores esquerda e direita. O caso-base é a árvore vazia (None → 0). Deixe a recursão resolver os filhos.",
    solution: {
      python: `def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
      javascript: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    },
    solutionIdea:
      "Recursão pura: profundidade = 1 + max(esquerda, direita); vazio = 0. Visita cada nó uma vez: O(n).",
    tree: { treeArgs: [0], treeReturn: false },
  },

  "level-order": {
    title: "Binary Tree Level Order Traversal",
    statement: `Retorne os valores da árvore **nível por nível**, de cima para baixo, da esquerda para a direita — uma lista por nível.

Exemplo: \`[3,9,20,null,null,15,7]\` → \`[[3],[9,20],[15,7]]\`.`,
    functionName: { python: "level_order", javascript: "levelOrder" },
    starter: {
      python: `def level_order(root):
    # retorne uma lista de listas, um nível por vez
    pass`,
      javascript: `function levelOrder(root) {
  // retorne uma lista de listas, um nível por vez
}`,
    },
    tests: [
      { args: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]] },
      { args: [[]], expected: [] },
      { args: [[1]], expected: [[1]] },
      { args: [[1, 2, 3, 4, null, null, 5]], expected: [[1], [2, 3], [4, 5]] },
    ],
    hint: "Nível por nível = BFS com uma fila. O truque para separar os níveis: a cada iteração do laço externo, processe EXATAMENTE os nós que estão na fila agora (o tamanho atual dela) — esses formam um nível — enfileirando os filhos para o próximo.",
    solution: {
      python: `from collections import deque

def level_order(root):
    if not root:
        return []
    res = []
    fila = deque([root])
    while fila:
        nivel = []
        for _ in range(len(fila)):     # processa só o nível atual
            no = fila.popleft()
            nivel.append(no.val)
            if no.left:
                fila.append(no.left)
            if no.right:
                fila.append(no.right)
        res.append(nivel)
    return res`,
      javascript: `function levelOrder(root) {
  if (!root) return [];
  var res = [];
  var fila = [root];
  while (fila.length > 0) {
    var nivel = [];
    var tamanho = fila.length;          // congela o tamanho do nível atual
    for (var i = 0; i < tamanho; i++) {
      var no = fila.shift();
      nivel.push(no.val);
      if (no.left) fila.push(no.left);
      if (no.right) fila.push(no.right);
    }
    res.push(nivel);
  }
  return res;
}`,
    },
    solutionIdea:
      "BFS com fila, processando 'o tamanho atual da fila' nós por vez para separar os níveis. O(n).",
    tree: { treeArgs: [0], treeReturn: false },
  },

  "validate-bst": {
    title: "Validate Binary Search Tree",
    statement: `Verifique se uma árvore binária é uma **BST válida**: para todo nó, todos os valores da subárvore esquerda são **menores** que ele, e todos os da direita são **maiores** — recursivamente.

Exemplo: \`[2,1,3]\` → \`true\`. \`[5,1,4,null,null,3,6]\` → \`false\` (o 3 e o 6 estão à direita do 5, mas o 3 < 5).`,
    functionName: { python: "is_valid_bst", javascript: "isValidBST" },
    starter: {
      python: `def is_valid_bst(root):
    # toda a subárvore esquerda < nó < toda a subárvore direita?
    pass`,
      javascript: `function isValidBST(root) {
  // toda a subárvore esquerda < nó < toda a subárvore direita?
}`,
    },
    tests: [
      { args: [[2, 1, 3]], expected: true },
      { args: [[5, 1, 4, null, null, 3, 6]], expected: false },
      { args: [[]], expected: true },
      { args: [[5, 4, 6, null, null, 3, 7]], expected: false },
      { args: [[10, 5, 15, null, null, 6, 20]], expected: false },
    ],
    hint: "O erro comum é só comparar nó com seus filhos diretos — não basta! Cada nó tem um INTERVALO válido (mínimo, máximo) que vai se estreitando conforme você desce: ao ir à esquerda, o máximo vira o valor do nó; à direita, o mínimo vira o valor do nó.",
    solution: {
      python: `def is_valid_bst(root):
    def valido(no, minimo, maximo):
        if not no:
            return True
        if not (minimo < no.val < maximo):
            return False
        return valido(no.left, minimo, no.val) and valido(no.right, no.val, maximo)
    return valido(root, float("-inf"), float("inf"))`,
      javascript: `function isValidBST(root) {
  function valido(no, minimo, maximo) {
    if (!no) return true;
    if (!(minimo < no.val && no.val < maximo)) return false;
    return valido(no.left, minimo, no.val) && valido(no.right, no.val, maximo);
  }
  return valido(root, -Infinity, Infinity);
}`,
    },
    solutionIdea:
      "Carregue um intervalo (min, max) que estreita ao descer: à esquerda max=valor, à direita min=valor. O(n).",
    tree: { treeArgs: [0], treeReturn: false },
  },

  "build-tree": {
    title: "Construct Binary Tree from Preorder and Inorder",
    statement: `Reconstrua a árvore binária a partir das suas travessias **pré-ordem** e **em-ordem** (sem valores repetidos). Retorne a raiz.

Exemplo: \`preorder = [3,9,20,15,7]\`, \`inorder = [9,3,15,20,7]\` → \`[3,9,20,null,null,15,7]\`.`,
    functionName: { python: "build_tree", javascript: "buildTree" },
    starter: {
      python: `def build_tree(preorder, inorder):
    # reconstrua a árvore; retorne a raiz (TreeNode)
    pass`,
      javascript: `function buildTree(preorder, inorder) {
  // reconstrua a árvore; retorne a raiz (TreeNode)
}`,
    },
    tests: [
      { args: [[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]], expected: [3, 9, 20, null, null, 15, 7] },
      { args: [[-1], [-1]], expected: [-1] },
      { args: [[1, 2], [2, 1]], expected: [1, 2] },
    ],
    hint: "O PRIMEIRO da pré-ordem é sempre a raiz. Ache-o na em-ordem: tudo à esquerda dele é a subárvore esquerda, tudo à direita é a subárvore direita. Consuma a pré-ordem em sequência (um ponteiro global) e recue recursivamente para construir cada subárvore.",
    solution: {
      python: `def build_tree(preorder, inorder):
    pos = {v: i for i, v in enumerate(inorder)}
    self_idx = [0]
    def construir(lo, hi):
        if lo > hi:
            return None
        valor = preorder[self_idx[0]]
        self_idx[0] += 1
        no = TreeNode(valor)
        meio = pos[valor]
        no.left = construir(lo, meio - 1)
        no.right = construir(meio + 1, hi)
        return no
    return construir(0, len(inorder) - 1)`,
      javascript: `function buildTree(preorder, inorder) {
  var pos = {};
  for (var i = 0; i < inorder.length; i++) pos[inorder[i]] = i;
  var idx = { v: 0 };
  function construir(lo, hi) {
    if (lo > hi) return null;
    var valor = preorder[idx.v++];
    var no = new TreeNode(valor);
    var meio = pos[valor];
    no.left = construir(lo, meio - 1);
    no.right = construir(meio + 1, hi);
    return no;
  }
  return construir(0, inorder.length - 1);
}`,
    },
    solutionIdea:
      "1º da pré-ordem = raiz; a posição dele na em-ordem divide esquerda/direita. Recursão consumindo a pré-ordem. O(n).",
    tree: { treeArgs: [], treeReturn: true },
  },

  "trie-operations": {
    title: "Implement Trie (Prefix Tree)",
    statement: `Implemente uma **Trie** (árvore de prefixos) com \`insert\`, \`search\` (palavra exata) e \`startsWith\` (prefixo). Para testar, você recebe duas listas: \`operacoes\` (ex.: \`"Trie"\`, \`"insert"\`, \`"search"\`, \`"startsWith"\`) e \`args\` (o argumento de cada operação). Retorne a lista de resultados (\`None\` para construir/inserir, \`true\`/\`false\` para as buscas).

Exemplo: ops \`["Trie","insert","search","search","startsWith"]\`, args \`[[],["apple"],["apple"],["app"],["app"]]\` → \`[null,null,true,false,true]\`.`,
    functionName: { python: "trie_operations", javascript: "trieOperations" },
    starter: {
      python: `def trie_operations(operacoes, args):
    # construa uma Trie e processe cada operação, retornando os resultados
    pass`,
      javascript: `function trieOperations(operacoes, args) {
  // construa uma Trie e processe cada operação, retornando os resultados
}`,
    },
    tests: [
      {
        args: [["Trie", "insert", "search", "search", "startsWith"], [[], ["apple"], ["apple"], ["app"], ["app"]]],
        expected: [null, null, true, false, true],
      },
      {
        args: [["Trie", "insert", "startsWith", "insert", "search"], [[], ["abc"], ["ab"], ["ab"], ["ab"]]],
        expected: [null, null, true, null, true],
      },
    ],
    hint: "Cada nó da Trie tem um mapa de filhos (um por caractere) e uma flag 'fim de palavra'. insert: caminhe/crie nós letra a letra e marque o fim. search: caminhe; existe E é fim de palavra? startsWith: só precisa conseguir caminhar até o fim do prefixo.",
    solution: {
      python: `def trie_operations(operacoes, args):
    raiz = {"filhos": {}, "fim": False}
    res = []
    for op, a in zip(operacoes, args):
        if op == "Trie":
            res.append(None)
        elif op == "insert":
            no = raiz
            for ch in a[0]:
                if ch not in no["filhos"]:
                    no["filhos"][ch] = {"filhos": {}, "fim": False}
                no = no["filhos"][ch]
            no["fim"] = True
            res.append(None)
        else:  # search ou startsWith
            no = raiz
            achou = True
            for ch in a[0]:
                if ch not in no["filhos"]:
                    achou = False
                    break
                no = no["filhos"][ch]
            if op == "search":
                res.append(achou and no["fim"])
            else:
                res.append(achou)
    return res`,
      javascript: `function trieOperations(operacoes, args) {
  function novoNo() { return { filhos: {}, fim: false }; }
  var raiz = novoNo();
  var res = [];
  for (var k = 0; k < operacoes.length; k++) {
    var op = operacoes[k];
    var a = args[k];
    if (op === "Trie") {
      res.push(null);
    } else if (op === "insert") {
      var no = raiz;
      for (var i = 0; i < a[0].length; i++) {
        var ch = a[0][i];
        if (!no.filhos[ch]) no.filhos[ch] = novoNo();
        no = no.filhos[ch];
      }
      no.fim = true;
      res.push(null);
    } else {
      var no2 = raiz;
      var achou = true;
      for (var j = 0; j < a[0].length; j++) {
        var ch2 = a[0][j];
        if (!no2.filhos[ch2]) { achou = false; break; }
        no2 = no2.filhos[ch2];
      }
      res.push(op === "search" ? achou && no2.fim : achou);
    }
  }
  return res;
}`,
    },
    solutionIdea:
      "Cada nó tem filhos por caractere + flag de fim. insert cria o caminho; search exige chegar ao fim marcado; startsWith só exige chegar. O(comprimento) por operação.",
  },

  "spiral-order": {
    title: "Spiral Matrix",
    statement: `Dada uma matriz \`m × n\`, retorne **todos** os seus elementos em ordem **espiral** (sentido horário, começando no canto superior esquerdo).

Exemplo: \`[[1,2,3],[4,5,6],[7,8,9]]\` → \`[1,2,3,6,9,8,7,4,5]\`.`,
    functionName: { python: "spiral_order", javascript: "spiralOrder" },
    starter: {
      python: `def spiral_order(matriz):
    # percorra em espiral e retorne a lista de valores
    pass`,
      javascript: `function spiralOrder(matriz) {
  // percorra em espiral e retorne a lista de valores
}`,
    },
    tests: [
      { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
      { args: [[[1, 2, 3, 4]]], expected: [1, 2, 3, 4] },
      { args: [[[1], [2], [3]]], expected: [1, 2, 3] },
      {
        args: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]],
        expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
      },
    ],
    hint: "Mantenha quatro limites: top, bottom, left, right. Percorra a borda de cima (left→right), a da direita (top→bottom), a de baixo (right→left) e a da esquerda (bottom→top); depois encolha os limites para dentro. Repita enquanto top<=bottom e left<=right.",
    solution: {
      python: `def spiral_order(matriz):
    if not matriz:
        return []
    top, bottom = 0, len(matriz) - 1
    left, right = 0, len(matriz[0]) - 1
    res = []
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            res.append(matriz[top][c])
        top += 1
        for r in range(top, bottom + 1):
            res.append(matriz[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1):
                res.append(matriz[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                res.append(matriz[r][left])
            left += 1
    return res`,
      javascript: `function spiralOrder(matriz) {
  if (matriz.length === 0) return [];
  var top = 0, bottom = matriz.length - 1;
  var left = 0, right = matriz[0].length - 1;
  var res = [];
  while (top <= bottom && left <= right) {
    for (var c = left; c <= right; c++) res.push(matriz[top][c]);
    top++;
    for (var r = top; r <= bottom; r++) res.push(matriz[r][right]);
    right--;
    if (top <= bottom) {
      for (var c2 = right; c2 >= left; c2--) res.push(matriz[bottom][c2]);
      bottom--;
    }
    if (left <= right) {
      for (var r2 = bottom; r2 >= top; r2--) res.push(matriz[r2][left]);
      left++;
    }
  }
  return res;
}`,
    },
    solutionIdea:
      "Quatro limites que encolhem para dentro a cada camada percorrida. Cada célula é visitada uma vez: O(m·n).",
  },

  "rotate-image": {
    title: "Rotate Image",
    statement: `Dada uma matriz \`n × n\`, gire-a **90° no sentido horário, no lugar** (sem usar outra matriz). Retorne a matriz girada.

Exemplo: \`[[1,2,3],[4,5,6],[7,8,9]]\` → \`[[7,4,1],[8,5,2],[9,6,3]]\`.`,
    functionName: { python: "rotate", javascript: "rotate" },
    starter: {
      python: `def rotate(matriz):
    # gire 90° no sentido horário, no lugar, e retorne a matriz
    pass`,
      javascript: `function rotate(matriz) {
  // gire 90° no sentido horário, no lugar, e retorne a matriz
}`,
    },
    tests: [
      { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
      { args: [[[1, 2], [3, 4]]], expected: [[3, 1], [4, 2]] },
      { args: [[[1]]], expected: [[1]] },
    ],
    hint: "Truque clássico em dois passos, ambos O(1) de espaço: (1) TRANSPONHA a matriz (troque matriz[i][j] com matriz[j][i]); (2) inverta cada LINHA. O resultado é a rotação de 90° horária.",
    solution: {
      python: `def rotate(matriz):
    n = len(matriz)
    # 1) transpõe (espelha na diagonal)
    for i in range(n):
        for j in range(i + 1, n):
            matriz[i][j], matriz[j][i] = matriz[j][i], matriz[i][j]
    # 2) inverte cada linha
    for linha in matriz:
        linha.reverse()
    return matriz`,
      javascript: `function rotate(matriz) {
  var n = matriz.length;
  // 1) transpõe (espelha na diagonal)
  for (var i = 0; i < n; i++) {
    for (var j = i + 1; j < n; j++) {
      var tmp = matriz[i][j];
      matriz[i][j] = matriz[j][i];
      matriz[j][i] = tmp;
    }
  }
  // 2) inverte cada linha
  for (var r = 0; r < n; r++) matriz[r].reverse();
  return matriz;
}`,
    },
    solutionIdea:
      "Transpor + inverter cada linha = rotação 90° horária, no lugar. O(n²) tempo, O(1) espaço.",
  },

  "number-of-islands": {
    title: "Number of Islands",
    statement: `Dado um grid de \`1\` (terra) e \`0\` (água), conte o número de **ilhas**. Uma ilha é um grupo de \`1\`s conectados na horizontal/vertical.

Exemplo: \`[[1,1,0,0],[1,0,0,1],[0,0,1,1]]\` → \`2\`.`,
    functionName: { python: "num_islands", javascript: "numIslands" },
    starter: {
      python: `def num_islands(grid):
    # conte os grupos de 1s conectados
    pass`,
      javascript: `function numIslands(grid) {
  // conte os grupos de 1s conectados
}`,
    },
    tests: [
      { args: [[[1, 1, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1]]], expected: 2 },
      { args: [[[1, 1, 1], [1, 1, 1]]], expected: 1 },
      { args: [[[0, 0], [0, 0]]], expected: 0 },
      {
        args: [[[1, 0, 1, 0, 1]]],
        expected: 3,
      },
    ],
    hint: "Percorra o grid; ao achar um 1 ainda não visitado, é uma NOVA ilha (+1) — então faça um DFS/flood fill a partir dele marcando toda a terra conectada como visitada. Assim cada ilha é contada uma vez.",
    solution: {
      python: `def num_islands(grid):
    if not grid:
        return 0
    R, C = len(grid), len(grid[0])
    visitado = [[False] * C for _ in range(R)]

    def dfs(r, c):
        if r < 0 or c < 0 or r >= R or c >= C:
            return
        if visitado[r][c] or grid[r][c] == 0:
            return
        visitado[r][c] = True
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)

    ilhas = 0
    for i in range(R):
        for j in range(C):
            if grid[i][j] == 1 and not visitado[i][j]:
                ilhas += 1
                dfs(i, j)
    return ilhas`,
      javascript: `function numIslands(grid) {
  if (grid.length === 0) return 0;
  var R = grid.length, C = grid[0].length;
  var visitado = [];
  for (var k = 0; k < R; k++) { var row = []; for (var m = 0; m < C; m++) row.push(false); visitado.push(row); }
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= R || c >= C) return;
    if (visitado[r][c] || grid[r][c] === 0) return;
    visitado[r][c] = true;
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  var ilhas = 0;
  for (var i = 0; i < R; i++) {
    for (var j = 0; j < C; j++) {
      if (grid[i][j] === 1 && !visitado[i][j]) { ilhas++; dfs(i, j); }
    }
  }
  return ilhas;
}`,
    },
    solutionIdea:
      "Para cada terra nova, +1 e DFS afundando a ilha inteira (marcando visitado). Cada célula é tocada uma vez: O(m·n).",
  },

  "word-search": {
    title: "Word Search",
    statement: `Dado um grid de letras \`board\` e uma \`word\`, retorne \`true\` se a palavra pode ser formada por letras **adjacentes** (horizontal/vertical), sem reusar a mesma célula.

Exemplo: board \`[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\`, word \`"ABCCED"\` → \`true\`.`,
    functionName: { python: "exist", javascript: "exist" },
    starter: {
      python: `def exist(board, word):
    # a palavra existe no grid por células adjacentes?
    pass`,
      javascript: `function exist(board, word) {
  // a palavra existe no grid por células adjacentes?
}`,
    },
    tests: [
      { args: [[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"], expected: true },
      { args: [[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "SEE"], expected: true },
      { args: [[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCB"], expected: false },
      { args: [[["A"]], "A"], expected: true },
    ],
    hint: "DFS com backtracking a partir de cada célula: se board[r][c] == word[i], marque a célula como usada, tente os 4 vizinhos para word[i+1], e — ao voltar — DESMARQUE a célula (backtrack) para que outros caminhos possam usá-la.",
    solution: {
      python: `def exist(board, word):
    R, C = len(board), len(board[0])

    def dfs(r, c, i):
        if i == len(word):
            return True
        if r < 0 or c < 0 or r >= R or c >= C or board[r][c] != word[i]:
            return False
        temp = board[r][c]
        board[r][c] = "#"            # marca como usada
        achou = (dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or
                 dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1))
        board[r][c] = temp           # backtrack
        return achou

    for i in range(R):
        for j in range(C):
            if dfs(i, j, 0):
                return True
    return False`,
      javascript: `function exist(board, word) {
  var R = board.length, C = board[0].length;
  function dfs(r, c, i) {
    if (i === word.length) return true;
    if (r < 0 || c < 0 || r >= R || c >= C || board[r][c] !== word[i]) return false;
    var temp = board[r][c];
    board[r][c] = "#";             // marca como usada
    var achou = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) ||
                dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r][c] = temp;            // backtrack
    return achou;
  }
  for (var i = 0; i < R; i++) {
    for (var j = 0; j < C; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
}`,
    },
    solutionIdea:
      "DFS com backtracking: marca a célula ao entrar, desmarca ao sair, liberando-a para outros caminhos. O caminho é desfeito a cada falha.",
  },

  "shortest-path-binary-matrix": {
    title: "Shortest Path in Binary Matrix",
    statement: `Num grid \`n × n\` de \`0\` (livre) e \`1\` (bloqueado), retorne o **comprimento** do caminho mais curto do canto superior esquerdo ao inferior direito, andando nas **8 direções** por células \`0\`. Se não houver, retorne \`-1\`. (O comprimento conta as células visitadas, início e fim incluídos.)

Exemplo: \`[[0,0,0],[1,1,0],[1,1,0]]\` → \`4\`.`,
    functionName: {
      python: "shortest_path_binary_matrix",
      javascript: "shortestPathBinaryMatrix",
    },
    starter: {
      python: `def shortest_path_binary_matrix(grid):
    # caminho mais curto (8 direções) do topo-esquerda ao fundo-direita
    pass`,
      javascript: `function shortestPathBinaryMatrix(grid) {
  // caminho mais curto (8 direções) do topo-esquerda ao fundo-direita
}`,
    },
    tests: [
      { args: [[[0, 1], [1, 0]]], expected: 2 },
      { args: [[[0, 0, 0], [1, 1, 0], [1, 1, 0]]], expected: 4 },
      { args: [[[1, 0, 0], [1, 1, 0], [1, 1, 0]]], expected: -1 },
      { args: [[[0]]], expected: 1 },
    ],
    hint: "Caminho MAIS CURTO em grafo sem pesos = BFS. Use uma fila começando na célula (0,0) com distância 1; expanda para os 8 vizinhos livres não visitados, somando 1 à distância. O primeiro a chegar no destino tem a menor distância. Marque visitados para não repetir.",
    solution: {
      python: `from collections import deque

def shortest_path_binary_matrix(grid):
    n = len(grid)
    if grid[0][0] != 0 or grid[n - 1][n - 1] != 0:
        return -1
    fila = deque([(0, 0, 1)])
    visto = set([(0, 0)])
    while fila:
        r, c, d = fila.popleft()
        if r == n - 1 and c == n - 1:
            return d
        for dr in (-1, 0, 1):
            for dc in (-1, 0, 1):
                if dr == 0 and dc == 0:
                    continue
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0 and (nr, nc) not in visto:
                    visto.add((nr, nc))
                    fila.append((nr, nc, d + 1))
    return -1`,
      javascript: `function shortestPathBinaryMatrix(grid) {
  var n = grid.length;
  if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;
  var fila = [[0, 0, 1]];
  var visto = {};
  visto["0,0"] = true;
  var cabeca = 0;
  while (cabeca < fila.length) {
    var atual = fila[cabeca++];
    var r = atual[0], c = atual[1], d = atual[2];
    if (r === n - 1 && c === n - 1) return d;
    for (var dr = -1; dr <= 1; dr++) {
      for (var dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        var nr = r + dr, nc = c + dc;
        var chave = nr + "," + nc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0 && !visto[chave]) {
          visto[chave] = true;
          fila.push([nr, nc, d + 1]);
        }
      }
    }
  }
  return -1;
}`,
    },
    solutionIdea:
      "BFS a partir de (0,0): a fila explora por camadas de distância, então o primeiro a alcançar o destino traz o caminho mais curto. O(n²).",
  },

  "reverse-list": {
    title: "Reverse Linked List",
    statement: `Inverta uma lista ligada e retorne a nova cabeça. A lista é \`head = ListNode\` (cada nó tem \`.val\` e \`.next\`; o último aponta para \`None\`/\`null\`).

Exemplo: \`1 → 2 → 3 → 4 → 5\` vira \`5 → 4 → 3 → 2 → 1\`.

(Para testar, passamos a lista como array e comparamos o resultado como array.)`,
    functionName: { python: "reverse_list", javascript: "reverseList" },
    starter: {
      python: `def reverse_list(head):
    # head é um ListNode (head.val, head.next). Retorne a nova cabeça.
    pass`,
      javascript: `function reverseList(head) {
  // head é um ListNode (head.val, head.next). Retorne a nova cabeça.
}`,
    },
    tests: [
      { args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { args: [[]], expected: [] },
      { args: [[1, 2]], expected: [2, 1] },
    ],
    hint: "Você precisa de três ponteiros: prev (começa em None), curr (começa na cabeça) e um temporário para o próximo. Em cada passo: guarde curr.next, faça curr.next = prev, e avance prev e curr. No fim, prev é a nova cabeça.",
    solution: {
      python: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        seguinte = curr.next   # guarda o próximo
        curr.next = prev       # inverte o ponteiro
        prev = curr            # avança prev
        curr = seguinte        # avança curr
    return prev`,
      javascript: `function reverseList(head) {
  var prev = null;
  var curr = head;
  while (curr) {
    var seguinte = curr.next; // guarda o próximo
    curr.next = prev;         // inverte o ponteiro
    prev = curr;              // avança prev
    curr = seguinte;          // avança curr
  }
  return prev;
}`,
    },
    solutionIdea:
      "Três ponteiros (prev, curr, próximo) repointando cada nó para trás. Uma passada, O(n) tempo, O(1) espaço.",
    linked: { listArgs: [0], listReturn: true },
  },

  "middle-of-list": {
    title: "Middle of the Linked List",
    statement: `Retorne o nó do **meio** de uma lista ligada (a partir dele até o fim). Se houver dois nós no meio, retorne o **segundo**.

Exemplo: \`1 → 2 → 3 → 4 → 5\` → meio é \`3\` (retorna \`3 → 4 → 5\`). \`1 → 2 → 3 → 4 → 5 → 6\` → retorna \`4 → 5 → 6\`.`,
    functionName: { python: "middle_node", javascript: "middleNode" },
    starter: {
      python: `def middle_node(head):
    # retorne o nó do meio
    pass`,
      javascript: `function middleNode(head) {
  // retorne o nó do meio
}`,
    },
    tests: [
      { args: [[1, 2, 3, 4, 5]], expected: [3, 4, 5] },
      { args: [[1, 2, 3, 4, 5, 6]], expected: [4, 5, 6] },
      { args: [[1]], expected: [1] },
    ],
    hint: "Dá para contar o tamanho e andar metade — duas passadas. Mais elegante (uma passada): dois ponteiros, slow (1 passo) e fast (2 passos). Quando fast chega ao fim, slow está no meio.",
    solution: {
      python: `def middle_node(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next       # anda 1
        fast = fast.next.next  # anda 2
    return slow`,
      javascript: `function middleNode(head) {
  var slow = head;
  var fast = head;
  while (fast && fast.next) {
    slow = slow.next;        // anda 1
    fast = fast.next.next;   // anda 2
  }
  return slow;
}`,
    },
    solutionIdea:
      "Ponteiros lento/rápido: fast anda o dobro, então slow para no meio quando fast acaba. Uma passada, O(n)/O(1).",
    linked: { listArgs: [0], listReturn: true },
  },

  "merge-two-lists": {
    title: "Merge Two Sorted Lists",
    statement: `Dadas duas listas ligadas **ordenadas** \`l1\` e \`l2\`, junte-as numa só lista ordenada e retorne a cabeça.

Exemplo: \`1 → 2 → 4\` e \`1 → 3 → 4\` → \`1 → 1 → 2 → 3 → 4 → 4\`.`,
    functionName: { python: "merge_two_lists", javascript: "mergeTwoLists" },
    starter: {
      python: `def merge_two_lists(l1, l2):
    # junte as duas listas ordenadas
    pass`,
      javascript: `function mergeTwoLists(l1, l2) {
  // junte as duas listas ordenadas
}`,
    },
    tests: [
      { args: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
      { args: [[], []], expected: [] },
      { args: [[], [0]], expected: [0] },
      { args: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6] },
    ],
    hint: "Use um nó 'dummy' (sentinela) para a cabeça do resultado, e um ponteiro 'cauda' que vai costurando. A cada passo, ligue a cauda ao menor entre l1 e l2 e avance esse lado. No fim, anexe o que sobrou.",
    solution: {
      python: `def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    cauda = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            cauda.next = l1
            l1 = l1.next
        else:
            cauda.next = l2
            l2 = l2.next
        cauda = cauda.next
    cauda.next = l1 if l1 else l2   # anexa o resto
    return dummy.next`,
      javascript: `function mergeTwoLists(l1, l2) {
  var dummy = new ListNode(0);
  var cauda = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cauda.next = l1;
      l1 = l1.next;
    } else {
      cauda.next = l2;
      l2 = l2.next;
    }
    cauda = cauda.next;
  }
  cauda.next = l1 ? l1 : l2; // anexa o resto
  return dummy.next;
}`,
    },
    solutionIdea:
      "Nó dummy + ponteiro cauda costurando o menor de cada vez. O(n+m), O(1) de espaço extra.",
    linked: { listArgs: [0, 1], listReturn: true },
  },

  "remove-nth-from-end": {
    title: "Remove Nth Node From End of List",
    statement: `Remova o **n-ésimo nó a partir do fim** da lista e retorne a cabeça. Tente fazer em **uma única passada**.

Exemplo: \`1 → 2 → 3 → 4 → 5\`, \`n = 2\` → remove o \`4\` → \`1 → 2 → 3 → 5\`.`,
    functionName: {
      python: "remove_nth_from_end",
      javascript: "removeNthFromEnd",
    },
    starter: {
      python: `def remove_nth_from_end(head, n):
    # remova o n-ésimo nó a partir do fim
    pass`,
      javascript: `function removeNthFromEnd(head, n) {
  // remova o n-ésimo nó a partir do fim
}`,
    },
    tests: [
      { args: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5] },
      { args: [[1], 1], expected: [] },
      { args: [[1, 2], 1], expected: [1] },
      { args: [[1, 2], 2], expected: [2] },
    ],
    hint: "Dois ponteiros com um intervalo fixo de n nós entre eles. Avance o 'fast' n passos primeiro; depois mova 'fast' e 'slow' juntos até fast chegar ao fim — slow para logo ANTES do nó a remover. Um nó dummy antes da cabeça evita tratar a remoção da cabeça como caso especial.",
    solution: {
      python: `def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    fast = dummy
    slow = dummy
    for _ in range(n):       # abre uma distância de n nós
        fast = fast.next
    while fast.next:         # anda os dois até o fim
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next   # pula o nó alvo
    return dummy.next`,
      javascript: `function removeNthFromEnd(head, n) {
  var dummy = new ListNode(0, head);
  var fast = dummy;
  var slow = dummy;
  for (var i = 0; i < n; i++) { // abre uma distância de n nós
    fast = fast.next;
  }
  while (fast.next) {           // anda os dois até o fim
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;   // pula o nó alvo
  return dummy.next;
}`,
    },
    solutionIdea:
      "Dois ponteiros com gap de n + nó dummy. fast chega ao fim e slow para antes do alvo. Uma passada, O(n)/O(1).",
    linked: { listArgs: [0], listReturn: true },
  },

  "reorder-list": {
    title: "Reorder List",
    statement: `Reordene a lista \`L0 → L1 → ... → Ln-1 → Ln\` para \`L0 → Ln → L1 → Ln-1 → L2 → ...\` (intercala do começo e do fim), **no lugar**. Retorne a cabeça.

Exemplo: \`1 → 2 → 3 → 4\` → \`1 → 4 → 2 → 3\`. \`1 → 2 → 3 → 4 → 5\` → \`1 → 5 → 2 → 4 → 3\`.`,
    functionName: { python: "reorder_list", javascript: "reorderList" },
    starter: {
      python: `def reorder_list(head):
    # reordene no lugar e retorne a cabeça
    pass`,
      javascript: `function reorderList(head) {
  // reordene no lugar e retorne a cabeça
}`,
    },
    tests: [
      { args: [[1, 2, 3, 4]], expected: [1, 4, 2, 3] },
      { args: [[1, 2, 3, 4, 5]], expected: [1, 5, 2, 4, 3] },
      { args: [[1]], expected: [1] },
    ],
    hint: "Este é um combo de três padrões: (1) ache o MEIO com lento/rápido; (2) REVERTA a segunda metade; (3) INTERCALE as duas metades. Cada peça você já praticou nas aulas anteriores.",
    solution: {
      python: `def reorder_list(head):
    if not head or not head.next:
        return head
    # 1) meio (lento/rápido)
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    # 2) reverte a segunda metade
    prev = None
    curr = slow.next
    slow.next = None
    while curr:
        nx = curr.next
        curr.next = prev
        prev = curr
        curr = nx
    # 3) intercala
    first = head
    second = prev
    while second:
        t1 = first.next
        t2 = second.next
        first.next = second
        second.next = t1
        first = t1
        second = t2
    return head`,
      javascript: `function reorderList(head) {
  if (!head || !head.next) return head;
  // 1) meio (lento/rápido)
  var slow = head;
  var fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // 2) reverte a segunda metade
  var prev = null;
  var curr = slow.next;
  slow.next = null;
  while (curr) {
    var nx = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nx;
  }
  // 3) intercala
  var first = head;
  var second = prev;
  while (second) {
    var t1 = first.next;
    var t2 = second.next;
    first.next = second;
    second.next = t1;
    first = t1;
    second = t2;
  }
  return head;
}`,
    },
    solutionIdea:
      "Combina os três padrões da seção: achar o meio (lento/rápido) + reverter a segunda metade + intercalar. O(n)/O(1).",
    linked: { listArgs: [0], listReturn: true },
  },

  "binary-search": {
    title: "Binary Search",
    statement: `Dado um array \`nums\` **ordenado em ordem crescente** e um \`target\`, retorne o **índice** de \`target\`. Se não existir, retorne \`-1\`. Espera-se O(log n).

Exemplo: \`nums = [-1, 0, 3, 5, 9, 12]\`, \`target = 9\` → \`4\`. \`target = 2\` → \`-1\`.`,
    functionName: { python: "binary_search", javascript: "binarySearch" },
    starter: {
      python: `def binary_search(nums, target):
    # o array está ordenado — aproveite isso!
    pass`,
      javascript: `function binarySearch(nums, target) {
  // o array está ordenado — aproveite isso!
}`,
    },
    tests: [
      { args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { args: [[5], 5], expected: 0 },
      { args: [[], 1], expected: -1 },
      { args: [[2, 4, 6, 8], 8], expected: 3 },
    ],
    hint: "Como o array é ordenado, olhe o elemento do MEIO: se for o alvo, achou; se for menor, o alvo só pode estar na metade direita; se for maior, na esquerda. A cada passo você descarta METADE — daí o O(log n).",
    solution: {
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
    return -1`,
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
}`,
    },
    solutionIdea:
      "Compare com o meio e descarte metade a cada passo. O(log n) de tempo, O(1) de espaço.",
  },

  "search-rotated": {
    title: "Search in Rotated Sorted Array",
    statement: `Um array ordenado foi **girado** em algum pivô desconhecido (ex.: \`[0,1,2,4,5,6,7]\` virou \`[4,5,6,7,0,1,2]\`). Dado \`nums\` e \`target\`, retorne o índice de \`target\` ou \`-1\`. Espera-se O(log n).

Exemplo: \`nums = [4,5,6,7,0,1,2]\`, \`target = 0\` → \`4\`.`,
    functionName: { python: "search", javascript: "search" },
    starter: {
      python: `def search(nums, target):
    # ainda dá para fazer busca binária num array girado!
    pass`,
      javascript: `function search(nums, target) {
  // ainda dá para fazer busca binária num array girado!
}`,
    },
    tests: [
      { args: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
      { args: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
      { args: [[1], 0], expected: -1 },
      { args: [[5, 1, 3], 5], expected: 0 },
      { args: [[6, 7, 8, 1, 2, 3, 4, 5], 8], expected: 2 },
    ],
    hint: "No meio, pelo menos UMA das metades está ordenada. Descubra qual (compare nums[left] com nums[mid]). Se o alvo cabe no intervalo ordenado, vá para lá; senão, vá para a outra metade. Ainda é O(log n).",
    solution: {
      python: `def search(nums, target):
    left = 0
    right = len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:        # esquerda ordenada
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:                              # direita ordenada
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1`,
      javascript: `function search(nums, target) {
  var left = 0;
  var right = nums.length - 1;
  while (left <= right) {
    var mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}`,
    },
    solutionIdea:
      "Uma metade sempre está ordenada; decida em qual o alvo cabe e descarte a outra. O(log n).",
  },

  "hamming-weight": {
    title: "Number of 1 Bits",
    statement: `Dado um inteiro não-negativo \`n\`, conte quantos **bits 1** há na sua representação binária (o "peso de Hamming").

Exemplo: \`n = 11\` (binário \`1011\`) → \`3\`. \`n = 128\` (binário \`10000000\`) → \`1\`.`,
    functionName: { python: "hamming_weight", javascript: "hammingWeight" },
    starter: {
      python: `def hamming_weight(n):
    # quantos bits 1 existem em n?
    pass`,
      javascript: `function hammingWeight(n) {
  // quantos bits 1 existem em n?
}`,
    },
    tests: [
      { args: [11], expected: 3 },
      { args: [128], expected: 1 },
      { args: [0], expected: 0 },
      { args: [255], expected: 8 },
      { args: [2147483647], expected: 31 },
    ],
    hint: "Você pode olhar o último bit com (n & 1) e deslocar n para a direita. Truque mais esperto: n & (n-1) apaga exatamente o bit 1 mais à direita — conte quantas vezes dá para fazer isso até n virar 0.",
    solution: {
      python: `def hamming_weight(n):
    count = 0
    while n != 0:
        n = n & (n - 1)   # apaga o bit 1 mais à direita
        count = count + 1
    return count`,
      javascript: `function hammingWeight(n) {
  var count = 0;
  while (n !== 0) {
    n = n & (n - 1); // apaga o bit 1 mais à direita
    count = count + 1;
  }
  return count;
}`,
    },
    solutionIdea:
      "n & (n-1) zera o bit 1 mais à direita; o número de repetições até n=0 é a quantidade de bits 1.",
  },

  "missing-number": {
    title: "Missing Number",
    statement: `Dado um array \`nums\` com \`n\` números distintos tirados de \`0..n\`, **um** número está faltando. Encontre-o. Tente fazer em O(n) tempo e O(1) de espaço extra.

Exemplo: \`nums = [3, 0, 1]\` (deveria ter 0,1,2,3) → falta o \`2\`.`,
    functionName: { python: "missing_number", javascript: "missingNumber" },
    starter: {
      python: `def missing_number(nums):
    # qual número de 0..n não está no array?
    pass`,
      javascript: `function missingNumber(nums) {
  // qual número de 0..n não está no array?
}`,
    },
    tests: [
      { args: [[3, 0, 1]], expected: 2 },
      { args: [[0, 1]], expected: 2 },
      { args: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8 },
      { args: [[0]], expected: 1 },
    ],
    hint: "Soma de 0..n menos a soma do array dá o que falta (O(1) espaço). Ou, sem risco de overflow, use XOR: a^a=0, então XOR de todos os índices 0..n com todos os valores cancela os pares e sobra o que falta.",
    solution: {
      python: `def missing_number(nums):
    res = len(nums)
    for i in range(len(nums)):
        res = res ^ i ^ nums[i]
    return res`,
      javascript: `function missingNumber(nums) {
  var res = nums.length;
  for (var i = 0; i < nums.length; i++) {
    res = res ^ i ^ nums[i];
  }
  return res;
}`,
    },
    solutionIdea:
      "XOR de todos os índices 0..n e de todos os valores: pares se cancelam (a^a=0), sobra o ausente. O(n), O(1).",
  },

  "counting-bits": {
    title: "Counting Bits",
    statement: `Dado um inteiro \`n\`, retorne um array \`ans\` de tamanho \`n+1\` onde \`ans[i]\` é a quantidade de bits 1 de \`i\`, para todo \`i\` de \`0\` a \`n\`. Tente fazer em O(n).

Exemplo: \`n = 5\` → \`[0, 1, 1, 2, 1, 2]\` (0,1,10,11,100,101).`,
    functionName: { python: "count_bits", javascript: "countBits" },
    starter: {
      python: `def count_bits(n):
    # quantos bits 1 tem cada número de 0 até n?
    pass`,
      javascript: `function countBits(n) {
  // quantos bits 1 tem cada número de 0 até n?
}`,
    },
    tests: [
      { args: [5], expected: [0, 1, 1, 2, 1, 2] },
      { args: [2], expected: [0, 1, 1] },
      { args: [0], expected: [0] },
    ],
    hint: "Contar bit a bit para cada número é O(n log n). Para O(n), reaproveite respostas anteriores: i tem os mesmos bits de i>>1 (i sem o último bit), MAIS o último bit (i & 1). Ou seja: ans[i] = ans[i >> 1] + (i & 1).",
    solution: {
      python: `def count_bits(n):
    ans = [0] * (n + 1)
    for i in range(1, n + 1):
        ans[i] = ans[i >> 1] + (i & 1)
    return ans`,
      javascript: `function countBits(n) {
  var ans = [0];
  for (var i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}`,
    },
    solutionIdea:
      "DP sobre bits: ans[i] = ans[i>>1] + (i&1). Cada resposta reusa uma já calculada. O(n).",
  },

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

  "valid-anagram": {
    title: "Valid Anagram",
    statement: `Dadas duas strings \`s\` e \`t\`, retorne \`true\` se \`t\` for um **anagrama** de \`s\` (mesmos caracteres, em qualquer ordem).

Exemplo: \`s = "listen"\`, \`t = "silent"\` → \`true\`. \`s = "rat"\`, \`t = "car"\` → \`false\`.`,
    functionName: { python: "is_anagram", javascript: "isAnagram" },
    starter: {
      python: `def is_anagram(s, t):
    # tente resolver!
    pass`,
      javascript: `function isAnagram(s, t) {
  // tente resolver!
}`,
    },
    tests: [
      { args: ["listen", "silent"], expected: true },
      { args: ["rat", "car"], expected: false },
      { args: ["aacc", "ccac"], expected: false },
      { args: ["anagram", "nagaram"], expected: true },
    ],
    hint: "A ordem não importa, só quantas vezes cada caractere aparece. E se você comparasse a contagem de caracteres das duas strings? (Ou: +1 para cada char de s, −1 para cada char de t — tudo tem que zerar.)",
    solution: {
      python: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    contagem = {}
    for c in s:
        contagem[c] = contagem.get(c, 0) + 1
    for c in t:
        contagem[c] = contagem.get(c, 0) - 1
        if contagem[c] < 0:
            return False
    return True`,
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  var contagem = {};
  for (var i = 0; i < s.length; i++) {
    contagem[s[i]] = (contagem[s[i]] || 0) + 1;
  }
  for (var j = 0; j < t.length; j++) {
    contagem[t[j]] = (contagem[t[j]] || 0) - 1;
    if (contagem[t[j]] < 0) return false;
  }
  return true;
}`,
    },
    solutionIdea:
      "Compare a assinatura de frequência: +1 por char de s, −1 por char de t. Tudo zera ⇒ anagrama. O(n), O(1) no alfabeto fixo.",
  },

  "longest-substring": {
    title: "Longest Substring Without Repeating Characters",
    statement: `Dada uma string \`s\`, retorne o **comprimento** da maior substring (contígua) **sem caracteres repetidos**.

Exemplo: \`s = "abcabcbb"\` → \`3\` (a substring "abc"). \`s = "bbbbb"\` → \`1\`.`,
    functionName: {
      python: "length_of_longest_substring",
      javascript: "lengthOfLongestSubstring",
    },
    starter: {
      python: `def length_of_longest_substring(s):
    # tente resolver!
    pass`,
      javascript: `function lengthOfLongestSubstring(s) {
  // tente resolver!
}`,
    },
    tests: [
      { args: ["abcabcbb"], expected: 3 },
      { args: ["bbbbb"], expected: 1 },
      { args: ["pwwkew"], expected: 3 },
      { args: [""], expected: 0 },
    ],
    hint: "Testar todas as substrings é O(n²). É uma substring contígua sob uma condição (sem repetição) → janela deslizante: expanda à direita; se o novo char já está na janela, encolha pela esquerda até remover a repetição.",
    solution: {
      python: `def length_of_longest_substring(s):
    seen = set()
    left = 0
    best = 0
    for right in range(len(s)):
        while s[right] in seen:
            seen.remove(s[left])
            left = left + 1
        seen.add(s[right])
        best = max(best, right - left + 1)
    return best`,
      javascript: `function lengthOfLongestSubstring(s) {
  var seen = {};
  var left = 0;
  var best = 0;
  for (var right = 0; right < s.length; right++) {
    while (seen[s[right]]) {
      delete seen[s[left]];
      left = left + 1;
    }
    seen[s[right]] = true;
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    },
    solutionIdea:
      "Sliding window com o conjunto de chars da janela como estado; cada char entra e sai no máximo uma vez. O(n).",
  },

  "valid-palindrome": {
    title: "Valid Palindrome",
    statement: `Dada uma string \`s\`, retorne \`true\` se ela for um **palíndromo**, considerando apenas letras e dígitos e **ignorando maiúsculas/minúsculas**.

Exemplo: \`"A man, a plan, a canal: Panama"\` → \`true\`. \`"race a car"\` → \`false\`.`,
    functionName: { python: "is_palindrome", javascript: "isPalindrome" },
    starter: {
      python: `def is_palindrome(s):
    # tente resolver!
    pass`,
      javascript: `function isPalindrome(s) {
  // tente resolver!
}`,
    },
    tests: [
      { args: ["A man, a plan, a canal: Panama"], expected: true },
      { args: ["race a car"], expected: false },
      { args: [" "], expected: true },
      { args: ["0P"], expected: false },
    ],
    hint: "Palíndromo é simétrico: o início espelha o fim. Dois ponteiros, um em cada ponta, indo em direção ao centro — pulando o que não é letra/dígito. Dá para fazer sem criar uma cópia 'limpa' da string?",
    solution: {
      python: `def is_palindrome(s):
    left = 0
    right = len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left = left + 1
        while left < right and not s[right].isalnum():
            right = right - 1
        if s[left].lower() != s[right].lower():
            return False
        left = left + 1
        right = right - 1
    return True`,
      javascript: `function isPalindrome(s) {
  function ok(c) {
    return /[a-z0-9]/i.test(c);
  }
  var left = 0;
  var right = s.length - 1;
  while (left < right) {
    while (left < right && !ok(s[left])) left = left + 1;
    while (left < right && !ok(s[right])) right = right - 1;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left = left + 1;
    right = right - 1;
  }
  return true;
}`,
    },
    solutionIdea:
      "Two pointers das pontas, pulando chars irrelevantes in-place. O(n) de tempo, O(1) de espaço (sem cópia).",
  },

  "valid-parentheses": {
    title: "Valid Parentheses",
    statement: `Dada uma string \`s\` com apenas \`()[]{}\`, retorne \`true\` se os parênteses estiverem **corretamente balanceados** (cada abertura fecha com o tipo certo, na ordem certa).

Exemplo: \`"()[]{}"\` → \`true\`. \`"(]"\` → \`false\`. \`"([)]"\` → \`false\`.`,
    functionName: { python: "is_valid", javascript: "isValid" },
    starter: {
      python: `def is_valid(s):
    # tente resolver!
    pass`,
      javascript: `function isValid(s) {
  // tente resolver!
}`,
    },
    tests: [
      { args: ["()"], expected: true },
      { args: ["()[]{}"], expected: true },
      { args: ["(]"], expected: false },
      { args: ["([)]"], expected: false },
      { args: ["{[]}"], expected: true },
    ],
    hint: "Cada fechamento deve casar com a abertura MAIS RECENTE ainda aberta. 'Mais recente' = topo de uma pilha: empilhe aberturas; a cada fechamento, desempilhe e confira. No fim, a pilha tem que estar vazia.",
    solution: {
      python: `def is_valid(s):
    pares = {")": "(", "]": "[", "}": "{"}
    pilha = []
    for c in s:
        if c in pares:
            if not pilha or pilha.pop() != pares[c]:
                return False
        else:
            pilha.append(c)
    return len(pilha) == 0`,
      javascript: `function isValid(s) {
  var pares = { ")": "(", "]": "[", "}": "{" };
  var pilha = [];
  for (var i = 0; i < s.length; i++) {
    var c = s[i];
    if (pares[c] !== undefined) {
      if (pilha.length === 0 || pilha.pop() !== pares[c]) return false;
    } else {
      pilha.push(c);
    }
  }
  return pilha.length === 0;
}`,
    },
    solutionIdea:
      "Pilha (LIFO): empilhe aberturas, case cada fechamento com o topo, exija pilha vazia no fim. O(n) tempo, O(n) espaço.",
  },

  "encode-decode": {
    title: "Encode and Decode Strings",
    statement: `Implemente \`round_trip(strs)\` que **codifica** uma lista de strings numa única string e depois a **decodifica** de volta, retornando a lista original — funcionando para **qualquer** conteúdo (inclusive strings com \`#\`, números ou vazias).

Exemplo: \`["abc", "de"]\` → (codifica e decodifica) → \`["abc", "de"]\`. Dica de armadilha: \`["a#2#b", "c"]\` tem que voltar intacto.`,
    functionName: { python: "round_trip", javascript: "roundTrip" },
    starter: {
      python: `def round_trip(strs):
    # 1) codifique strs numa unica string
    # 2) decodifique de volta e retorne a lista
    pass`,
      javascript: `function roundTrip(strs) {
  // 1) codifique strs numa unica string
  // 2) decodifique de volta e retorne a lista
}`,
    },
    tests: [
      { args: [["abc", "de"]], expected: ["abc", "de"] },
      { args: [["a#2#b", "c"]], expected: ["a#2#b", "c"] },
      { args: [[""]], expected: [""] },
      { args: [[]], expected: [] },
    ],
    hint: "Um separador (vírgula, #) é ambíguo: o dado pode contê-lo. Em vez de marcar onde cada pedaço TERMINA, marque quanto ele MEDE: '<comprimento>#<conteúdo>'. Na decodificação, leia o número e pegue exatamente aquela quantidade de caracteres.",
    solution: {
      python: `def round_trip(strs):
    # codifica: <comprimento>#<conteudo>
    encoded = ""
    for x in strs:
        encoded += str(len(x)) + "#" + x
    # decodifica
    res = []
    i = 0
    while i < len(encoded):
        j = i
        while encoded[j] != "#":
            j = j + 1
        tamanho = int(encoded[i:j])
        inicio = j + 1
        res.append(encoded[inicio:inicio + tamanho])
        i = inicio + tamanho
    return res`,
      javascript: `function roundTrip(strs) {
  var encoded = "";
  for (var i = 0; i < strs.length; i++) {
    encoded += strs[i].length + "#" + strs[i];
  }
  var res = [];
  var k = 0;
  while (k < encoded.length) {
    var j = k;
    while (encoded[j] !== "#") j = j + 1;
    var tamanho = parseInt(encoded.slice(k, j), 10);
    var inicio = j + 1;
    res.push(encoded.slice(inicio, inicio + tamanho));
    k = inicio + tamanho;
  }
  return res;
}`,
    },
    solutionIdea:
      "Length-prefix: <comprimento>#<conteúdo>. O decodificador conta caracteres em vez de procurar separadores, então nenhum conteúdo é ambíguo. O(n).",
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
