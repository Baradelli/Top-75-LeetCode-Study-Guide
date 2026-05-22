# Merge Intervals

Link do problema:
https://leetcode.com/problems/merge-intervals/

## O problema

Recebemos um array `intervals` com vários intervalos.

Alguns desses intervalos podem se sobrepor.

Precisamos juntar os intervalos que se encostam ou se cruzam e retornar apenas os intervalos finais, sem sobreposição.

## Como a solução funciona

A solução primeiro ordena os intervalos pelo início.

Isso é importante porque, depois da ordenação, basta comparar cada intervalo com o último intervalo já colocado na resposta.

Criamos um array:

```js
mergedIntervals
```

Ele começa com o primeiro intervalo.

Depois, para cada próximo intervalo:

- se o início dele for menor ou igual ao fim do último intervalo salvo, existe sobreposição
- então atualizamos o fim do último intervalo com o maior valor
- se não houver sobreposição, adicionamos um novo intervalo na resposta

## Exemplo rápido

Se:

```js
intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
```

Os dois primeiros intervalos se sobrepõem:

```js
[1, 3] e [2, 6]
```

Então eles viram:

```js
[1, 6]
```

Resultado final:

```js
[[1, 6], [8, 10], [15, 18]]
```

## Resultado dos exemplos

### Exemplo 1

```js
intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
resultado = [[1, 6], [8, 10], [15, 18]]
```

### Exemplo 2

```js
intervals = [[1, 4], [4, 5]]
resultado = [[1, 5]]
```

### Exemplo 3

```js
intervals = [[4, 7], [1, 4]]
resultado = [[1, 7]]
```

## Complexidade

- Tempo: `O(n log n)`
- Espaço: `O(n)`

O custo principal vem da ordenação dos intervalos.

## Resumo

Essa solução ordena os intervalos e depois percorre a lista uma vez, juntando os que se sobrepõem e mantendo apenas os blocos finais.
