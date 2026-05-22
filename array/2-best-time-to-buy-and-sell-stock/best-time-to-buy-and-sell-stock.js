function maxProfit(prices) {
  let minPrice = prices[0];
  let bestProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];

    if (currentPrice < minPrice) {
      minPrice = currentPrice;
    }

    const profit = currentPrice - minPrice;

    if (profit > bestProfit) {
      bestProfit = profit;
    }
  }

  return bestProfit;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    prices: [7, 1, 5, 3, 6, 4],
    expected: 5,
  },
  {
    prices: [7, 6, 4, 3, 1],
    expected: 0,
  },
];

examples.forEach((example, index) => {
  const result = maxProfit(example.prices);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`prices = [${example.prices.join(", ")}]`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = maxProfit;
