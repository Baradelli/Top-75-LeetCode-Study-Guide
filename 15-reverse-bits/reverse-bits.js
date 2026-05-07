var reverseBits = function (n) {
  let res = 0;

  for (let i = 0; i < 32; i++) {
    const bit = (n >>> i) & 1;
    res = res | (bit << (31 - i));
  }

  return res >>> 0;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    n: 43261596,
    expected: 964176192,
  },
  {
    n: 2147483644,
    expected: 1073741822,
  },
  {
    n: 1,
    expected: 2147483648,
  },
];

examples.forEach((example, index) => {
  const result = reverseBits(example.n);
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

module.exports = reverseBits;
