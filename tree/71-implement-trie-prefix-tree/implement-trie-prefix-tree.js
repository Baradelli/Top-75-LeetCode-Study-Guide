var Trie = function () {
  this.root = { children: new Array(26).fill(null), endOfWord: false };
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let current = this.root;

  for (const character of word) {
    const index = character.charCodeAt(0) - 97;

    if (current.children[index] === null) {
      current.children[index] = {
        children: new Array(26).fill(null),
        endOfWord: false,
      };
    }

    current = current.children[index];
  }

  current.endOfWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let current = this.root;

  for (const character of word) {
    const index = character.charCodeAt(0) - 97;

    if (current.children[index] === null) {
      return false;
    }

    current = current.children[index];
  }

  return current.endOfWord;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let current = this.root;

  for (const character of prefix) {
    const index = character.charCodeAt(0) - 97;

    if (current.children[index] === null) {
      return false;
    }

    current = current.children[index];
  }

  return true;
};

function runOperations(operations, values) {
  let trie = null;

  return operations.map((operation, index) => {
    if (operation === "Trie") {
      trie = new Trie();
      return null;
    }

    const value = values[index][0];

    if (operation === "insert") {
      trie.insert(value);
      return null;
    }

    if (operation === "search") {
      return trie.search(value);
    }

    return trie.startsWith(value);
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
      "Trie",
      "insert",
      "search",
      "search",
      "startsWith",
      "insert",
      "search",
    ],
    values: [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]],
    expected: [null, null, true, false, true, null, true],
  },
  {
    operations: ["Trie", "insert", "insert", "search", "startsWith"],
    values: [[], ["cat"], ["car"], ["cap"], ["ca"]],
    expected: [null, null, null, false, true],
  },
  {
    operations: ["Trie", "insert", "search", "startsWith", "search"],
    values: [[], ["hello"], ["hello"], ["hell"], ["hell"]],
    expected: [null, null, true, true, false],
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

module.exports = Trie;
