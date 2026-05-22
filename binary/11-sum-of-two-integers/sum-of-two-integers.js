var getSum = function (a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;

    a = a ^ b;
    b = carry;
  }

  return a;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    a: 1,
    b: 2,
    expected: 3,
  },
  {
    a: 2,
    b: 3,
    expected: 5,
  },
  {
    a: -4,
    b: 7,
    expected: 3,
  },
];

examples.forEach((example, index) => {
  const result = getSum(example.a, example.b);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`a = ${example.a}`);
  console.log(`b = ${example.b}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = getSum;
