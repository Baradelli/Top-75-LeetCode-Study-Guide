# Best Time to Buy and Sell Stock

Link do problema:
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

## O problema

Dado um array `prices`, onde cada valor representa o preço da ação em um dia, precisamos descobrir o maior lucro possível comprando em um dia e vendendo em outro dia depois.

## Como a solução funciona

Percorremos o array uma vez só, guardando:

- o menor preço visto até agora
- o maior lucro encontrado até agora

Em cada posição:

1. Verificamos se o preço atual é o menor já visto
2. Calculamos o lucro se vendermos no dia atual
3. Atualizamos o maior lucro quando esse valor for melhor

## Exemplo rápido

Se `prices = [7, 1, 5, 3, 6, 4]`:

- começamos com menor preço `7`
- encontramos `1`, então ele vira o novo menor preço
- quando chegamos em `6`, o lucro é `6 - 1 = 5`

Esse é o maior lucro possível, então a resposta é `5`.

## Resultado dos exemplos

### Exemplo 1

```js
prices = [7, 1, 5, 3, 6, 4]
resultado = 5
```

### Exemplo 2

```js
prices = [7, 6, 4, 3, 1]
resultado = 0
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução é eficiente porque analisa o array apenas uma vez e acompanha o menor preço para calcular rapidamente o melhor lucro.
