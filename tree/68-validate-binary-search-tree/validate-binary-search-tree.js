function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const validate = (node, min, max) => {
    if (!node) return true;

    if (node.val <= min || node.val >= max) {
      return false;
    }

    return (
      validate(node.left, min, node.val) &&
      validate(node.right, node.val, max)
    );
  };

  return validate(root, -Infinity, Infinity);
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
    root: [2, 1, 3],
    expected: true,
  },
  {
    root: [5, 1, 4, null, null, 3, 6],
    expected: false,
  },
  {
    root: [5, 4, 6, null, null, 3, 7],
    expected: false,
  },
];

examples.forEach((example, index) => {
  const root = buildTree(example.root);
  const result = isValidBST(root);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`root = ${JSON.stringify(example.root)}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = isValidBST;
