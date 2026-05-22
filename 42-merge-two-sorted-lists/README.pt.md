# Merge Two Sorted Lists

Link do problema:
https://leetcode.com/problems/merge-two-sorted-lists/

## O problema

Recebemos duas listas ligadas já ordenadas:

```js
list1
list2
```

Precisamos juntar as duas em uma única lista ligada também ordenada.

## Como a solução funciona

A solução usa um nó auxiliar chamado `dummy`.

Também usamos um ponteiro `tail`, que sempre aponta para o fim da lista que estamos montando.

Enquanto as duas listas ainda tiverem nós, comparamos os valores atuais:

- se `list1.val` for menor, ligamos esse nó
- senão, ligamos o nó de `list2`

Depois avançamos o ponteiro da lista usada e também avançamos `tail`.

Quando uma das listas termina, basta conectar o restante da outra lista.

## Exemplo rápido

Se:

```js
list1 = [1, 2, 4]
list2 = [1, 3, 4]
```

Vamos escolhendo sempre o menor valor disponível.

O resultado final é:

```js
[1, 1, 2, 3, 4, 4]
```

## Resultado dos exemplos

### Exemplo 1

```js
list1 = [1, 2, 4]
list2 = [1, 3, 4]
resultado = [1, 1, 2, 3, 4, 4]
```

### Exemplo 2

```js
list1 = []
list2 = []
resultado = []
```

### Exemplo 3

```js
list1 = []
list2 = [0]
resultado = [0]
```

## Complexidade

- Tempo: `O(n + m)`
- Espaço: `O(1)` extra

## Resumo

Essa solução percorre as duas listas ao mesmo tempo e monta a resposta em ordem. O nó `dummy` ajuda a simplificar a construção da lista final.
