# Top K Frequent Elements

Link do problema:
https://leetcode.com/problems/top-k-frequent-elements/

## O problema

Recebemos um array de números `nums` e um número `k`.

Precisamos retornar os `k` números mais frequentes do array.

A resposta pode estar em qualquer ordem.

## Como a solução funciona

A solução conta quantas vezes cada número aparece.

Depois transformamos essa contagem em uma lista de pares: número e frequência.

Ordenamos essa lista pela frequência, da maior para a menor.

Por fim, pegamos os primeiros `k` números.

## Exemplo rápido

Se:

```js
nums = [1, 1, 1, 2, 2, 3]
k = 2
```

As frequências são:

```js
1 -> 3 vezes
2 -> 2 vezes
3 -> 1 vez
```

O resultado é:

```js
[1, 2]
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [1, 1, 1, 2, 2, 3]
k = 2
resultado = [1, 2]
```

### Exemplo 2

```js
nums = [1]
k = 1
resultado = [1]
```

### Exemplo 3

```js
nums = [1, 2, 1, 2, 1, 2, 3, 1, 3, 2]
k = 2
resultado = [1, 2]
```

## Complexidade

- Tempo: `O(n log n)`
- Espaço: `O(n)`

Onde `n` é a quantidade de números em `nums`.

## Resumo

Essa solução conta as frequências, ordena pelos valores mais frequentes e retorna os primeiros `k`.
