# Rotate Image

Link do problema:
https://leetcode.com/problems/rotate-image/

## O problema

Recebemos uma matriz quadrada `n x n` que representa uma imagem.

Precisamos girar essa imagem em `90` graus no sentido horário.

A rotação deve ser feita na própria matriz, sem criar outra matriz `n x n`.

## Como a solução funciona

A solução percorre a matriz por camadas, da parte mais externa para a mais interna.

Em cada camada, fazemos trocas entre quatro posições:

- topo esquerdo
- baixo esquerdo
- baixo direito
- topo direito

Guardamos temporariamente um valor e movemos os outros três para a próxima posição correta.

Assim cada grupo de quatro elementos é rotacionado sem precisar de uma matriz auxiliar completa.

## Exemplo rápido

Se:

```js
matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
```

O resultado deve ser:

```js
[
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3],
]
```

## Resultado dos exemplos

### Exemplo 1

```js
matrix = [[1,2,3],[4,5,6],[7,8,9]]
resultado = [[7,4,1],[8,5,2],[9,6,3]]
```

### Exemplo 2

```js
matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
resultado = [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

### Exemplo 3

```js
matrix = [[1,2],[3,4]]
resultado = [[3,1],[4,2]]
```

## Complexidade

- Tempo: `O(n * n)`
- Espaço: `O(1)`

## Resumo

Essa solução gira a imagem por camadas, trocando grupos de quatro posições por vez. Assim a rotação acontece no próprio lugar, de forma eficiente e sem usar outra matriz completa.
