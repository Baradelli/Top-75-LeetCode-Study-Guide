var longestCommonSubsequence = function (text1, text2) {
  const dp = Array.from({ length: text1.length + 1 }, () =>
    new Array(text2.length + 1).fill(0),
  );

  for (let i = text1.length - 1; i >= 0; i--) {
    for (let j = text2.length - 1; j >= 0; j--) {
      if (text1[i] === text2[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }

  return dp[0][0];
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    text1: "abcde",
    text2: "ace",
    expected: 3,
  },
  {
    text1: "abc",
    text2: "abc",
    expected: 3,
  },
  {
    text1: "abc",
    text2: "def",
    expected: 0,
  },
];

examples.forEach((example, index) => {
  const result = longestCommonSubsequence(example.text1, example.text2);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`text1 = "${example.text1}", text2 = "${example.text2}"`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = longestCommonSubsequence;
