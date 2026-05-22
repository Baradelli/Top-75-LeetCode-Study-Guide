# Number of Islands

Link do problema:
https://leetcode.com/problems/number-of-islands/

## O problema

Recebemos uma matriz `grid` com `"1"` para terra e `"0"` para água.

Precisamos contar quantas ilhas existem.

Uma ilha é formada por terras conectadas na horizontal ou na vertical.

## Como a solução funciona

A solução percorre toda a matriz.

Quando encontra uma célula com `"1"`, ela encontrou o começo de uma nova ilha.

Então ela usa DFS para visitar toda a região conectada e trocar essas posições para `"0"`:

```js
grid[row][col] = "0";
```

Assim, aquela mesma ilha não é contada de novo.

## Exemplo rápido

Se:

```js
grid = [
  ["1", "1", "0"],
  ["0", "1", "0"],
  ["0", "0", "1"],
];
```

Existem duas ilhas:

- a primeira no canto superior esquerdo
- a segunda no canto inferior direito

Então o resultado é:

```js
2
```

## Resultado dos exemplos

### Exemplo 1

```js
grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
resultado = 1
```

### Exemplo 2

```js
grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
resultado = 3
```

### Exemplo 3

```js
grid = [["1","0","1","0"],["0","1","0","1"],["1","0","1","0"]]
resultado = 6
```

## Complexidade

- Tempo: `O(m * n)`
- Espaço: `O(m * n)` no pior caso por causa da recursão

## Resumo

Essa solução conta uma nova ilha sempre que encontra um `"1"` ainda não visitado. Depois ela apaga toda a região conectada com DFS para evitar contagem repetida.
