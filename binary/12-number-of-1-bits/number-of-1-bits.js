var hammingWeight = function (n) {
  let count = 0;

  while (n !== 0) {
    const lastBit = n & 1;
    count += lastBit;
    n = n >>> 1;
  }

  return count;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    n: 11,
    expected: 3,
  },
  {
    n: 128,
    expected: 1,
  },
  {
    n: 2147483645,
    expected: 30,
  },
];

examples.forEach((example, index) => {
  const result = hammingWeight(example.n);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`n = ${example.n}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = hammingWeight;
