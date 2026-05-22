function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let l = i + 1;
    let r = nums.length - 1;

    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];

      if (sum > 0) {
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        result.push([nums[i], nums[l], nums[r]]);
        l++;

        while (nums[l] === nums[l - 1] && l < r) {
          l++;
        }
      }
    }
  }

  return result;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

function normalizeTriplets(triplets) {
  return triplets
    .map((triplet) => [...triplet].sort((a, b) => a - b))
    .sort((a, b) => {
      if (a[0] !== b[0]) {
        return a[0] - b[0];
      }

      if (a[1] !== b[1]) {
        return a[1] - b[1];
      }

      return a[2] - b[2];
    });
}

function tripletsMatch(result, expected) {
  return (
    JSON.stringify(normalizeTriplets(result)) ===
    JSON.stringify(normalizeTriplets(expected))
  );
}

const examples = [
  {
    nums: [-1, 0, 1, 2, -1, -4],
    expected: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    nums: [0, 1, 1],
    expected: [],
  },
  {
    nums: [0, 0, 0],
    expected: [[0, 0, 0]],
  },
];

examples.forEach((example, index) => {
  const result = threeSum([...example.nums]);
  const isCorrect = tripletsMatch(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`nums = [${example.nums.join(", ")}]`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected
    )} | ${status}${RESET}`
  );
  console.log("---");
});

module.exports = threeSum;
