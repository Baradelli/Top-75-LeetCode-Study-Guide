# Decode Ways

Link do problema:
https://leetcode.com/problems/decode-ways/

## O problema

Dada uma string `s` com dígitos, precisamos descobrir quantas formas diferentes existem para decodificá-la.

O mapeamento é:

- `"1"` -> `A`
- `"2"` -> `B`
- ...
- `"26"` -> `Z`

Nem toda sequência é válida. Por exemplo, valores com zero à esquerda, como `"06"`, não podem ser decodificados.

## Como a solução funciona

Essa solução usa recursão com memoização.

Criamos uma função `dfs(index)` que responde:

```js
quantas formas existem para decodificar a string a partir de index
```

Também usamos `dp` para guardar resultados já calculados e evitar repetição.

Se o caractere atual for `"0"`, a resposta é `0`, porque não existe letra para isso sozinho.

Em cada posição, tentamos:

1. decodificar um dígito
2. decodificar dois dígitos, quando o número formado está entre `10` e `26`

No código, a parte de dois dígitos é:

```js
s[index] === "1" || (s[index] === "2" && "0123456".includes(s[index + 1]))
```

## Exemplo rápido

Se:

```js
s = "12"
```

As decodificações possíveis são:

```js
"1" + "2" -> "AB"
"12" -> "L"
```

Resultado:

```js
2
```

## Resultado dos exemplos

### Exemplo 1

```js
s = "12"
resultado = 2
```

### Exemplo 2

```js
s = "226"
resultado = 3
```

### Exemplo 3

```js
s = "06"
resultado = 0
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(n)`

## Resumo

Essa solução quebra o problema em sufixos menores da string e guarda cada resposta calculada. Assim, cada posição é resolvida só uma vez.
