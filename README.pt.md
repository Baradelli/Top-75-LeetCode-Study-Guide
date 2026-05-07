# Guia de Estudos - Top 75 LeetCode

Este repositório foi organizado para ajudar no estudo das **Top 75 LeetCode Questions** que você recebeu para praticar.

A ideia é deixar cada problema fácil de:

- entender
- executar
- revisar depois
- comparar em português e inglês

## Como está organizado

Cada problema fica dentro da sua própria pasta.

Exemplo:

```text
1-two-sum/
  two-sum.js
  README.pt.md
  README.en.md

2-best-time-to-buy-and-sell-stock/
  best-time-to-buy-and-sell-stock.js
  README.pt.md
  README.en.md
```

## O que existe em cada pasta

### Arquivo `.js`

O arquivo JavaScript contém:

- a função da solução
- os exemplos do problema
- comparação entre resultado e valor esperado
- log colorido no terminal

### `README.pt.md`

Explica o problema em português de forma simples e breve, com:

- link oficial do LeetCode
- resumo da ideia
- exemplo rápido
- resultado dos exemplos
- complexidade

### `README.en.md`

Traz a mesma explicação em inglês, útil para se acostumar com o vocabulário técnico da plataforma.

## Como executar

Entre na pasta do projeto e rode o arquivo do problema com `node`.

Exemplo:

```bash
node 1-two-sum/two-sum.js
node 2-best-time-to-buy-and-sell-stock/best-time-to-buy-and-sell-stock.js
```

## Como ler o resultado

Quando você rodar um arquivo:

- `verde` significa que o resultado está correto
- `vermelho` significa que o resultado está diferente do esperado

Isso ajuda a validar rapidamente se a solução está funcionando.

## Melhor forma de estudar

Uma forma simples de usar esse material:

1. Leia o problema no LeetCode
2. Tente resolver sozinho
3. Compare com a solução no arquivo `.js`
4. Leia o `README.pt.md` para fixar a ideia principal
5. Leia o `README.en.md` para treinar o inglês técnico
6. Rode o arquivo para visualizar os exemplos funcionando

## Objetivo desta estrutura

O foco não é só guardar código.

O foco é transformar cada exercício em um material rápido de revisão, para que depois você consiga bater o olho e lembrar:

- qual era o problema
- qual foi a lógica usada
- qual é a complexidade
- como reconhecer esse padrão em entrevistas

## Problemas já organizados

1. [Two Sum](./1-two-sum/README.pt.md)
2. [Best Time to Buy and Sell Stock](./2-best-time-to-buy-and-sell-stock/README.pt.md)
3. [Contains Duplicate](./3-contains-duplicate/README.pt.md)
4. [Product of Array Except Self](./4-product-of-array-except-self/README.pt.md)
5. [Maximum Subarray](./5-maximum-subarray/README.pt.md)
6. [Maximum Product Subarray](./6-maximum-product-subarray/README.pt.md)
7. [Find Minimum in Rotated Sorted Array](./7-find-minimum-in-rotated-sorted-array/README.pt.md)
8. [Search in Rotated Sorted Array](./8-search-in-rotated-sorted-array/README.pt.md)
9. [3Sum](./9-three-sum/README.pt.md)
10. [Container With Most Water](./10-container-with-most-water/README.pt.md)
11. [Sum of Two Integers](./11-sum-of-two-integers/README.pt.md)

## Padrão para os próximos

Para cada novo problema da lista Top 75, a ideia é seguir o mesmo padrão:

1. Criar uma pasta com o nome do problema
2. Adicionar o arquivo `.js` com a solução
3. Colocar exemplos executáveis
4. Mostrar no terminal se deu certo ou errado
5. Criar `README.pt.md`
6. Criar `README.en.md`

Assim seu material vai ficar consistente, fácil de revisar e pronto para crescer ao longo dos estudos.
