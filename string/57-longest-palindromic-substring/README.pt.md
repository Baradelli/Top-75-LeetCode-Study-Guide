# Longest Palindromic Substring

Link do problema:
https://leetcode.com/problems/longest-palindromic-substring/

## O problema

Recebemos uma string `s`.

Precisamos retornar a maior substring de `s` que seja um palíndromo.

Uma substring precisa ser um trecho contínuo da string.

## Como a solução funciona

A solução testa cada posição como centro de um palíndromo.

Para cada índice, expandimos para os dois lados procurando palíndromos de tamanho ímpar.

Também testamos o centro entre dois caracteres para encontrar palíndromos de tamanho par.

Sempre que encontramos um palíndromo maior, salvamos seu início e seu tamanho.

## Exemplo rápido

Se:

```js
s = "babad"
```

Uma resposta válida é:

```js
"bab"
```

`"aba"` também seria uma resposta válida.

## Resultado dos exemplos

### Exemplo 1

```js
s = "babad"
resultado = "bab" ou "aba"
```

### Exemplo 2

```js
s = "cbbd"
resultado = "bb"
```

### Exemplo 3

```js
s = "a"
resultado = "a"
```

## Complexidade

- Tempo: `O(n²)`
- Espaço: `O(1)`

## Resumo

Essa solução expande a partir de cada centro possível. Assim encontra palíndromos pares e ímpares sem precisar gerar todas as substrings.
