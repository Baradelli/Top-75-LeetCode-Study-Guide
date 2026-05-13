var canFinish = function (numCourses, prerequisites) {
  const preMap = {};

  for (let i = 0; i < numCourses; i++) {
    preMap[i] = [];
  }

  for (const [course, prerequisite] of prerequisites) {
    preMap[course].push(prerequisite);
  }

  const visitSet = new Set();

  function dfs(course) {
    if (visitSet.has(course)) {
      return false;
    }

    if (preMap[course].length === 0) {
      return true;
    }

    visitSet.add(course);

    for (const prerequisite of preMap[course]) {
      if (!dfs(prerequisite)) {
        return false;
      }
    }

    visitSet.delete(course);
    preMap[course] = [];

    return true;
  }

  for (let course = 0; course < numCourses; course++) {
    if (!dfs(course)) {
      return false;
    }
  }

  return true;
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    numCourses: 2,
    prerequisites: [[1, 0]],
    expected: true,
  },
  {
    numCourses: 2,
    prerequisites: [[1, 0], [0, 1]],
    expected: false,
  },
  {
    numCourses: 4,
    prerequisites: [[1, 0], [2, 1], [3, 2]],
    expected: true,
  },
];

examples.forEach((example, index) => {
  const result = canFinish(
    example.numCourses,
    example.prerequisites.map((pair) => [...pair]),
  );
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(
    `numCourses = ${example.numCourses}, prerequisites = ${JSON.stringify(example.prerequisites)}`,
  );
  console.log(
    `${color}result = ${result} | expected = ${example.expected} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = canFinish;
