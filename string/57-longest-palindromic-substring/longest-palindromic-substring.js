/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let resultStart = 0;
  let resultLength = 0;

  for (let i = 0; i < s.length; i++) {
    let left = i;
    let right = i;

    while (left >= 0 && right < s.length && s.charAt(left) === s.charAt(right)) {
      if (right - left + 1 > resultLength) {
        resultStart = left;
        resultLength = right - left + 1;
      }

      left--;
      right++;
    }

    left = i;
    right = i + 1;

    while (left >= 0 && right < s.length && s.charAt(left) === s.charAt(right)) {
      if (right - left + 1 > resultLength) {
        resultStart = left;
        resultLength = right - left + 1;
      }

      left--;
      right++;
    }
  }

  return s.substring(resultStart, resultStart + resultLength);
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    s: "babad",
    expected: ["bab", "aba"],
  },
  {
    s: "cbbd",
    expected: ["bb"],
  },
  {
    s: "a",
    expected: ["a"],
  },
];

examples.forEach((example, index) => {
  const result = longestPalindrome(example.s);
  const isCorrect = example.expected.includes(result);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`s = ${JSON.stringify(example.s)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected,
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = longestPalindrome;
