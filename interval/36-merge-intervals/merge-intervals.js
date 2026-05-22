var merge = function (intervals) {
  intervals.sort((first, second) => first[0] - second[0]);

  const mergedIntervals = [intervals[0]];

  for (let index = 1; index < intervals.length; index++) {
    const [currentStart, currentEnd] = intervals[index];
    const lastMergedInterval = mergedIntervals[mergedIntervals.length - 1];
    const lastMergedEnd = lastMergedInterval[1];

    if (currentStart <= lastMergedEnd) {
      lastMergedInterval[1] = Math.max(lastMergedEnd, currentEnd);
    } else {
      mergedIntervals.push([currentStart, currentEnd]);
    }
  }

  return mergedIntervals;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

function intervalsMatch(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

const examples = [
  {
    intervals: [[1, 3], [2, 6], [8, 10], [15, 18]],
    expected: [[1, 6], [8, 10], [15, 18]],
  },
  {
    intervals: [[1, 4], [4, 5]],
    expected: [[1, 5]],
  },
  {
    intervals: [[4, 7], [1, 4]],
    expected: [[1, 7]],
  },
];

examples.forEach((example, index) => {
  const result = merge(example.intervals.map((interval) => [...interval]));
  const isCorrect = intervalsMatch(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`intervals = ${JSON.stringify(example.intervals)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = merge;
