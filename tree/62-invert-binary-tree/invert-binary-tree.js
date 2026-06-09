function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root === null) return null;

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
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

function treeToArray(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === null) {
      result.push(null);
      continue;
    }

    result.push(current.val);
    queue.push(current.left);
    queue.push(current.right);
  }

  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

function arraysAreEqual(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    root: [4, 2, 7, 1, 3, 6, 9],
    expected: [4, 7, 2, 9, 6, 3, 1],
  },
  {
    root: [2, 1, 3],
    expected: [2, 3, 1],
  },
  {
    root: [],
    expected: [],
  },
];

examples.forEach((example, index) => {
  const tree = buildTree(example.root);
  const result = treeToArray(invertTree(tree));
  const isCorrect = arraysAreEqual(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`root = ${JSON.stringify(example.root)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected,
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = invertTree;
