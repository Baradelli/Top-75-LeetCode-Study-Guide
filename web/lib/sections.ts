export type SectionStatus = "available" | "soon";

export interface Section {
  slug: string;
  title: string;
  description: string;
  patterns: string[];
  status: SectionStatus;
}

/**
 * As seções do curso na ordem didática definida no PLAN.md: fundamentos de
 * Big-O primeiro (seção 0), padrões simples → estruturas → recursão → DP.
 */
export const SECTIONS: Section[] = [
  {
    slug: "comece-aqui",
    title: "Comece aqui",
    description:
      "O que é LeetCode, por que aprender padrões e como usar este curso (tente → aprenda).",
    patterns: ["O mundo do LeetCode", "Como ler um problema", "Como estudar"],
    status: "available",
  },
  {
    slug: "fundamentos",
    title: "Fundamentos: Big-O",
    description:
      "Antes de qualquer padrão: como medir e justificar a eficiência de qualquer código.",
    patterns: [
      "Classes de crescimento",
      "Regras de análise",
      "Complexidade de espaço",
    ],
    status: "available",
  },
  {
    slug: "array",
    title: "Array",
    description:
      "A base de tudo: os padrões daqui reaparecem em quase todas as outras seções.",
    patterns: [
      "Hash map",
      "Two pointers",
      "Sliding window",
      "Prefix/suffix product",
      "Kadane",
    ],
    status: "available",
  },
  {
    slug: "string",
    title: "String",
    description:
      "Consolida two pointers e sliding window em outro contexto; introduz pilha.",
    patterns: [
      "Sliding window com frequência",
      "Anagramas",
      "Pilha",
      "Expandir do centro",
    ],
    status: "available",
  },
  {
    slug: "binary",
    title: "Binary",
    description:
      "Busca binária como continuação natural de arrays; bits como módulo independente.",
    patterns: ["Busca binária", "Array rotacionado", "XOR", "Shifts e máscaras"],
    status: "soon",
  },
  {
    slug: "linked-list",
    title: "Lista Ligada",
    description:
      "Primeiro contato com estruturas encadeadas e manipulação de ponteiros.",
    patterns: [
      "Lento/rápido",
      "Reversão in-place",
      "Dummy node",
      "Ciclo (Floyd)",
    ],
    status: "soon",
  },
  {
    slug: "matrix",
    title: "Matriz",
    description:
      "Arrays em 2D; o primeiro DFS/backtracking concreto, preparando grafos.",
    patterns: ["Travessia espiral", "In-place", "DFS em grid", "Backtracking"],
    status: "soon",
  },
  {
    slug: "interval",
    title: "Intervalos",
    description:
      "Ordenar + raciocínio guloso — um respiro antes do bloco de recursão.",
    patterns: ["Ordenar + varrer", "Merge", "Sobreposição"],
    status: "soon",
  },
  {
    slug: "tree",
    title: "Árvores",
    description:
      "Mergulho profundo em recursão; o portão de entrada para heap e grafo.",
    patterns: ["DFS recursivo", "BFS por níveis", "BST", "Trie"],
    status: "soon",
  },
  {
    slug: "heap",
    title: "Heap",
    description:
      "Uma árvore por dentro; revisita problemas anteriores com a nova ferramenta.",
    patterns: ["Min/max heap", "Top-K", "Two heaps"],
    status: "soon",
  },
  {
    slug: "graph",
    title: "Grafos",
    description:
      "Generaliza o DFS/BFS já praticado em matriz e árvore para a estrutura mais geral.",
    patterns: ["DFS", "BFS", "Topological sort", "Union-find"],
    status: "soon",
  },
  {
    slug: "dynamic-programming",
    title: "Programação Dinâmica",
    description:
      "O tipo mais difícil: memoização nasce da recursão dominada. Fecha o curso.",
    patterns: [
      "Memoização vs tabulação",
      "DP 1D",
      "Incluir/excluir",
      "DP em strings",
    ],
    status: "soon",
  },
];

export interface Lesson {
  slug: string;
  title: string;
  description: string;
}

