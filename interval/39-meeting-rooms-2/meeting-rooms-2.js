var minMeetingRooms = function (intervals) {
  if (intervals.length === 0) {
    return 0;
  }

  const startTimes = intervals
    .map((interval) => interval[0])
    .sort((first, second) => first - second);
  const endTimes = intervals
    .map((interval) => interval[1])
    .sort((first, second) => first - second);

  let roomsInUse = 0;
  let maxRooms = 0;
  let startIndex = 0;
  let endIndex = 0;

  while (startIndex < intervals.length) {
    if (startTimes[startIndex] < endTimes[endIndex]) {
      roomsInUse += 1;
      startIndex += 1;
      maxRooms = Math.max(maxRooms, roomsInUse);
    } else {
      roomsInUse -= 1;
      endIndex += 1;
    }
  }

  return maxRooms;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    intervals: [[0, 40], [5, 10], [15, 20]],
    expected: 2,
  },
  {
    intervals: [[4, 9]],
    expected: 1,
  },
  {
    intervals: [[0, 8], [8, 10], [9, 12]],
    expected: 2,
  },
];

examples.forEach((example, index) => {
  const result = minMeetingRooms(
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

module.exports = minMeetingRooms;
