# Guia Prático de Manipulação de Bits em JavaScript

Este guia existe para apoiar especialmente os problemas de bits deste próprio repositório.

Manipulação de bits quase nunca aparece no dia a dia de aplicações comuns, então é normal estranhar esse assunto no começo.
Por isso, o foco aqui não é só explicar operadores isolados, mas mostrar:

- o que cada operador faz
- em qual problema deste projeto ele aparece
- como usar os exemplos que já existem nas pastas `11` até `15` para praticar

## Onde este guia se conecta com o projeto

Se você quiser estudar bits junto com código real do repositório, estes são os melhores pontos de apoio:

- [11-sum-of-two-integers/README.pt.md](../11-sum-of-two-integers/README.pt.md): usa `^`, `&` e `<<`
- [12-number-of-1-bits/README.pt.md](../12-number-of-1-bits/README.pt.md): usa `& 1` e `>>>`
- [13-counting-bits/README.pt.md](../13-counting-bits/README.pt.md): usa `>>` e `& 1`
- [14-missing-number/README.pt.md](../14-missing-number/README.pt.md): compara solucao simples e solucao com `XOR`
- [15-reverse-bits/README.pt.md](../15-reverse-bits/README.pt.md): usa `>>>`, `<<` e `|`

Se a ideia for estudar por ordem de dificuldade, uma boa sequência é:

1. `12-number-of-1-bits`
2. `13-counting-bits`
3. `14-missing-number`
4. `11-sum-of-two-integers`
5. `15-reverse-bits`

## Antes de tudo: decimal x binario

Quando voce escreve:

```js
const n = 11;
```

esse valor esta em decimal.

Em binario, `11` e:

```txt
1011
```

Se quiser escrever um valor binario diretamente em JavaScript:

```js
const n = 0b1011;
console.log(n); // 11
```

## O detalhe mais importante em JavaScript

Em JavaScript, operadores bitwise trabalham com inteiros de 32 bits.

Isso traz dois cuidados muito importantes:

1. `>>` preserva sinal
2. `>>>` desloca preenchendo com zero

Na pratica:

- quando o problema trata um numero como unsigned 32-bit integer, normalmente `>>>` e a escolha mais segura
- quando voce quer apenas dividir por 2 em um numero positivo ou remover o ultimo bit, `>>` costuma funcionar bem

Voce ve essa diferenca principalmente nestes problemas:

- [12-number-of-1-bits/README.pt.md](../12-number-of-1-bits/README.pt.md)
- [15-reverse-bits/README.pt.md](../15-reverse-bits/README.pt.md)

## Operadores que mais aparecem nos exercicios

### `&` - AND bit a bit

O `&` retorna `1` apenas quando os dois bits sao `1`.

Tabela:

```txt
0 & 0 = 0
0 & 1 = 0
1 & 0 = 0
1 & 1 = 1
```

Exemplo:

```js
5 & 3
```

Visualmente:

```txt
5 = 101
3 = 011

  101
& 011
-----
  001
```

Resultado:

```txt
1
```

### Onde isso aparece no projeto

- `11-sum-of-two-integers`: `a & b` encontra onde existe carry
- `12-number-of-1-bits`: `n & 1` le o ultimo bit
- `13-counting-bits`: `i & 1` verifica se o ultimo bit e `1`

## `& 1` - olhar o ultimo bit

Esse e um dos padroes mais importantes de todos:

```js
n & 1
```

Isso olha apenas o ultimo bit do numero.

- se o resultado for `1`, o numero termina em `1`
- se o resultado for `0`, o numero termina em `0`

Exemplo:

```txt
5 = 101
1 = 001

  101
& 001
-----
  001
```

Resultado:

```txt
1
```

Com `4`:

```txt
4 = 100
1 = 001

  100
& 001
-----
  000
```

Resultado:

```txt
0
```

### Onde praticar isso no projeto

