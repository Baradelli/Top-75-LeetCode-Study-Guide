function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

var cloneGraph = function (node) {
  const oldToNew = new Map();

  function dfs(currentNode) {
    if (oldToNew.has(currentNode)) {
      return oldToNew.get(currentNode);
    }

    const copy = new Node(currentNode.val);
    oldToNew.set(currentNode, copy);

    for (const neighbor of currentNode.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return node ? dfs(node) : null;
};

function buildGraph(adjList) {
  if (adjList.length === 0) {
    return null;
  }

  const nodes = adjList.map((_, index) => new Node(index + 1));

  adjList.forEach((neighbors, index) => {
    nodes[index].neighbors = neighbors.map((neighbor) => nodes[neighbor - 1]);
  });

  return nodes[0];
}

function graphToAdjList(node) {
  if (!node) {
    return [];
  }

  const queue = [node];
  const visited = new Set([node]);
  const adjacency = [];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    adjacency[currentNode.val - 1] = currentNode.neighbors.map(
      (neighbor) => neighbor.val,
    );

    for (const neighbor of currentNode.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return adjacency.map((neighbors) => neighbors || []);
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    adjList: [[2, 4], [1, 3], [2, 4], [1, 3]],
    expected: [[2, 4], [1, 3], [2, 4], [1, 3]],
  },
  {
    adjList: [[]],
    expected: [[]],
  },
  {
    adjList: [],
    expected: [],
  },
];

examples.forEach((example, index) => {
  const originalGraph = buildGraph(example.adjList);
  const clonedGraph = cloneGraph(originalGraph);
  const result = graphToAdjList(clonedGraph);
  const sameStructure = JSON.stringify(result) === JSON.stringify(example.expected);
  const deepCopyCheck =
    originalGraph === null || (clonedGraph !== originalGraph && clonedGraph.val === originalGraph.val);
  const isCorrect = sameStructure && deepCopyCheck;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`adjList = ${JSON.stringify(example.adjList)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = cloneGraph;
