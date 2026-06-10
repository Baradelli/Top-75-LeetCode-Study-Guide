# Word Search II

Link do problema:
https://leetcode.com/problems/word-search-ii/

## O problema

Recebemos um tabuleiro de letras e uma lista de palavras.

Precisamos retornar todas as palavras da lista que podem ser formadas no tabuleiro.

As letras precisam estar conectadas horizontalmente ou verticalmente.

A mesma célula não pode ser usada mais de uma vez na mesma palavra.

## Como a solução funciona

A solução usa Trie e DFS.

Primeiro, colocamos todas as palavras em uma Trie.

Depois, começamos uma busca em profundidade a partir de cada célula do tabuleiro.

Se o caminho atual não existe na Trie, paramos aquela busca.

Quando encontramos um nó marcado como palavra, adicionamos a palavra ao resultado.

A solução também remove caminhos que não precisam mais ser visitados, ajudando a reduzir buscas repetidas.

## Exemplo rápido

Se:

```js
board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
]
words = ["oath", "pea", "eat", "rain"]
```

O resultado é:

```js
["eat", "oath"]
```

## Resultado dos exemplos

### Exemplo 1

```js
words = ["oath", "pea", "eat", "rain"]
resultado = ["eat", "oath"]
```

### Exemplo 2

```js
words = ["abcb"]
resultado = []
```

### Exemplo 3

```js
words = ["ab", "cb", "ad", "bd", "ac", "ca"]
resultado = ["ab", "ac", "bd", "ca"]
```

## Complexidade

- Tempo: `O(m * n * 4^l)`
- Espaço: `O(w * l)`

Onde `m` e `n` são as dimensões do tabuleiro, `w` é a quantidade de palavras e `l` é o tamanho médio das palavras.

## Resumo

Essa solução usa uma Trie para cortar buscas impossíveis e DFS para explorar caminhos válidos no tabuleiro.
