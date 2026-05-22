function maxProduct(nums) {
  let max = nums[0];
  let min = nums[0];
  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];

    if (n < 0) {
      const temp = max;
      max = min;
      min = temp;
    }

    max = Math.max(n, max * n);
    min = Math.min(n, min * n);

    if (max > result) {
      result = max;
    }
  }

  return result;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [2, 3, -2, 4],
    expected: 6,
  },
  {
    nums: [-2, 0, -1],
    expected: 0,
  },
  {
    nums: [-2, 3, -4],
    expected: 24,
  },
];

examples.forEach((example, index) => {
  const result = maxProduct(example.nums);
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

module.exports = maxProduct;
