var uniquePaths = function (m, n) {
  let row = new Array(n).fill(1);

  for (let i = 0; i < m - 1; i++) {
    const newRow = new Array(n).fill(1);

    for (let j = n - 2; j >= 0; j--) {
      newRow[j] = newRow[j + 1] + row[j];
    }

    row = newRow;
  }

  return row[0];
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    m: 3,
    n: 7,
    expected: 28,
  },
  {
    m: 3,
    n: 2,
    expected: 3,
  },
  {
    m: 3,
    n: 3,
    expected: 6,
  },
];

examples.forEach((example, index) => {
  const result = uniquePaths(example.m, example.n);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`m = ${example.m}, n = ${example.n}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = uniquePaths;
