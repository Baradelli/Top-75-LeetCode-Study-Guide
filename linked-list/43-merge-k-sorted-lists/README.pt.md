# Merge k Sorted Lists

Link do problema:
https://leetcode.com/problems/merge-k-sorted-lists/

## O problema

Recebemos um array `lists` com várias listas ligadas já ordenadas.

Precisamos juntar todas elas em uma única lista ligada também ordenada.

## Como a solução funciona

A solução faz junções em pares.

Enquanto existir mais de uma lista, percorremos o array de duas em duas:

- juntamos a lista `0` com a `1`
- depois a `2` com a `3`
- e assim por diante

Cada par é unido usando a mesma ideia do problema de merge entre duas listas ordenadas.

Depois disso, formamos um novo array de listas já mescladas.

Repetimos o processo até sobrar apenas uma lista.

## Exemplo rápido

Se:

```js
lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
```

Primeiro juntamos listas em pares.

No fim, todos os valores ficam em ordem:

```js
[1, 1, 2, 3, 4, 4, 5, 6]
```

## Resultado dos exemplos

### Exemplo 1

```js
lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
resultado = [1, 1, 2, 3, 4, 4, 5, 6]
```

### Exemplo 2

```js
lists = []
resultado = []
```

### Exemplo 3

```js
lists = [[]]
resultado = []
```

## Complexidade

- Tempo: `O(n log k)`
- Espaço: `O(1)` extra, sem contar a estrutura de entrada

`n` é o total de nós e `k` é o número de listas.

## Resumo

Essa solução reduz o problema aos poucos, unindo listas em pares até sobrar apenas uma. Isso aproveita a lógica de merge ordenado e evita juntar tudo de uma vez.
