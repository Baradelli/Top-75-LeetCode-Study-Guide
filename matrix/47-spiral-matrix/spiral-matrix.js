/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let column = left; column <= right; column++) {
      result.push(matrix[top][column]);
    }
    top++;

    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
    }
    right--;

    if (top <= bottom) {
      for (let column = right; column >= left; column--) {
        result.push(matrix[bottom][column]);
      }
      bottom--;
    }

    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        result.push(matrix[row][left]);
      }
      left++;
    }
  }

  return result;
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
    expected: [1, 2, 3, 6, 9, 8, 7, 4, 5],
  },
  {
    matrix: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ],
    expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
  },
  {
    matrix: [[1], [2], [3], [4]],
    expected: [1, 2, 3, 4],
  },
];

examples.forEach((example, index) => {
  const result = spiralOrder(example.matrix);
  const isCorrect = JSON.stringify(result) === JSON.stringify(example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`matrix = ${JSON.stringify(example.matrix)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = spiralOrder;
