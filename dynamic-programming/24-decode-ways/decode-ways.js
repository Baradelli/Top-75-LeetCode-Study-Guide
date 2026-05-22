var numDecodings = function (s) {
  const dp = {
    [s.length]: 1,
  };

  function dfs(index) {
    if (index in dp) {
      return dp[index];
    }

    if (s[index] === "0") {
      return 0;
    }

    let result = dfs(index + 1);

    if (
      index + 1 < s.length &&
      (s[index] === "1" || (s[index] === "2" && "0123456".includes(s[index + 1])))
    ) {
      result += dfs(index + 2);
    }

    dp[index] = result;
    return result;
  }

  return dfs(0);
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    s: "12",
    expected: 2,
  },
  {
    s: "226",
    expected: 3,
  },
  {
    s: "06",
    expected: 0,
  },
];

examples.forEach((example, index) => {
  const result = numDecodings(example.s);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`s = "${example.s}"`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = numDecodings;
