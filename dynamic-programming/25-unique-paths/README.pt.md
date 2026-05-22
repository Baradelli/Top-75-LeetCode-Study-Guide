# Unique Paths

Link do problema:
https://leetcode.com/problems/unique-paths/

## O problema

Existe um robô em uma grade `m x n`.

Ele começa no canto superior esquerdo e quer chegar ao canto inferior direito.

Em cada passo, ele só pode:

- ir para a direita
- ir para baixo

Precisamos descobrir quantos caminhos diferentes existem.

## Como a solução funciona

Essa solução usa programação dinâmica.

A ideia é:

- a última linha só tem `1` caminho possível em cada posição
- a última coluna também só tem `1` caminho possível

Depois disso, cada célula passa a valer:

```js
caminhos da direita + caminhos de baixo
```

No código:

```js
newRow[j] = newRow[j + 1] + row[j];
```

Usamos apenas uma linha anterior e uma linha atual, então não precisamos guardar a grade inteira.

## Exemplo rápido

Se:

```js
m = 3
n = 2
```

Os caminhos possíveis são:

1. direita -> baixo -> baixo
2. baixo -> direita -> baixo
3. baixo -> baixo -> direita

Resultado:

```js
3
```

## Resultado dos exemplos

### Exemplo 1

```js
m = 3
n = 7
resultado = 28
```

### Exemplo 2

```js
m = 3
n = 2
resultado = 3
```

### Exemplo 3

```js
m = 3
n = 3
resultado = 6
```

## Complexidade

- Tempo: `O(m * n)`
- Espaço: `O(n)`

## Resumo

Essa solução calcula os caminhos de trás para frente. Cada posição usa apenas o valor da direita e o valor de baixo para descobrir sua resposta.
