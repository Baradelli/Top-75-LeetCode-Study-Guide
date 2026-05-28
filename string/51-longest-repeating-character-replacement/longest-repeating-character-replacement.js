/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  const count = new Map();
  let bestLength = 0;
  let left = 0;
  let maxFrequency = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    count.set(currentChar, (count.get(currentChar) || 0) + 1);
    maxFrequency = Math.max(maxFrequency, count.get(currentChar));

    if (right - left + 1 - maxFrequency > k) {
      count.set(s[left], count.get(s[left]) - 1);
      left += 1;
    }

    bestLength = Math.max(bestLength, right - left + 1);
  }

  return bestLength;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    s: "ABAB",
    k: 2,
    expected: 4,
  },
  {
    s: "AABABBA",
    k: 1,
    expected: 4,
  },
  {
    s: "AAAA",
    k: 0,
    expected: 4,
  },
];

examples.forEach((example, index) => {
  const result = characterReplacement(example.s, example.k);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`s = ${JSON.stringify(example.s)}`);
  console.log(`k = ${example.k}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = characterReplacement;
