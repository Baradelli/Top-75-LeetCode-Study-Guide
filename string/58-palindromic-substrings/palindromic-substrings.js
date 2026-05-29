/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    let left = i;
    let right = i;

    while (left >= 0 && right < s.length && s.charAt(left) === s.charAt(right)) {
      result++;
      left--;
      right++;
    }

    left = i;
    right = i + 1;

    while (left >= 0 && right < s.length && s.charAt(left) === s.charAt(right)) {
      result++;
      left--;
      right++;
    }
  }

  return result;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    s: "abc",
    expected: 3,
  },
  {
    s: "aaa",
    expected: 6,
  },
  {
    s: "racecar",
    expected: 10,
  },
];

examples.forEach((example, index) => {
  const result = countSubstrings(example.s);
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

module.exports = countSubstrings;
