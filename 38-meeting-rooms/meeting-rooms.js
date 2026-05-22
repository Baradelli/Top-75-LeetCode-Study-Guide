var canAttendMeetings = function (intervals) {
  if (intervals.length <= 1) {
    return true;
  }

  intervals.sort((first, second) => first[0] - second[0]);

  for (let index = 1; index < intervals.length; index++) {
    const previousEnd = intervals[index - 1][1];
    const currentStart = intervals[index][0];

    if (previousEnd > currentStart) {
      return false;
    }
  }

  return true;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    intervals: [[0, 30], [5, 10], [15, 20]],
    expected: false,
  },
  {
    intervals: [[5, 8], [9, 15]],
    expected: true,
  },
  {
    intervals: [[0, 8], [8, 10], [12, 14]],
    expected: true,
  },
];

examples.forEach((example, index) => {
  const result = canAttendMeetings(
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

module.exports = canAttendMeetings;
