function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  const stack = [];
  let current = root;

  while (stack.length > 0 || current !== null) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    k -= 1;

    if (k === 0) {
      return current.val;
    }

    current = current.right;
  }
};

function buildTree(values) {
  if (values.length === 0 || values[0] === null) return null;

  const root = new TreeNode(values[0]);
  const queue = [root];
  let index = 1;

  while (queue.length > 0 && index < values.length) {
    const current = queue.shift();

    if (values[index] !== null && values[index] !== undefined) {
      current.left = new TreeNode(values[index]);
      queue.push(current.left);
    }

    index += 1;

    if (
      index < values.length &&
      values[index] !== null &&
      values[index] !== undefined
    ) {
      current.right = new TreeNode(values[index]);
      queue.push(current.right);
    }

    index += 1;
  }

  return root;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    root: [3, 1, 4, null, 2],
    k: 1,
    expected: 1,
  },
  {
    root: [5, 3, 6, 2, 4, null, null, 1],
    k: 3,
    expected: 3,
  },
  {
    root: [2, 1],
    k: 2,
    expected: 2,
  },
];

examples.forEach((example, index) => {
  const root = buildTree(example.root);
  const result = kthSmallest(root, example.k);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`root = ${JSON.stringify(example.root)}`);
  console.log(`k = ${example.k}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = kthSmallest;
