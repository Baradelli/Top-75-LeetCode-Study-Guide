# Longest Common Subsequence

Link do problema:
https://leetcode.com/problems/longest-common-subsequence/

## O problema

Dadas duas strings `text1` e `text2`, precisamos descobrir o tamanho da maior subsequência comum entre elas.

Subsequência significa que podemos remover caracteres sem mudar a ordem dos que permanecem.

## Como a solução funciona

Essa solução usa programação dinâmica com uma tabela `dp`.

Cada posição:

```js
dp[i][j]
```

guarda o tamanho da melhor subsequência comum entre:

- a parte de `text1` que começa em `i`
- a parte de `text2` que começa em `j`

Preenchemos a tabela de trás para frente.

Se os caracteres forem iguais:

```js
dp[i][j] = 1 + dp[i + 1][j + 1]
```

Se forem diferentes:

```js
dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j])
```

Assim, em cada passo, usamos respostas menores que já foram calculadas.

## Exemplo rápido

Se:

```js
text1 = "abcde"
text2 = "ace"
```

A maior subsequência comum é:

```js
"ace"
```

Ela tem tamanho:

```js
3
```

## Resultado dos exemplos

### Exemplo 1

```js
text1 = "abcde"
text2 = "ace"
resultado = 3
```

### Exemplo 2

```js
text1 = "abc"
text2 = "abc"
resultado = 3
```

### Exemplo 3

```js
text1 = "abc"
text2 = "def"
resultado = 0
```

## Complexidade

- Tempo: `O(m * n)`
- Espaço: `O(m * n)`

Onde:

- `m` é o tamanho de `text1`
- `n` é o tamanho de `text2`

## Resumo

Essa solução compara as duas strings por partes e guarda os melhores resultados em uma tabela. Isso evita recalcular o mesmo problema várias vezes.
