# Meeting Rooms II

Link do problema:
https://leetcode.com/problems/meeting-rooms-ii/

## O problema

Recebemos um array `intervals` com horários de início e fim das reuniões.

Precisamos descobrir o número mínimo de salas necessárias para conseguir agendar todas elas sem conflito.

Se uma reunião termina exatamente quando outra começa, a mesma sala pode ser reutilizada.

## Como a solução funciona

A solução separa todos os horários de início e todos os horários de fim.

Depois ordena essas duas listas.

Usamos dois ponteiros:

- um para os inícios
- outro para os fins

Quando o próximo início acontece antes do próximo fim, precisamos de mais uma sala.

Quando uma reunião já terminou, liberamos uma sala avançando o ponteiro dos fins.

Durante o processo, guardamos o maior número de salas usadas ao mesmo tempo.

## Exemplo rápido

Se:

```js
intervals = [[0, 40], [5, 10], [15, 20]]
```

Enquanto a reunião `[0, 40]` ainda está acontecendo, a reunião `[5, 10]` começa.

Então já precisamos de 2 salas.

Depois disso, nenhuma situação exige mais do que isso.

Resultado:

```js
2
```

## Resultado dos exemplos

### Exemplo 1

```js
intervals = [[0, 40], [5, 10], [15, 20]]
resultado = 2
```

### Exemplo 2

```js
intervals = [[4, 9]]
resultado = 1
```

### Exemplo 3

```js
intervals = [[0, 8], [8, 10], [9, 12]]
resultado = 2
```

## Complexidade

- Tempo: `O(n log n)` por causa da ordenação
- Espaço: `O(n)` para guardar os inícios e os fins

## Resumo

Essa solução ordena separadamente os horários de início e fim e simula quantas salas estão ocupadas em cada momento. O maior valor encontrado é a resposta.
