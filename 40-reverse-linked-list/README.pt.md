# Reverse Linked List

Link do problema:
https://leetcode.com/problems/reverse-linked-list/

## O problema

Recebemos o `head` de uma lista ligada simples.

Precisamos inverter a direção dos ponteiros para que a lista fique ao contrário.

No final, devemos retornar a nova cabeça da lista.

## Como a solução funciona

A solução percorre a lista uma vez.

Em cada passo, ela guarda o próximo nó, inverte o ponteiro do nó atual e avança.

Usamos três referências:

- `previous`
- `current`
- `nextNode`

O ponto principal é esta linha:

```js
current.next = previous
```

Ela faz o nó atual apontar para trás.

Quando o loop termina, `previous` vira a nova cabeça da lista invertida.

## Exemplo rápido

Se:

```js
head = [1, 2, 3, 4, 5]
```

Depois da inversão, a ordem passa a ser:

```js
[5, 4, 3, 2, 1]
```

## Resultado dos exemplos

### Exemplo 1

```js
head = [1, 2, 3, 4, 5]
resultado = [5, 4, 3, 2, 1]
```

### Exemplo 2

```js
head = [1, 2]
resultado = [2, 1]
```

### Exemplo 3

```js
head = []
resultado = []
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução inverte a lista ligada no próprio lugar, mudando um ponteiro por vez. Ela é linear e usa espaço constante.
