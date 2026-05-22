function findMin(nums) {
  let result = nums[0];

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    if (nums[left] < nums[right]) {
      result = Math.min(result, nums[left]);
      break;
    }

    const middle = Math.floor((left + right) / 2);
    result = Math.min(result, nums[middle]);

    if (nums[middle] >= nums[left]) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return result;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [3, 4, 5, 1, 2],
    expected: 1,
  },
  {
    nums: [4, 5, 6, 7, 0, 1, 2],
    expected: 0,
  },
  {
    nums: [11, 13, 15, 17],
    expected: 11,
  },
];

examples.forEach((example, index) => {
  const result = findMin(example.nums);
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

module.exports = findMin;
