# Pacific Atlantic Water Flow

Link do problema:
https://leetcode.com/problems/pacific-atlantic-water-flow/

## O problema

Recebemos uma matriz `heights` em que cada posição representa a altura de uma célula da ilha.

A água pode andar para cima, baixo, esquerda e direita, mas só pode sair de uma célula para outra de altura menor ou igual.

Precisamos encontrar todas as posições de onde a água consegue chegar ao mesmo tempo:

- ao oceano Pacífico
- ao oceano Atlântico

## Como a solução funciona

Em vez de começar em cada célula, a solução faz o caminho ao contrário.

Ela começa:

- nas bordas do Pacífico
- nas bordas do Atlântico

Depois usa DFS para marcar quais células cada oceano consegue alcançar.

Durante essa busca reversa, só avançamos para células com altura maior ou igual à anterior:

```js
if (heights[row][col] < previousHeight) {
  return;
}
```

No final, as células que aparecem nos dois conjuntos são a resposta.

## Exemplo rápido

Se:

```js
heights = [[1]]
```

Existe apenas uma célula, e ela encosta nos dois oceanos.

Então o resultado é:

```js
[[0, 0]]
```

## Resultado dos exemplos

### Exemplo 1

```js
heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
resultado = [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
```

### Exemplo 2

```js
heights = [[1]]
resultado = [[0,0]]
```

### Exemplo 3

```js
heights = [[3,3,3],[3,1,3],[3,3,3]]
resultado = [[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]
```

## Complexidade

- Tempo: `O(m * n)`
- Espaço: `O(m * n)`

## Resumo

Essa solução faz duas buscas, uma partindo das bordas do Pacífico e outra das bordas do Atlântico. Depois ela pega apenas as células visitadas pelos dois oceanos.
