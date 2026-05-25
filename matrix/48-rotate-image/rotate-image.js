/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  let left = 0;
  let right = matrix.length - 1;

  while (left < right) {
    for (let offset = 0; offset < right - left; offset++) {
      const top = left;
      const bottom = right;
      const topLeft = matrix[top][left + offset];

      matrix[top][left + offset] = matrix[bottom - offset][left];
      matrix[bottom - offset][left] = matrix[bottom][right - offset];
      matrix[bottom][right - offset] = matrix[top + offset][right];
      matrix[top + offset][right] = topLeft;
    }

    left++;
    right--;
  }
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    expected: [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ],
  },
  {
    matrix: [
      [5, 1, 9, 11],
      [2, 4, 8, 10],
      [13, 3, 6, 7],
      [15, 14, 12, 16],
    ],
    expected: [
      [15, 13, 2, 5],
      [14, 3, 4, 1],
      [12, 6, 8, 9],
      [16, 7, 10, 11],
    ],
  },
  {
    matrix: [
      [1, 2],
      [3, 4],
    ],
    expected: [
      [3, 1],
      [4, 2],
    ],
  },
];

examples.forEach((example, index) => {
  const matrix = example.matrix.map((row) => [...row]);
  rotate(matrix);
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

module.exports = rotate;
