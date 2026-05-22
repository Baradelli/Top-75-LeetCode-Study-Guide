var validTree = function (n, edges) {
  if (edges.length !== n - 1) {
    return false;
  }

  const adjacencyList = Array.from({ length: n }, () => []);

  for (const [from, to] of edges) {
    adjacencyList[from].push(to);
    adjacencyList[to].push(from);
  }

  const visited = new Set();

  function dfs(node, parent) {
    if (visited.has(node)) {
      return false;
    }

    visited.add(node);

    for (const neighbor of adjacencyList[node]) {
      if (neighbor === parent) {
        continue;
      }

      if (!dfs(neighbor, node)) {
        return false;
      }
    }

    return true;
  }

  return dfs(0, -1) && visited.size === n;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    n: 5,
    edges: [[0, 1], [0, 2], [0, 3], [1, 4]],
    expected: true,
  },
  {
    n: 5,
    edges: [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]],
    expected: false,
  },
  {
    n: 4,
    edges: [[0, 1], [2, 3], [1, 2]],
    expected: true,
  },
];

examples.forEach((example, index) => {
  const result = validTree(example.n, example.edges.map((edge) => [...edge]));
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`n = ${example.n}, edges = ${JSON.stringify(example.edges)}`);
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = validTree;
