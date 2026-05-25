/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function search(row, col, index) {
    if (index === word.length) {
      return true;
    }

    if (
      row < 0 ||
      col < 0 ||
      row >= rows ||
      col >= cols ||
      board[row][col] !== word[index]
    ) {
      return false;
    }

    const temp = board[row][col];
    board[row][col] = "#";

    const found =
      search(row + 1, col, index + 1) ||
      search(row - 1, col, index + 1) ||
      search(row, col + 1, index + 1) ||
      search(row, col - 1, index + 1);

    board[row][col] = temp;
    return found;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (search(row, col, 0)) {
        return true;
      }
    }
  }

  return false;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    board: [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    word: "ABCCED",
    expected: true,
  },
  {
    board: [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    word: "SEE",
    expected: true,
  },
  {
    board: [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    word: "ABCB",
    expected: false,
  },
];

examples.forEach((example, index) => {
  const board = example.board.map((row) => [...row]);
  const result = exist(board, example.word);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`board = ${JSON.stringify(example.board)}`);
  console.log(`word = ${JSON.stringify(example.word)}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = exist;
