/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (t === "") return "";

  const targetCount = new Map();
  const windowCount = new Map();

  for (const char of t) {
    targetCount.set(char, (targetCount.get(char) || 0) + 1);
  }

  let have = 0;
  const need = targetCount.size;
  let bestWindow = [-1, -1];
  let bestLength = Infinity;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    windowCount.set(currentChar, (windowCount.get(currentChar) || 0) + 1);

    if (
      targetCount.has(currentChar) &&
      windowCount.get(currentChar) === targetCount.get(currentChar)
    ) {
      have += 1;
    }

    while (have === need) {
      if (right - left + 1 < bestLength) {
        bestWindow = [left, right];
        bestLength = right - left + 1;
      }

      const leftChar = s[left];
      windowCount.set(leftChar, windowCount.get(leftChar) - 1);

      if (
        targetCount.has(leftChar) &&
        windowCount.get(leftChar) < targetCount.get(leftChar)
      ) {
        have -= 1;
      }

      left += 1;
    }
  }

  const [start, end] = bestWindow;
  return bestLength !== Infinity ? s.slice(start, end + 1) : "";
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    s: "ADOBECODEBANC",
    t: "ABC",
    expected: "BANC",
  },
  {
    s: "a",
    t: "a",
    expected: "a",
  },
  {
    s: "a",
    t: "aa",
    expected: "",
  },
];

examples.forEach((example, index) => {
  const result = minWindow(example.s, example.t);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`s = ${JSON.stringify(example.s)}`);
  console.log(`t = ${JSON.stringify(example.t)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected,
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = minWindow;
