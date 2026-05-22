# Alien Dictionary

Link do problema:
https://leetcode.com/problems/alien-dictionary/

## O problema

Recebemos uma lista `words` já ordenada de acordo com o alfabeto de uma língua desconhecida.

Precisamos descobrir uma ordem válida das letras.

Se a ordem for impossível, o resultado deve ser uma string vazia.

## Como a solução funciona

A solução monta um grafo entre letras.

Quando duas palavras vizinhas diferem pela primeira vez, essa diferença mostra qual letra vem antes da outra.

Exemplo:

```js
"hrn" e "hrf"
```

Mostram que:

```js
"n" vem antes de "f"
```

Depois disso, a solução usa DFS para fazer uma ordenação topológica.

Se durante a DFS uma letra voltar para uma que já está no caminho atual, existe ciclo e a resposta é inválida.

Ela também trata o caso em que uma palavra maior aparece antes da própria prefixo, como `["abc", "ab"]`.

## Exemplo rápido

Se:

```js
words = ["z", "o"]
```

Então sabemos que:

```js
"z" vem antes de "o"
```

Resultado:

```js
"zo"
```

## Resultado dos exemplos

### Exemplo 1

```js
words = ["z", "o"]
resultado = "zo"
```

### Exemplo 2

```js
words = ["hrn", "hrf", "er", "enn", "rfnn"]
resultado = "hernf"
```

### Exemplo 3

```js
words = ["abc", "ab"]
resultado = ""
```

## Complexidade

- Tempo: `O(C)`
- Espaço: `O(C)`

`C` representa o total de caracteres usados para montar o grafo e percorrer as relações.

## Resumo

Essa solução compara palavras vizinhas para descobrir relações entre letras e depois usa DFS com ordenação topológica para montar uma ordem válida do alfabeto.
