# Plano — Curso Interativo de LeetCode e Algoritmos

> Status: "Comece aqui" + Fundamentos + Array + String + Binary + Linked List completas (attempt-first). Linked List trouxe o LinkedListVisualizer e suporte a ListNode no LocalJudge (conversão array↔lista). Próxima seção de conteúdo: Matrix. Última atualização: 2026-06-10.

## 1. Visão

Transformar o material dos 75 problemas deste repositório em um **curso web completo de LeetCode**, organizado por tipo (seção), onde a pessoa:

- aprende os padrões/algoritmos clássicos de cada tipo em aulas curtas e didáticas;
- vê **mais de uma solução** para o mesmo problema (força bruta → ótima), com comparação de complexidade;
- entende o algoritmo **linha a linha**, com representação visual sincronizada com o código executando de verdade;
- valida o aprendizado com **quizzes** ao longo da seção;
- fecha a seção com uma **prova final**: resolver 1 LeetCode fácil, 1 médio e 1 difícil do mesmo tema, com juiz local.

Meta de saída de cada seção: a pessoa consegue resolver problemas **difíceis** daquele tipo sozinha.

## 2. Decisões já tomadas

| Decisão             | Escolha                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| Execução de código  | 100% no navegador: Python via **Pyodide** (WebAssembly), JavaScript nativo                          |
| Stack               | **Next.js (App Router) + React + TypeScript + Tailwind**                                            |
| Editor de código    | **Monaco Editor** (mesmo do VS Code)                                                                |
| Conteúdo das aulas  | **MDX** (markdown + componentes interativos embutidos)                                              |
| Progresso do aluno  | **localStorage** na v1 (abstraído para trocar por banco na v2)                                      |
| Idiomas             | **PT-BR primeiro**; tradução para EN só depois da seção aprovada (estrutura já preparada para i18n) |
| Linguagens do curso | **Python como principal**, JavaScript como alternativa (toggle em todo bloco de código)             |
| Mobile              | Responsivo, mas **web-first** (mobile não é foco da v1)                                             |

## 3. Arquitetura técnica

### 3.1 Motor de execução + visualização (peça central)

A visualização "linha a linha" usa o modelo **grava-e-reproduz (trace & replay)**, mesmo princípio do Python Tutor:

1. O código roda uma vez no navegador (Pyodide com `sys.settrace` para Python; interpretador JS em JS — ex. `js-interpreter` — para JavaScript).
2. A execução gera um **trace**: lista de passos `{ linha, variáveis, estado das estruturas, stdout }`.
3. O player reproduz o trace: a pessoa avança/retrocede passo a passo, vê a linha destacada no código e a **visualização da estrutura de dados** atualizando junto (ponteiros no array, nós da lista, árvore, grid, tabela de DP...).

Vantagens: permite voltar passos, velocidade ajustável, nunca trava a UI, e o mesmo trace alimenta código + visual.

### 3.2 Componentes do sistema

| Componente        | O que faz                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CodeRunner`      | Monaco + toggle PY/JS + botão rodar + saída no estilo do repo (verde/vermelho)                                                                                                        |
| `StepVisualizer`  | Player do trace com visualizações por estrutura: barras/células de array com ponteiros, janela deslizante, lista ligada, árvore binária, grafo, matriz/grid, tabela de DP, heap, bits |
| `QuizEngine`      | Múltipla escolha, "qual a saída deste código", "qual a complexidade", ordenar passos do algoritmo                                                                                     |
| `LocalJudge`      | Prova final: editor + casos de teste (visíveis e ocultos) rodando no navegador, comparação de resultado e tempo aproximado                                                            |
| `ProgressTracker` | Aulas concluídas, notas de quiz, status da prova — em localStorage com camada de abstração                                                                                            |
| `i18n`            | Roteamento por locale (`/pt`, `/en`), conteúdo MDX por idioma                                                                                                                         |

### 3.3 Estrutura de pastas proposta (monorepo, neste repositório)

```text
leetcode/
  array/ ... tree/          # conteúdo original (mantido como fonte/referência)
  web/                      # app Next.js do curso
    app/[locale]/
      [section]/            # página da seção
        [lesson]/           # página da aula
        quiz/
        exam/
    content/
      pt/array/01-intro.mdx ...
      en/array/01-intro.mdx ...
    components/  (CodeRunner, StepVisualizer, QuizEngine, LocalJudge...)
    lib/         (pyodide, tracer-py, tracer-js, progress, i18n)
    problems/    (definições: enunciado, soluções PY+JS, casos de teste)
