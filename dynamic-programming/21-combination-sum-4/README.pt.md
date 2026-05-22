# Combination Sum IV

Link do problema:
https://leetcode.com/problems/combination-sum-iv/

## O problema

Dado um array `nums` com números distintos e um inteiro `target`, precisamos descobrir quantas sequências diferentes somam exatamente esse valor.

Aqui a ordem importa.

Isso significa que:

- `[1, 2, 1]` conta
- `[2, 1, 1]` também conta como outra forma

## Como a solução funciona

Essa solução usa programação dinâmica.

Criamos uma estrutura `dp` em que:

```js
dp[total]
```

guarda quantas formas existem para montar o valor `total`.

Começamos com:

```js
dp[0] = 1
```

porque existe exatamente uma forma de formar `0`: não escolher nada.

Depois calculamos os valores de `1` até `target`.

Para cada total, testamos todos os números:

```js
dp[total] += dp[total - num] || 0;
```

Se `total - num` já tinha algumas formas válidas, então podemos adicionar `num` no final de cada uma delas.

## Exemplo rápido

Se:

```js
nums = [1, 2, 3]
target = 4
```

As sequências possíveis são:

```js
[1, 1, 1, 1]
[1, 1, 2]
[1, 2, 1]
[1, 3]
[2, 1, 1]
[2, 2]
[3, 1]
```

Resultado:

```js
7
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [1, 2, 3]
target = 4
resultado = 7
```

### Exemplo 2

```js
nums = [9]
target = 3
resultado = 0
```

### Exemplo 3

```js
nums = [2, 4, 6]
target = 8
resultado = 7
```

## Complexidade

- Tempo: `O(target * quantidadeDeNumeros)`
- Espaço: `O(target)`

## Resumo

Essa solução constrói a resposta do menor total até o maior. Para cada valor, ela soma quantas sequências válidas já existiam para os totais anteriores.
