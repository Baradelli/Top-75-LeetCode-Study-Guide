/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  const closeToOpen = { ")": "(", "]": "[", "}": "{" };

  for (const char of s) {
    if (char in closeToOpen) {
      if (stack.length && stack[stack.length - 1] === closeToOpen[char]) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    s: "()",
    expected: true,
  },
  {
    s: "()[]{}",
    expected: true,
  },
  {
    s: "(]",
    expected: false,
  },
  {
    s: "([])",
    expected: true,
  },
  {
    s: "([)]",
    expected: false,
  },
];

examples.forEach((example, index) => {
  const result = isValid(example.s);
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

module.exports = isValid;
