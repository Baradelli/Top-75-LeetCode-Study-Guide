# Word Break

Link do problema:
https://leetcode.com/problems/word-break/

## O problema

Dada uma string `s` e um array `wordDict`, precisamos descobrir se a string pode ser separada em palavras que existem no dicionário.

As palavras podem ser reutilizadas quantas vezes forem necessárias.

## Como a solução funciona

Essa solução usa programação dinâmica.

Criamos um array `dp` em que:

```js
dp[i]
```

indica se a parte da string que começa em `i` pode ser formada usando palavras do dicionário.

Começamos com:

```js
dp[s.length] = true
```

porque a string vazia no final já está corretamente formada.

Depois percorremos a string de trás para frente. Para cada posição, testamos todas as palavras:

```js
if (i + word.length <= s.length && s.slice(i, i + word.length) === word) {
  dp[i] = dp[i + word.length];
}
```

Se a palavra encaixa na posição atual e o restante da string também pode ser formado, então `dp[i]` vira `true`.

## Exemplo rápido

Se:

```js
s = "leetcode"
wordDict = ["leet", "code"]
```

Podemos separar a string assim:

```js
"leet" + "code"
```

Resultado:

```js
true
```

## Resultado dos exemplos

### Exemplo 1

```js
s = "leetcode"
wordDict = ["leet", "code"]
resultado = true
```

### Exemplo 2

```js
s = "applepenapple"
wordDict = ["apple", "pen"]
resultado = true
```

### Exemplo 3

```js
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
resultado = false
```

## Complexidade

- Tempo: `O(n * quantidadeDePalavras * tamanhoMedioDaPalavra)`
- Espaço: `O(n)`

## Resumo

Essa solução verifica, para cada posição da string, se existe alguma palavra que encaixa ali e deixa o restante válido. Assim evitamos testar as mesmas partes várias vezes.
