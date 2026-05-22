# Course Schedule

Link do problema:
https://leetcode.com/problems/course-schedule/

## O problema

Temos `numCourses` cursos numerados de `0` até `numCourses - 1`.

Também recebemos um array `prerequisites`, em que cada par:

```js
[a, b]
```

significa que o curso `b` precisa ser feito antes do curso `a`.

Precisamos descobrir se é possível terminar todos os cursos.

## Como a solução funciona

Esse problema vira uma verificação de ciclo em grafo.

Se existir um ciclo, então algum curso depende dele mesmo de forma indireta, e a resposta é `false`.

Criamos:

```js
preMap
```

Esse objeto guarda os pré-requisitos de cada curso.

Depois usamos DFS.

Durante a busca, `visitSet` marca os cursos que estão no caminho atual da recursão.

Se tentarmos visitar de novo um curso que já está nesse caminho:

```js
if (visitSet.has(course)) {
  return false;
}
```

então encontramos um ciclo.

Quando um curso é validado, limpamos sua lista de pré-requisitos para evitar trabalho repetido.

## Exemplo rápido

Se:

```js
numCourses = 2
prerequisites = [[1, 0], [0, 1]]
```

Isso significa:

- para fazer `1`, precisamos de `0`
- para fazer `0`, precisamos de `1`

Existe um ciclo, então:

```js
false
```

## Resultado dos exemplos

### Exemplo 1

```js
numCourses = 2
prerequisites = [[1, 0]]
resultado = true
```

### Exemplo 2

```js
numCourses = 2
prerequisites = [[1, 0], [0, 1]]
resultado = false
```

### Exemplo 3

```js
numCourses = 4
prerequisites = [[1, 0], [2, 1], [3, 2]]
resultado = true
```

## Complexidade

- Tempo: `O(numCourses + quantidadeDePrerequisitos)`
- Espaço: `O(numCourses + quantidadeDePrerequisitos)`

## Resumo

Essa solução monta um grafo de dependências e usa DFS para detectar ciclos. Se não houver ciclo, então é possível concluir todos os cursos.
