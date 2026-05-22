# Reverse Bits

Link do problema:
https://leetcode.com/problems/reverse-bits/

## O problema

Dado um inteiro de 32 bits, precisamos inverter a ordem dos bits e retornar o novo valor.

Isso significa que:

- o primeiro bit vira o último
- o segundo vira o penúltimo
- e assim por diante

## Como a solução funciona

A solução percorre os 32 bits de `n` e monta um novo número `res`.

A ideia é:

1. ler um bit de `n`
2. descobrir em qual posição invertida ele deve ir
3. ligar esse bit dentro de `res`

No código, fazemos isso com:

```js
const bit = (n >>> i) & 1;
res = res | (bit << (31 - i));
```

## Por que `n >>> i` funciona?

O operador `>>>` desloca os bits para a direita sem preservar sinal.

Isso é importante aqui porque o problema trata `n` como um valor de 32 bits sem sinal.

Quando fazemos:

```js
n >>> i
```

estamos trazendo o bit da posição `i` para o final do número.

Depois disso:

```js
& 1
```

pega apenas esse último bit.

Então:

```js
(n >>> i) & 1
```

nos dá exatamente o bit que estava na posição `i`.

## Por que `bit << (31 - i)` funciona?

Se lemos um bit da posição `i`, ele precisa ser colocado na posição invertida:

```js
31 - i
```

Exemplos:

- bit da posição `0` vai para a posição `31`
- bit da posição `1` vai para a posição `30`
- bit da posição `31` vai para a posição `0`

Então:

```js
bit << (31 - i)
```

move o bit para o lugar correto dentro do resultado.

## Exemplo passo a passo

Vamos usar um exemplo pequeno para visualizar melhor a ideia.

Imagine este número em 8 bits:

```js
00000101
```

Invertendo os bits, queremos chegar em:

```js
10100000
```

No problema real fazemos isso com 32 bits, mas a lógica é a mesma.

### Estado inicial

```js
n   = 00000101
res = 00000000
```

### Passo 1: i = 0

Lemos o bit da posição `0`:

```js
bit = (n >>> 0) & 1 = 1
```

Esse bit precisa ir para a posição invertida:

```js
7 - 0 = 7
```

Então:

```js
res = res | (1 << 7)
res = 10000000
```

### Passo 2: i = 1

Lemos o bit da posição `1`:

```js
bit = (n >>> 1) & 1 = 0
```

Como ele é `0`, nada muda:

```js
res = 10000000
```

### Passo 3: i = 2

Lemos o bit da posição `2`:

```js
bit = (n >>> 2) & 1 = 1
```

A posição invertida é:

```js
7 - 2 = 5
```

Então:

```js
res = res | (1 << 5)
res = 10100000
```

### Restante dos passos

Os outros bits são `0`, então o resultado permanece:

```js
10100000
```

Esse é o número com os bits invertidos.

## Resultado dos exemplos

### Exemplo 1

```js
n = 43261596
resultado = 964176192
```

### Exemplo 2

```js
n = 2147483644
resultado = 1073741822
```

### Exemplo 3

```js
n = 1
resultado = 2147483648
```

## Complexidade

- Tempo: `O(1)`
- Espaço: `O(1)`

Observação:
O laço sempre executa 32 vezes, então o custo é constante.

## Resumo

Essa solução é eficiente porque lê cada bit uma vez e o coloca diretamente na posição invertida do número final.
