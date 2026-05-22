# Set Matrix Zeroes

Link do problema:
https://leetcode.com/problems/set-matrix-zeroes/

## O problema

Recebemos uma matriz `m x n`.

Se algum elemento for `0`, precisamos transformar toda a linha e toda a coluna desse elemento em `0`.

A alteração deve ser feita na própria matriz.

## Como a solução funciona

A solução usa a primeira linha e a primeira coluna como marcadores.

Quando encontramos um `0`, marcamos:

- a primeira célula da mesma linha
- a primeira célula da mesma coluna

Depois percorremos o restante da matriz e zeramos as posições que têm linha ou coluna marcada.

No final, tratamos separadamente a primeira linha e a primeira coluna, porque elas também fazem parte da matriz original.

## Exemplo rápido

Se:

```js
matrix = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
]
```

O resultado deve ser:

```js
[
  [1, 0, 1],
  [0, 0, 0],
  [1, 0, 1],
]
```

## Resultado dos exemplos

### Exemplo 1

```js
matrix = [[1,1,1],[1,0,1],[1,1,1]]
resultado = [[1,0,1],[0,0,0],[1,0,1]]
```

### Exemplo 2

```js
matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
resultado = [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

### Exemplo 3

```js
matrix = [[1,2,3],[4,5,6],[7,8,0]]
resultado = [[1,2,0],[4,5,0],[0,0,0]]
```

## Complexidade

- Tempo: `O(m * n)`
- Espaço: `O(1)`

## Resumo

Essa solução usa a própria matriz para guardar os marcadores de linhas e colunas que devem ser zeradas. Assim ela resolve o problema sem criar estruturas extras proporcionais ao tamanho da matriz.
