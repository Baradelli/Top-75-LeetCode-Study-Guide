var countComponents = function (n, edges) {
  const adjacencyList = Array.from({ length: n }, () => []);

  for (const [from, to] of edges) {
    adjacencyList[from].push(to);
    adjacencyList[to].push(from);
  }

  const visited = Array(n).fill(false);

  function dfs(node) {
    for (const neighbor of adjacencyList[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        dfs(neighbor);
      }
    }
  }

  let components = 0;

  for (let node = 0; node < n; node++) {
    if (!visited[node]) {
      visited[node] = true;
      dfs(node);
      components += 1;
    }
  }

  return components;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    n: 5,
    edges: [[0, 1], [1, 2], [3, 4]],
    expected: 2,
  },
  {
    n: 5,
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    expected: 1,
  },
  {
    n: 6,
    edges: [[0, 1], [2, 3], [4, 5]],
    expected: 3,
  },
];

examples.forEach((example, index) => {
  const result = countComponents(example.n, example.edges.map((edge) => [...edge]));
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

module.exports = countComponents;
