# Linked List Cycle

Link do problema:
https://leetcode.com/problems/linked-list-cycle/

## O problema

Recebemos o `head` de uma lista ligada.

Precisamos descobrir se existe um ciclo nela.

Isso acontece quando, ao seguir os ponteiros `next`, chegamos novamente a um nó já visitado.

## Como a solução funciona

A solução usa dois ponteiros:

- `slow`, que anda 1 passo por vez
- `fast`, que anda 2 passos por vez

Se a lista tiver ciclo, em algum momento os dois ponteiros vão se encontrar.

Se `fast` chegar ao fim da lista, então não existe ciclo.

Essa técnica é conhecida como Floyd's Cycle Detection.

## Exemplo rápido

Se:

```js
head = [3, 2, 0, -4]
pos = 1
```

Isso significa que o último nó aponta de volta para o nó de índice `1`.

Então a lista entra em loop e o resultado é:

```js
true
```

## Resultado dos exemplos

### Exemplo 1

```js
head = [3, 2, 0, -4]
pos = 1
resultado = true
```

### Exemplo 2

```js
head = [1, 2]
pos = 0
resultado = true
```

### Exemplo 3

```js
head = [1]
pos = -1
resultado = false
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução usa dois ponteiros com velocidades diferentes. Se eles se encontrarem, existe ciclo. Se o ponteiro rápido terminar a lista, não existe ciclo.
