# Same Tree

Link do problema:
https://leetcode.com/problems/same-tree/

## O problema

Recebemos as raízes de duas árvores binárias: `p` e `q`.

Precisamos verificar se as duas árvores são iguais.

Duas árvores são iguais quando possuem a mesma estrutura e os mesmos valores nos mesmos lugares.

## Como a solução funciona

A solução usa recursão.

Se os dois nós forem `null`, eles são iguais.

Se apenas um deles for `null`, as árvores são diferentes.

Se os dois existem, comparamos seus valores.

Quando os valores são iguais, repetimos a mesma comparação para o lado esquerdo e para o lado direito.

## Exemplo rápido

Se:

```js
p = [1, 2, 3]
q = [1, 2, 3]
```

As duas árvores possuem a mesma estrutura e os mesmos valores.

O resultado é:

```js
true
```

## Resultado dos exemplos

### Exemplo 1

```js
p = [1, 2, 3]
q = [1, 2, 3]
resultado = true
```

### Exemplo 2

```js
p = [1, 2]
q = [1, null, 2]
resultado = false
```

### Exemplo 3

```js
p = [1, 2, 1]
q = [1, 1, 2]
resultado = false
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(h)`

Onde `n` é a quantidade de nós visitados e `h` é a altura da árvore.

## Resumo

Essa solução compara as duas árvores ao mesmo tempo, nó por nó, garantindo que estrutura e valores sejam iguais.
