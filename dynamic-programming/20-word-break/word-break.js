var wordBreak = function (s, wordDict) {
  const dp = new Array(s.length + 1).fill(false);
  dp[s.length] = true;

  for (let i = s.length - 1; i >= 0; i--) {
    for (const word of wordDict) {
      if (i + word.length <= s.length && s.slice(i, i + word.length) === word) {
        dp[i] = dp[i + word.length];
      }

      if (dp[i]) {
        break;
      }
    }
  }

  return dp[0];
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    s: "leetcode",
    wordDict: ["leet", "code"],
    expected: true,
  },
  {
    s: "applepenapple",
    wordDict: ["apple", "pen"],
    expected: true,
  },
  {
    s: "catsandog",
    wordDict: ["cats", "dog", "sand", "and", "cat"],
    expected: false,
  },
];

examples.forEach((example, index) => {
  const result = wordBreak(example.s, example.wordDict);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(
    `s = "${example.s}", wordDict = [${example.wordDict.map((word) => `"${word}"`).join(", ")}]`,
  );
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = wordBreak;
