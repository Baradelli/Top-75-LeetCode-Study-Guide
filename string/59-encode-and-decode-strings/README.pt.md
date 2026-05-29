# Encode and Decode Strings

Link do problema:
https://neetcode.io/problems/string-encode-and-decode/question

## O problema

Recebemos uma lista de strings `strs`.

Precisamos transformar essa lista em uma única string e depois conseguir reconstruir a lista original.

A codificação precisa funcionar mesmo quando as strings têm caracteres especiais, números, `#` ou estão vazias.

## Como a solução funciona

A solução salva cada string junto com seu tamanho.

Para cada texto, adicionamos:

```js
tamanho + "#" + texto
```

Na hora de decodificar, lemos os dígitos até encontrar `#`.

Esse número diz exatamente quantos caracteres pertencem à próxima string.

Assim, mesmo que a string contenha `#`, a separação continua correta.

## Exemplo rápido

Se:

```js
strs = ["Hello", "World"]
```

A string codificada fica:

```js
"5#Hello5#World"
```

Ao decodificar, voltamos para:

```js
["Hello", "World"]
```

## Resultado dos exemplos

### Exemplo 1

```js
strs = ["Hello", "World"]
resultado = ["Hello", "World"]
```

### Exemplo 2

```js
strs = [""]
resultado = [""]
```

### Exemplo 3

```js
strs = ["neet", "code#", "4#five", ""]
resultado = ["neet", "code#", "4#five", ""]
```

## Complexidade

- Tempo: `O(n)`
- Espaço: `O(n)`

## Resumo

Essa solução usa o tamanho de cada string como prefixo. Isso permite decodificar com segurança sem depender de um separador que poderia aparecer dentro dos próprios textos.
