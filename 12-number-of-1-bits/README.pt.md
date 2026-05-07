# Number of 1 Bits

Link do problema:
https://leetcode.com/problems/number-of-1-bits/

## O problema

Dado um inteiro sem sinal `n`, precisamos retornar quantos bits `1` existem na sua representação binária.

Isso também é chamado de peso de Hamming.

## Como a solução funciona

A solução percorre os bits do número da direita para a esquerda:

1. olha o último bit com `n & 1`
2. soma esse valor ao contador
3. desloca o número uma posição para a direita
4. repete até `n` virar `0`

Se o último bit for `1`, adicionamos `1` ao contador.
Se for `0`, não adicionamos nada.

### Por que `n & 1` funciona?

O número `1` em binário é:

```js
0001
```

Quando fazemos `n & 1`, estamos comparando apenas o último bit de `n`.

- se o último bit de `n` for `1`, o resultado será `1`
- se o último bit de `n` for `0`, o resultado será `0`

Então isso nos diz diretamente se o bit mais à direita está ligado.

### Por que usamos `n >>> 1`?

Depois de verificar o último bit, não precisamos mais dele.
Por isso deslocamos o número uma casa para a direita.

Exemplo:

```js
1011 >>> 1 = 0101
```

Assim, o próximo bit passa a virar o "último bit" e pode ser analisado na próxima repetição.

## Exemplo passo a passo

Se `n = 11`, sua forma binária é:

```js
1011
```

Vamos acompanhar cada passo:

### Estado inicial

```js
n = 11
binario = 1011
count = 0
```

### Passo 1

O último bit é:

```js
1011 & 0001 = 0001
```

Então:

- encontramos um bit `1`
- `count` vira `1`

Depois deslocamos:

```js
1011 >>> 1 = 0101
```

Agora:

```js
n = 5
count = 1
```

### Passo 2

O último bit agora é:

```js
0101 & 0001 = 0001
```

Então:

- encontramos outro bit `1`
- `count` vira `2`

Depois deslocamos:

```js
0101 >>> 1 = 0010
```

Agora:

```js
n = 2
count = 2
```

### Passo 3

O último bit agora é:

```js
0010 & 0001 = 0000
```

Então:

- esse bit é `0`
- `count` continua `2`

Depois deslocamos:

```js
0010 >>> 1 = 0001
```

Agora:

```js
n = 1
count = 2
```

### Passo 4

O último bit agora é:

```js
0001 & 0001 = 0001
```

Então:

- encontramos mais um bit `1`
- `count` vira `3`

Depois deslocamos:

```js
0001 >>> 1 = 0000
```

Agora:

```js
n = 0
count = 3
```

Como `n` chegou em `0`, o laço termina.

Resultado final:

```js
3
```

## Resultado dos exemplos

### Exemplo 1

```js
n = 11
resultado = 3
```

### Exemplo 2

```js
n = 128
resultado = 1
```

### Exemplo 3

```js
n = 2147483645
resultado = 30
```

## Complexidade

- Tempo: `O(1)`
- Espaço: `O(1)`

Observação:
Como o problema trabalha com inteiro de 32 bits, o número de iterações é limitado.

## Resumo

Essa solução é eficiente porque analisa os bits diretamente e conta quantos valores `1` aparecem na representação binária do número.
