# Longest Repeating Character Replacement

Link do problema:
https://leetcode.com/problems/longest-repeating-character-replacement/

## O problema

Recebemos uma string `s` com letras maiúsculas e um número `k`.

Podemos trocar no máximo `k` caracteres por qualquer outra letra maiúscula.

Precisamos retornar o tamanho da maior substring que pode ficar formada por uma única letra depois dessas trocas.

## Como a solução funciona

A solução usa uma janela deslizante.

Guardamos quantas vezes cada letra aparece na janela atual e também a maior frequência encontrada dentro dela.

Se o tamanho da janela menos essa maior frequência for maior que `k`, significa que precisaríamos trocar letras demais. Nesse caso, movemos o lado esquerdo da janela.

Enquanto a janela for válida, atualizamos o maior tamanho encontrado.

## Exemplo rápido

Se:

```js
s = "ABAB"
k = 2
```

O resultado deve ser:

```js
4
```

Porque podemos trocar duas letras e deixar toda a substring com a mesma letra.

## Resultado dos exemplos

### Exemplo 1

```js
s = "ABAB"
k = 2
resultado = 4
```

### Exemplo 2

```js
s = "AABABBA"
k = 1
resultado = 4
```

### Exemplo 3

```js
s = "AAAA"
k = 0
resultado = 4
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`, porque o problema usa apenas letras maiúsculas do alfabeto inglês

## Resumo

Essa solução mantém uma janela que pode ser transformada em uma substring de letras iguais usando no máximo `k` trocas. Assim encontramos o maior tamanho possível em uma única passada pela string.
