# Meeting Rooms

Link do problema:
https://leetcode.com/problems/meeting-rooms/

## O problema

Recebemos um array `intervals` com os horários de início e fim das reuniões.

Precisamos descobrir se uma pessoa consegue participar de todas as reuniões sem conflito.

Se uma reunião termina exatamente quando a próxima começa, isso não conta como sobreposição.

## Como a solução funciona

A solução primeiro ordena os intervalos pelo horário de início.

Depois ela compara cada reunião com a anterior.

Se o fim da reunião anterior for maior que o início da reunião atual, existe conflito e a resposta é `false`.

Se nenhuma sobreposição aparecer, a resposta é `true`.

## Exemplo rápido

Se:

```js
intervals = [[0, 30], [5, 10], [15, 20]]
```

Depois de ordenar, já percebemos que `[0, 30]` invade o começo de `[5, 10]`.

Então o resultado é:

```js
false
```

## Resultado dos exemplos

### Exemplo 1

```js
intervals = [[0, 30], [5, 10], [15, 20]]
resultado = false
```

### Exemplo 2

```js
intervals = [[5, 8], [9, 15]]
resultado = true
```

### Exemplo 3

```js
intervals = [[0, 8], [8, 10], [12, 14]]
resultado = true
```

## Complexidade

- Tempo: `O(n log n)` por causa da ordenação
- Espaço: `O(1)` desconsiderando a ordenação interna

## Resumo

Essa solução ordena as reuniões e verifica se alguma começa antes da anterior terminar. Se isso acontecer, existe conflito; caso contrário, dá para participar de todas.
