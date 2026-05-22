# Search in Rotated Sorted Array

Link do problema:
https://leetcode.com/problems/search-in-rotated-sorted-array/

## O problema

Dado um array ordenado que foi rotacionado e um valor `target`, precisamos retornar o índice desse valor.

Se o valor não existir, retornamos `-1`.

## Como a solução funciona

Como o array foi rotacionado, ele não está totalmente ordenado do começo ao fim.
Mesmo assim, em cada passo da busca binária, uma das metades continua ordenada.

A ideia é:

1. Encontrar o meio
2. Verificar se encontramos o `target`
3. Descobrir qual metade está ordenada
4. Decidir se o `target` está dentro dessa metade
5. Descartar a outra metade

Assim, removemos metade do array por vez.

## Exemplo rápido

Se `nums = [4, 5, 6, 7, 0, 1, 2]` e `target = 0`:

- o meio ajuda a identificar qual lado está ordenado
- o valor `0` fica na parte rotacionada
- continuamos a busca até encontrar o índice `4`

## Resultado dos exemplos

### Exemplo 1

```js
nums = [4, 5, 6, 7, 0, 1, 2]
target = 0
resultado = 4
```

### Exemplo 2

```js
nums = [4, 5, 6, 7, 0, 1, 2]
target = 3
resultado = -1
```

### Exemplo 3

```js
nums = [1]
target = 0
resultado = -1
```

## Complexidade

- Tempo: `O(log n)`
- Espaço: `O(1)`

## Resumo

Essa solução é eficiente porque usa busca binária e aproveita o fato de que sempre existe uma metade ordenada no array rotacionado.
