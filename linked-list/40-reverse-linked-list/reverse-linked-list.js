function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var reverseList = function (head) {
  let previous = null;
  let current = head;

  while (current) {
    const nextNode = current.next;
    current.next = previous;
    previous = current;
    current = nextNode;
  }

  return previous;
};

function buildLinkedList(values) {
  let head = null;
  let tail = null;

  values.forEach((value) => {
    const node = new ListNode(value);

    if (!head) {
      head = node;
      tail = node;
      return;
    }

    tail.next = node;
    tail = node;
  });

  return head;
}

function linkedListToArray(head) {
  const values = [];
  let current = head;

  while (current) {
    values.push(current.val);
    current = current.next;
  }

  return values;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    head: [1, 2, 3, 4, 5],
    expected: [5, 4, 3, 2, 1],
  },
  {
    head: [1, 2],
    expected: [2, 1],
  },
  {
    head: [],
    expected: [],
  },
];

examples.forEach((example, index) => {
  const linkedList = buildLinkedList(example.head);
  const reversedList = reverseList(linkedList);
  const result = linkedListToArray(reversedList);
  const isCorrect = JSON.stringify(result) === JSON.stringify(example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`head = ${JSON.stringify(example.head)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = reverseList;
