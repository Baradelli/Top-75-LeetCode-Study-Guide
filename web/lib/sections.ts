export type SectionStatus = "available" | "soon";

export interface Section {
  slug: string;
  title: string;
  description: string;
  patterns: string[];
  status: SectionStatus;
}

/**
 * As 10 seções do curso na ordem didática definida no PLAN.md:
 * fundamentos → estruturas → recursão → DP por último.
 */
export const SECTIONS: Section[] = [
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
    status: "soon",
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
  array: [
    {
      slug: "01-introducao",
      title: "Introdução + POC: two-sum linha a linha",
      description:
        "Demonstração da fundação técnica: código executando de verdade com visualização passo a passo.",
    },
  ],
};

export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export function getLessons(sectionSlug: string): Lesson[] {
  return LESSONS[sectionSlug] ?? [];
}
