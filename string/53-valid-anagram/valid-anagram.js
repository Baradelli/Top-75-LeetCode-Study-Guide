/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const counts = new Map();

  for (const char of s) {
    counts.set(char, (counts.get(char) || 0) + 1);
  }

  for (const char of t) {
    const currentCount = counts.get(char);

    if (!currentCount) return false;

    if (currentCount === 1) {
      counts.delete(char);
    } else {
      counts.set(char, currentCount - 1);
    }
  }

  return counts.size === 0;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    s: "anagram",
    t: "nagaram",
    expected: true,
  },
  {
    s: "rat",
    t: "car",
    expected: false,
  },
  {
    s: "aacc",
    t: "ccac",
    expected: false,
  },
];

examples.forEach((example, index) => {
  const result = isAnagram(example.s, example.t);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`s = ${JSON.stringify(example.s)}`);
  console.log(`t = ${JSON.stringify(example.t)}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = isAnagram;
