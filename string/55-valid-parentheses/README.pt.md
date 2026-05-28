# Valid Parentheses

Link do problema:
https://leetcode.com/problems/valid-parentheses/

## O problema

Recebemos uma string `s` contendo apenas parênteses, colchetes e chaves.

Precisamos verificar se todos os símbolos abertos são fechados pelo mesmo tipo de símbolo e na ordem correta.

## Como a solução funciona

A solução usa uma pilha.

Quando encontramos um símbolo de abertura, colocamos ele na pilha.

Quando encontramos um símbolo de fechamento, ele precisa combinar com o último símbolo aberto.

Se não combinar, a string é inválida. No final, a pilha precisa estar vazia.

## Exemplo rápido

Se:

```js
s = "([])"
```

O resultado deve ser:

```js
true
```

Porque `[` fecha antes de `(`, respeitando a ordem correta.

## Resultado dos exemplos

### Exemplo 1

```js
s = "()"
resultado = true
```

### Exemplo 2

```js
s = "()[]{}"
resultado = true
```

### Exemplo 3

```js
s = "(]"
resultado = false
```

### Exemplo 4

```js
s = "([])"
resultado = true
```

### Exemplo 5

```js
s = "([)]"
resultado = false
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(n)`, no pior caso, quando todos os símbolos são de abertura

## Resumo

Essa solução usa uma pilha para garantir que cada fechamento corresponde ao último símbolo aberto. Esse padrão é ideal para validar pares bem formados.