O melhor problema para fixar essa ideia e:

- [12-number-of-1-bits/README.pt.md](../12-number-of-1-bits/README.pt.md)

Depois disso, vale continuar em:

- [13-counting-bits/README.pt.md](../13-counting-bits/README.pt.md)

## `|` - OR bit a bit

O `|` retorna `1` se pelo menos um dos bits for `1`.

Tabela:

```txt
0 | 0 = 0
0 | 1 = 1
1 | 0 = 1
1 | 1 = 1
```

Exemplo:

```txt
5 = 101
3 = 011

  101
| 011
-----
  111
```

Resultado:

```txt
7
```

### Onde isso aparece no projeto

O melhor exemplo esta em:

- [15-reverse-bits/README.pt.md](../15-reverse-bits/README.pt.md)

La usamos:

```js
res = res | (bit << (31 - i));
```

A funcao do `|` ali e:

- manter os bits ja ligados em `res`
- ligar tambem o novo bit na posicao certa

Sem esse `|`, o resultado seria sobrescrito a cada passo.

## `^` - XOR bit a bit

O `XOR` retorna `1` quando os bits sao diferentes.

Tabela:

```txt
0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0
```

Exemplo:

```txt
5 = 101
3 = 011

  101
^ 011
-----
  110
```

Resultado:

```txt
6
```

### Propriedades importantes

```txt
x ^ x = 0
x ^ 0 = x
```

Isso torna o `XOR` muito util para:

- cancelar pares iguais
- encontrar numero faltando
- construir soma sem carry

### Onde isso aparece no projeto

- [11-sum-of-two-integers/README.pt.md](../11-sum-of-two-integers/README.pt.md)
- [14-missing-number/README.pt.md](../14-missing-number/README.pt.md)

## `<<` - shift para a esquerda

O `<<` desloca os bits para a esquerda.

Exemplo:

```js
5 << 1 // 10
5 << 2 // 20
```

Visualmente:

```txt
101 << 1 = 1010
101 << 2 = 10100
```

Para numeros positivos, pense assim:

```txt
n << 1 parece n * 2
n << 2 parece n * 4
```

### Onde isso aparece no projeto

- `11-sum-of-two-integers`: `(a & b) << 1`
- `15-reverse-bits`: `bit << (31 - i)`

Nos dois casos, o `<<` nao esta sendo usado para "multiplicar por 2" como ideia principal.
Ele esta sendo usado para mover um bit para outra posicao.

## `>>` - shift para a direita preservando sinal

O `>>` desloca os bits para a direita preservando o sinal.

Exemplo:

```js
13 >> 1 // 6
13 >> 2 // 3
```

Visualmente:

```txt
1101 >> 1 = 0110
1101 >> 2 = 0011
```

Para numeros positivos:

```txt
n >> 1 parece Math.floor(n / 2)
n >> 2 parece Math.floor(n / 4)
```

### Onde isso aparece no projeto

O melhor lugar para ver essa ideia em acao e:

- [13-counting-bits/README.pt.md](../13-counting-bits/README.pt.md)

La usamos:

```js
res[i] = res[i >> 1] + (i & 1);
```

ou seja:

- `i >> 1` remove o ultimo bit
- `i & 1` nos diz se esse ultimo bit era `0` ou `1`

## `>>>` - shift para a direita sem sinal

O `>>>` tambem desloca para a direita, mas sempre preenche a esquerda com `0`.

Essa diferenca importa muito em problemas com 32 bits sem sinal.

Comparacao conceitual:

```txt
>>  preserva o sinal
>>> preenche com zero
```

### Onde isso aparece no projeto

- [12-number-of-1-bits/README.pt.md](../12-number-of-1-bits/README.pt.md)
- [15-reverse-bits/README.pt.md](../15-reverse-bits/README.pt.md)

No `reverseBits`, por exemplo, isso e importante para que a leitura de cada bit aconteca como unsigned integer:

