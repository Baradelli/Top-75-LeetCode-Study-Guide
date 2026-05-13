# Coin Change

Link do problema:
https://leetcode.com/problems/coin-change/

## O problema

Dado um array `coins` com valores de moedas e um inteiro `amount`, precisamos descobrir o menor número de moedas necessário para formar esse valor.

Se não for possível montar o valor, a resposta deve ser `-1`.

## Como a solução funciona

Essa solução usa programação dinâmica.

A ideia é calcular, para cada valor de `0` até `amount`, qual é a menor quantidade de moedas necessária.

Criamos um array `dp` em que:

```js
dp[a]
```

guarda a melhor resposta para o valor `a`.

Começamos com:

```js
dp[0] = 0
```

porque zero moedas são necessárias para formar o valor `0`.

Depois, para cada valor atual, testamos todas as moedas que cabem nele:

```js
const candidate = dp[currentAmount - coin] + 1;
```

Se essa opção for melhor, atualizamos o `dp`.

## Exemplo rápido

Se:

```js
coins = [1, 2, 5]
amount = 11
```

Uma boa forma de pensar é:

- para `11`, podemos tentar usar a moeda `5`
- então sobra `6`
- para `6`, a melhor resposta já foi calculada antes

No final, a melhor combinação é:

```js
5 + 5 + 1
```

Resultado:

```js
3
```

## Resultado dos exemplos

### Exemplo 1

```js
coins = [1, 2, 5]
amount = 11
resultado = 3
```

### Exemplo 2

```js
coins = [2]
amount = 3
resultado = -1
```

### Exemplo 3

```js
coins = [1]
amount = 0
resultado = 0
```

## Complexidade

- Tempo: `O(amount * quantidadeDeMoedas)`
- Espaço: `O(amount)`

## Resumo

Essa solução funciona bem porque constrói a resposta do menor valor até o maior. Em vez de tentar combinações aleatórias, ela reaproveita resultados já calculados.
