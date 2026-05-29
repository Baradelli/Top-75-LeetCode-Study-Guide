class Solution {
  /**
   * @param {string[]} strs
   * @returns {string}
   */
  encode(strs) {
    let result = "";

    for (const str of strs) {
      result += str.length + "#" + str;
    }

    return result;
  }

  /**
   * @param {string} str
   * @returns {string[]}
   */
  decode(str) {
    const result = [];
    let i = 0;

    while (i < str.length) {
      let j = i;

      while (str.charAt(j) !== "#") {
        j++;
      }

      const length = Number(str.substring(i, j));
      i = j + 1;
      j = i + length;

      result.push(str.substring(i, j));
      i = j;
    }

    return result;
  }
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    strs: ["Hello", "World"],
    expected: ["Hello", "World"],
  },
  {
    strs: [""],
    expected: [""],
  },
  {
    strs: ["neet", "code#", "4#five", ""],
    expected: ["neet", "code#", "4#five", ""],
  },
];

examples.forEach((example, index) => {
  const solution = new Solution();
  const encoded = solution.encode(example.strs);
  const result = solution.decode(encoded);
  const isCorrect = JSON.stringify(result) === JSON.stringify(example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`strs = ${JSON.stringify(example.strs)}`);
  console.log(`encoded = ${JSON.stringify(encoded)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected,
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = Solution;
