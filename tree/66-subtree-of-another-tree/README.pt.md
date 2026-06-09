# Subtree of Another Tree

Link do problema:
https://leetcode.com/problems/subtree-of-another-tree/

## O problema

Recebemos as raízes de duas árvores binárias: `root` e `subRoot`.

Precisamos verificar se `subRoot` aparece dentro de `root` como uma subárvore.

Uma subárvore precisa ter a mesma estrutura e os mesmos valores a partir de algum nó de `root`.

## Como a solução funciona

A solução usa recursão.

Primeiro, comparamos se a árvore atual é exatamente igual a `subRoot`.

Para isso, usamos uma função auxiliar parecida com o problema Same Tree.

Se forem iguais, retornamos `true`.

Se não forem iguais, tentamos encontrar `subRoot` no filho esquerdo ou no filho direito de `root`.

## Exemplo rápido

Se:

```js
root = [3, 4, 5, 1, 2]
subRoot = [4, 1, 2]
```

A árvore `subRoot` aparece dentro de `root` começando no nó `4`.

O resultado é:

```js
true
```

## Resultado dos exemplos

### Exemplo 1

```js
root = [3, 4, 5, 1, 2]
subRoot = [4, 1, 2]
resultado = true
```

### Exemplo 2

```js
root = [3, 4, 5, 1, 2, null, null, null, null, 0]
subRoot = [4, 1, 2]
resultado = false
```

### Exemplo 3

```js
root = [1, 1]
subRoot = [1]
resultado = true
```

## Complexidade

- Tempo: `O(n * m)`
- Espaço: `O(h)`

Onde `n` é a quantidade de nós de `root`, `m` é a quantidade de nós de `subRoot` e `h` é a altura da árvore.

## Resumo

Essa solução percorre `root` e, em cada nó, verifica se a árvore iniciada ali é igual a `subRoot`.
