# Climbing Stairs

Link do problema:
https://leetcode.com/problems/climbing-stairs/

## O problema

Você está subindo uma escada com `n` degraus.

Em cada movimento, pode subir:

- `1` degrau
- `2` degraus

Precisamos descobrir quantas formas diferentes existem para chegar ao topo.

## Como a solução funciona

Essa solução percebe que, para chegar ao degrau atual, só existem duas origens possíveis:

- vir do degrau anterior
- vir de dois degraus antes

Então a quantidade de formas no degrau atual é a soma dessas duas quantidades anteriores.

No código, guardamos apenas os dois últimos valores:

```js
oneStepAhead = oneStepAhead + twoStepsAhead;
twoStepsAhead = currentWays;
```

Assim evitamos criar um array e mantemos a solução simples.

## Exemplo rápido

Se:

```js
n = 3
```

As formas possíveis são:

1. `1 + 1 + 1`
2. `1 + 2`
3. `2 + 1`

Resultado:

```js
3
```

## Resultado dos exemplos

### Exemplo 1

```js
n = 2
resultado = 2
```

### Exemplo 2

```js
n = 3
resultado = 3
```

### Exemplo 3

```js
n = 5
resultado = 8
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Esse problema segue a mesma ideia da sequência de Fibonacci: cada resposta depende das duas anteriores. A solução fica eficiente porque guarda só o necessário.
