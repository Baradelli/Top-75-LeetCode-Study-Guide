# Maximum Subarray

Link do problema:
https://leetcode.com/problems/maximum-subarray/

## O problema

Dado um array `nums`, precisamos encontrar a maior soma possível de um subarray contínuo.

Subarray contínuo significa pegar uma sequência de elementos vizinhos dentro do array.

## Como a solução funciona

Essa solução usa o algoritmo de Kadane.

A ideia é simples:

- `currentSum` guarda a melhor soma terminando na posição atual
- `maxSum` guarda a melhor soma encontrada no array inteiro

Em cada passo, escolhemos entre:

1. começar um novo subarray no número atual
2. continuar o subarray anterior somando o número atual

Depois atualizamos o maior valor encontrado.

## Exemplo rápido

Se `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`:

O melhor trecho é:

```js
[4, -1, 2, 1]
```

A soma é:

```js
6
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
resultado = 6
```

### Exemplo 2

```js
nums = [1]
resultado = 1
```

### Exemplo 3

```js
nums = [5, 4, -1, 7, 8]
resultado = 23
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução é eficiente porque percorre o array uma vez só e decide em cada posição se vale mais a pena recomeçar a soma ou continuar o trecho atual.
