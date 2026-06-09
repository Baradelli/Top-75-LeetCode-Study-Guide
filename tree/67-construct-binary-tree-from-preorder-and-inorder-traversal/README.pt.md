# Construct Binary Tree from Preorder and Inorder Traversal

Link do problema:
https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

## O problema

Recebemos dois arrays: `preorder` e `inorder`.

Eles representam os percursos de uma mesma árvore binária.

Precisamos reconstruir a árvore original e retornar sua raiz.

## Como a solução funciona

A solução usa recursão.

No percurso `preorder`, o primeiro valor sempre é a raiz da árvore atual.

Depois encontramos essa raiz dentro do `inorder`.

Tudo que está à esquerda da raiz no `inorder` pertence à subárvore esquerda.

Tudo que está à direita pertence à subárvore direita.

Com esses pedaços, repetimos o processo para montar os filhos esquerdo e direito.

## Exemplo rápido

Se:

```js
preorder = [3, 9, 20, 15, 7]
inorder = [9, 3, 15, 20, 7]
```

A raiz é `3`, porque é o primeiro valor do `preorder`.

No `inorder`, o `9` fica à esquerda de `3`, e `15, 20, 7` ficam à direita.

O resultado é:

```js
[3, 9, 20, null, null, 15, 7]
```

## Resultado dos exemplos

### Exemplo 1

```js
preorder = [3, 9, 20, 15, 7]
inorder = [9, 3, 15, 20, 7]
resultado = [3, 9, 20, null, null, 15, 7]
```

### Exemplo 2

```js
preorder = [-1]
inorder = [-1]
resultado = [-1]
```

### Exemplo 3

```js
preorder = [1, 2]
inorder = [2, 1]
resultado = [1, 2]
```

## Complexidade

- Tempo: `O(n²)`
- Espaço: `O(n)`

Onde `n` é a quantidade de nós da árvore.

## Resumo

Essa solução usa o primeiro valor do `preorder` como raiz e divide o `inorder` para reconstruir recursivamente as subárvores.
