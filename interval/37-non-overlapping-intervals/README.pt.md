# Non-overlapping Intervals

Link do problema:
https://leetcode.com/problems/non-overlapping-intervals/

## O problema

Recebemos um array `intervals` com vários intervalos.

Precisamos descobrir o menor número de intervalos que devem ser removidos para que o restante fique sem sobreposição.

Intervalos que apenas se encostam, como `[1, 2]` e `[2, 3]`, são válidos e não contam como sobreposição.

## Como a solução funciona

A solução usa uma estratégia gulosa.

Primeiro ordenamos os intervalos pelo início.

Depois percorremos a lista comparando cada intervalo com o anterior que decidimos manter.

Guardamos:

```js
previousEnd
```

Esse valor representa o fim do último intervalo que continuou valendo.

Se o intervalo atual começar depois ou exatamente em `previousEnd`, não existe conflito.

Se existir sobreposição, precisamos remover um dos dois intervalos.

Para aumentar a chance de encaixar mais intervalos no futuro, mantemos o que termina primeiro:

```js
previousEnd = Math.min(previousEnd, currentEnd);
```

E aumentamos a contagem de remoções.

## Exemplo rápido

Se:

```js
intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
```

O intervalo `[1, 3]` atrapalha os outros.

Se removermos apenas ele, o restante fica sem sobreposição:

```js
[[1, 2], [2, 3], [3, 4]]
```

Então o resultado é:

```js
1
```

## Resultado dos exemplos

### Exemplo 1

```js
intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
resultado = 1
```

### Exemplo 2

```js
intervals = [[1, 2], [1, 2], [1, 2]]
resultado = 2
```

### Exemplo 3

```js
intervals = [[1, 2], [2, 3]]
resultado = 0
```

## Complexidade

- Tempo: `O(n log n)`
- Espaço: `O(1)` extra

O custo principal vem da ordenação.

## Resumo

Essa solução ordena os intervalos e usa uma escolha gulosa: quando há conflito, mantém o intervalo que termina primeiro. Assim conseguimos minimizar o número de remoções.
