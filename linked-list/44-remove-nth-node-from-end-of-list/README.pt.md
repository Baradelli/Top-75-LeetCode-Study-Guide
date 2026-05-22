# Remove Nth Node From End of List

Link do problema:
https://leetcode.com/problems/remove-nth-node-from-end-of-list/

## O problema

Recebemos o `head` de uma lista ligada e um número `n`.

Precisamos remover o `n`-ésimo nó contado a partir do fim da lista.

No final, retornamos a nova cabeça da lista.

## Como a solução funciona

A solução usa dois ponteiros:

- `right`
- `left`

Também usamos um nó auxiliar `dummy`, que aponta para o começo da lista.

Primeiro avançamos `right` `n` posições.

Depois movemos `left` e `right` juntos até `right` chegar ao fim.

Nesse momento, `left.next` é exatamente o nó que precisa ser removido.

Então fazemos:

```js
left.next = left.next.next
```

Isso pula o nó removido.

## Exemplo rápido

Se:

```js
head = [1, 2, 3, 4, 5]
n = 2
```

O segundo nó a partir do fim é o `4`.

Depois da remoção, o resultado é:

```js
[1, 2, 3, 5]
```

## Resultado dos exemplos

### Exemplo 1

```js
head = [1, 2, 3, 4, 5]
n = 2
resultado = [1, 2, 3, 5]
```

### Exemplo 2

```js
head = [1]
n = 1
resultado = []
```

### Exemplo 3

```js
head = [1, 2]
n = 1
resultado = [1]
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(1)`

## Resumo

Essa solução usa dois ponteiros com uma distância fixa entre eles. Isso permite encontrar rapidamente o nó que deve ser removido sem precisar contar o tamanho da lista antes.
