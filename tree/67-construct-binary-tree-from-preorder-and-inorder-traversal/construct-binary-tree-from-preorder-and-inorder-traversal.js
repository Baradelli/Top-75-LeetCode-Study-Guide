function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null;
  }

  const root = new TreeNode(preorder[0]);
  const mid = inorder.indexOf(preorder[0]);

  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));

  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));

  return root;
};

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
    preorder: [3, 9, 20, 15, 7],
    inorder: [9, 3, 15, 20, 7],
    expected: [3, 9, 20, null, null, 15, 7],
  },
  {
    preorder: [-1],
    inorder: [-1],
    expected: [-1],
  },
  {
    preorder: [1, 2],
    inorder: [2, 1],
    expected: [1, 2],
  },
];

examples.forEach((example, index) => {
  const tree = buildTree(example.preorder, example.inorder);
  const result = treeToArray(tree);
  const isCorrect = arraysAreEqual(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`preorder = ${JSON.stringify(example.preorder)}`);
  console.log(`inorder = ${JSON.stringify(example.inorder)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected,
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = buildTree;
