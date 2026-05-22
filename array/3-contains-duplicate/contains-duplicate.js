function containsDuplicate(nums) {
  const set = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true;
    }

    set.add(nums[i]);
  }

  return false;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [1, 2, 3, 1],
    expected: true,
  },
  {
    nums: [1, 2, 3, 4],
    expected: false,
  },
  {
    nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
    expected: true,
  },
];

examples.forEach((example, index) => {
  const result = containsDuplicate(example.nums);
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

module.exports = containsDuplicate;
