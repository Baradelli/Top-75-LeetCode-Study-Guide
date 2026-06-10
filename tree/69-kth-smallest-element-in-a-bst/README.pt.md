# Kth Smallest Element in a BST

Link do problema:
https://leetcode.com/problems/kth-smallest-element-in-a-bst/

## O problema

Recebemos a raiz de uma árvore binária de busca e um número `k`.

Precisamos retornar o k-ésimo menor valor da árvore.

O `k` começa em `1`, então `k = 1` significa o menor valor.

## Como a solução funciona

A solução usa a propriedade da BST.

Em uma árvore binária de busca, uma travessia em ordem visita os valores em ordem crescente.

Então percorremos a árvore nesta ordem: esquerda, nó atual, direita.

Cada vez que visitamos um nó, diminuímos `k`.

Quando `k` chega a `0`, encontramos o k-ésimo menor valor.

## Exemplo rápido

Se:

```js
root = [3, 1, 4, null, 2]
k = 1
```

A travessia em ordem gera os valores:

```js
[1, 2, 3, 4]
```

O primeiro menor valor é:

```js
1
```

## Resultado dos exemplos

### Exemplo 1

```js
root = [3, 1, 4, null, 2]
k = 1
resultado = 1
```

### Exemplo 2

```js
root = [5, 3, 6, 2, 4, null, null, 1]
k = 3
resultado = 3
```

### Exemplo 3

```js
root = [2, 1]
k = 2
resultado = 2
```

## Complexidade

- Tempo: `O(h + k)`
- Espaço: `O(h)`

Onde `h` é a altura da árvore.

## Resumo

Essa solução faz uma travessia em ordem iterativa e para assim que encontra o k-ésimo menor valor.
