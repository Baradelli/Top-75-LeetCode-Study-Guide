var foreignDictionary = function (words) {
  const adjacencyList = {};

  for (const word of words) {
    for (const char of word) {
      adjacencyList[char] = adjacencyList[char] || new Set();
    }
  }

  for (let index = 0; index < words.length - 1; index++) {
    const firstWord = words[index];
    const secondWord = words[index + 1];
    const minLength = Math.min(firstWord.length, secondWord.length);

    if (
      firstWord.length > secondWord.length &&
      firstWord.slice(0, minLength) === secondWord.slice(0, minLength)
    ) {
      return "";
    }

    for (let charIndex = 0; charIndex < minLength; charIndex++) {
      if (firstWord[charIndex] !== secondWord[charIndex]) {
        adjacencyList[firstWord[charIndex]].add(secondWord[charIndex]);
        break;
      }
    }
  }

  const visitState = {};
  const order = [];

  function dfs(char) {
    if (char in visitState) {
      return visitState[char];
    }

    visitState[char] = true;

    for (const neighbor of adjacencyList[char]) {
      if (dfs(neighbor)) {
        return true;
      }
    }

    visitState[char] = false;
    order.push(char);

    return false;
  }

  for (const char in adjacencyList) {
    if (dfs(char)) {
      return "";
    }
  }

  order.reverse();
  return order.join("");
};

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    words: ["z", "o"],
    expected: "zo",
  },
  {
    words: ["hrn", "hrf", "er", "enn", "rfnn"],
    expected: "hernf",
  },
  {
    words: ["abc", "ab"],
    expected: "",
  },
];

examples.forEach((example, index) => {
  const result = foreignDictionary(example.words);
  const isCorrect = result === example.expected;
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`words = ${JSON.stringify(example.words)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(example.expected)} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = foreignDictionary;