```js
const bit = (n >>> i) & 1;
return res >>> 0;
```

## `~` - NOT bit a bit

O `~` inverte todos os bits.

Mas, em JavaScript, ele costuma confundir porque trabalha em 32 bits com sinal.

Exemplo:

```js
~5 // -6
```

Regra pratica:

```txt
~x = -(x + 1)
```

Esse operador nao aparece diretamente nos problemas ja organizados, entao por enquanto ele e menos prioritario para estudo neste repositorio.

## Como usar os proprios problemas do projeto para estudar bits

Se voce quiser realmente fixar esse assunto, o melhor caminho e estudar teoria e codigo juntos.

### Etapa 1: entenda o ultimo bit

Use:

- [12-number-of-1-bits/README.pt.md](../12-number-of-1-bits/README.pt.md)
- [12-number-of-1-bits/number-of-1-bits.js](../12-number-of-1-bits/number-of-1-bits.js)

Objetivo:

- entender `n & 1`
- entender deslocamento para a direita
- perceber como contamos bits ligados

### Etapa 2: reaproveite a mesma ideia em programacao dinamica

Use:

- [13-counting-bits/README.pt.md](../13-counting-bits/README.pt.md)
- [13-counting-bits/counting-bits.js](../13-counting-bits/counting-bits.js)

Objetivo:

- ver `>>` e `& 1` trabalhando juntos
- entender como uma resposta depende de outra

### Etapa 3: treine cancelamento com XOR

Use:

- [14-missing-number/README.pt.md](../14-missing-number/README.pt.md)
- [14-missing-number/missing-number.js](../14-missing-number/missing-number.js)

Objetivo:

- visualizar `x ^ x = 0`
- entender por que numeros repetidos se cancelam
- comparar uma solucao simples com uma solucao bitwise

### Etapa 4: entenda soma binaria de verdade

Use:

- [11-sum-of-two-integers/README.pt.md](../11-sum-of-two-integers/README.pt.md)
- [11-sum-of-two-integers/sum-of-two-integers.js](../11-sum-of-two-integers/sum-of-two-integers.js)

Objetivo:

- ver `^` como soma sem carry
- ver `&` como detector de carry
- ver `<<` movendo o carry para a proxima posicao

### Etapa 5: monte bits em posicoes especificas

Use:

- [15-reverse-bits/README.pt.md](../15-reverse-bits/README.pt.md)
- [15-reverse-bits/reverse-bits.js](../15-reverse-bits/reverse-bits.js)

Objetivo:

- entender leitura de bits com `>>>`
- entender montagem do resultado com `|`
- entender deslocamento para posicoes exatas com `<<`

## O que revisar antes de uma entrevista

Se voce esquecer tudo e quiser revisar rapido, lembre destes pontos:

- `n & 1` olha o ultimo bit
- `n >> 1` ou `n >>> 1` move os bits para a direita
- `x ^ x = 0`
- `x ^ 0 = x`
- `(a & b) << 1` costuma representar carry
- `res = res | (...)` costuma significar "ligar um bit sem perder os anteriores"
- em JavaScript, `>>>` costuma ser mais seguro em problemas de unsigned 32 bits

## Resumo final

Manipulacao de bits parece estranha porque nao faz parte da rotina da maioria dos projetos do dia a dia.
Mas, depois que voce conecta cada operador a um problema concreto, ela comeca a fazer muito mais sentido.

Neste repositorio, os problemas `11` a `15` ja formam um mini percurso de estudo bem util para isso:

- `11` mostra soma binaria
- `12` mostra leitura de bits
- `13` mostra reaproveitamento de padroes binarios
- `14` mostra cancelamento com XOR
- `15` mostra reconstrucao de bits em posicoes invertidas

Se voce estudar esse guia junto com esses exercicios, a chance de o assunto deixar de parecer "magica" aumenta bastante.
