# 3Sum

Link do problema:
https://leetcode.com/problems/3sum/

## O problema

Dado um array `nums`, precisamos encontrar todos os trios diferentes cuja soma seja igual a `0`.

A resposta não pode ter trios duplicados.

## Como a solução funciona

A solução faz isso em duas etapas:

1. Ordena o array
2. Para cada posição, usa dois ponteiros para procurar os outros dois números

Depois de ordenar:

- fixamos um número em `i`
- usamos `l` na esquerda e `r` na direita
- se a soma for maior que `0`, diminuímos `r`
- se a soma for menor que `0`, aumentamos `l`
- se a soma for `0`, salvamos o trio

Também pulamos valores repetidos para evitar duplicatas.

## Exemplo rápido

Se `nums = [-1, 0, 1, 2, -1, -4]`, depois de ordenar temos:

```js
[-4, -1, -1, 0, 1, 2]
```

Os trios válidos são:

```js
[[-1, -1, 2], [-1, 0, 1]]
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [-1, 0, 1, 2, -1, -4]
resultado = [[-1, -1, 2], [-1, 0, 1]]
```

### Exemplo 2

```js
nums = [0, 1, 1]
resultado = []
```

### Exemplo 3

```js
nums = [0, 0, 0]
resultado = [[0, 0, 0]]
```

## Complexidade

- Tempo: `O(n^2)`
- Espaço extra: `O(1)`

Observação:
Se considerar a resposta final, o espaço total depende da quantidade de trios encontrados.

## Resumo

Essa solução é eficiente porque ordena o array uma vez e depois usa dois ponteiros para encontrar os trios sem repetir combinações.
