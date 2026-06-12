import type { SectionEn } from "../content-en";

export const graphEn: SectionEn = {
  title: "Graphs",
  description:
    "Generalizes the DFS/BFS already practiced in matrix and tree to the most general structure.",
  patterns: ["DFS", "BFS", "Topological sort", "Union-find"],
  lessons: {
    "01-introducao": {
      title: "Recognizing graph problems",
      description:
        "Nodes and edges, directed/undirected, representations (adjacency list) and O(V+E).",
    },
    "02-dfs-bfs": {
      title: "Pattern 1: DFS and BFS with visited",
      description:
        "Traversing a graph without repeating nodes; counting components and cloning a graph.",
    },
    "03-topological": {
      title: "Pattern 2: Topological sort",
      description:
        "Ordering tasks with dependencies and detecting cycles in directed graphs.",
    },
    "04-union-find": {
      title: "Pattern 3: Union-Find (disjoint sets)",
      description:
        "Grouping and asking 'are they connected?' in almost O(1) — components and cycles.",
    },
    "05-multi-source": {
      title: "Pattern 4: A grid is a graph and multi-source BFS",
      description:
        "Treating grids as graphs and propagating waves from several sources at the same time.",
    },
    "06-sintese": {
      title: "Synthesis: which pattern to use?",
      description:
        "The Graph section's decision tree and the general quiz before the final exam.",
    },
  },
  challenges: {
    "connected-components": {
      title: "Number of Connected Components",
      statement: `There are \`n\` nodes (numbered from \`0\` to \`n-1\`) and a list of \`edges\` (undirected edges). Return the **number of connected components** (groups of nodes linked to each other).

Example: \`n = 5\`, \`edges = [[0,1],[1,2],[3,4]]\` → \`2\` (the group {0,1,2} and the group {3,4}).`,
      hint: "Two approaches: (1) build the adjacency list and do DFS/BFS from each unvisited node — each start of a search is a new component. (2) Union-Find: start with n groups and merge the nodes of each edge; each successful union reduces the count by 1.",
      solutionIdea:
        "Union-Find: starts with n groups; each edge that joins two different groups reduces the count. Almost O(n + e).",
    },
    "course-schedule": {
      title: "Course Schedule",
      statement: `There are \`numCourses\` courses (\`0\` to \`numCourses-1\`) and \`prerequisites\`, where \`[a, b]\` means "to take \`a\`, you must take \`b\` first". Return \`true\` if it is possible to complete **all** the courses.

Example: \`2\`, \`[[1,0]]\` → \`true\`. \`2\`, \`[[1,0],[0,1]]\` → \`false\` (circular dependency).`,
      hint: "Completing all the courses is possible if and only if the dependency graph has NO cycle. Use topological sort (Kahn): start with the courses with in-degree 0, process them by removing their edges; if you manage to process ALL of them, there is no cycle.",
      solutionIdea:
        "Topological sort (Kahn): processes courses without dependencies and removes their edges. If any unprocessed one is left, there is a cycle. O(V + E).",
    },
    "graph-valid-tree": {
      title: "Graph Valid Tree",
      statement: `Given \`n\` nodes and a list of undirected \`edges\`, return \`true\` if the graph forms a **valid tree** (fully connected and **without cycles**).

Example: \`n = 5\`, \`edges = [[0,1],[0,2],[0,3],[1,4]]\` → \`true\`. With \`[[0,1],[1,2],[2,3],[1,3],[1,4]]\` → \`false\` (it has a cycle).`,
      hint: "A tree with n nodes has EXACTLY n-1 edges and is connected. Shortcut with Union-Find: if there are more or fewer than n-1 edges, it already is not one. Otherwise, merge the nodes of each edge — if any edge links two nodes ALREADY in the same group, there is a cycle (not a tree).",
      solutionIdea:
        "Tree = n-1 edges + no cycle (which guarantees it is connected). Union-Find detects the cycle: merging two nodes already in the same group is an extra edge.",
    },
    "rotting-oranges": {
      title: "Rotting Oranges",
      statement: `In a grid, \`0\` = empty, \`1\` = fresh orange, \`2\` = rotten orange. Each minute, every rotten orange rots the **adjacent** fresh ones (horizontal/vertical). Return the number of minutes until **no** fresh orange remains, or \`-1\` if it is impossible.

Example: \`[[2,1,1],[1,1,0],[0,1,1]]\` → \`4\`.`,
      hint: "It is a MULTI-SOURCE BFS: put ALL the rotten oranges in the queue at the start (time 0) and propagate the waves simultaneously. The number of BFS 'layers' is the time. At the end, if there is still a fresh orange (unreachable), return -1.",
      solutionIdea:
        "Multi-source BFS: all the rotten ones enter the queue at time 0 and propagate in layers; the number of layers is the time. If a fresh one is left, -1. O(m·n).",
    },
  },
  exams: {
    "find-if-path-exists": {
      title: "Find if Path Exists in Graph",
      statement: `There are \`n\` nodes (\`0\` to \`n-1\`) and undirected edges in \`edges\`. Return \`true\` if there is a path between \`source\` and \`destination\`.

Example: \`n=3\`, \`edges=[[0,1],[1,2],[2,0]]\`, \`source=0\`, \`destination=2\` → \`true\`.`,
      hint: "Connectivity between two nodes: build the adjacency list and do DFS or BFS from source, stopping if you reach destination. (Union-Find also solves it: are source and destination in the same group?)",
    },
    "number-of-provinces": {
      title: "Number of Provinces",
      statement: `Given an \`n × n\` matrix \`isConnected\` where \`isConnected[i][j] = 1\` indicates that cities \`i\` and \`j\` are directly linked, return the number of **provinces** (groups of cities connected, directly or indirectly).

Example: \`[[1,1,0],[1,1,0],[0,0,1]]\` → \`2\`.`,
      hint: "It is counting connected components, but the graph comes as an adjacency MATRIX instead of an edge list. Traverse the pairs (i, j) with isConnected[i][j]==1 and merge them (Union-Find), or do DFS marking visited cities — each new search is a province.",
    },
    "word-ladder": {
      title: "Word Ladder",
      statement: `Given \`beginWord\`, \`endWord\` and a list \`wordList\`, transform \`beginWord\` into \`endWord\` by changing **one letter at a time**, with each intermediate word present in \`wordList\`. Return the **number of words** in the shortest sequence (including the two ends), or \`0\` if impossible.

Example: \`"hit"\` → \`"cog"\`, list \`["hot","dot","dog","lot","log","cog"]\` → \`5\` (hit→hot→dot→dog→cog).`,
      hint: "SHORTEST path ⇒ BFS — but the graph is IMPLICIT: two words are neighbors if they differ by exactly one letter. From beginWord, generate all the one-letter variations; those that are in the wordList and have not been seen enter the queue (level = length). The first to reach endWord gives the answer.",
    },
  },
};
