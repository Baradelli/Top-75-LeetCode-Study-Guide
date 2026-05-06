function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    expected: 6,
  },
  {
    nums: [1],
    expected: 1,
  },
  {
    nums: [5, 4, -1, 7, 8],
    expected: 23,
  },
];

examples.forEach((example, index) => {
  const result = maxSubArray(example.nums);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`nums = [${example.nums.join(", ")}]`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`
  );
  console.log("---");
});

module.exports = maxSubArray;
