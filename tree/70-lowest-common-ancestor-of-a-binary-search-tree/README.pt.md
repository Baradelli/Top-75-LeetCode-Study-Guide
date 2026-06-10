# Lowest Common Ancestor of a Binary Search Tree

Link do problema:
https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

## O problema

Recebemos a raiz de uma árvore binária de busca e dois nós: `p` e `q`.

Precisamos encontrar o ancestral comum mais baixo desses dois nós.

Um nó também pode ser ancestral de si mesmo.

## Como a solução funciona

A solução usa a propriedade da BST.

Se `p` e `q` são maiores que o nó atual, os dois estão na subárvore direita.

Se `p` e `q` são menores que o nó atual, os dois estão na subárvore esquerda.

Quando eles ficam em lados diferentes, ou quando o nó atual é um deles, encontramos o ancestral comum mais baixo.

## Exemplo rápido

Se:

```js
root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
p = 2
q = 8
```

O nó `2` fica à esquerda de `6`, e o nó `8` fica à direita.

Então o ancestral comum mais baixo é:

```js
6
```

## Resultado dos exemplos

### Exemplo 1

```js
root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
p = 2
q = 8
resultado = 6
```

### Exemplo 2

```js
root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
p = 2
q = 4
resultado = 2
```

### Exemplo 3

```js
root = [2, 1]
p = 2
q = 1
resultado = 2
```

## Complexidade

- Tempo: `O(h)`
- Espaço: `O(1)`

Onde `h` é a altura da árvore.

## Resumo

Essa solução caminha pela BST até encontrar o ponto em que `p` e `q` deixam de estar do mesmo lado.
