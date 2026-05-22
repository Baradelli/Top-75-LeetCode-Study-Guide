# House Robber

Link do problema:
https://leetcode.com/problems/house-robber/

## O problema

Dado um array `nums`, em que cada valor representa o dinheiro em uma casa, precisamos descobrir o maior valor que pode ser roubado.

A regra é:

- não podemos roubar duas casas vizinhas

## Como a solução funciona

Essa solução usa a ideia de programação dinâmica, mas sem precisar de array auxiliar.

Em cada casa, existem duas opções:

- roubar a casa atual e somar com o melhor valor de duas casas antes
- pular a casa atual e manter o melhor valor anterior

No código:

```js
const currentBest = Math.max(num + rob1, rob2);
```

Onde:

- `rob1` guarda o melhor valor até duas casas antes
- `rob2` guarda o melhor valor até a casa anterior

Depois atualizamos esses valores para a próxima iteração.

## Exemplo rápido

Se:

```js
nums = [1, 2, 3, 1]
```

A melhor escolha é roubar:

```js
1 + 3
```

Resultado:

```js
4
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [1, 2, 3, 1]
resultado = 4
```

### Exemplo 2

```js
nums = [2, 7, 9, 3, 1]
resultado = 12
```

### Exemplo 3

```js
nums = [2, 1, 1, 2]
resultado = 4
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução percorre o array uma vez e, em cada passo, decide entre roubar a casa atual ou manter a melhor resposta já encontrada.
