var climbStairs = function (n) {
  let oneStepAhead = 1;
  let twoStepsAhead = 1;

  for (let i = 0; i < n - 1; i++) {
    const currentWays = oneStepAhead;
    oneStepAhead = oneStepAhead + twoStepsAhead;
    twoStepsAhead = currentWays;
  }

  return oneStepAhead;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    n: 2,
    expected: 2,
  },
  {
    n: 3,
    expected: 3,
  },
  {
    n: 5,
    expected: 8,
  },
];

examples.forEach((example, index) => {
  const result = climbStairs(example.n);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`n = ${example.n}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = climbStairs;
