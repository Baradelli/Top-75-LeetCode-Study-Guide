# Binary Tree Level Order Traversal

Link do problema:
https://leetcode.com/problems/binary-tree-level-order-traversal/

## O problema

Recebemos a raiz de uma árvore binária.

Precisamos retornar os valores dos nós por nível, da esquerda para a direita.

Cada nível deve ficar dentro de um array separado.

## Como a solução funciona

A solução usa busca em profundidade com recursão.

Começamos na raiz com profundidade `0`.

Quando visitamos um nó, colocamos seu valor no array correspondente à profundidade atual.

Se ainda não existir um array para aquela profundidade, criamos um novo.

Depois visitamos o filho esquerdo e o filho direito aumentando a profundidade em `1`.

## Exemplo rápido

Se:

```js
root = [3, 9, 20, null, null, 15, 7]
```

Os níveis são:

```js
[[3], [9, 20], [15, 7]]
```

O resultado é:

```js
[[3], [9, 20], [15, 7]]
```

## Resultado dos exemplos

### Exemplo 1

```js
root = [3, 9, 20, null, null, 15, 7]
resultado = [[3], [9, 20], [15, 7]]
```

### Exemplo 2

```js
root = [1]
resultado = [[1]]
```

### Exemplo 3

```js
root = []
resultado = []
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(h)`

Onde `n` é a quantidade de nós da árvore e `h` é a altura da árvore usada pela pilha de recursão.

## Resumo

Essa solução percorre a árvore e agrupa cada valor de acordo com a profundidade do nó.
