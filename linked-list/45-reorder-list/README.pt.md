# Reorder List

Link do problema:
https://leetcode.com/problems/reorder-list/

## O problema

Recebemos o `head` de uma lista ligada.

Precisamos reorganizar os nós nesta ordem:

```text
L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2
```

Não podemos mudar os valores dos nós, apenas os ponteiros.

## Como a solução funciona

A solução tem três etapas.

Primeiro encontramos o meio da lista com dois ponteiros.

Depois invertimos a segunda metade.

Por fim, intercalamos:

- um nó da primeira metade
- um nó da segunda metade invertida

Assim conseguimos montar a ordem pedida sem criar uma nova lista.

## Exemplo rápido

Se:

```js
head = [1, 2, 3, 4, 5]
```

A nova ordem deve ficar:

```js
[1, 5, 2, 4, 3]
```

## Resultado dos exemplos

### Exemplo 1

```js
head = [1, 2, 3, 4]
resultado = [1, 4, 2, 3]
```

### Exemplo 2

```js
head = [1, 2, 3, 4, 5]
resultado = [1, 5, 2, 4, 3]
```

### Exemplo 3

```js
head = [1, 2]
resultado = [1, 2]
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução divide a lista em duas partes, inverte a segunda metade e depois intercala os nós. Assim o reordenamento é feito no próprio lugar.
