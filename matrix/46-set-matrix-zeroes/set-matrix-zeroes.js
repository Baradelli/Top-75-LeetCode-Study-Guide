/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const ROWS = matrix.length;
  const COLS = matrix[0].length;
  let rowZero = false;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (matrix[r][c] === 0) {
        matrix[0][c] = 0;
        if (r > 0) {
          matrix[r][0] = 0;
        } else {
          rowZero = true;
        }
      }
    }
  }

  for (let r = 1; r < ROWS; r++) {
    for (let c = 1; c < COLS; c++) {
      if (matrix[0][c] === 0 || matrix[r][0] === 0) {
        matrix[r][c] = 0;
      }
    }
  }

  if (matrix[0][0] === 0) {
    for (let r = 0; r < ROWS; r++) {
      matrix[r][0] = 0;
    }
  }

  if (rowZero) {
    for (let c = 0; c < COLS; c++) {
      matrix[0][c] = 0;
    }
  }
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    matrix: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    expected: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ],
  },
  {
    matrix: [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ],
    expected: [
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0],
    ],
  },
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0],
    ],
    expected: [
      [1, 2, 0],
      [4, 5, 0],
      [0, 0, 0],
    ],
  },
];

examples.forEach((example, index) => {
  const matrix = example.matrix.map((row) => [...row]);
  setZeroes(matrix);
  const isCorrect = JSON.stringify(matrix) === JSON.stringify(example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`matrix = ${JSON.stringify(example.matrix)}`);
  console.log(
    `${color}result = ${JSON.stringify(matrix)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = setZeroes;