```

## 4. Template pedagógico de uma seção

Princípio central (feedback da validação da Fase 0): **ensinar a resolver o padrão, não o problema**. A teoria vem primeiro e generaliza — sinais no enunciado, raciocínio, template mental — e só então os problemas específicos aparecem como exemplos que concretizam o padrão. Toda complexidade é sempre **justificada** ("por que O(n)?"), nunca só afirmada.

**Aprender fazendo (attempt-first):** a pessoa tenta resolver o problema ANTES de ver a teoria — sente a dificuldade, e aí o ensino encaixa (decisão pós-feedback: um aluno não entende um padrão que nunca precisou usar). Antes de tudo vem a seção **"Comece aqui"**, que introduz o mundo do LeetCode para o ensino fazer sentido.

Toda seção segue o mesmo esqueleto (validado primeiro na seção piloto):

1. **Aula 0 — Reconhecendo o tipo.** Como identificar que um problema é deste tipo; o método geral para atacar qualquer problema do tipo (força bruta primeiro → identificar o desperdício → escolher o padrão); mapa dos padrões da seção.
2. **Aulas de padrão (1 por padrão).** Cada aula, nesta ordem (arco attempt-first):
   - **🎯 Tente primeiro** — desafio interativo (`<Challenge>`: editor + testes + dica + "ver solução") com o problema que a aula vai ensinar. A pessoa tenta/erra antes da teoria;
   - **por que travou** — reconhecer a força bruta que ela tentou e nomear o desperdício;
   - **a ideia que destrava** (teoria do padrão): que problema resolve em geral, sinais no enunciado, raciocínio, template em pseudocódigo;
   - solução guiada + visualização interativa do padrão (código PY + JS);
   - 1–2 problemas dos 75 **como exemplos do padrão** (força bruta → ótima), com tabela comparativa;
   - **complexidade com justificativa** — por que cada solução tem aquele tempo/espaço;
   - mini-quiz de fixação (3–5 perguntas).
3. **Aula de síntese.** Árvore de decisão do tipo: "vi X no enunciado → penso no padrão Y".
4. **Quiz da seção.** Cobre todos os padrões, inclui prever saída de código e identificar o padrão certo para enunciados novos.
5. **Prova final.** 1 fácil + 1 médio + 1 difícil do mesmo tema, **problemas inéditos** (fora dos resolvidos em aula), no LocalJudge com casos ocultos. Aprovação desbloqueia o "concluído" da seção.

### Seção "Comece aqui" (boas-vindas)

Antes de Fundamentos: o que é LeetCode, por que aprender padrões (entrevistas e raciocínio), a anatomia de um enunciado, o que significam casos de teste, e como usar este curso (tente → aprenda). Objetivo: dar contexto para que todo o resto faça sentido.

### Seção 0 — Fundamentos (Big-O Notation)

Antes da primeira seção de padrões, uma seção dedicada só a análise de complexidade: o que é Big-O, as classes de crescimento, as regras práticas para analisar qualquer código (sequência soma, aninhamento multiplica, metade vira log) e complexidade de espaço. Todas as seções seguintes referenciam esses fundamentos ao justificar complexidades.

**Big-O é progressivo, não fechado na Seção 0.** A análise das primeiras seções (array, string) cabe nas regras básicas. Mas em seções mais difíceis a identificação fica mais sutil e precisa de ferramentas novas — quando chegarmos nelas, voltamos e ampliamos o material de Fundamentos (ou adicionamos uma aula de "análise avançada" referenciada de lá):

- **Matriz:** complexidade com duas dimensões — `O(m·n)`, `O(linhas·colunas)`; por que não é `O(n²)` quando a matriz não é quadrada.
- **Árvores / Recursão:** custo de uma travessia `O(n)` vs. profundidade da pilha `O(h)`; por que uma árvore balanceada dá `O(log n)` de altura e uma degenerada `O(n)`.
- **Grafos:** a notação `O(V + E)` (vértices + arestas) e quando `E` domina.
- **DP:** o atalho "número de estados × custo por estado"; por que memoização derruba exponencial `O(2ⁿ)` para polinomial; análise de árvore de recursão.
- **Heap / ordenação:** justificar o `O(n log n)` e o `O(log n)` das operações de heap a partir da altura da árvore.

A regra de ouro do curso continua valendo em todas: **sempre justificar o porquê da complexidade**, e a justificativa fica mais rica conforme os problemas ficam mais difíceis de identificar.

## 5. Mapa das seções (ordem didática)

A ordem abaixo foi desenhada para que cada seção prepare a seguinte: padrões simples primeiro, recursão no meio, e DP — que combina tudo — por último. Antes de todas vem a **Seção 0 — Fundamentos (Big-O)**, descrita no template.

| #   | Seção                   | Problemas no repo | Padrões/algoritmos a ensinar                                                                             | Por que nesta posição                                                                                  |
| --- | ----------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1   | **Array**               | 8 (1–6, 9, 10)    | Hash map, two pointers, sliding window básico, prefix/suffix product, Kadane                             | Base de tudo: os padrões daqui reaparecem em quase todas as outras seções                              |
| 2   | **String**              | 10 (50–59)        | Sliding window com mapa de frequência, anagramas, pilha, expandir do centro, codificação                 | Consolida two pointers e sliding window em outro contexto; introduz pilha                              |
| 3   | **Binary**              | 7 (7–8, 11–15)    | Busca binária (incl. array rotacionado) + manipulação de bits (XOR, AND, shifts, contagem)               | Busca binária é continuação natural de arrays; bits é um módulo independente e leve                    |
| 4   | **Linked List**         | 6 (40–45)         | Ponteiros lento/rápido, reversão in-place, dummy node, merge, ciclo (Floyd)                              | Primeiro contato com estruturas encadeadas e manipulação de ponteiros — preparação para árvores        |
| 5   | **Matrix**              | 4 (46–49)         | Travessia em camadas/espiral, transformação in-place, DFS em grid com backtracking                       | Arrays em 2D; o word search dá o primeiro DFS/backtracking concreto, preparando grafos                 |
| 6   | **Interval**            | 5 (35–39)         | Ordenar + varrer, merge, contagem de sobreposição                                                        | Seção leve de "ordenar + raciocínio guloso" — um respiro antes do bloco pesado de recursão             |
| 7   | **Tree**                | 14 (60–73)        | DFS recursivo, BFS por níveis, propriedades de BST, construção, serialização, Trie                       | Mergulho profundo em recursão; árvore é o portão de entrada para heap e grafo                          |
| 8   | **Heap**                | 2 (74–75)         | Min/max heap, top-K, two heaps (mediana)                                                                 | Heap é uma árvore por dentro — vem logo depois; revisita problemas anteriores com a nova ferramenta    |
| 9   | **Graph**               | 8 (27–34)         | Representações, DFS, BFS, topological sort, union-find, detecção de ciclo                                | Generaliza o DFS/BFS já praticado em matriz e árvore para a estrutura mais geral                       |
| 10  | **Dynamic Programming** | 11 (16–26)        | Memoização vs tabulação, 1D DP, decisão incluir/excluir, DP em strings, unbounded knapsack, greedy vs DP | O tipo mais difícil: memoização nasce da recursão dominada nas seções anteriores. Fecha o curso        |

Observações sobre o mapa:

- A ordem das seções no curso é independente da numeração das pastas do repo — o conteúdo original continua onde está.
- A seção **Binary** mistura dois temas distintos (busca binária e bits) — na prática serão dois módulos dentro da seção.
- **Heap** tem só 2 problemas no repo; a seção revisita problemas de seções anteriores com a nova ferramenta — `merge-k-sorted-lists` (43, visto em Linked List) e `meeting-rooms-2` (39, visto em Interval com varredura de eventos) ganham aqui suas soluções com heap. Esses cross-links reforçam a ideia de "mesmo problema, mais de uma solução".
- A prova final de cada seção usa problemas **fora dos 75**, escolhidos do LeetCode real (fácil/médio/difícil do tema), para medir aprendizado de verdade.

## 6. Fases de execução

### Fase 0 — Fundação técnica (sem conteúdo ainda)

- Scaffold Next.js + TypeScript + Tailwind + MDX + estrutura de i18n pronta (conteúdo só em PT por enquanto).
- Integração Pyodide com carregamento assíncrono (carrega em background na entrada do site).
- `CodeRunner` funcionando com PY e JS.
- **Prova de conceito do trace & replay**: two-sum visualizado linha a linha nas duas linguagens (é o maior risco técnico do projeto — atacar primeiro).
- `ProgressTracker` em localStorage; layout base com navegação por seções.

### Fase 1 — Seção piloto: Array (completa)

- Todas as aulas, visualizações, múltiplas soluções, quizzes e prova final da seção Array.
- **Você testa e avalia a didática.** Tudo que aprendermos vira ajuste no template.

### Fase 2 — Consolidação do template

- Aplicar o feedback do piloto; extrair os padrões de aula/quiz/prova como estrutura reutilizável para acelerar as próximas seções.
- **Visualização de progresso (pedido pós-Fase 1):** o `ProgressTracker` já guarda aulas concluídas e provas aprovadas em localStorage — falta expor isso na interface:
  - **Indicador por aula:** marca de "concluída ✓" (ou bolinha vazia) ao lado de cada aula na página da seção e na home, lendo `useProgress()`.
  - **Barra/percentual por seção:** "4/7 aulas · prova pendente" no card de cada seção.
  - **Tela de perfil** (`/[locale]/perfil`): visão geral do progresso em todas as seções — aulas feitas, provas aprovadas, percentual total, e atalho para "continuar de onde parei". Sem login (localStorage), com botão de exportar/limpar progresso.
  - Componentes serão client-side (o progresso vive no navegador) e devem evitar mismatch de hidratação (mesmo cuidado já usado no `LessonCompleteButton`).

### Fases 3–11 — Demais seções, uma a uma

- Uma seção por vez, na ordem didática definida no mapa, sempre com seu ciclo de teste/avaliação antes de avançar.
- Visualizações novas entram conforme a necessidade (lista ligada na seção 4, grid na 5, árvore na 7, grafo na 9, tabela de DP na 10).

### Fase 12 — Polimento e lançamento

- Passada de responsividade mobile, performance (lazy-load de Pyodide/Monaco por rota), tradução do conteúdo aprovado para EN, deploy (Vercel).

## 7. Riscos e pontos de atenção

- **Trace & replay é o coração e o maior risco** — por isso é a prova de conceito da Fase 0. Se o interpretador JS escolhido limitar demais (ex.: sem features modernas), alternativa é instrumentação do código por transformação de AST.
- **Pyodide pesa ~10 MB** na primeira carga — mitigar com pré-carregamento em background e cache agressivo.
- **Estruturas compostas** (TreeNode, ListNode, grafos) precisam de serialização padronizada para o visualizador entender o estado em cada passo.
- **Provas difíceis exigem bons casos de teste** (incluindo casos extremos de performance) — curadoria manual por seção.
- **Tradução para EN fica para depois da aprovação de cada seção** — escrever só em PT acelera a iteração da didática, mas a estrutura (rotas por locale, MDX por idioma) já nasce pronta para i18n, evitando retrabalho na hora de traduzir.

## 8. Critério de pronto de uma seção

Uma seção só está concluída quando:

1. Todas as aulas têm visualização funcionando nas duas linguagens (PY e JS), com conteúdo completo em PT-BR.
2. Cada problema tem pelo menos 2 soluções (quando existir mais de uma abordagem razoável).
3. Quiz da seção cobre todos os padrões ensinados.
4. Prova final tem fácil/médio/difícil com casos ocultos passando no LocalJudge.
5. Você testou a seção inteira como aluno e aprovou a didática.
