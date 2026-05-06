function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);

  let leftProduct = 1;

  for (let i = 0; i < nums.length; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  let rightProduct = 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [1, 2, 3, 4],
    expected: [24, 12, 8, 6],
  },
  {
    nums: [-1, 1, 0, -3, 3],
    expected: [0, 0, 9, 0, 0],
  },
];

examples.forEach((example, index) => {
  const result = productExceptSelf(example.nums);
  const isCorrect =
    result.length === example.expected.length &&
    result.every((value, resultIndex) => value === example.expected[resultIndex]);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`nums = [${example.nums.join(", ")}]`);
  console.log(
    `${color}result = [${result.join(", ")}] | expected = [${example.expected.join(
      ", "
    )}] | ${status}${RESET}`
  );
  console.log("---");
});

module.exports = productExceptSelf;
