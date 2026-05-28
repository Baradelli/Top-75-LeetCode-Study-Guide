# Minimum Window Substring

Link do problema:
https://leetcode.com/problems/minimum-window-substring/

## O problema

Recebemos duas strings, `s` e `t`.

Precisamos encontrar a menor substring de `s` que contenha todos os caracteres de `t`, incluindo caracteres repetidos.

Se nenhuma substring servir, retornamos uma string vazia.

## Como a solução funciona

A solução usa uma janela deslizante.

Primeiro contamos quantas vezes cada caractere aparece em `t`.

Depois percorremos `s` com uma janela, aumentando o lado direito até a janela conter tudo que precisamos.

Quando a janela fica válida, tentamos mover o lado esquerdo para diminuir seu tamanho. Sempre que encontramos uma janela menor, salvamos seus índices.

## Exemplo rápido

Se:

```js
s = "ADOBECODEBANC"
t = "ABC"
```

O resultado deve ser:

```js
"BANC"
```

Porque `"BANC"` é a menor substring que contém `A`, `B` e `C`.

## Resultado dos exemplos

### Exemplo 1

```js
s = "ADOBECODEBANC"
t = "ABC"
resultado = "BANC"
```

### Exemplo 2

```js
s = "a"
t = "a"
resultado = "a"
```

### Exemplo 3

```js
s = "a"
t = "aa"
resultado = ""
```

## Complexidade

- Tempo: `O(m + n)`, onde `m` é o tamanho de `s` e `n` é o tamanho de `t`
- Espaço: `O(k)`, onde `k` é a quantidade de caracteres diferentes usados nos mapas

## Resumo

Essa solução mantém uma janela que tenta conter todos os caracteres de `t`. Quando a janela fica válida, ela é reduzida pela esquerda para encontrar a menor resposta possível.
