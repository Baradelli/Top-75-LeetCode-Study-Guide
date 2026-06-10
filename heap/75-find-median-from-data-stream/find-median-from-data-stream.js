class Heap {
  constructor(compare) {
    this.values = [];
    this.compare = compare;
  }

  size() {
    return this.values.length;
  }

  isEmpty() {
    return this.values.length === 0;
  }

  front() {
    return this.values[0];
  }

  enqueue(value) {
    this.values.push(value);
    this.bubbleUp(this.values.length - 1);
  }

  dequeue() {
    if (this.values.length === 1) {
      return this.values.pop();
    }

    const top = this.values[0];
    this.values[0] = this.values.pop();
    this.bubbleDown(0);
    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.compare(this.values[parentIndex], this.values[index]) <= 0) {
        break;
      }

      [this.values[parentIndex], this.values[index]] = [
        this.values[index],
        this.values[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    while (true) {
      let bestIndex = index;
      const leftIndex = index * 2 + 1;
      const rightIndex = index * 2 + 2;

      if (
        leftIndex < this.values.length &&
        this.compare(this.values[bestIndex], this.values[leftIndex]) > 0
      ) {
        bestIndex = leftIndex;
      }

      if (
        rightIndex < this.values.length &&
        this.compare(this.values[bestIndex], this.values[rightIndex]) > 0
      ) {
        bestIndex = rightIndex;
      }

      if (bestIndex === index) {
        break;
      }

      [this.values[index], this.values[bestIndex]] = [
        this.values[bestIndex],
        this.values[index],
      ];
      index = bestIndex;
    }
  }
}

var MedianFinder = function () {
  this.small = new Heap((a, b) => b - a);
  this.large = new Heap((a, b) => a - b);
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (this.large.isEmpty() || num > this.large.front()) {
    this.large.enqueue(num);
  } else {
    this.small.enqueue(num);
  }

  if (this.small.size() > this.large.size() + 1) {
    this.large.enqueue(this.small.dequeue());
  } else if (this.large.size() > this.small.size() + 1) {
    this.small.enqueue(this.large.dequeue());
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.small.size() > this.large.size()) {
    return this.small.front();
  }

  if (this.large.size() > this.small.size()) {
    return this.large.front();
  }

  return (this.small.front() + this.large.front()) / 2;
};

function runOperations(operations, values) {
  let medianFinder = null;

  return operations.map((operation, index) => {
    if (operation === "MedianFinder") {
      medianFinder = new MedianFinder();
      return null;
    }

    if (operation === "addNum") {
      medianFinder.addNum(values[index][0]);
      return null;
    }

    return medianFinder.findMedian();
  });
}

function arraysAreEqual(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    operations: [
      "MedianFinder",
      "addNum",
      "addNum",
      "findMedian",
      "addNum",
      "findMedian",
    ],
    values: [[], [1], [2], [], [3], []],
    expected: [null, null, null, 1.5, null, 2],
  },
  {
    operations: [
      "MedianFinder",
      "addNum",
      "findMedian",
      "addNum",
      "findMedian",
    ],
    values: [[], [5], [], [10], []],
    expected: [null, null, 5, null, 7.5],
  },
  {
    operations: [
      "MedianFinder",
      "addNum",
      "addNum",
      "addNum",
      "findMedian",
    ],
    values: [[], [3], [1], [2], []],
    expected: [null, null, null, null, 2],
  },
];

examples.forEach((example, index) => {
  const result = runOperations(example.operations, example.values);
  const isCorrect = arraysAreEqual(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`operations = ${JSON.stringify(example.operations)}`);
  console.log(`values = ${JSON.stringify(example.values)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected,
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = MedianFinder;
