# Longest Substring Without Repeating Characters

Link do problema:
https://leetcode.com/problems/longest-substring-without-repeating-characters/

## O problema

Recebemos uma string `s`.

Precisamos encontrar o tamanho da maior substring sem caracteres repetidos.

Importante: substring precisa ser um trecho contínuo da string.

## Como a solução funciona

A solução usa uma janela deslizante com dois ponteiros:

- `left`
- `right`

Também usamos um `Set` para guardar os caracteres que estão dentro da janela atual.

Enquanto o caractere da direita já estiver no `Set`, removemos caracteres da esquerda até a janela voltar a ter apenas letras únicas.

Depois atualizamos o maior tamanho encontrado.

## Exemplo rápido

Se:

```js
s = "abcabcbb"
```

O resultado deve ser:

```js
3
```

Porque uma substring válida é `"abc"`.

## Resultado dos exemplos

### Exemplo 1

```js
s = "abcabcbb"
resultado = 3
```

### Exemplo 2

```js
s = "bbbbb"
resultado = 1
```

### Exemplo 3

```js
s = "pwwkew"
resultado = 3
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(k)`, onde `k` é a quantidade de caracteres únicos na janela

## Resumo

Essa solução mantém uma janela com caracteres únicos e ajusta seu início sempre que encontra repetição. Assim conseguimos achar a maior substring válida em uma única passada pela string.
