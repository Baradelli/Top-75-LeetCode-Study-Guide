# Validate Binary Search Tree

Link do problema:
https://leetcode.com/problems/validate-binary-search-tree/

## O problema

Recebemos a raiz de uma árvore binária.

Precisamos verificar se ela é uma árvore binária de busca válida.

Em uma BST válida, todos os valores da subárvore esquerda precisam ser menores que o nó atual, e todos os valores da subárvore direita precisam ser maiores.

Essa regra também precisa valer para todas as subárvores.

## Como a solução funciona

A solução usa recursão com limites.

Para cada nó, guardamos o menor e o maior valor que ele pode ter.

No começo, a raiz pode estar entre `-Infinity` e `Infinity`.

Quando vamos para a esquerda, o valor máximo passa a ser o valor do nó atual.

Quando vamos para a direita, o valor mínimo passa a ser o valor do nó atual.

Se algum nó ficar fora desses limites, a árvore não é uma BST válida.

## Exemplo rápido

Se:

```js
root = [2, 1, 3]
```

O valor `1` está à esquerda de `2`, e o valor `3` está à direita de `2`.

O resultado é:

```js
true
```

## Resultado dos exemplos

### Exemplo 1

```js
root = [2, 1, 3]
resultado = true
```

### Exemplo 2

```js
root = [5, 1, 4, null, null, 3, 6]
resultado = false
```

### Exemplo 3

```js
root = [5, 4, 6, null, null, 3, 7]
resultado = false
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(h)`

Onde `n` é a quantidade de nós da árvore e `h` é a altura da árvore.

## Resumo

Essa solução percorre a árvore validando se cada nó respeita os limites permitidos para sua posição.
