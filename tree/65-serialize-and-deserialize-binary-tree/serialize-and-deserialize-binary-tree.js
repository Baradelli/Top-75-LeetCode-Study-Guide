function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  const result = [];

  function dfs(node, result) {
    if (node === null) {
      result.push("N");
      return;
    }

    result.push(node.val.toString());

    dfs(node.left, result);
    dfs(node.right, result);
  }

  dfs(root, result);
  return result.join(",");
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const values = data.split(",");
  const index = { value: 0 };

  function dfs(values, index) {
    if (values[index.value] === "N") {
      index.value += 1;
      return null;
    }

    const node = new TreeNode(Number(values[index.value]));

    index.value += 1;
    node.left = dfs(values, index);
    node.right = dfs(values, index);

    return node;
  }

  return dfs(values, index);
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
    root: [1, 2, 3, null, null, 4, 5],
    expected: [1, 2, 3, null, null, 4, 5],
  },
  {
    root: [],
    expected: [],
  },
  {
    root: [1, -2, 3],
    expected: [1, -2, 3],
  },
];

examples.forEach((example, index) => {
  const tree = buildTree(example.root);
  const serialized = serialize(tree);
  const result = treeToArray(deserialize(serialized));
  const isCorrect = arraysAreEqual(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`root = ${JSON.stringify(example.root)}`);
  console.log(`serialized = ${serialized}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected,
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = { serialize, deserialize };
