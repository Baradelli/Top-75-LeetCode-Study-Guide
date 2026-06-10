# Design Add and Search Words Data Structure

Problem link:
https://leetcode.com/problems/design-add-and-search-words-data-structure/

## The problem

We need to create a data structure that supports adding words and searching words later.

The search can also use the `.` character.

This dot works as a wildcard and can represent any letter.

## How the solution works

The solution uses a Trie.

Each added word creates a path of letters inside the tree.

When the search finds a normal letter, it follows only that path.

When the search finds `.`, it tries all possible children from that node using DFS.

If any path reaches the end of a valid word, the search returns `true`.

## Quick example

If:

```js
addWord("bad")
addWord("dad")
addWord("mad")
search(".ad")
search("b..")
```

The result is:

```js
true
true
```

The `.` can match any letter.

## Results for the examples

### Example 1

```js
operations = ["WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search"]
values = [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]]
result = [null, null, null, null, false, true, true, true]
```

### Example 2

```js
operations = ["WordDictionary", "addWord", "search", "search", "search"]
values = [[], ["code"], ["code"], ["co.e"], ["c..e"]]
result = [null, null, true, true, true]
```

### Example 3

```js
operations = ["WordDictionary", "addWord", "addWord", "search", "search"]
values = [[], ["at"], ["and"], ["a."], ["an."]]
result = [null, null, null, true, true]
```

## Complexity

- Time: `O(n)` to add a word
- Time: up to `O(26^d * n)` to search with wildcards
- Space: `O(n)` for the inserted words

Where `n` is the word length and `d` is the number of `.` characters in the search.

## Summary

This solution combines a Trie with DFS to support searches with exact letters and wildcards.
