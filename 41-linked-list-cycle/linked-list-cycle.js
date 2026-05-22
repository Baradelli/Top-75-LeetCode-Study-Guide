function ListNode(val) {
  this.val = val;
  this.next = null;
}

var hasCycle = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
};

function buildLinkedListWithCycle(values, pos) {
  if (values.length === 0) {
    return null;
  }

  const nodes = values.map((value) => new ListNode(value));

  for (let index = 0; index < nodes.length - 1; index++) {
    nodes[index].next = nodes[index + 1];
  }

  if (pos >= 0) {
    nodes[nodes.length - 1].next = nodes[pos];
  }

  return nodes[0];
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    head: [3, 2, 0, -4],
    pos: 1,
    expected: true,
  },
  {
    head: [1, 2],
    pos: 0,
    expected: true,
  },
  {
    head: [1],
    pos: -1,
    expected: false,
  },
];

examples.forEach((example, index) => {
  const linkedList = buildLinkedListWithCycle(example.head, example.pos);
  const result = hasCycle(linkedList);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(
    `head = ${JSON.stringify(example.head)}, pos = ${example.pos}`,
  );
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = hasCycle;
