# Jump Game

Link do problema:
https://leetcode.com/problems/jump-game/

## O problema

Dado um array `nums`, começamos no índice `0`.

Cada valor do array diz qual é o tamanho máximo do salto que podemos dar naquela posição.

Precisamos descobrir se é possível chegar ao último índice.

## Como a solução funciona

Essa solução usa uma estratégia gulosa.

Em vez de tentar todos os saltos, começamos do fim do array e vamos trazendo o objetivo para trás.

Criamos uma variável:

```js
goal
```

Ela guarda a posição que precisamos conseguir alcançar.

Se um índice `i` consegue chegar até `goal`, então agora o novo objetivo passa a ser `i`:

```js
if (i + nums[i] >= goal) {
  goal = i;
}
```

No final, se o objetivo voltou até o índice `0`, então a resposta é `true`.

## Exemplo rápido

Se:

```js
nums = [2, 3, 1, 1, 4]
```

Do índice `0`, podemos chegar ao índice `1`.

Do índice `1`, podemos saltar até o final.

Resultado:

```js
true
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [2, 3, 1, 1, 4]
resultado = true
```

### Exemplo 2

```js
nums = [3, 2, 1, 0, 4]
resultado = false
```

### Exemplo 3

```js
nums = [2, 0, 0]
resultado = true
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução percorre o array uma vez de trás para frente. Sempre que uma posição consegue alcançar o objetivo atual, ela vira o novo objetivo.
