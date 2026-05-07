function missingNumber(nums) {
  const expectedSum = (nums.length * (nums.length + 1)) / 2;
  let actualSum = 0;

  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i];
  }

  return expectedSum - actualSum;
}

function missingNumberXor(nums) {
  let xor = nums.length;

  for (let i = 0; i < nums.length; i++) {
    xor ^= i;
    xor ^= nums[i];
  }

  return xor;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [3, 0, 1],
    expected: 2,
  },
  {
    nums: [0, 1],
    expected: 2,
  },
  {
    nums: [9, 6, 4, 2, 3, 5, 7, 0, 1],
    expected: 8,
  },
];

examples.forEach((example, index) => {
  const result = missingNumber(example.nums);
  const xorResult = missingNumberXor(example.nums);
  const isCorrect =
    result === example.expected && xorResult === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`nums = [${example.nums.join(", ")}]`);
  console.log(
    `${color}sum result = ${result} | xor result = ${xorResult} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = missingNumber;
module.exports.missingNumberXor = missingNumberXor;
