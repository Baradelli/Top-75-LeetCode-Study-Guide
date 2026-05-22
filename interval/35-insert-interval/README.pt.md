# Insert Interval

Link do problema:
https://leetcode.com/problems/insert-interval/

## O problema

Recebemos um array `intervals` com intervalos já ordenados e sem sobreposição.

Também recebemos um novo intervalo:

```js
newInterval
```

Precisamos inserir esse novo intervalo na posição correta.

Se houver sobreposição com intervalos existentes, precisamos juntar tudo em um único intervalo.

## Como a solução funciona

A solução percorre os intervalos uma vez.

Existem três casos:

- o novo intervalo termina antes do intervalo atual
- o novo intervalo começa depois do intervalo atual
- os dois intervalos se sobrepõem

Quando existe sobreposição, a solução atualiza `newInterval` com os novos limites:

```js
newInterval = [
  Math.min(newInterval[0], intervals[index][0]),
  Math.max(newInterval[1], intervals[index][1]),
];
```

Isso faz o intervalo crescer enquanto for necessário.

Quando encontramos a primeira posição onde ele deve entrar sem sobreposição, colocamos no resultado e terminamos.

## Exemplo rápido

Se:

```js
intervals = [[1, 3], [6, 9]]
newInterval = [2, 5]
```

O novo intervalo se junta com `[1, 3]` e vira:

```js
[1, 5]
```

Então o resultado final é:

```js
[[1, 5], [6, 9]]
```

## Resultado dos exemplos

### Exemplo 1

```js
intervals = [[1, 3], [6, 9]]
newInterval = [2, 5]
resultado = [[1, 5], [6, 9]]
```

### Exemplo 2

```js
intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]]
newInterval = [4, 8]
resultado = [[1, 2], [3, 10], [12, 16]]
```

### Exemplo 3

```js
intervals = [[1, 5]]
newInterval = [6, 8]
resultado = [[1, 5], [6, 8]]
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(n)`

## Resumo

Essa solução percorre os intervalos em ordem, adiciona os que ficam totalmente antes, junta os que se sobrepõem e depois monta o resultado final já ordenado.
