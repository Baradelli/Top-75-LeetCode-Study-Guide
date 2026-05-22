# Longest Increasing Subsequence

Link do problema:
https://leetcode.com/problems/longest-increasing-subsequence/

## O problema

Dado um array `nums`, precisamos descobrir o tamanho da maior subsequência estritamente crescente.

Subsequência significa que podemos escolher alguns elementos na ordem em que aparecem, sem precisar que estejam lado a lado.

## Como a solução funciona

Essa solução usa programação dinâmica.

Criamos um array `dp` em que:

```js
dp[i]
```

guarda o tamanho da maior subsequência crescente que termina na posição `i`.

Cada posição começa com valor `1`, porque qualquer número sozinho já forma uma subsequência de tamanho `1`.

Depois, para cada `nums[i]`, olhamos todos os elementos anteriores:

```js
if (nums[i] > nums[j]) {
  dp[i] = Math.max(dp[i], dp[j] + 1);
}
```

Se `nums[i]` for maior que `nums[j]`, então ele pode continuar a subsequência que terminava em `j`.

## Exemplo rápido

Se:

```js
nums = [0, 1, 0, 3, 2, 3]
```

Uma das maiores subsequências crescentes é:

```js
[0, 1, 2, 3]
```

Ela tem tamanho:

```js
4
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [10, 9, 2, 5, 3, 7, 101, 18]
resultado = 4
```

### Exemplo 2

```js
nums = [0, 1, 0, 3, 2, 3]
resultado = 4
```

### Exemplo 3

```js
nums = [7, 7, 7, 7, 7, 7, 7]
resultado = 1
```

## Complexidade

- Tempo: `O(n²)`
- Espaço: `O(n)`

## Resumo

Essa solução testa, para cada posição, qual melhor subsequência crescente pode terminar ali. No final, a maior resposta dentro de `dp` é o resultado.
