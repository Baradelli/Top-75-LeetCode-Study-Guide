# Missing Number

Link do problema:
https://leetcode.com/problems/missing-number/

## O problema

Dado um array `nums` contendo `n` números distintos no intervalo `[0, n]`, precisamos descobrir qual número está faltando.

Isso significa que o array deveria conter todos os valores de `0` até `n`, mas um deles não aparece.

## Como a solução principal funciona

A solução principal usa soma, porque ela é mais direta de entender.

A ideia é:

1. calcular a soma que deveria existir de `0` até `n`
2. calcular a soma dos valores que realmente estão no array
3. subtrair uma da outra

Fórmula da soma esperada:

```js
n * (n + 1) / 2
```

Então:

```js
numeroFaltando = somaEsperada - somaReal
```

### Exemplo passo a passo da solução principal

Se:

```js
nums = [3, 0, 1]
```

O tamanho do array é `3`, então os números deveriam ser:

```js
0, 1, 2, 3
```

### Passo 1

Calculamos a soma esperada:

```js
3 * (3 + 1) / 2 = 6
```

### Passo 2

Calculamos a soma real do array:

```js
3 + 0 + 1 = 4
```

### Passo 3

Fazemos a diferença:

```js
6 - 4 = 2
```

Resultado:

```js
2
```

## Solução alternativa com XOR

Como esse problema aparece na parte de binários, também vale conhecer a versão com `XOR`.

A ideia é usar esta propriedade:

```js
a ^ a = 0
0 ^ a = a
```

Isso quer dizer que, se fizermos `XOR` entre todos os índices e todos os valores do array, os números que aparecem dos dois lados se cancelam.
No final, sobra apenas o número que está faltando.

### Por que isso funciona?

Imagine que queremos os números de `0` até `n`.

Se aplicarmos `XOR` em tudo:

- `0 ^ 0` cancela
- `1 ^ 1` cancela
- `2 ^ 2` cancela
- ...

Como o número ausente não encontra seu par, ele sobra no final.

## Exemplo passo a passo com XOR

Usando:

```js
nums = [3, 0, 1]
```

Começamos com:

```js
xor = nums.length = 3
```

Fazemos isso porque o laço vai passar pelos índices `0`, `1` e `2`, e ainda precisamos incluir o valor `3`.

### Passo 1: i = 0

```js
xor = 3
xor ^= 0
xor = 3
xor ^= 3
xor = 0
```

### Passo 2: i = 1

```js
xor = 0
xor ^= 1
xor = 1
xor ^= 0
xor = 1
```

### Passo 3: i = 2

```js
xor = 1
xor ^= 2
xor = 3
xor ^= 1
xor = 2
```

Resultado final:

```js
2
```

Esse `2` é exatamente o número faltando.

## Comparação entre as duas

- A solução com soma é mais simples de entender e ótima para revisão rápida
- A solução com XOR é muito útil para treinar raciocínio com bits
- As duas resolvem o problema em tempo linear

## Resultado dos exemplos

### Exemplo 1

```js
nums = [3, 0, 1]
resultado = 2
```

### Exemplo 2

```js
nums = [0, 1]
resultado = 2
```

### Exemplo 3

```js
nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]
resultado = 8
```

## Complexidade

### Solução com soma

- Tempo: `O(n)`
- Espaço: `O(1)`

### Solução com XOR

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Neste problema, a versão com soma é a mais fácil de entender, enquanto a versão com XOR é uma ótima alternativa para praticar manipulação de bits.
