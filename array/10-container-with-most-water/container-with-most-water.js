function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let bestArea = 0;

  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const currentArea = width * minHeight;

    if (currentArea > bestArea) {
      bestArea = currentArea;
    }

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return bestArea;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    height: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    expected: 49,
  },
  {
    height: [1, 1],
    expected: 1,
  },
  {
    height: [4, 3, 2, 1, 4],
    expected: 16,
  },
];

examples.forEach((example, index) => {
  const result = maxArea(example.height);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`height = [${example.height.join(", ")}]`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = maxArea;
