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

## Exemplo rápido

Se `a = 1` e `b = 2`:

- `1 ^ 2` produz a soma sem carry
- `(1 & 2) << 1` produz o carry
- repetimos até o carry desaparecer

No final, o resultado é `3`.

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
