# Implement Trie (Prefix Tree)

Link do problema:
https://leetcode.com/problems/implement-trie-prefix-tree/

## O problema

Precisamos implementar uma Trie, também chamada de árvore de prefixos.

Ela deve permitir inserir palavras, buscar palavras completas e verificar se existe alguma palavra com um prefixo.

## Como a solução funciona

A solução cria uma raiz vazia.

Cada nó tem um array com 26 posições, uma para cada letra de `a` até `z`.

Ao inserir uma palavra, caminhamos letra por letra e criamos os nós que ainda não existem.

No final da palavra, marcamos o nó com `endOfWord = true`.

Para buscar uma palavra, seguimos suas letras e só retornamos `true` se o último nó estiver marcado como fim de palavra.

Para buscar um prefixo, basta conseguir caminhar por todas as letras do prefixo.

## Exemplo rápido

Se:

```js
trie.insert("apple")
trie.search("apple")
trie.search("app")
trie.startsWith("app")
```

O resultado é:

```js
true
false
true
```

`app` existe como prefixo, mas ainda não foi inserida como palavra completa.

## Resultado dos exemplos

### Exemplo 1

```js
operations = ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
values = [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
resultado = [null, null, true, false, true, null, true]
```

### Exemplo 2

```js
operations = ["Trie", "insert", "insert", "search", "startsWith"]
values = [[], ["cat"], ["car"], ["cap"], ["ca"]]
resultado = [null, null, null, false, true]
```

### Exemplo 3

```js
operations = ["Trie", "insert", "search", "startsWith", "search"]
values = [[], ["hello"], ["hello"], ["hell"], ["hell"]]
resultado = [null, null, true, true, false]
```

## Complexidade

- Tempo: `O(n)` por operação
- Espaço: `O(n)` para as palavras inseridas

Onde `n` é o tamanho da palavra ou prefixo usado na operação.

## Resumo

Essa solução usa uma árvore de prefixos para compartilhar caminhos entre palavras com as mesmas letras iniciais.
