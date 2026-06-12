import type { SectionEn } from "../content-en";

export const treeEn: SectionEn = {
  title: "Trees",
  description:
    "A deep dive into recursion; the gateway to heap and graph.",
  patterns: ["Recursive DFS", "Level-order BFS", "BST", "Trie"],
  lessons: {
    "01-introducao": {
      title: "Recognizing tree problems",
      description:
        "The TreeNode node, recursion as the natural tool, traversals, and the O(n)/O(h) complexity.",
    },
    "02-dfs-recursivo": {
      title: "Pattern 1: Recursive DFS",
      description:
        "The recursive template that solves most trees: solve the children, then combine.",
    },
    "03-bfs-niveis": {
      title: "Pattern 2: Level-order BFS",
      description:
        "When the question is per level, breadth-first search with a queue processes layer by layer.",
    },
    "04-bst": {
      title: "Pattern 3: Binary search tree (BST)",
      description:
        "The left < node < right property, which gives O(h) search and sorted order via the in-order traversal.",
    },
    "05-construcao": {
      title: "Pattern 4: Construction and serialization",
      description:
        "Rebuilding a tree from traversals and serializing it without ambiguity.",
    },
    "06-trie": {
      title: "Pattern 5: Trie (prefix tree)",
      description:
        "The character tree that makes prefix and word search highly efficient.",
    },
    "07-sintese": {
      title: "Synthesis: which pattern to use?",
      description:
        "The Trees section's decision tree and the general quiz before the final exam.",
    },
  },
  challenges: {
    "max-depth": {
      title: "Maximum Depth of Binary Tree",
      statement: `Return the **maximum depth** of a binary tree (number of nodes on the longest path from the root down to a leaf). The tree is given as \`root\` (each node has \`.val\`, \`.left\`, \`.right\`).

Example: \`[3,9,20,null,null,15,7]\` → \`3\`. (For testing, we pass the tree in level order.)`,
      hint: "Think recursively: the depth of a tree is 1 (the root) + the greater depth between the left and right subtrees. The base case is the empty tree (None → 0). Let the recursion solve the children.",
      solutionIdea:
        "Pure recursion: depth = 1 + max(left, right); empty = 0. Visits each node once: O(n).",
    },
    "level-order": {
      title: "Binary Tree Level Order Traversal",
      statement: `Return the tree's values **level by level**, top to bottom, left to right — one list per level.

Example: \`[3,9,20,null,null,15,7]\` → \`[[3],[9,20],[15,7]]\`.`,
      hint: "Level by level = BFS with a queue. The trick to separate the levels: on each iteration of the outer loop, process EXACTLY the nodes that are in the queue right now (its current size) — those form one level — enqueuing the children for the next.",
      solutionIdea:
        "BFS with a queue, processing 'the current queue size' nodes at a time to separate the levels. O(n).",
    },
    "validate-bst": {
      title: "Validate Binary Search Tree",
      statement: `Check whether a binary tree is a **valid BST**: for every node, all values in the left subtree are **smaller** than it, and all values in the right are **greater** — recursively.

Example: \`[2,1,3]\` → \`true\`. \`[5,1,4,null,null,3,6]\` → \`false\` (3 and 6 are to the right of 5, but 3 < 5).`,
      hint: "The common mistake is comparing a node only with its direct children — that is not enough! Each node has a valid RANGE (min, max) that narrows as you descend: when going left, the max becomes the node's value; when going right, the min becomes the node's value.",
      solutionIdea:
        "Carry a range (min, max) that narrows as you descend: going left max=value, going right min=value. O(n).",
    },
    "build-tree": {
      title: "Construct Binary Tree from Preorder and Inorder",
      statement: `Rebuild the binary tree from its **preorder** and **inorder** traversals (no repeated values). Return the root.

Example: \`preorder = [3,9,20,15,7]\`, \`inorder = [9,3,15,20,7]\` → \`[3,9,20,null,null,15,7]\`.`,
      hint: "The FIRST element of the preorder is always the root. Find it in the inorder: everything to its left is the left subtree, everything to its right is the right subtree. Consume the preorder in sequence (a global pointer) and recurse to build each subtree.",
      solutionIdea:
        "1st of preorder = root; its position in the inorder splits left/right. Recursion consuming the preorder. O(n).",
    },
    "trie-operations": {
      title: "Implement Trie (Prefix Tree)",
      statement: `Implement a **Trie** (prefix tree) with \`insert\`, \`search\` (exact word) and \`startsWith\` (prefix). For testing, you receive two lists: \`operacoes\` (e.g. \`"Trie"\`, \`"insert"\`, \`"search"\`, \`"startsWith"\`) and \`args\` (the argument of each operation). Return the list of results (\`None\` for build/insert, \`true\`/\`false\` for the searches).

Example: ops \`["Trie","insert","search","search","startsWith"]\`, args \`[[],["apple"],["apple"],["app"],["app"]]\` → \`[null,null,true,false,true]\`.`,
      hint: "Each Trie node has a map of children (one per character) and an 'end of word' flag. insert: walk/create nodes letter by letter and mark the end. search: walk; does it exist AND is it the end of a word? startsWith: you only need to be able to walk to the end of the prefix.",
      solutionIdea:
        "Each node has children by character + an end flag. insert creates the path; search requires reaching a marked end; startsWith only requires reaching. O(length) per operation.",
    },
  },
  exams: {
    "symmetric-tree": {
      title: "Symmetric Tree",
      statement: `Check whether a binary tree is **mirrored around its center** (the left subtree is the mirror of the right one).

Example: \`[1,2,2,3,4,4,3]\` → \`true\`. \`[1,2,2,null,3,null,3]\` → \`false\`.`,
      hint: "Compare TWO subtrees at the same time, mirrored: a function mirror(a, b) that checks a.val == b.val and, recursively, mirror(a.left, b.right) and mirror(a.right, b.left). Start with mirror(root, root).",
    },
    "right-side-view": {
      title: "Binary Tree Right Side View",
      statement: `Imagine yourself looking at the tree **from the right side**. Return the values of the nodes you can see, top to bottom (the rightmost node of each level).

Example: \`[1,2,3,null,5,null,4]\` → \`[1,3,4]\`.`,
      hint: "It is a level-order BFS (like level order): for each level, the LAST node processed is the one seen from the right. Keep it. (Alternative: DFS visiting the right first and taking the first node of each new depth.)",
    },
    "max-path-sum": {
      title: "Binary Tree Maximum Path Sum",
      statement: `A **path** is any sequence of nodes connected by edges (it does not need to pass through the root nor reach a leaf; it turns at most one node). Return the **largest sum** of values along some path. Values may be negative.

Example: \`[-10,9,20,null,null,15,7]\` → \`42\` (the path 15 → 20 → 7). \`[1,2,3]\` → \`6\`.`,
      hint: "DFS that returns the maximum 'gain' from going down ONE side (val + max(left gain, right gain, 0)). But the best path may TURN at a node using both sides: at each node, update the global answer with val + left_gain + right_gain. Use max(gain, 0) to discard negative sides.",
    },
  },
};
