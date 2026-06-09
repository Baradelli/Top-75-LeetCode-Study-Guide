# Serialize and Deserialize Binary Tree

Link do problema:
https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

## O problema

Recebemos a raiz de uma árvore binária.

Precisamos criar duas funções:

- `serialize`, que transforma a árvore em uma string
- `deserialize`, que transforma essa string de volta na árvore original

A estrutura da árvore precisa ser preservada.

## Como a solução funciona

A solução usa percurso em pré-ordem.

Na serialização, visitamos o nó atual, depois o filho esquerdo e depois o filho direito.

Quando encontramos um nó `null`, salvamos `N` na string.

Esse marcador é importante porque permite reconstruir a estrutura exata da árvore.

Na desserialização, lemos os valores na mesma ordem e recriamos cada nó recursivamente.

## Exemplo rápido

Se:

```js
root = [1, 2, 3, null, null, 4, 5]
```

A árvore pode virar uma string como:

```js
"1,2,N,N,3,4,N,N,5,N,N"
```

Ao desserializar essa string, voltamos para:

```js
[1, 2, 3, null, null, 4, 5]
```

## Resultado dos exemplos

### Exemplo 1

```js
root = [1, 2, 3, null, null, 4, 5]
resultado = [1, 2, 3, null, null, 4, 5]
```

### Exemplo 2

```js
root = []
resultado = []
```

### Exemplo 3

```js
root = [1, -2, 3]
resultado = [1, -2, 3]
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(n)`

Onde `n` é a quantidade de nós da árvore.

## Resumo

Essa solução salva a árvore em pré-ordem usando `N` para nós vazios, o que permite reconstruir a mesma estrutura depois.
