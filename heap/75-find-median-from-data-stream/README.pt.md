# Find Median from Data Stream

Link do problema:
https://leetcode.com/problems/find-median-from-data-stream/

## O problema

Precisamos criar uma estrutura que recebe números aos poucos.

Depois de cada inserção, ela deve conseguir retornar a mediana dos números já recebidos.

Se a quantidade de números for par, a mediana é a média dos dois valores do meio.

## Como a solução funciona

A solução usa duas heaps.

A heap `small` guarda a metade menor dos números e funciona como max heap.

A heap `large` guarda a metade maior dos números e funciona como min heap.

Depois de inserir um número, balanceamos as heaps para que a diferença de tamanho entre elas seja no máximo `1`.

Se uma heap tiver mais elementos, sua raiz é a mediana.

Se as duas tiverem o mesmo tamanho, a mediana é a média das duas raízes.

## Exemplo rápido

Se inserimos:

```js
1
2
3
```

Depois de `1` e `2`, a mediana é:

```js
1.5
```

Depois de inserir `3`, a mediana é:

```js
2
```

## Resultado dos exemplos

### Exemplo 1

```js
operations = ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
values = [[], [1], [2], [], [3], []]
resultado = [null, null, null, 1.5, null, 2]
```

### Exemplo 2

```js
operations = ["MedianFinder", "addNum", "findMedian", "addNum", "findMedian"]
values = [[], [5], [], [10], []]
resultado = [null, null, 5, null, 7.5]
```

### Exemplo 3

```js
operations = ["MedianFinder", "addNum", "addNum", "addNum", "findMedian"]
values = [[], [3], [1], [2], []]
resultado = [null, null, null, null, 2]
```

## Complexidade

- Tempo para adicionar: `O(log n)`
- Tempo para buscar a mediana: `O(1)`
- Espaço: `O(n)`

Onde `n` é a quantidade de números adicionados.

## Resumo

Essa solução mantém duas metades balanceadas com heaps para acessar a mediana rapidamente.
