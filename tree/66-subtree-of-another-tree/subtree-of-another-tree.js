function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  if (!subRoot) return true;

  if (!root) return false;

  function sameTree(root, subRoot) {
    if (!root && !subRoot) {
      return true;
    }
    if (root && subRoot && root.val === subRoot.val) {
      return (
        sameTree(root.left, subRoot.left) && sameTree(root.right, subRoot.right)
      );
    }
    return false;
  }

  if (sameTree(root, subRoot)) {
    return true;
  }

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
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
    root: [3, 4, 5, 1, 2],
    subRoot: [4, 1, 2],
    expected: true,
  },
  {
    root: [3, 4, 5, 1, 2, null, null, null, null, 0],
    subRoot: [4, 1, 2],
    expected: false,
  },
  {
    root: [1, 1],
    subRoot: [1],
    expected: true,
  },
];

examples.forEach((example, index) => {
  const root = buildTree(example.root);
  const subRoot = buildTree(example.subRoot);
  const result = isSubtree(root, subRoot);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`root = ${JSON.stringify(example.root)}`);
  console.log(`subRoot = ${JSON.stringify(example.subRoot)}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = isSubtree;
