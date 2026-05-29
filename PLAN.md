# Plano — LeetCode Visual Study

Aplicação web estática que transforma o repositório atual num guia interativo dos Top 75 LeetCode, com visualização passo a passo de cada algoritmo.

## Objetivo

Permitir que qualquer pessoa entenda e resolva os problemas, vendo o código rodar linha a linha com uma representação visual da estrutura de dados sendo manipulada.

## Stack

- **Astro + React islands** — páginas estáticas geradas a partir das pastas do repo, ilhas interativas só onde precisa (editor e visualizador).
- **Monaco Editor** — mesmo editor do VSCode, para ler/editar a solução.
- **Web Worker** — roda a solução isolada da UI, sem travar o browser.
- **Babel** — instrumenta o código antes de executar, injetando steps.
- **D3 / SVG puro** — desenho das estruturas (array, árvore, grafo, etc).
- **Tailwind** — estilo.

Sem backend. Deploy no GitHub Pages ou Vercel.

## Estrutura proposta

```
/                     # repo atual (pastas dos problemas continuam intocadas)
/web                  # nova app Astro
  src/
    pages/            # rotas geradas a partir das pastas dos problemas
    components/
      Editor.tsx
      Player.tsx      # play/pause/step da timeline
      visualizers/
        ArrayView.tsx
        HashMapView.tsx
        LinkedListView.tsx
        TreeView.tsx
        GraphView.tsx
        DPTableView.tsx
        MatrixView.tsx
    lib/
      instrument.ts   # transforma código com Babel, injeta __step()
      runner.ts       # Web Worker que executa e emite timeline
    content/
      patterns/       # cheatsheets por tipo (two pointers, sliding window, etc)
  scripts/
    build-index.ts    # lê /array, /string, ... e gera as rotas
```

## Como funciona o "debug visual"

1. **Build-time**: script lê as pastas do repo e gera rotas (`/array/two-sum`, etc), extraindo enunciado dos READMEs.
2. **Runtime**: ao clicar Run, a solução passa por Babel — antes de cada statement é injetado `__step(line, scope)`.
3. O Web Worker roda o código instrumentado com os `examples` já existentes no `.js`, e emite uma **timeline** de eventos: `{ line, variables, dataStructureState }`.
4. A UI consome a timeline: highlight da linha atual no Monaco + visualizador renderiza o estado correspondente.
5. Usuário controla com play / pause / step forward / step back / velocidade.

## Visualizadores por tipo

Cada tipo de problema usa um (ou mais) visualizador:

| Tipo                 | Visualizador principal                          |
| -------------------- | ----------------------------------------------- |
| array                | Array com ponteiros (L/R, slow/fast, i/j)       |
| string               | Array de chars + janela (sliding window)        |
| dynamic-programming  | Tabela DP preenchendo célula a célula           |
| linked-list          | Nós conectados horizontalmente                  |
| matrix               | Grid 2D com célula atual destacada              |
| graph                | Nós + arestas (d3-force), com visited/queue     |
| binary               | Árvore binária + bits quando aplicável          |
| interval             | Linha do tempo com barras                       |

## Páginas por tipo

Cada tipo tem uma "página hub" antes da lista de problemas:

- Resumo do tipo
- **Padrões comuns**: two pointers, sliding window, hash map, binary search, BFS/DFS, DP top-down/bottom-up, etc — cada um com mini-exemplo
- Quando usar cada padrão (heurística rápida)
- Lista dos problemas do tipo, com status (resolvido / não resolvido)

## Roadmap

**Fase 1 — Fundação**
- Setup Astro + Monaco + Tailwind
- Script de build que lê as pastas e gera rotas
- Página de problema com enunciado + editor + botão Run (sem visualização ainda, só console)

**Fase 2 — Motor de visualização**
- Instrumentação Babel + Web Worker + timeline
- Player (play/pause/step)
- Primeiro visualizador: **ArrayView** rodando em `two-sum`

**Fase 3 — Cobertura por tipo**
Construir um visualizador por vez, na ordem de volume de problemas:
array → string → dynamic-programming → linked-list → matrix → graph → binary → interval

**Fase 4 — Páginas de padrões**
Escrever as cheatsheets por tipo depois dos visualizadores prontos — assim ficam baseadas no que realmente se repete.

**Fase 5 — Polimento**
Busca, filtros (dificuldade, status), modo dark, atalhos de teclado, compartilhar link com step específico.

## Princípios

- **Não quebrar o fluxo atual** — adicionar problema continua sendo "criar pasta + rodar `node`". A web é gerada a partir disso.
- **Um visualizador por vez** — não tentar fazer tudo antes de validar o primeiro.
- **Conteúdo > features** — melhor 1 tipo com visualização excelente do que 8 medianos.
