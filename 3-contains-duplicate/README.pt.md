# Contains Duplicate

Link do problema:
https://leetcode.com/problems/contains-duplicate/

## O problema

Dado um array `nums`, precisamos verificar se existe algum número repetido.

Se existir pelo menos um valor duplicado, retornamos `true`.
Se todos os valores forem diferentes, retornamos `false`.

## Como a solução funciona

A solução usa um `Set` para guardar os números que já apareceram.

Enquanto percorremos o array:

1. Verificamos se o número atual já está no `Set`
2. Se já estiver, retornamos `true`
3. Se não estiver, adicionamos o número ao `Set`
4. Se o loop terminar, retornamos `false`

## Exemplo rápido

Se `nums = [1, 2, 3, 1]`:

- vemos `1` e salvamos
- vemos `2` e salvamos
- vemos `3` e salvamos
- vemos `1` novamente

Como o `1` já existia no `Set`, a resposta é `true`.

## Resultado dos exemplos

### Exemplo 1

```js
nums = [1, 2, 3, 1]
resultado = true
```

### Exemplo 2

```js
nums = [1, 2, 3, 4]
resultado = false
```

### Exemplo 3

```js
nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
resultado = true
```

## Menção honrosa

Também existe esta versão:

```js
var containsDuplicate = function(nums) {
    return new Set(nums).size !== nums.length;
};
```

Ela também está correta e é uma opção válida.

Mas a sua solução tem uma vantagem interessante: ela pode dar `early return`.
Ou seja, assim que encontra um valor repetido, ela já retorna `true`, sem precisar continuar processando o resto do array.

Já a versão `new Set(nums).size !== nums.length` precisa montar o `Set` completo antes de comparar os tamanhos.

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(n)`

## Resumo

Essa solução é simples, eficiente e ótima para entrevista, porque usa `Set` e pode parar cedo quando encontra uma duplicata.
