# Invert Binary Tree

Link do problema:
https://leetcode.com/problems/invert-binary-tree/

## O problema

Recebemos a raiz de uma árvore binária.

Precisamos inverter a árvore e retornar sua raiz.

Inverter a árvore significa trocar o lado esquerdo e o lado direito de cada nó.

## Como a solução funciona

A solução usa recursão.

Se a raiz for `null`, retornamos `null`.

Caso contrário, trocamos os filhos esquerdo e direito do nó atual.

Depois repetimos o mesmo processo para os dois filhos.

No final, a própria raiz aponta para a árvore invertida.

## Exemplo rápido

Se:

```js
root = [2, 1, 3]
```

Depois de inverter, o filho esquerdo vira o direito e o direito vira o esquerdo.

O resultado é:

```js
[2, 3, 1]
```

## Resultado dos exemplos

### Exemplo 1

```js
root = [4, 2, 7, 1, 3, 6, 9]
resultado = [4, 7, 2, 9, 6, 3, 1]
```

### Exemplo 2

```js
root = [2, 1, 3]
resultado = [2, 3, 1]
```

### Exemplo 3

```js
root = []
resultado = []
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(h)`

Onde `n` é a quantidade de nós da árvore e `h` é a altura da árvore.

## Resumo

Essa solução visita cada nó uma vez e troca seus filhos, criando a imagem espelhada da árvore.