/** Aulas disponíveis por seção (conteúdo em web/content/<locale>/<section>/<lesson>.mdx). */
export const LESSONS: Record<string, Lesson[]> = {
  "comece-aqui": [
    {
      slug: "01-o-mundo-do-leetcode",
      title: "O que é LeetCode e por que isto importa",
      description:
        "O jogo, por que entrevistas usam isso, e por que aprender padrões em vez de decorar soluções.",
    },
    {
      slug: "02-como-usar-o-curso",
      title: "Como ler um problema e usar este curso",
      description:
        "A anatomia de um enunciado, o que são casos de teste e o método tente → aprenda.",
    },
  ],
  fundamentos: [
    {
      slug: "01-o-que-e-big-o",
      title: "O que é Big-O Notation",
      description:
        "Por que contamos passos e não segundos, e as classes de crescimento que você vai ver em todo problema.",
    },
    {
      slug: "02-como-analisar",
      title: "Como analisar a complexidade de qualquer código",
      description:
        "As quatro regras práticas para olhar um código e dizer — com justificativa — qual é o Big-O.",
    },
    {
      slug: "03-espaco-e-quiz",
      title: "Complexidade de espaço + quiz da seção",
      description:
        "O custo de memória das soluções e o quiz que fecha os fundamentos.",
    },
  ],
  array: [
    {
      slug: "01-introducao",
      title: "Reconhecendo problemas de array",
      description:
        "O método geral para atacar qualquer problema de array e o mapa dos padrões da seção.",
    },
    {
      slug: "02-hash-map",
      title: "Padrão 1: Hash Map",
      description:
        "Trocar espaço por tempo: a pergunta “eu já vi o que procuro?” respondida em O(1).",
    },
    {
      slug: "03-two-pointers",
      title: "Padrão 2: Two Pointers",
      description:
        "Dois índices que se movem com inteligência para eliminar comparações inúteis.",
    },
    {
      slug: "04-sliding-window",
      title: "Padrão 3: Sliding Window",
      description:
        "Reaproveitar o trabalho da janela anterior em vez de recalcular do zero.",
    },
    {
      slug: "05-prefix-product",
      title: "Padrão 4: Prefix e Suffix",
      description:
        "Pré-calcular acumulados para responder qualquer intervalo em O(1).",
    },
    {
      slug: "06-kadane",
      title: "Padrão 5: Kadane",
      description:
        "A decisão local que resolve o melhor subarray em uma única passada.",
    },
    {
      slug: "07-sintese",
      title: "Síntese: qual padrão usar?",
      description:
        "A árvore de decisão da seção e o quiz geral antes da prova final.",
    },
  ],
  string: [
    {
      slug: "01-introducao",
      title: "Reconhecendo problemas de string",
      description:
        "Strings são arrays de caracteres: o que se reaproveita do Array e o que é novo nesta seção.",
    },
    {
      slug: "02-frequencia-anagramas",
      title: "Padrão 1: Contagem de caracteres (anagramas)",
      description:
        "A assinatura de frequência que identifica e agrupa strings — anagramas em O(n).",
    },
    {
      slug: "03-sliding-window",
      title: "Padrão 2: Sliding Window com frequência",
      description:
        "A janela deslizante do Array, agora com um mapa de contagens como estado.",
    },
    {
      slug: "04-palindromos",
      title: "Padrão 3: Two Pointers e expandir do centro",
      description:
        "Verificar palíndromos com dois ponteiros e encontrá-los crescendo a partir do centro.",
    },
    {
      slug: "05-pilha",
      title: "Padrão 4: Pilha",
      description:
        "A estrutura LIFO que casa aberturas e fechamentos e resolve o que está “mais aninhado”.",
    },
    {
      slug: "06-codificacao",
      title: "Padrão 5: Codificação e design",
      description:
        "Serializar e desserializar dados em string sem ambiguidade — o padrão length-prefix.",
    },
    {
      slug: "07-sintese",
      title: "Síntese: qual padrão usar?",
      description:
        "A árvore de decisão da seção String e o quiz geral antes da prova final.",
    },
  ],
};

export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export function getLessons(sectionSlug: string): Lesson[] {
  return LESSONS[sectionSlug] ?? [];
}
