# Group Anagrams

Link do problema:
https://leetcode.com/problems/group-anagrams/

## O problema

Recebemos um array de strings `strs`.

Precisamos agrupar as palavras que são anagramas entre si.

A ordem dos grupos e das palavras dentro dos grupos não é importante.

## Como a solução funciona

A solução usa um `Map`.

Para cada palavra, ordenamos suas letras. Essa versão ordenada vira a chave do grupo.

Palavras que são anagramas têm a mesma chave, porque possuem as mesmas letras nas mesmas quantidades.

No final, retornamos todos os grupos salvos no mapa.

## Exemplo rápido

Se:

```js
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
```

Uma resposta válida é:

```js
[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

Porque `"eat"`, `"tea"` e `"ate"` são anagramas, assim como `"tan"` e `"nat"`.

## Resultado dos exemplos

### Exemplo 1

```js
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
resultado = [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

### Exemplo 2

```js
strs = [""]
resultado = [[""]]
```

### Exemplo 3

```js
strs = ["a"]
resultado = [["a"]]
```

## Complexidade

- Tempo: `O(n * k log k)`, onde `n` é a quantidade de palavras e `k` é o tamanho médio de cada palavra
- Espaço: `O(n * k)`, para armazenar os grupos

## Resumo

Essa solução transforma cada palavra em uma chave ordenada. Palavras com a mesma chave entram no mesmo grupo de anagramas.
