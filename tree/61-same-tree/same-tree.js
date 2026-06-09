function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!p && !q) {
    return true;
  }

  if (p && q && p.val === q.val) {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }

  return false;
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
    p: [1, 2, 3],
    q: [1, 2, 3],
    expected: true,
  },
  {
    p: [1, 2],
    q: [1, null, 2],
    expected: false,
  },
  {
    p: [1, 2, 1],
    q: [1, 1, 2],
    expected: false,
  },
];

examples.forEach((example, index) => {
  const p = buildTree(example.p);
  const q = buildTree(example.q);
  const result = isSameTree(p, q);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`p = ${JSON.stringify(example.p)}`);
  console.log(`q = ${JSON.stringify(example.q)}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = isSameTree;
