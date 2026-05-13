var coinChange = function (coins, amount) {
  if (amount === 0) return 0;

  coins.sort((a, b) => a - b);

  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];

      if (coin > currentAmount) {
        break;
      }

      const candidate = dp[currentAmount - coin] + 1;

      if (candidate < dp[currentAmount]) {
        dp[currentAmount] = candidate;
      }
    }
  }

  return dp[amount] === amount + 1 ? -1 : dp[amount];
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    coins: [1, 2, 5],
    amount: 11,
    expected: 3,
  },
  {
    coins: [2],
    amount: 3,
    expected: -1,
  },
  {
    coins: [1],
    amount: 0,
    expected: 0,
  },
];

examples.forEach((example, index) => {
  const result = coinChange([...example.coins], example.amount);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`coins = [${example.coins.join(", ")}], amount = ${example.amount}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = coinChange;
