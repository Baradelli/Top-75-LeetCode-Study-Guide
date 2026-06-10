function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let current = root;

  while (current) {
    if (p.val > current.val && q.val > current.val) {
      current = current.right;
    } else if (p.val < current.val && q.val < current.val) {
      current = current.left;
    } else {
      return current;
    }
  }

  return null;
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

function findNode(root, value) {
  let current = root;

  while (current) {
    if (value === current.val) {
      return current;
    }

    current = value < current.val ? current.left : current.right;
  }

  return null;
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
    p: 2,
    q: 8,
    expected: 6,
  },
  {
    root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
    p: 2,
    q: 4,
    expected: 2,
  },
  {
    root: [2, 1],
    p: 2,
    q: 1,
    expected: 2,
  },
];

examples.forEach((example, index) => {
  const root = buildTree(example.root);
  const p = findNode(root, example.p);
  const q = findNode(root, example.q);
  const result = lowestCommonAncestor(root, p, q);
  const resultValue = result ? result.val : null;
  const isCorrect = resultValue === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`root = ${JSON.stringify(example.root)}`);
  console.log(`p = ${example.p}`);
  console.log(`q = ${example.q}`);
  console.log(
    `${color}result = ${resultValue} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = lowestCommonAncestor;
