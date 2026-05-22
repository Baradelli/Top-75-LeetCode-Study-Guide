var eraseOverlapIntervals = function (intervals) {
  intervals.sort((first, second) => first[0] - second[0]);

  let removals = 0;
  let previousEnd = intervals[0][1];

  for (let index = 1; index < intervals.length; index++) {
    const [currentStart, currentEnd] = intervals[index];

    if (currentStart >= previousEnd) {
      previousEnd = currentEnd;
    } else {
      removals += 1;
      previousEnd = Math.min(previousEnd, currentEnd);
    }
  }

  return removals;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    intervals: [[1, 2], [2, 3], [3, 4], [1, 3]],
    expected: 1,
  },
  {
    intervals: [[1, 2], [1, 2], [1, 2]],
    expected: 2,
  },
  {
    intervals: [[1, 2], [2, 3]],
    expected: 0,
  },
];

examples.forEach((example, index) => {
  const result = eraseOverlapIntervals(
    example.intervals.map((interval) => [...interval]),
  );
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`intervals = ${JSON.stringify(example.intervals)}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = eraseOverlapIntervals;
