var lengthOfLIS = function (nums) {
  if (nums.length === 0) return 0;

  const dp = Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    expected: 4,
  },
  {
    nums: [0, 1, 0, 3, 2, 3],
    expected: 4,
  },
  {
    nums: [7, 7, 7, 7, 7, 7, 7],
    expected: 1,
  },
];

examples.forEach((example, index) => {
  const result = lengthOfLIS(example.nums);
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

module.exports = lengthOfLIS;
