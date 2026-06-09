# Binary Tree Maximum Path Sum

Link do problema:
https://leetcode.com/problems/binary-tree-maximum-path-sum/

## O problema

Recebemos a raiz de uma árvore binária.

Precisamos retornar a maior soma possível de um caminho não vazio.

Um caminho pode começar e terminar em qualquer nó, mas não pode passar pelo mesmo nó mais de uma vez.

## Como a solução funciona

A solução usa busca em profundidade com recursão.

Para cada nó, calculamos a melhor soma que pode subir para o pai.

Se um lado da árvore tiver soma negativa, ignoramos esse lado usando `0`.

Também testamos a melhor soma que passa pelo nó atual usando:

```js
root.val + leftMax + rightMax
```

Essa soma pode usar os dois lados, porque ela representa um caminho completo passando pelo nó atual.

O valor retornado para o pai usa apenas um lado, porque um caminho que continua para cima não pode se dividir.

## Exemplo rápido

Se:

```js
root = [1, 2, 3]
```

O melhor caminho é:

```js
2 -> 1 -> 3
```

O resultado é:

```js
6
```

## Resultado dos exemplos

### Exemplo 1

```js
root = [1, 2, 3]
resultado = 6
```

### Exemplo 2

```js
root = [-10, 9, 20, null, null, 15, 7]
resultado = 42
```

### Exemplo 3

```js
root = [-3]
resultado = -3
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(h)`

Onde `n` é a quantidade de nós da árvore e `h` é a altura da árvore.

## Resumo

Essa solução visita cada nó uma vez e mantém a melhor soma global encontrada durante a recursão.
