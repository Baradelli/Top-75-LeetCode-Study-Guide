var countBits = function (n) {
  const res = new Array(n + 1);
  res[0] = 0;

  for (let i = 1; i <= n; i++) {
    res[i] = res[i >> 1] + (i & 1);
  }

  return res;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    n: 2,
    expected: [0, 1, 1],
  },
  {
    n: 5,
    expected: [0, 1, 1, 2, 1, 2],
  },
  {
    n: 8,
    expected: [0, 1, 1, 2, 1, 2, 2, 3, 1],
  },
];

examples.forEach((example, index) => {
  const result = countBits(example.n);
  const isCorrect =
    result.length === example.expected.length &&
    result.every(
      (value, resultIndex) => value === example.expected[resultIndex],
    );
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`n = ${example.n}`);
  console.log(
    `${color}result = [${result.join(", ")}] | expected = [${example.expected.join(
      ", ",
    )}] | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = countBits;
