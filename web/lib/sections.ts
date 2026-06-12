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
    status: "available",
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
    status: "available",
  },
  {
    slug: "matrix",
    title: "Matriz",
    description:
      "Arrays em 2D; o primeiro DFS/backtracking concreto, preparando grafos.",
    patterns: ["Travessia espiral", "In-place", "DFS em grid", "Backtracking"],
    status: "available",
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
    status: "available",
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
  binary: [
    {
      slug: "01-introducao",
      title: "Reconhecendo busca binária e bits",
      description:
        "Os dois temas da seção, quando cada um aparece, e por que O(log n) é tão poderoso.",
    },
    {
      slug: "02-busca-binaria",
      title: "Padrão 1: Busca Binária",
      description:
        "Cortar o espaço de busca pela metade a cada passo — a essência do O(log n).",
    },
    {
      slug: "03-busca-binaria-girada",
      title: "Padrão 2: Busca binária modificada (array girado)",
      description:
        "Quando o array foi girado: decidir qual metade está ordenada e continuar cortando.",
    },
    {
      slug: "04-bits-fundamentos",
      title: "Padrão 3: Fundamentos de bits",
      description:
        "Pensar em binário: AND, OR, XOR, NOT, deslocamentos e máscaras.",
    },
    {
      slug: "05-bits-xor",
      title: "Padrão 4: O poder do XOR",
      description:
        "A propriedade a^a=0 que faz pares se cancelarem e revela o que sobra.",
    },
    {
      slug: "06-bits-tecnicas",
      title: "Padrão 5: Técnicas com bits",
      description:
        "Reaproveitar contagens (counting bits), inverter bits e somar sem o operador +.",
    },
    {
      slug: "07-sintese",
      title: "Síntese: qual padrão usar?",
      description:
        "A árvore de decisão da seção Binary e o quiz geral antes da prova final.",
    },
  ],
  "linked-list": [
    {
      slug: "01-introducao",
      title: "Reconhecendo problemas de lista ligada",
      description:
        "O que é uma lista ligada, o nó ListNode, e por que ponteiros mudam a forma de pensar.",
    },
    {
      slug: "02-dummy-node",
      title: "Padrão 1: Dummy node e dois ponteiros",
      description:
        "O nó sentinela que simplifica casos de borda e o truque do intervalo fixo entre ponteiros.",
    },
    {
      slug: "03-reversao",
      title: "Padrão 2: Reversão in-place",
      description:
        "Inverter os ponteiros de uma lista com três variáveis e O(1) de espaço.",
    },
    {
      slug: "04-lento-rapido",
      title: "Padrão 3: Ponteiros lento e rápido",
      description:
        "Dois ponteiros em velocidades diferentes: meio da lista e detecção de ciclo (Floyd).",
    },
    {
      slug: "05-merge",
      title: "Padrão 4: Merge de listas ordenadas",
      description:
        "Costurar duas listas ordenadas em uma, com um nó dummy guiando.",
    },
    {
      slug: "06-combinando",
      title: "Padrão 5: Combinando os padrões",
      description:
        "Problemas difíceis (como reordenar a lista) que encaixam meio + reversão + merge.",
    },
    {
      slug: "07-sintese",
      title: "Síntese: qual padrão usar?",
      description:
        "A árvore de decisão da seção Lista Ligada e o quiz geral antes da prova final.",
    },
  ],
  matrix: [
    {
      slug: "01-introducao",
      title: "Reconhecendo problemas de matriz",
      description:
        "Pensar em 2D: coordenadas (linha, coluna), vizinhos, limites e a complexidade O(m·n).",
    },
    {
      slug: "02-travessia-espiral",
      title: "Padrão 1: Travessia por camadas (espiral)",
      description:
        "Percorrer a matriz em espiral controlando quatro limites que encolhem.",
    },
    {
      slug: "03-transformacao-in-place",
      title: "Padrão 2: Transformação in-place",
      description:
        "Girar a imagem e zerar linhas/colunas sem matriz auxiliar — só com truques de índice.",
    },
    {
      slug: "04-dfs-grid",
      title: "Padrão 3: DFS em grid (flood fill)",
      description:
        "Tratar o grid como um grafo: inundar regiões conectadas com busca em profundidade.",
    },
    {
      slug: "05-backtracking",
      title: "Padrão 4: Backtracking em grid",
      description:
        "Explorar caminhos marcando e desmarcando células — o word search.",
    },
    {
      slug: "06-bfs-grid",
      title: "Padrão 5: BFS em grid (caminho mais curto)",
      description:
        "Quando a pergunta é 'o mais curto', a busca em largura explora por camadas.",
    },
    {
      slug: "07-sintese",
      title: "Síntese: qual padrão usar?",
      description:
        "A árvore de decisão da seção Matriz e o quiz geral antes da prova final.",
    },
  ],
  tree: [
    {
      slug: "01-introducao",
      title: "Reconhecendo problemas de árvore",
      description:
        "O nó TreeNode, recursão como ferramenta natural, travessias e a complexidade O(n)/O(h).",
    },
    {
      slug: "02-dfs-recursivo",
      title: "Padrão 1: DFS recursivo",
      description:
        "O template recursivo que resolve a maioria das árvores: resolva os filhos, combine.",
    },
    {
      slug: "03-bfs-niveis",
      title: "Padrão 2: BFS por níveis",
      description:
        "Quando a pergunta é por nível, a busca em largura com fila processa camada a camada.",
    },
    {
      slug: "04-bst",
      title: "Padrão 3: Árvore de busca binária (BST)",
      description:
        "A propriedade esquerda < nó < direita, que dá busca O(h) e ordem com a travessia in-order.",
    },
    {
      slug: "05-construcao",
      title: "Padrão 4: Construção e serialização",
      description:
        "Reconstruir uma árvore a partir de travessias e serializá-la sem ambiguidade.",
    },
    {
      slug: "06-trie",
      title: "Padrão 5: Trie (árvore de prefixos)",
      description:
        "A árvore de caracteres que torna busca por prefixo e por palavra muito eficiente.",
    },
    {
      slug: "07-sintese",
      title: "Síntese: qual padrão usar?",
      description:
        "A árvore de decisão da seção Árvores e o quiz geral antes da prova final.",
    },
  ],
};

export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export function getLessons(sectionSlug: string): Lesson[] {
  return LESSONS[sectionSlug] ?? [];
}
