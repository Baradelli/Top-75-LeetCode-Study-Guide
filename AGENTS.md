# AGENTS.md

Este arquivo serve como instrução para qualquer agente de IA que trabalhar neste repositório.

## Objetivo do projeto

Este repositório organiza exercícios da lista **Top 75 LeetCode** para estudo.

Cada problema deve virar um material de revisão simples, consistente e fácil de executar, com:

- solução em JavaScript
- exemplos executáveis no terminal
- explicação em português
- explicação em inglês

## Estrutura esperada

Cada problema deve ficar em uma pasta própria, seguindo este padrão:

```text
numero-nome-do-problema/
  nome-do-problema.js
  README.pt.md
  README.en.md
```

Exemplo:

```text
10-container-with-most-water/
  container-with-most-water.js
  README.pt.md
  README.en.md
```

## Padrão do arquivo `.js`

O arquivo JavaScript de cada problema deve conter:

1. A função principal da solução
2. Um array de exemplos
3. Comparação entre resultado e valor esperado
4. Saída colorida no terminal
5. `module.exports` no final

### Regras importantes

- Manter o estilo simples e didático
- Preferir nomes claros para variáveis
- Não alterar a função principal do arquivo `.js` sem necessidade
- Se a função já existir, preservar seu nome, sua assinatura e sua lógica central sempre que possível
- Não deixar texto solto do enunciado dentro do arquivo `.js`
- Os exemplos devem rodar com `node`
- Sempre que possível, seguir o estilo já usado nos problemas anteriores

## Padrão do `README.pt.md`

O README em português deve seguir este formato:

1. Título com o nome do problema
2. Link do problema no LeetCode
3. Seção `## O problema`
4. Seção `## Como a solução funciona`
5. Seção `## Exemplo rápido`
6. Seção `## Resultado dos exemplos`
7. Seção `## Complexidade`
8. Seção `## Resumo`

O texto deve ser:

- simples
- curto
- direto
- didático

## Padrão do `README.en.md`

O README em inglês deve espelhar o mesmo conteúdo do arquivo em português, com esta estrutura:

1. Título com o nome do problema
2. Problem link
3. Seção `## The problem`
4. Seção `## How the solution works`
5. Seção `## Quick example`
6. Seção `## Results for the examples`
7. Seção `## Complexity`
8. Seção `## Summary`

O objetivo é manter equivalência entre os dois READMEs.

## READMEs centrais que devem ser atualizados

Ao adicionar um novo problema, o agente também deve atualizar:

- `README.pt.md`
- `README.en.md`
- `README.md`

### O que atualizar

Nos arquivos `README.pt.md` e `README.en.md` da raiz:

- adicionar o novo problema na lista de problemas organizados
- manter a numeração correta
- manter o mesmo formato dos itens anteriores

No arquivo `README.md` da raiz:

- manter a apresentação geral do projeto
- atualizar a quantidade total de problemas organizados, se esse número aparecer no texto

## Fluxo esperado ao adicionar um novo problema

Quando receber uma solicitação para adicionar ou padronizar um exercício, o agente deve:

1. Ver como os problemas anteriores foram feitos
2. Criar ou ajustar a pasta do problema
3. Criar ou ajustar o arquivo `.js` no mesmo padrão dos demais
4. Criar `README.pt.md`
5. Criar `README.en.md`
6. Atualizar os READMEs centrais
7. Executar o arquivo com `node` para validar os exemplos, quando possível

## Prioridade

A prioridade neste repositório é manter:

- consistência
- clareza
- simplicidade
- facilidade de revisão

Se houver dúvida entre dois estilos, escolher o estilo que mais se parece com os arquivos já existentes no projeto.
