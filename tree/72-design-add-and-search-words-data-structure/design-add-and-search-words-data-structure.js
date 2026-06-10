var WordDictionary = function () {
  this.root = { children: new Array(26).fill(null), word: false };
};

/**
 * @param {string} character
 * @return {number}
 */
WordDictionary.prototype.getIndex = function (character) {
  return character.charCodeAt(0) - 97;
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let current = this.root;

  for (const character of word) {
    const index = this.getIndex(character);

    if (current.children[index] === null) {
      current.children[index] = {
        children: new Array(26).fill(null),
        word: false,
      };
    }

    current = current.children[index];
  }

  current.word = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  return this.dfs(word, 0, this.root);
};

/**
 * @param {string} word
 * @param {number} start
 * @param {Object} root
 * @return {boolean}
 */
WordDictionary.prototype.dfs = function (word, start, root) {
  let current = root;

  for (let index = start; index < word.length; index += 1) {
    const character = word[index];

    if (character === ".") {
      for (const child of current.children) {
        if (child !== null && this.dfs(word, index + 1, child)) {
          return true;
        }
      }

      return false;
    }

    const childIndex = this.getIndex(character);

    if (current.children[childIndex] === null) {
      return false;
    }

    current = current.children[childIndex];
  }

  return current.word;
};

function runOperations(operations, values) {
  let dictionary = null;

  return operations.map((operation, index) => {
    if (operation === "WordDictionary") {
      dictionary = new WordDictionary();
      return null;
    }

    const value = values[index][0];

    if (operation === "addWord") {
      dictionary.addWord(value);
      return null;
    }

    return dictionary.search(value);
  });
}

function arraysAreEqual(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const examples = [
  {
    operations: [
      "WordDictionary",
      "addWord",
      "addWord",
      "addWord",
      "search",
      "search",
      "search",
      "search",
    ],
    values: [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]],
    expected: [null, null, null, null, false, true, true, true],
  },
  {
    operations: ["WordDictionary", "addWord", "search", "search", "search"],
    values: [[], ["code"], ["code"], ["co.e"], ["c..e"]],
    expected: [null, null, true, true, true],
  },
  {
    operations: ["WordDictionary", "addWord", "addWord", "search", "search"],
    values: [[], ["at"], ["and"], ["a."], ["an."]],
    expected: [null, null, null, true, true],
  },
];

examples.forEach((example, index) => {
  const result = runOperations(example.operations, example.values);
  const isCorrect = arraysAreEqual(result, example.expected);
  const color = isCorrect ? GREEN : RED;
  const status = isCorrect ? "CORRECT" : "WRONG";

  console.log(`Example ${index + 1}:`);
  console.log(`operations = ${JSON.stringify(example.operations)}`);
  console.log(`values = ${JSON.stringify(example.values)}`);
  console.log(
    `${color}result = ${JSON.stringify(result)} | expected = ${JSON.stringify(
      example.expected,
    )} | ${status}${RESET}`,
  );
  console.log("---");
});

module.exports = WordDictionary;
