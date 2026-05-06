# Maximum Product Subarray

Link do problema:
https://leetcode.com/problems/maximum-product-subarray/

## O problema

Dado um array `nums`, precisamos encontrar o maior produto possível de um subarray contínuo.

Subarray contínuo significa uma sequência de elementos vizinhos dentro do array.

## Como a solução funciona

Neste problema, não basta guardar só o maior produto atual.

Isso acontece porque:

- um número negativo pode transformar um valor muito pequeno em um valor muito grande
- um produto máximo pode virar mínimo
- um produto mínimo pode virar máximo

Por isso a solução guarda:

- `max`: maior produto terminando na posição atual
- `min`: menor produto terminando na posição atual
- `result`: melhor resposta encontrada até agora

Quando o número atual é negativo, trocamos `max` com `min`, porque o sinal vai inverter.

## Exemplo rápido

Se `nums = [2, 3, -2, 4]`:

- `2 * 3 = 6`
- quando entra `-2`, o produto muda de sinal
- no final, o melhor subarray continua sendo `[2, 3]`

Resultado:

```js
6
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [2, 3, -2, 4]
resultado = 6
```

### Exemplo 2

```js
nums = [-2, 0, -1]
resultado = 0
```

### Exemplo 3

```js
nums = [-2, 3, -4]
resultado = 24
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução é eficiente porque percorre o array uma vez só e acompanha ao mesmo tempo o maior e o menor produto atual.
