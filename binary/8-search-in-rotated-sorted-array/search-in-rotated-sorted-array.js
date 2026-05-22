function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (target === nums[middle]) {
      return middle;
    }

    if (nums[left] <= nums[middle]) {
      if (target > nums[middle] || target < nums[left]) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    } else {
      if (target < nums[middle] || target > nums[right]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
  }

  return -1;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [4, 5, 6, 7, 0, 1, 2],
    target: 0,
    expected: 4,
  },
  {
    nums: [4, 5, 6, 7, 0, 1, 2],
    target: 3,
    expected: -1,
  },
  {
    nums: [1],
    target: 0,
    expected: -1,
  },
];

examples.forEach((example, index) => {
  const result = search(example.nums, example.target);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`nums = [${example.nums.join(", ")}]`);
  console.log(`target = ${example.target}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`
  );
  console.log("---");
});

module.exports = search;
