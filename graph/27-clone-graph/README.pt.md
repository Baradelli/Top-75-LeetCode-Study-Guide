# Clone Graph

Link do problema:
https://leetcode.com/problems/clone-graph/

## O problema

Dado um nó de entrada de um grafo não direcionado, precisamos criar uma cópia completa desse grafo.

Essa cópia deve ser profunda.

Isso significa que:

- os valores devem ser os mesmos
- as conexões devem ser as mesmas
- os nós clonados não podem ser os mesmos objetos originais

## Como a solução funciona

Essa solução usa busca em profundidade com um `Map`.

Criamos:

```js
oldToNew
```

Esse mapa guarda a relação entre:

- nó original
- nó clonado

Quando visitamos um nó:

1. se ele já foi clonado, reutilizamos a cópia
2. se ainda não foi clonado, criamos um novo nó
3. depois clonamos todos os vizinhos recursivamente

No código:

```js
if (oldToNew.has(currentNode)) {
  return oldToNew.get(currentNode);
}
```

Isso evita loop infinito em grafos com ciclos.

## Exemplo rápido

Se:

```js
adjList = [[2,4],[1,3],[2,4],[1,3]]
```

Isso representa um grafo com 4 nós em que cada nó aponta para seus vizinhos.

A cópia criada precisa ter a mesma lista de adjacência:

```js
[[2,4],[1,3],[2,4],[1,3]]
```

## Resultado dos exemplos

### Exemplo 1

```js
adjList = [[2,4],[1,3],[2,4],[1,3]]
resultado = [[2,4],[1,3],[2,4],[1,3]]
```

### Exemplo 2

```js
adjList = [[]]
resultado = [[]]
```

### Exemplo 3

```js
adjList = []
resultado = []
```

## Complexidade

- Tempo: `O(V + E)`
- Espaço: `O(V)`

Onde:

- `V` é a quantidade de nós
- `E` é a quantidade de arestas

## Resumo

Essa solução percorre o grafo uma vez e usa um mapa para garantir que cada nó seja clonado apenas uma vez.
