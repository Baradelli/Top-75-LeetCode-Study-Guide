# House Robber II

Link do problema:
https://leetcode.com/problems/house-robber-ii/

## O problema

Dado um array `nums`, em que cada valor representa o dinheiro em uma casa, precisamos descobrir o maior valor que pode ser roubado.

A diferença aqui é que as casas estão em círculo.

Isso significa que:

- a primeira casa é vizinha da última
- não podemos roubar as duas ao mesmo tempo

## Como a solução funciona

Essa solução reaproveita a ideia do problema anterior.

Se as casas estão em círculo, então só existem dois casos possíveis:

1. ignorar a primeira casa e resolver o resto
2. ignorar a última casa e resolver o resto

Depois pegamos o maior resultado entre esses dois casos.

Para resolver cada caso linear, usamos a mesma lógica do `House Robber`:

```js
const currentBest = Math.max(num + rob1, rob2);
```

Onde:

- `rob1` guarda o melhor valor até duas casas antes
- `rob2` guarda o melhor valor até a casa anterior

Também tratamos separadamente o caso em que existe apenas uma casa.

## Exemplo rápido

Se:

```js
nums = [2, 3, 2]
```

Não podemos roubar a primeira e a última juntas, porque são vizinhas.

Então a melhor escolha é:

```js
3
```

Resultado:

```js
3
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [2, 3, 2]
resultado = 3
```

### Exemplo 2

```js
nums = [1, 2, 3, 1]
resultado = 4
```

### Exemplo 3

```js
nums = [1, 2, 3]
resultado = 3
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução transforma o problema circular em dois problemas lineares. Depois disso, basta aplicar a mesma lógica simples do `House Robber`.
