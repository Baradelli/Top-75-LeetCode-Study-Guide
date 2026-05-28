/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const groups = new Map();

  for (let i = 0; i < strs.length; i++) {
    const sortedWord = strs[i].split("").sort().join("");

    if (!groups.has(sortedWord)) {
      groups.set(sortedWord, [strs[i]]);
    } else {
      groups.get(sortedWord).push(strs[i]);
    }
  }

  return Array.from(groups.values());
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

function normalizeGroups(groups) {
  return groups
    .map((group) => [...group].sort())
    .sort((a, b) => a.join("|").localeCompare(b.join("|")));
}

function areGroupsEqual(first, second) {
  return (
    JSON.stringify(normalizeGroups(first)) ===
    JSON.stringify(normalizeGroups(second))
  );
}

const examples = [
  {
    strs: ["eat", "tea", "tan", "ate", "nat", "bat"],
    expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
  },
  {
    strs: [""],
    expected: [[""]],
  },
  {
    strs: ["a"],
    expected: [["a"]],
  },
];

examples.forEach((example, index) => {
  const result = groupAnagrams(example.strs);
  const isCorrect = areGroupsEqual(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`strs = ${JSON.stringify(example.strs)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected,
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = groupAnagrams;
