/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  function isAlphanumeric(char) {
    return (
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z") ||
      (char >= "0" && char <= "9")
    );
  }

  let cleanString = "";

  for (const char of s) {
    if (isAlphanumeric(char)) {
      cleanString += char.toLowerCase();
    }
  }

  return cleanString === cleanString.split("").reverse().join("");
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    s: "A man, a plan, a canal: Panama",
    expected: true,
  },
  {
    s: "race a car",
    expected: false,
  },
  {
    s: " ",
    expected: true,
  },
];

examples.forEach((example, index) => {
  const result = isPalindrome(example.s);
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

module.exports = isPalindrome;
