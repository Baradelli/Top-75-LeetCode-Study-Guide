# Maximum Depth of Binary Tree

Link do problema:
https://leetcode.com/problems/maximum-depth-of-binary-tree/

## O problema

Recebemos a raiz de uma árvore binária.

Precisamos retornar a profundidade máxima dessa árvore.

A profundidade máxima é a quantidade de nós no caminho mais longo entre a raiz e uma folha.

## Como a solução funciona

A solução usa busca em largura.

Se a raiz for `null`, a profundidade é `0`.

Caso contrário, colocamos a raiz em uma fila e visitamos a árvore nível por nível.

Ao terminar cada nível, aumentamos o contador de profundidade.

Quando a fila fica vazia, o contador representa a profundidade máxima.

## Exemplo rapido

Se:

```js
root = [3, 9, 20, null, null, 15, 7]
```

O caminho mais profundo tem 3 nós:

```js
3 -> 20 -> 15
```

O resultado é:

```js
3
```

## Resultado dos exemplos

### Exemplo 1

```js
root = [3, 9, 20, null, null, 15, 7]
resultado = 3
```

### Exemplo 2

```js
root = [1, null, 2]
resultado = 2
```

### Exemplo 3

```js
root = []
resultado = 0
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(w)`

Onde `n` é a quantidade de nós e `w` é a maior largura da árvore.

## Resumo

Essa solução visita a árvore por níveis e conta quantos níveis existem até chegar ao final.
