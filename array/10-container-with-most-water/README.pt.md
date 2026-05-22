# Container With Most Water

Link do problema:
https://leetcode.com/problems/container-with-most-water/

## O problema

Dado um array `height`, cada posição representa a altura de uma linha vertical.

Precisamos escolher duas linhas que, junto com o eixo horizontal, formem um recipiente capaz de armazenar a maior quantidade de água possível.

## Como a solução funciona

A solução usa dois ponteiros:

1. Um no começo do array
2. Um no final do array

Em cada passo:

- calculamos a largura entre os ponteiros
- usamos a menor altura entre os dois lados
- calculamos a área formada
- guardamos a maior área encontrada

Depois disso, movemos o ponteiro da menor altura.

Fazemos isso porque a altura menor é a que limita a água armazenada. Então, para tentar melhorar a área, precisamos procurar uma linha maior desse lado.

## Exemplo rápido

Se `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`:

- começamos com a primeira e a última linha
- calculamos a área possível entre elas
- vamos movendo o ponteiro do lado menor
- no melhor caso, encontramos área `49`

## Resultado dos exemplos

### Exemplo 1

```js
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
resultado = 49
```

### Exemplo 2

```js
height = [1, 1]
resultado = 1
```

### Exemplo 3

```js
height = [4, 3, 2, 1, 4]
resultado = 16
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução é eficiente porque analisa o array em uma única passada com dois ponteiros, sem testar todas as combinações possíveis.
