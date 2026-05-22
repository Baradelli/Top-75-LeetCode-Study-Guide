function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [2, 7, 11, 15],
    target: 9,
    expected: [0, 1],
  },
  {
    nums: [3, 2, 4],
    target: 6,
    expected: [1, 2],
  },
  {
    nums: [3, 3],
    target: 6,
    expected: [0, 1],
  },
];

examples.forEach((example, index) => {
  const result = twoSum(example.nums, example.target);
  const isCorrect =
    result.length === example.expected.length &&
    result.every(
      (value, resultIndex) => value === example.expected[resultIndex],
    );
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`nums = [${example.nums.join(", ")}]`);
  console.log(`target = ${example.target}`);
  console.log(
    `${color}result = [${result.join(", ")}] | expected = [${example.expected.join(
      ", ",
    )}] | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = twoSum;
