# Valid Anagram

Link do problema:
https://leetcode.com/problems/valid-anagram/

## O problema

Recebemos duas strings, `s` e `t`.

Precisamos retornar `true` se `t` for um anagrama de `s`.

Um anagrama usa exatamente os mesmos caracteres, com as mesmas quantidades, mas pode estar em outra ordem.

## Como a solução funciona

A solução usa um `Map` para contar os caracteres de `s`.

Depois percorremos `t` e diminuímos a contagem de cada caractere encontrado.

Se algum caractere não existir no mapa, ou já tiver acabado, as strings não são anagramas.

No final, o mapa precisa estar vazio para que todos os caracteres tenham sido usados na quantidade correta.

## Exemplo rápido

Se:

```js
s = "anagram"
t = "nagaram"
```

O resultado deve ser:

```js
true
```

Porque as duas strings têm as mesmas letras nas mesmas quantidades.

## Resultado dos exemplos

### Exemplo 1

```js
s = "anagram"
t = "nagaram"
resultado = true
```

### Exemplo 2

```js
s = "rat"
t = "car"
resultado = false
```

### Exemplo 3

```js
s = "aacc"
t = "ccac"
resultado = false
```

## Complexidade

- Tempo: `O(n + m)`, onde `n` é o tamanho de `s` e `m` é o tamanho de `t`
- Espaço: `O(k)`, onde `k` é a quantidade de caracteres diferentes em `s`

## Resumo

Essa solução conta os caracteres da primeira string e tenta consumir essa contagem com a segunda. Se tudo bater exatamente, as strings são anagramas.
