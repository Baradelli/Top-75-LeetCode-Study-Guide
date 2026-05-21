# Graph Valid Tree

Link do problema:
https://leetcode.com/problems/graph-valid-tree/

## O problema

Recebemos `n` nós numerados de `0` até `n - 1`.

Também recebemos um array `edges` com as conexões entre esses nós.

Precisamos verificar se esse grafo forma uma árvore válida.

Uma árvore válida precisa ter duas características:

- não pode ter ciclo
- todos os nós precisam estar conectados

## Como a solução funciona

A solução começa com uma regra importante:

```js
edges.length === n - 1
```

Se isso não for verdade, já retornamos `false`.

Depois montamos uma lista de adjacência para representar o grafo e usamos DFS.

Durante a busca, guardamos os nós visitados em um `Set`.

Se a DFS encontrar um nó já visitado que não seja o pai atual, existe ciclo.

No final, além de não ter ciclo, o tamanho de `visited` precisa ser igual a `n`.

Isso garante que todo o grafo está conectado.

## Exemplo rápido

Se:

```js
n = 5
edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
```

Temos 5 nós e 4 arestas, sem ciclo, e todos os nós são alcançados.

Então o resultado é:

```js
true
```

## Resultado dos exemplos

### Exemplo 1

```js
n = 5
edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
resultado = true
```

### Exemplo 2

```js
n = 5
edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
resultado = false
```

### Exemplo 3

```js
n = 4
edges = [[0, 1], [2, 3], [1, 2]]
resultado = true
```

## Complexidade

- Tempo: `O(n + quantidadeDeArestas)`
- Espaço: `O(n + quantidadeDeArestas)`

## Resumo

Essa solução verifica primeiro se a quantidade de arestas é válida. Depois usa DFS para confirmar que não existe ciclo e que todos os nós pertencem ao mesmo componente.
