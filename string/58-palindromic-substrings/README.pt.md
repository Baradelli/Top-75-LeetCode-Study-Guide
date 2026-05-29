# Palindromic Substrings

Link do problema:
https://leetcode.com/problems/palindromic-substrings/

## O problema

Recebemos uma string `s`.

Precisamos retornar quantas substrings de `s` são palíndromos.

Uma substring precisa ser um trecho contínuo da string.

## Como a solução funciona

A solução testa cada posição como centro de um palíndromo.

Para cada índice, expandimos para os dois lados contando palíndromos de tamanho ímpar.

Também testamos o centro entre dois caracteres para contar palíndromos de tamanho par.

Cada vez que a expansão encontra um palíndromo válido, aumentamos o contador.

## Exemplo rápido

Se:

```js
s = "aaa"
```

As substrings palíndromas são:

```js
"a", "a", "a", "aa", "aa", "aaa"
```

O resultado é:

```js
6
```

## Resultado dos exemplos

### Exemplo 1

```js
s = "abc"
resultado = 3
```

### Exemplo 2

```js
s = "aaa"
resultado = 6
```

### Exemplo 3

```js
s = "racecar"
resultado = 10
```

## Complexidade

- Tempo: `O(n²)`
- Espaço: `O(1)`

## Resumo

Essa solução expande a partir de cada centro possível. Assim conta palíndromos pares e ímpares sem precisar gerar todas as substrings.
