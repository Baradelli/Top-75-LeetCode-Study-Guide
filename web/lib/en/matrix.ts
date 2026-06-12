import type { SectionEn } from "../content-en";

export const matrixEn: SectionEn = {
  title: "Matrix",
  description:
    "2D arrays; your first concrete DFS/backtracking, setting up for graphs.",
  patterns: ["Spiral traversal", "In-place", "DFS on a grid", "Backtracking"],
  lessons: {
    "01-introducao": {
      title: "Recognizing matrix problems",
      description:
        "Thinking in 2D: (row, column) coordinates, neighbors, bounds, and the O(m·n) complexity.",
    },
    "02-travessia-espiral": {
      title: "Pattern 1: Layer-by-layer traversal (spiral)",
      description:
        "Walking the matrix in a spiral by controlling four shrinking bounds.",
    },
    "03-transformacao-in-place": {
      title: "Pattern 2: In-place transformation",
      description:
        "Rotating the image and zeroing rows/columns without an auxiliary matrix — just index tricks.",
    },
    "04-dfs-grid": {
      title: "Pattern 3: DFS on a grid (flood fill)",
      description:
        "Treating the grid as a graph: flooding connected regions with depth-first search.",
    },
    "05-backtracking": {
      title: "Pattern 4: Backtracking on a grid",
      description:
        "Exploring paths by marking and unmarking cells — the word search.",
    },
    "06-bfs-grid": {
      title: "Pattern 5: BFS on a grid (shortest path)",
      description:
        "When the question is 'the shortest', breadth-first search explores layer by layer.",
    },
    "07-sintese": {
      title: "Synthesis: which pattern to use?",
      description:
        "The Matrix section's decision tree and the general quiz before the final exam.",
    },
  },
  challenges: {
    "spiral-order": {
      title: "Spiral Matrix",
      statement: `Given an \`m × n\` matrix, return **all** of its elements in **spiral** order (clockwise, starting from the top-left corner).

Example: \`[[1,2,3],[4,5,6],[7,8,9]]\` → \`[1,2,3,6,9,8,7,4,5]\`.`,
      hint: "Keep four bounds: top, bottom, left, right. Walk the top edge (left→right), the right edge (top→bottom), the bottom edge (right→left), and the left edge (bottom→top); then shrink the bounds inward. Repeat while top<=bottom and left<=right.",
      solutionIdea:
        "Four bounds that shrink inward with each layer traversed. Each cell is visited once: O(m·n).",
    },
    "rotate-image": {
      title: "Rotate Image",
      statement: `Given an \`n × n\` matrix, rotate it **90° clockwise, in place** (without using another matrix). Return the rotated matrix.

Example: \`[[1,2,3],[4,5,6],[7,8,9]]\` → \`[[7,4,1],[8,5,2],[9,6,3]]\`.`,
      hint: "Classic two-step trick, both O(1) space: (1) TRANSPOSE the matrix (swap matrix[i][j] with matrix[j][i]); (2) reverse each ROW. The result is the 90° clockwise rotation.",
      solutionIdea:
        "Transpose + reverse each row = 90° clockwise rotation, in place. O(n²) time, O(1) space.",
    },
    "number-of-islands": {
      title: "Number of Islands",
      statement: `Given a grid of \`1\` (land) and \`0\` (water), count the number of **islands**. An island is a group of \`1\`s connected horizontally/vertically.

Example: \`[[1,1,0,0],[1,0,0,1],[0,0,1,1]]\` → \`2\`.`,
      hint: "Walk the grid; when you find a 1 not yet visited, it is a NEW island (+1) — then run a DFS/flood fill from it marking all connected land as visited. That way each island is counted once.",
      solutionIdea:
        "For each new piece of land, +1 and a DFS sinking the whole island (marking visited). Each cell is touched once: O(m·n).",
    },
    "word-search": {
      title: "Word Search",
      statement: `Given a letter grid \`board\` and a \`word\`, return \`true\` if the word can be formed from **adjacent** letters (horizontal/vertical), without reusing the same cell.

Example: board \`[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\`, word \`"ABCCED"\` → \`true\`.`,
      hint: "DFS with backtracking from each cell: if board[r][c] == word[i], mark the cell as used, try the 4 neighbors for word[i+1], and — when you come back — UNMARK the cell (backtrack) so other paths can use it.",
      solutionIdea:
        "DFS with backtracking: marks the cell on entry, unmarks it on exit, freeing it for other paths. The path is undone on every failure.",
    },
    "shortest-path-binary-matrix": {
      title: "Shortest Path in Binary Matrix",
      statement: `In an \`n × n\` grid of \`0\` (free) and \`1\` (blocked), return the **length** of the shortest path from the top-left corner to the bottom-right corner, moving in the **8 directions** through \`0\` cells. If there is none, return \`-1\`. (The length counts the visited cells, start and end included.)

Example: \`[[0,0,0],[1,1,0],[1,1,0]]\` → \`4\`.`,
      hint: "SHORTEST path in an unweighted graph = BFS. Use a queue starting at cell (0,0) with distance 1; expand to the 8 free, unvisited neighbors, adding 1 to the distance. The first to reach the destination has the smallest distance. Mark visited cells so you don't repeat.",
      solutionIdea:
        "BFS explores by layers, so the first arrival at the destination is the shortest path. The 8 directions and the visited set keep it O(n²).",
    },
  },
  exams: {
    "flood-fill": {
      title: "Flood Fill",
      statement: `Given an image (grid of integers), a starting position \`(sr, sc)\` and a new \`color\`, paint the region connected to the starting cell (same original color, horizontal/vertical neighborhood) with the new color. Return the image.

Example: \`[[1,1,1],[1,1,0],[1,0,1]]\`, \`sr=1, sc=1, color=2\` → \`[[2,2,2],[2,2,0],[2,0,1]]\`.`,
      hint: "This is the classic flood fill (DFS/BFS): save the original color of the starting cell; from it, visit neighbors that have that original color and paint them with the new one. Watch out for the case where the new color equals the original (avoid an infinite loop by returning right away).",
    },
    "spiral-matrix-ii": {
      title: "Spiral Matrix II",
      statement: `Given an integer \`n\`, generate an \`n × n\` matrix filled with the numbers from \`1\` to \`n²\` in **spiral** order (clockwise, starting from the top-left corner).

Example: \`n = 3\` → \`[[1,2,3],[8,9,4],[7,6,5]]\`.`,
      hint: "Same idea as Spiral Matrix, but WRITING instead of reading: keep the four bounds (top/bottom/left/right) and a counter that starts at 1. Fill each edge in spiral order, incrementing the counter, and shrink the bounds.",
    },
    "surrounded-regions": {
      title: "Surrounded Regions",
      statement: `In a grid of \`"X"\` and \`"O"\`, capture all regions of \`"O"\` that are **completely surrounded** by \`"X"\` (replacing those \`"O"\` with \`"X"\`). An \`"O"\` is **not** captured if it is connected to an \`"O"\` on the **edge** of the grid. Return the grid.

Example: the central region of \`"O"\` that is surrounded becomes \`"X"\`; the \`"O"\` touching the edge remain.`,
      hint: "Invert the problem: instead of finding the surrounded 'O's, find the ones that are NOT. Run a DFS from each 'O' on the EDGE, marking everything connected as safe. In the end, every unmarked 'O' becomes 'X' (it was surrounded) and the marked ones go back to being 'O'.",
    },
  },
};
