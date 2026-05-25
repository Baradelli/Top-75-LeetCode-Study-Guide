# Spiral Matrix

Link do problema:
https://leetcode.com/problems/spiral-matrix/

## O problema

Recebemos uma matriz `m x n`.

Precisamos retornar todos os elementos em ordem espiral.

Isso significa percorrer:

- a linha de cima da esquerda para a direita
- a coluna da direita de cima para baixo
- a linha de baixo da direita para a esquerda
- a coluna da esquerda de baixo para cima

E repetir esse processo até visitar toda a matriz.

## Como a solução funciona

A solução controla quatro limites:

- `top`
- `bottom`
- `left`
- `right`

Esses limites representam a camada atual da espiral.

Em cada volta:

- percorremos a linha de cima
- percorremos a coluna da direita
- se ainda existir linha restante, percorremos a linha de baixo
- se ainda existir coluna restante, percorremos a coluna da esquerda

Depois ajustamos os limites para entrar na próxima camada.

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
[1, 2, 3, 6, 9, 8, 7, 4, 5]
```

## Resultado dos exemplos

### Exemplo 1

```js
matrix = [[1,2,3],[4,5,6],[7,8,9]]
resultado = [1,2,3,6,9,8,7,4,5]
```

### Exemplo 2

```js
matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
resultado = [1,2,3,4,8,12,11,10,9,5,6,7]
```

### Exemplo 3

```js
matrix = [[1],[2],[3],[4]]
resultado = [1,2,3,4]
```

## Complexidade

- Tempo: `O(m * n)`
- Espaço: `O(1)` extra, sem contar o array de resposta

## Resumo

Essa solução percorre a matriz por camadas, sempre ajustando os quatro limites da região ainda não visitada. Assim conseguimos montar a ordem espiral de forma simples e direta.
