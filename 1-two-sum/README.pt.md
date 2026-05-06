# Two Sum

Link do problema:
https://leetcode.com/problems/two-sum

## O problema

Dado um array `nums` e um número `target`, precisamos encontrar os índices de dois números cuja soma seja igual ao `target`.

## Como a solução funciona

Usamos um `Map` para guardar:

- o número que já apareceu
- o índice desse número

Enquanto percorremos o array:

1. Calculamos quanto falta para chegar no `target`
2. Verificamos se esse valor já apareceu antes
3. Se já apareceu, retornamos os dois índices
4. Se não apareceu, salvamos o número atual no `Map`

## Exemplo rápido

Se `nums = [3, 2, 4]` e `target = 6`:

- no índice `0`, o número é `3` e falta `3`
- no índice `1`, o número é `2` e falta `4`
- no índice `2`, o número é `4` e falta `2`

Como o `2` já estava salvo, a resposta é `[1, 2]`.

## Resultado dos 3 exemplos

### Exemplo 1

```js
nums = [2, 7, 11, 15]
target = 9
resultado = [0, 1]
```

### Exemplo 2

```js
nums = [3, 2, 4]
target = 6
resultado = [1, 2]
```

### Exemplo 3

```js
nums = [3, 3]
target = 6
resultado = [0, 1]
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(n)`

## Resumo

Essa solução é eficiente porque percorre o array apenas uma vez e usa o `Map` para encontrar rapidamente o número complementar.
