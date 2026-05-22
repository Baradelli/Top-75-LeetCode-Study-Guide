var rob = function (nums) {
  let rob1 = 0;
  let rob2 = 0;

  for (const num of nums) {
    const currentBest = Math.max(num + rob1, rob2);
    rob1 = rob2;
    rob2 = currentBest;
  }

  return rob2;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [1, 2, 3, 1],
    expected: 4,
  },
  {
    nums: [2, 7, 9, 3, 1],
    expected: 12,
  },
  {
    nums: [2, 1, 1, 2],
    expected: 4,
  },
];

examples.forEach((example, index) => {
  const result = rob(example.nums);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`nums = [${example.nums.join(", ")}]`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = rob;
