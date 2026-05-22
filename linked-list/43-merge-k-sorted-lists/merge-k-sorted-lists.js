function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var mergeKLists = function (lists) {
  if (lists.length === 0) {
    return null;
  }

  while (lists.length > 1) {
    const mergedLists = [];

    for (let index = 0; index < lists.length; index += 2) {
      const firstList = lists[index];
      const secondList = index + 1 < lists.length ? lists[index + 1] : null;
      mergedLists.push(mergeTwoLists(firstList, secondList));
    }

    lists = mergedLists;
  }

  return lists[0];
};

function mergeTwoLists(list1, list2) {
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
}

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
    lists: [[1, 4, 5], [1, 3, 4], [2, 6]],
    expected: [1, 1, 2, 3, 4, 4, 5, 6],
  },
  {
    lists: [],
    expected: [],
  },
  {
    lists: [[]],
    expected: [],
  },
];

examples.forEach((example, index) => {
  const linkedLists = example.lists.map((list) => buildLinkedList(list));
  const mergedList = mergeKLists(linkedLists);
  const result = linkedListToArray(mergedList);
  const isCorrect = JSON.stringify(result) === JSON.stringify(example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`lists = ${JSON.stringify(example.lists)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = mergeKLists;
