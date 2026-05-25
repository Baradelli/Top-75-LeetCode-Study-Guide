# Word Search

Link do problema:
https://leetcode.com/problems/word-search/

## O problema

Recebemos uma grade `m x n` com letras e uma palavra.

Precisamos verificar se essa palavra pode ser formada usando letras vizinhas na horizontal ou na vertical.

A mesma célula não pode ser usada mais de uma vez no mesmo caminho.

## Como a solução funciona

A solução tenta começar a palavra em cada posição da matriz.

Quando encontra uma letra inicial possível, ela usa busca em profundidade (`DFS`) para tentar continuar a palavra nas quatro direções:

- cima
- baixo
- esquerda
- direita

Durante a busca, a solução marca temporariamente a célula atual com um caractere especial e depois restaura o valor original no backtracking.

Se alguma tentativa conseguir chegar ao fim da palavra, a resposta é `true`.

## Exemplo rápido

Se:

```js
board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
]
word = "ABCCED"
```

O resultado deve ser:

```js
true
```

## Resultado dos exemplos

### Exemplo 1

```js
board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
word = "ABCCED"
resultado = true
```

### Exemplo 2

```js
board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
word = "SEE"
resultado = true
```

### Exemplo 3

```js
board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
word = "ABCB"
resultado = false
```

## Complexidade

- Tempo: `O(m * n * 4^L)`, onde `L` é o tamanho da palavra
- Espaço: `O(L)` por causa da pilha de recursão, onde `L` é o tamanho da palavra

## Resumo

Essa solução testa caminhos possíveis com `DFS` a partir de cada célula. Ao marcar e restaurar a própria matriz durante o backtracking, ela evita uma estrutura extra de visitados e ainda impede reutilizar letras no mesmo caminho.
