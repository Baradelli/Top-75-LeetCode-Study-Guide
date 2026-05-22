function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0, head);
  let left = dummy;
  let right = head;

  while (n > 0 && right) {
    right = right.next;
    n -= 1;
  }

  while (right) {
    left = left.next;
    right = right.next;
  }

  left.next = left.next.next;

  return dummy.next;
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
    n: 2,
    expected: [1, 2, 3, 5],
  },
  {
    head: [1],
    n: 1,
    expected: [],
  },
  {
    head: [1, 2],
    n: 1,
    expected: [1],
  },
];

examples.forEach((example, index) => {
  const linkedList = buildLinkedList(example.head);
  const updatedList = removeNthFromEnd(linkedList, example.n);
  const result = linkedListToArray(updatedList);
  const isCorrect = JSON.stringify(result) === JSON.stringify(example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`head = ${JSON.stringify(example.head)}, n = ${example.n}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = removeNthFromEnd;
