/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  class TrieNode {
    constructor() {
      this.children = {};
      this.isWord = false;
    }

    addWord(word) {
      let current = this;

      for (const character of word) {
        if (!(character in current.children)) {
          current.children[character] = new TrieNode();
        }

        current = current.children[character];
      }

      current.isWord = true;
    }
  }

  const root = new TrieNode();

  for (const word of words) {
    root.addWord(word);
  }

  const rows = board.length;
  const columns = board[0].length;
  const result = new Set();
  const visited = new Set();

  const dfs = (row, column, parent, word) => {
    if (
      row < 0 ||
      column < 0 ||
      row >= rows ||
      column >= columns ||
      visited.has(`${row},${column}`)
    ) {
      return;
    }

    const character = board[row][column];
    const node = parent.children[character];

    if (node === undefined) {
      return;
    }

    const nextWord = word + character;
    visited.add(`${row},${column}`);

    if (node.isWord) {
      result.add(nextWord);
      node.isWord = false;
    }

    dfs(row + 1, column, node, nextWord);
    dfs(row - 1, column, node, nextWord);
    dfs(row, column + 1, node, nextWord);
    dfs(row, column - 1, node, nextWord);

    visited.delete(`${row},${column}`);

    if (Object.keys(node.children).length === 0) {
      delete parent.children[character];
    }
  };

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      dfs(row, column, root, "");
    }
  }

  return [...result];
};

function arraysAreEqual(first, second) {
  return JSON.stringify([...first].sort()) === JSON.stringify([...second].sort());
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    board: [
      ["o", "a", "a", "n"],
      ["e", "t", "a", "e"],
      ["i", "h", "k", "r"],
      ["i", "f", "l", "v"],
    ],
    words: ["oath", "pea", "eat", "rain"],
    expected: ["eat", "oath"],
  },
  {
    board: [
      ["a", "b"],
      ["c", "d"],
    ],
    words: ["abcb"],
    expected: [],
  },
  {
    board: [
      ["a", "b"],
      ["c", "d"],
    ],
    words: ["ab", "cb", "ad", "bd", "ac", "ca"],
    expected: ["ab", "ac", "bd", "ca"],
  },
];

examples.forEach((example, index) => {
  const result = findWords(
    example.board.map((row) => [...row]),
    example.words,
  );
  const isCorrect = arraysAreEqual(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`board = ${JSON.stringify(example.board)}`);
  console.log(`words = ${JSON.stringify(example.words)}`);
  console.log(
    `${color}result = ${JSON.stringify(result.sort())} | expected = ${JSON.stringify(
      [...example.expected].sort(),
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = findWords;
