# Number of Connected Components in an Undirected Graph

Link do problema:
https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/

## O problema

Recebemos `n` nós numerados de `0` até `n - 1`.

Também recebemos um array `edges` com conexões entre esses nós.

Precisamos descobrir quantos componentes conectados existem no grafo.

Um componente conectado é um grupo de nós em que todos conseguem alcançar uns aos outros.

## Como a solução funciona

A solução monta uma lista de adjacência para representar o grafo.

Depois percorre todos os nós.

Sempre que encontra um nó ainda não visitado, isso significa que começou um novo componente.

Nesse momento:

- marca o nó como visitado
- roda DFS para visitar todos os nós ligados a ele
- soma `1` na resposta

Assim, cada DFS consome exatamente um componente inteiro.

## Exemplo rápido

Se:

```js
n = 5
edges = [[0, 1], [1, 2], [3, 4]]
```

Temos dois grupos:

```js
[0, 1, 2] e [3, 4]
```

Então o resultado é:

```js
2
```

## Resultado dos exemplos

### Exemplo 1

```js
n = 5
edges = [[0, 1], [1, 2], [3, 4]]
resultado = 2
```

### Exemplo 2

```js
n = 5
edges = [[0, 1], [1, 2], [2, 3], [3, 4]]
resultado = 1
```

### Exemplo 3

```js
n = 6
edges = [[0, 1], [2, 3], [4, 5]]
resultado = 3
```

## Complexidade

- Tempo: `O(n + quantidadeDeArestas)`
- Espaço: `O(n + quantidadeDeArestas)`

## Resumo

Essa solução percorre o grafo com DFS. Cada vez que encontra um nó ainda não visitado, identifica um novo componente conectado e conta mais um.
