# Guia de Estudos - Top 75 LeetCode

Este repositório foi organizado para ajudar no estudo das **Top 75 LeetCode Questions** que você recebeu para praticar.

A ideia é deixar cada problema fácil de:

- entender
- executar
- revisar depois
- comparar em português e inglês

## Como está organizado

Agora os problemas ficam organizados por tipo.

Exemplo:

```text
array/
  1-two-sum/
    two-sum.js
    README.pt.md
    README.en.md

linked-list/
  40-reverse-linked-list/
    reverse-linked-list.js
    README.pt.md
    README.en.md

matrix/
  46-set-matrix-zeroes/
    set-matrix-zeroes.js
    README.pt.md
    README.en.md

string/
  50-longest-substring-without-repeating-characters/
    longest-substring-without-repeating-characters.js
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
node array/1-two-sum/two-sum.js
node linked-list/45-reorder-list/reorder-list.js
```

## Material extra

Para os problemas de manipulação de bits, existe um guia complementar focado nos próprios exemplos do projeto:

- [Guia Prático de Manipulação de Bits em JavaScript](./auxiliares/guia-manipulacao-bits-javascript.pt.md)

Esse guia é útil porque manipulação de bits não costuma fazer parte do dia a dia, então ter uma referência conectada aos exercícios ajuda bastante na revisão.

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

### Array

1. [Two Sum](./array/1-two-sum/README.pt.md)
2. [Best Time to Buy and Sell Stock](./array/2-best-time-to-buy-and-sell-stock/README.pt.md)
3. [Contains Duplicate](./array/3-contains-duplicate/README.pt.md)
4. [Product of Array Except Self](./array/4-product-of-array-except-self/README.pt.md)
5. [Maximum Subarray](./array/5-maximum-subarray/README.pt.md)
6. [Maximum Product Subarray](./array/6-maximum-product-subarray/README.pt.md)
9. [3Sum](./array/9-three-sum/README.pt.md)
10. [Container With Most Water](./array/10-container-with-most-water/README.pt.md)

### Binary

7. [Find Minimum in Rotated Sorted Array](./binary/7-find-minimum-in-rotated-sorted-array/README.pt.md)
8. [Search in Rotated Sorted Array](./binary/8-search-in-rotated-sorted-array/README.pt.md)
11. [Sum of Two Integers](./binary/11-sum-of-two-integers/README.pt.md)
12. [Number of 1 Bits](./binary/12-number-of-1-bits/README.pt.md)
13. [Counting Bits](./binary/13-counting-bits/README.pt.md)
14. [Missing Number](./binary/14-missing-number/README.pt.md)
15. [Reverse Bits](./binary/15-reverse-bits/README.pt.md)

### Dynamic Programming

16. [Climbing Stairs](./dynamic-programming/16-climb-stairs/README.pt.md)
17. [Coin Change](./dynamic-programming/17-coin-change/README.pt.md)
18. [Longest Increasing Subsequence](./dynamic-programming/18-longest-increasing-subsequence/README.pt.md)
19. [Longest Common Subsequence](./dynamic-programming/19-longest-common-subsequence/README.pt.md)
20. [Word Break](./dynamic-programming/20-word-break/README.pt.md)
21. [Combination Sum IV](./dynamic-programming/21-combination-sum-4/README.pt.md)
22. [House Robber](./dynamic-programming/22-house-robber/README.pt.md)
23. [House Robber II](./dynamic-programming/23-house-robber-2/README.pt.md)
24. [Decode Ways](./dynamic-programming/24-decode-ways/README.pt.md)
25. [Unique Paths](./dynamic-programming/25-unique-paths/README.pt.md)
26. [Jump Game](./dynamic-programming/26-jump-game/README.pt.md)

### Graph

27. [Clone Graph](./graph/27-clone-graph/README.pt.md)
28. [Course Schedule](./graph/28-course-schedule/README.pt.md)
29. [Pacific Atlantic Water Flow](./graph/29-pacific-atlantic-water-flow/README.pt.md)
30. [Number of Islands](./graph/30-number-of-islands/README.pt.md)
31. [Longest Consecutive Sequence](./graph/31-longest-consecutive-sequence/README.pt.md)
32. [Alien Dictionary](./graph/32-alien-dictionary/README.pt.md)
33. [Graph Valid Tree](./graph/33-graph-valid-tree/README.pt.md)
34. [Number of Connected Components in an Undirected Graph](./graph/34-number-of-connected-components-ai-an-undirected-graph/README.pt.md)

### Interval

35. [Insert Interval](./interval/35-insert-interval/README.pt.md)
36. [Merge Intervals](./interval/36-merge-intervals/README.pt.md)
37. [Non-overlapping Intervals](./interval/37-non-overlapping-intervals/README.pt.md)
38. [Meeting Rooms](./interval/38-meeting-rooms/README.pt.md)
39. [Meeting Rooms II](./interval/39-meeting-rooms-2/README.pt.md)

### Linked List

40. [Reverse Linked List](./linked-list/40-reverse-linked-list/README.pt.md)
41. [Linked List Cycle](./linked-list/41-linked-list-cycle/README.pt.md)
42. [Merge Two Sorted Lists](./linked-list/42-merge-two-sorted-lists/README.pt.md)
43. [Merge k Sorted Lists](./linked-list/43-merge-k-sorted-lists/README.pt.md)
44. [Remove Nth Node From End of List](./linked-list/44-remove-nth-node-from-end-of-list/README.pt.md)
45. [Reorder List](./linked-list/45-reorder-list/README.pt.md)

### Matrix

46. [Set Matrix Zeroes](./matrix/46-set-matrix-zeroes/README.pt.md)
47. [Spiral Matrix](./matrix/47-spiral-matrix/README.pt.md)
48. [Rotate Image](./matrix/48-rotate-image/README.pt.md)
49. [Word Search](./matrix/49-word-search/README.pt.md)

### String

50. [Longest Substring Without Repeating Characters](./string/50-longest-substring-without-repeating-characters/README.pt.md)
51. [Longest Repeating Character Replacement](./string/51-longest-repeating-character-replacement/README.pt.md)
52. [Minimum Window Substring](./string/52-minimum-window-substring/README.pt.md)
53. [Valid Anagram](./string/53-valid-anagram/README.pt.md)
54. [Group Anagrams](./string/54-group-anagrams/README.pt.md)
55. [Valid Parentheses](./string/55-valid-parentheses/README.pt.md)
56. [Valid Palindrome](./string/56-valid-palindrome/README.pt.md)
57. [Longest Palindromic Substring](./string/57-longest-palindromic-substring/README.pt.md)
58. [Palindromic Substrings](./string/58-palindromic-substrings/README.pt.md)

## Padrão para os próximos

Para cada novo problema da lista Top 75, a ideia é seguir o mesmo padrão:

1. Identificar o tipo correto do problema
2. Criar a pasta do problema dentro da pasta desse tipo
3. Adicionar o arquivo `.js` com a solução
4. Colocar exemplos executáveis
5. Mostrar no terminal se deu certo ou errado
6. Criar `README.pt.md`
7. Criar `README.en.md`

Assim seu material vai ficar consistente, fácil de revisar e pronto para crescer ao longo dos estudos.
