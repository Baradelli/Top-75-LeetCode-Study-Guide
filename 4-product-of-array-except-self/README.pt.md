# Product of Array Except Self

Link do problema:
https://leetcode.com/problems/product-of-array-except-self/

## O problema

Dado um array `nums`, precisamos retornar um novo array em que cada posição contém o produto de todos os outros números, exceto o valor da posição atual.

## Como a solução funciona

Essa solução faz isso sem usar divisão.

Ela percorre o array em duas etapas:

1. Da esquerda para a direita, guarda o produto de tudo que vem antes
2. Da direita para a esquerda, multiplica pelo produto de tudo que vem depois

Assim, cada posição recebe:

- o produto dos elementos à esquerda
- multiplicado pelo produto dos elementos à direita

## Exemplo rápido

Se `nums = [1, 2, 3, 4]`:

- para o índice `0`, o resultado é `2 * 3 * 4 = 24`
- para o índice `1`, o resultado é `1 * 3 * 4 = 12`
- para o índice `2`, o resultado é `1 * 2 * 4 = 8`
- para o índice `3`, o resultado é `1 * 2 * 3 = 6`

Resultado final:

```js
[24, 12, 8, 6]
```

## Resultado dos exemplos

### Exemplo 1

```js
nums = [1, 2, 3, 4]
resultado = [24, 12, 8, 6]
```

### Exemplo 2

```js
nums = [-1, 1, 0, -3, 3]
resultado = [0, 0, 9, 0, 0]
```

## Complexidade

- Tempo: `O(n)`
- Espaço extra: `O(1)`

Observação:
Se considerar o array de resposta na conta, o espaço total fica `O(n)`.

## Resumo

Essa solução é eficiente porque percorre o array duas vezes e monta o resultado usando produtos acumulados da esquerda e da direita.
