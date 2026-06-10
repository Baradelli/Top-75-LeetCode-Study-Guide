# Implement Trie (Prefix Tree)

Problem link:
https://leetcode.com/problems/implement-trie-prefix-tree/

## The problem

We need to implement a Trie, also called a prefix tree.

It must support inserting words, searching complete words, and checking whether any word starts with a prefix.

## How the solution works

The solution creates an empty root.

Each node has an array with 26 positions, one for each letter from `a` to `z`.

When inserting a word, we walk character by character and create missing nodes.

At the end of the word, we mark the node with `endOfWord = true`.

To search a word, we follow its characters and only return `true` if the last node is marked as the end of a word.

To search a prefix, it is enough to walk through all prefix characters.

## Quick example

If:

```js
trie.insert("apple")
trie.search("apple")
trie.search("app")
trie.startsWith("app")
```

The result is:

```js
true
false
true
```

`app` exists as a prefix, but it was not inserted as a complete word yet.

## Results for the examples

### Example 1

```js
operations = ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
values = [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
result = [null, null, true, false, true, null, true]
```

### Example 2

```js
operations = ["Trie", "insert", "insert", "search", "startsWith"]
values = [[], ["cat"], ["car"], ["cap"], ["ca"]]
result = [null, null, null, false, true]
```

### Example 3

```js
operations = ["Trie", "insert", "search", "startsWith", "search"]
values = [[], ["hello"], ["hello"], ["hell"], ["hell"]]
result = [null, null, true, true, false]
```

## Complexity

- Time: `O(n)` per operation
- Space: `O(n)` for the inserted words

Where `n` is the length of the word or prefix used in the operation.

## Summary

This solution uses a prefix tree to share paths between words with the same starting characters.
