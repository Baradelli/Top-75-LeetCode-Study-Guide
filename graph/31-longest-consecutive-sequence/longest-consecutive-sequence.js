/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const numSet = new Set(nums);
  let longest = 0;

  for (const n of numSet) {
    if (!numSet.has(n - 1)) {
      let length = 1;

      while (numSet.has(n + length)) {
        length += 1;
      }

      longest = Math.max(length, longest);
    }
  }

  return longest;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [100, 4, 200, 1, 3, 2],
    expected: 4,
  },
  {
    nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
    expected: 9,
  },
  {
    nums: [1, 0, 1, 2],
    expected: 3,
  },
];

examples.forEach((example, index) => {
  const result = longestConsecutive(example.nums);
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

module.exports = longestConsecutive;
