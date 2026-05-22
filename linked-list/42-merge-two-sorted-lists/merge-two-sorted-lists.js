function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode();
  let tail = dummy;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }

    tail = tail.next;
  }

  if (list1) {
    tail.next = list1;
  } else if (list2) {
    tail.next = list2;
  }

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
    list1: [1, 2, 4],
    list2: [1, 3, 4],
    expected: [1, 1, 2, 3, 4, 4],
  },
  {
    list1: [],
    list2: [],
    expected: [],
  },
  {
    list1: [],
    list2: [0],
    expected: [0],
  },
];

examples.forEach((example, index) => {
  const firstList = buildLinkedList(example.list1);
  const secondList = buildLinkedList(example.list2);
  const mergedList = mergeTwoLists(firstList, secondList);
  const result = linkedListToArray(mergedList);
  const isCorrect = JSON.stringify(result) === JSON.stringify(example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(
    `list1 = ${JSON.stringify(example.list1)}, list2 = ${JSON.stringify(example.list2)}`,
  );
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = mergeTwoLists;
