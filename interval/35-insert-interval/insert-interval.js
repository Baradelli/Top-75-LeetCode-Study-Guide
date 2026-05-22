var insert = function (intervals, newInterval) {
  const result = [];

  for (let index = 0; index < intervals.length; index++) {
    if (newInterval[1] < intervals[index][0]) {
      result.push(newInterval);
      return [...result, ...intervals.slice(index)];
    }

    if (newInterval[0] > intervals[index][1]) {
      result.push(intervals[index]);
    } else {
      newInterval = [
        Math.min(newInterval[0], intervals[index][0]),
        Math.max(newInterval[1], intervals[index][1]),
      ];
    }
  }

  result.push(newInterval);

  return result;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

function intervalsMatch(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

const examples = [
  {
    intervals: [[1, 3], [6, 9]],
    newInterval: [2, 5],
    expected: [[1, 5], [6, 9]],
  },
  {
    intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]],
    newInterval: [4, 8],
    expected: [[1, 2], [3, 10], [12, 16]],
  },
  {
    intervals: [[1, 5]],
    newInterval: [6, 8],
    expected: [[1, 5], [6, 8]],
  },
];

examples.forEach((example, index) => {
  const result = insert(
    example.intervals.map((interval) => [...interval]),
    [...example.newInterval],
  );
  const isCorrect = intervalsMatch(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(
    `intervals = ${JSON.stringify(example.intervals)}, newInterval = ${JSON.stringify(example.newInterval)}`,
  );
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = insert;
