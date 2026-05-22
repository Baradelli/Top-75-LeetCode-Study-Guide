# Find Minimum in Rotated Sorted Array

Link do problema:
https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/

## O problema

Dado um array ordenado que foi rotacionado, precisamos encontrar o menor valor.

O array era originalmente crescente, mas foi deslocado algumas posições.

## Como a solução funciona

Como o array continua tendo partes ordenadas, podemos usar busca binária.

A ideia é:

1. Verificar se o trecho atual já está totalmente ordenado
2. Se estiver, o menor valor está na ponta esquerda
3. Se não estiver, olhamos o meio
4. Dependendo do valor do meio, decidimos se o menor está à esquerda ou à direita

Assim, eliminamos metade do array por vez.

## Exemplo rápido

Se `nums = [3, 4, 5, 1, 2]`:

- o array não está totalmente ordenado
- o menor valor está na parte rotacionada
- usando busca binária, chegamos no valor `1`

## Resultado dos exemplos

### Exemplo 1

```js
nums = [3, 4, 5, 1, 2]
resultado = 1
```

### Exemplo 2

```js
nums = [4, 5, 6, 7, 0, 1, 2]
resultado = 0
```

### Exemplo 3

```js
nums = [11, 13, 15, 17]
resultado = 11
```

## Complexidade

- Tempo: `O(log n)`
- Espaço: `O(1)`

## Resumo

Essa solução é eficiente porque usa busca binária para encontrar o menor valor sem precisar percorrer todo o array.
