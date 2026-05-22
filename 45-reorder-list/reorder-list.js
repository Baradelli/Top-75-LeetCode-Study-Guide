function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var reorderList = function (head) {
  if (!head || !head.next) {
    return;
  }

  let slow = head;
  let fast = head.next;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let secondHalf = slow.next;
  slow.next = null;
  let previous = null;

  while (secondHalf) {
    const nextNode = secondHalf.next;
    secondHalf.next = previous;
    previous = secondHalf;
    secondHalf = nextNode;
  }

  let firstHalf = head;
  secondHalf = previous;

  while (secondHalf) {
    const firstNext = firstHalf.next;
    const secondNext = secondHalf.next;

    firstHalf.next = secondHalf;
    secondHalf.next = firstNext;

    firstHalf = firstNext;
    secondHalf = secondNext;
  }
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
    head: [1, 2, 3, 4],
    expected: [1, 4, 2, 3],
  },
  {
    head: [1, 2, 3, 4, 5],
    expected: [1, 5, 2, 4, 3],
  },
  {
    head: [1, 2],
    expected: [1, 2],
  },
];

examples.forEach((example, index) => {
  const linkedList = buildLinkedList(example.head);
  reorderList(linkedList);
  const result = linkedListToArray(linkedList);
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

module.exports = reorderList;
