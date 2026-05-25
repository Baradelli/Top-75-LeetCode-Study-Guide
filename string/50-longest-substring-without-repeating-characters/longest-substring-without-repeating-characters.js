/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const seen = new Set();
  let left = 0;
  let max = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);
    max = Math.max(max, right - left + 1);
  }

  return max;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    s: "abcabcbb",
    expected: 3,
  },
  {
    s: "bbbbb",
    expected: 1,
  },
  {
    s: "pwwkew",
    expected: 3,
  },
];

examples.forEach((example, index) => {
  const result = lengthOfLongestSubstring(example.s);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`s = ${JSON.stringify(example.s)}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = lengthOfLongestSubstring;
