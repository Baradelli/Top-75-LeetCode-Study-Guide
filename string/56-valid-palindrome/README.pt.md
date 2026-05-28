# Valid Palindrome

Link do problema:
https://leetcode.com/problems/valid-palindrome/

## O problema

Recebemos uma string `s`.

Precisamos verificar se ela é um palíndromo depois de remover caracteres que não são letras ou números e transformar tudo em minúsculo.

Um palíndromo lê igual da esquerda para a direita e da direita para a esquerda.

## Como a solução funciona

A solução cria uma nova string limpa.

Percorremos `s` e mantemos apenas caracteres alfanuméricos.

Cada caractere mantido é convertido para minúsculo.

No final, comparamos a string limpa com sua versão invertida.

## Exemplo rápido

Se:

```js
s = "A man, a plan, a canal: Panama"
```

A string limpa fica:

```js
"amanaplanacanalpanama"
```

O resultado deve ser:

```js
true
```

## Resultado dos exemplos

### Exemplo 1

```js
s = "A man, a plan, a canal: Panama"
resultado = true
```

### Exemplo 2

```js
s = "race a car"
resultado = false
```

### Exemplo 3

```js
s = " "
resultado = true
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(n)`, por causa da string limpa e da string invertida

## Resumo

Essa solução normaliza a frase, removendo símbolos e diferenças entre maiúsculas e minúsculas. Depois compara o texto limpo com sua versão invertida.
