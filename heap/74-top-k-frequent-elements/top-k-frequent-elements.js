/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const frequencyByNumber = {};

  for (const num of nums) {
    frequencyByNumber[num] = (frequencyByNumber[num] || 0) + 1;
  }

  return Object.entries(frequencyByNumber)
    .sort((first, second) => second[1] - first[1])
    .slice(0, k)
    .map(([num]) => Number(num));
};

function arraysHaveSameValues(first, second) {
  return JSON.stringify([...first].sort((a, b) => a - b)) ===
    JSON.stringify([...second].sort((a, b) => a - b));
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    nums: [1, 1, 1, 2, 2, 3],
    k: 2,
    expected: [1, 2],
  },
  {
    nums: [1],
    k: 1,
    expected: [1],
  },
  {
    nums: [1, 2, 1, 2, 1, 2, 3, 1, 3, 2],
    k: 2,
    expected: [1, 2],
  },
];

examples.forEach((example, index) => {
  const result = topKFrequent(example.nums, example.k);
  const isCorrect = arraysHaveSameValues(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`nums = ${JSON.stringify(example.nums)}`);
  console.log(`k = ${example.k}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected,
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = topKFrequent;
