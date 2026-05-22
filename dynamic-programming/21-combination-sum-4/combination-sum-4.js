var combinationSum4 = function (nums, target) {
  const dp = { 0: 1 };

  for (let total = 1; total <= target; total++) {
    dp[total] = 0;

    for (const num of nums) {
      dp[total] += dp[total - num] || 0;
    }
  }

  return dp[target];
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [1, 2, 3],
    target: 4,
    expected: 7,
  },
  {
    nums: [9],
    target: 3,
    expected: 0,
  },
  {
    nums: [2, 4, 6],
    target: 8,
    expected: 7,
  },
];

examples.forEach((example, index) => {
  const result = combinationSum4(example.nums, example.target);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`nums = [${example.nums.join(", ")}], target = ${example.target}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = combinationSum4;
