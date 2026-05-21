# Longest Consecutive Sequence

Link do problema:
https://leetcode.com/problems/longest-consecutive-sequence/

## O problema

Recebemos um array `nums` fora de ordem.

Precisamos descobrir o tamanho da maior sequência de números consecutivos.

Os números da sequência não precisam estar lado a lado no array original.

## Como a solução funciona

A solução coloca todos os números em um `Set`.

Isso permite verificar rapidamente se um número existe.

Depois ela só começa a contar uma sequência quando encontra o início dela:

```js
if (!numSet.has(n - 1)) {
```

Se não existe `n - 1`, então `n` é o primeiro número daquela sequência.

A partir daí, ela avança enquanto os próximos valores consecutivos existirem no conjunto.

## Exemplo rápido

Se:

```js
nums = [100, 4, 200, 1, 3, 2]
```

A maior sequência consecutiva é:

```js
[1, 2, 3, 4]
```

Então o resultado é:

```js
4
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [100, 4, 200, 1, 3, 2]
resultado = 4
```

### Exemplo 2

```js
nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
resultado = 9
```

### Exemplo 3

```js
nums = [1, 0, 1, 2]
resultado = 3
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(n)`

## Resumo

Essa solução usa um `Set` para encontrar rapidamente o começo de cada sequência. Depois conta o tamanho apenas a partir desses começos, evitando trabalho repetido.
