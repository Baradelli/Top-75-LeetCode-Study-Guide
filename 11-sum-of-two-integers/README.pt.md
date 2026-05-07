# Sum of Two Integers

Link do problema:
https://leetcode.com/problems/sum-of-two-integers/

## O problema

Dados dois inteiros `a` e `b`, precisamos retornar a soma entre eles.

A restrição é que não podemos usar os operadores `+` e `-`.

## Como a solução funciona

A solução usa operações de bits para simular a soma:

1. `a ^ b` calcula a soma sem considerar o vai-um
2. `(a & b) << 1` calcula o vai-um
3. repetimos o processo até não existir mais vai-um

Enquanto `b` for diferente de `0`:

- `a` passa a guardar a soma parcial
- `b` passa a guardar o carry

Quando `b` vira `0`, significa que não há mais carry para adicionar, então `a` já é a resposta final.

### Por que `a ^ b` ajuda?

O operador `XOR` compara os bits de `a` e `b`.

- `0 ^ 0 = 0`
- `0 ^ 1 = 1`
- `1 ^ 0 = 1`
- `1 ^ 1 = 0`

Isso é muito parecido com a soma binária sem considerar o vai-um.

Exemplo:

```js
0 + 0 = 0
0 + 1 = 1
1 + 0 = 1
1 + 1 = 0 // aqui faltou o carry
```

Então `a ^ b` nos dá a soma parcial.

### Por que `(a & b) << 1` calcula o carry?

O operador `AND` só retorna `1` quando os dois bits são `1`.

- `0 & 0 = 0`
- `0 & 1 = 0`
- `1 & 0 = 0`
- `1 & 1 = 1`

Na soma binária, é exatamente nesse caso que nasce o vai-um.

Mas esse carry não fica na posição atual. Ele precisa ir para a próxima coluna.
Por isso fazemos `<< 1`, que desloca o carry uma casa para a esquerda.

## Exemplo passo a passo

Se `a = 2` e `b = 3`, em binário temos:

```js
a = 0010
b = 0011
```

Vamos acompanhar cada repetição do laço:

### Estado inicial

```js
a = 0010
b = 0011
```

### Passo 1

Primeiro calculamos o carry:

```js
a & b = 0010 & 0011 = 0010
carry = 0010 << 1 = 0100
```

Agora calculamos a soma parcial:

```js
a ^ b = 0010 ^ 0011 = 0001
```

Depois atualizamos as variáveis:

```js
a = 0001
b = 0100
```

Interpretando:

- `a` guarda a soma sem carry
- `b` guarda o carry que ainda precisa ser somado

### Passo 2

Calculamos o novo carry:

```js
a & b = 0001 & 0100 = 0000
carry = 0000 << 1 = 0000
```

Calculamos a nova soma parcial:

```js
a ^ b = 0001 ^ 0100 = 0101
```

Atualizando:

```js
a = 0101
b = 0000
```

Agora `b` virou `0`, então não existe mais carry pendente.
O laço termina.

Resultado final:

```js
0101 = 5
```

### O que aconteceu de verdade?

Na primeira rodada:

- `XOR` montou a soma parcial
- `AND` encontrou onde havia colisão de bits `1`
- `<< 1` moveu esse vai-um para a próxima posição

Na segunda rodada:

- somamos a soma parcial com o carry
- como não surgiu novo carry, terminamos

Essa é a ideia central do algoritmo: repetir "soma sem carry" + "carry" até sobrar apenas o resultado final.

## Resultado dos exemplos

### Exemplo 1

```js
a = 1
b = 2
resultado = 3
```

### Exemplo 2

```js
a = 2
b = 3
resultado = 5
```

### Exemplo 3

```js
a = -4
b = 7
resultado = 3
```

## Complexidade

- Tempo: `O(1)`
- Espaço: `O(1)`

## Resumo

Essa solução é eficiente porque usa operações binárias para reproduzir a soma de inteiros sem depender dos operadores `+` e `-`.
