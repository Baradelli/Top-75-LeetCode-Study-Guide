# Counting Bits

Link do problema:
https://leetcode.com/problems/counting-bits/

## O problema

Dado um inteiro `n`, precisamos retornar um array `ans` com tamanho `n + 1`.

Para cada posição `i`, o valor `ans[i]` deve ser a quantidade de bits `1` na representação binária de `i`.

## Como a solução funciona

A ideia principal é reaproveitar resultados que já calculamos antes.

Em vez de contar os bits de cada número do zero, usamos esta relação:

```js
res[i] = res[i >> 1] + (i & 1)
```

Isso funciona porque:

1. `i >> 1` remove o último bit de `i`
2. `res[i >> 1]` já guarda quantos bits `1` existem nesse valor menor
3. `i & 1` diz se o último bit de `i` é `0` ou `1`
4. somamos essas duas informações

### Por que `i >> 1` ajuda?

Deslocar um número uma posição para a direita em binário equivale a remover o último bit.

Exemplo:

```js
13 = 1101
13 >> 1 = 110 = 6
```

Então:

- `13` tem os bits de `6`
- mais o último bit que foi removido

### Por que `i & 1` ajuda?

O valor `1` em binário é:

```js
0001
```

Quando fazemos `i & 1`, olhamos apenas o último bit de `i`.

- se o resultado for `1`, o número termina em `1`
- se o resultado for `0`, o número termina em `0`

Isso nos diz exatamente se precisamos adicionar mais um bit ligado ao resultado anterior.

## Exemplo passo a passo

Se `n = 5`, precisamos montar:

```js
res[0] até res[5]
```

### Estado inicial

Começamos com:

```js
res[0] = 0
```

Porque o número `0` em binário é:

```js
0
```

e ele não tem nenhum bit `1`.

### Passo 1: i = 1

```js
1 = 0001
1 >> 1 = 0
1 & 1 = 1
```

Então:

```js
res[1] = res[0] + 1 = 0 + 1 = 1
```

Agora:

```js
res = [0, 1]
```

### Passo 2: i = 2

```js
2 = 0010
2 >> 1 = 1
2 & 1 = 0
```

Então:

```js
res[2] = res[1] + 0 = 1 + 0 = 1
```

Agora:

```js
res = [0, 1, 1]
```

### Passo 3: i = 3

```js
3 = 0011
3 >> 1 = 1
3 & 1 = 1
```

Então:

```js
res[3] = res[1] + 1 = 1 + 1 = 2
```

Agora:

```js
res = [0, 1, 1, 2]
```

### Passo 4: i = 4

```js
4 = 0100
4 >> 1 = 2
4 & 1 = 0
```

Então:

```js
res[4] = res[2] + 0 = 1 + 0 = 1
```

Agora:

```js
res = [0, 1, 1, 2, 1]
```

### Passo 5: i = 5

```js
5 = 0101
5 >> 1 = 2
5 & 1 = 1
```

Então:

```js
res[5] = res[2] + 1 = 1 + 1 = 2
```

Resultado final:

```js
[0, 1, 1, 2, 1, 2]
```

## Resultado dos exemplos

### Exemplo 1

```js
n = 2
resultado = [0, 1, 1]
```

### Exemplo 2

```js
n = 5
resultado = [0, 1, 1, 2, 1, 2]
```

### Exemplo 3

```js
n = 8
resultado = [0, 1, 1, 2, 1, 2, 2, 3, 1]
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(n)`

## Resumo

Essa solução é eficiente porque usa programação dinâmica simples: cada resposta aproveita o valor de um número menor que já foi calculado.
