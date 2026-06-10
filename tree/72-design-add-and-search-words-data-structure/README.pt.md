# Design Add and Search Words Data Structure

Link do problema:
https://leetcode.com/problems/design-add-and-search-words-data-structure/

## O problema

Precisamos criar uma estrutura que permite adicionar palavras e buscar palavras depois.

A busca também pode usar o caractere `.`.

Esse ponto funciona como curinga e pode representar qualquer letra.

## Como a solução funciona

A solução usa uma Trie.

Cada palavra adicionada cria um caminho de letras dentro da árvore.

Quando a busca encontra uma letra normal, ela segue apenas aquele caminho.

Quando a busca encontra `.`, ela testa todos os filhos possíveis daquele nó usando DFS.

Se algum caminho chegar ao fim de uma palavra válida, a busca retorna `true`.

## Exemplo rápido

Se:

```js
addWord("bad")
addWord("dad")
addWord("mad")
search(".ad")
search("b..")
```

O resultado é:

```js
true
true
```

O `.` pode combinar com qualquer letra.

## Resultado dos exemplos

### Exemplo 1

```js
operations = ["WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search"]
values = [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]]
resultado = [null, null, null, null, false, true, true, true]
```

### Exemplo 2

```js
operations = ["WordDictionary", "addWord", "search", "search", "search"]
values = [[], ["code"], ["code"], ["co.e"], ["c..e"]]
resultado = [null, null, true, true, true]
```

### Exemplo 3

```js
operations = ["WordDictionary", "addWord", "addWord", "search", "search"]
values = [[], ["at"], ["and"], ["a."], ["an."]]
resultado = [null, null, null, true, true]
```

## Complexidade

- Tempo: `O(n)` para adicionar uma palavra
- Tempo: até `O(26^d * n)` para buscar com curingas
- Espaço: `O(n)` para as palavras inseridas

Onde `n` é o tamanho da palavra e `d` é a quantidade de pontos `.` na busca.

## Resumo

Essa solução combina Trie com DFS para permitir buscas com letras exatas e curingas.
