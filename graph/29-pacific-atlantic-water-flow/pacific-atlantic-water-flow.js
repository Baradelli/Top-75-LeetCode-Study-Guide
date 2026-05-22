var pacificAtlantic = function (heights) {
  const ROWS = heights.length;
  const COLS = heights[0].length;

  const pacific = new Set();
  const atlantic = new Set();

  function getKey(row, col) {
    return `${row},${col}`;
  }

  function dfs(row, col, visited, previousHeight) {
    if (row < 0 || col < 0 || row >= ROWS || col >= COLS) {
      return;
    }

    const key = getKey(row, col);

    if (visited.has(key)) {
      return;
    }

    if (heights[row][col] < previousHeight) {
      return;
    }

    visited.add(key);

    const currentHeight = heights[row][col];

    dfs(row + 1, col, visited, currentHeight);
    dfs(row - 1, col, visited, currentHeight);
    dfs(row, col + 1, visited, currentHeight);
    dfs(row, col - 1, visited, currentHeight);
  }

  for (let col = 0; col < COLS; col++) {
    dfs(0, col, pacific, heights[0][col]);
    dfs(ROWS - 1, col, atlantic, heights[ROWS - 1][col]);
  }

  for (let row = 0; row < ROWS; row++) {
    dfs(row, 0, pacific, heights[row][0]);
    dfs(row, COLS - 1, atlantic, heights[row][COLS - 1]);
  }

  const result = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = getKey(row, col);

      if (pacific.has(key) && atlantic.has(key)) {
        result.push([row, col]);
      }
    }
  }

  return result;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

function normalizeCoordinates(coordinates) {
  return coordinates
    .map((coordinate) => [...coordinate])
    .sort((a, b) => {
      if (a[0] !== b[0]) {
        return a[0] - b[0];
      }

      return a[1] - b[1];
    });
}

function coordinatesMatch(result, expected) {
  return (
    JSON.stringify(normalizeCoordinates(result)) ===
    JSON.stringify(normalizeCoordinates(expected))
  );
}

const examples = [
  {
    heights: [
      [1, 2, 2, 3, 5],
      [3, 2, 3, 4, 4],
      [2, 4, 5, 3, 1],
      [6, 7, 1, 4, 5],
      [5, 1, 1, 2, 4],
    ],
    expected: [
      [0, 4],
      [1, 3],
      [1, 4],
      [2, 2],
      [3, 0],
      [3, 1],
      [4, 0],
    ],
  },
  {
    heights: [[1]],
    expected: [[0, 0]],
  },
  {
    heights: [
      [3, 3, 3],
      [3, 1, 3],
      [3, 3, 3],
    ],
    expected: [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ],
  },
];

examples.forEach((example, index) => {
  const result = pacificAtlantic(example.heights);
  const isCorrect = coordinatesMatch(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`heights = ${JSON.stringify(example.heights)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = pacificAtlantic;
