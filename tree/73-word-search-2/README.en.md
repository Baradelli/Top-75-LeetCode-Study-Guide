# Word Search II

Problem link:
https://leetcode.com/problems/word-search-ii/

## The problem

We receive a board of letters and a list of words.

We need to return all words from the list that can be formed on the board.

Letters must be connected horizontally or vertically.

The same cell cannot be used more than once in the same word.

## How the solution works

The solution uses a Trie and DFS.

First, we add all words to a Trie.

Then we start a depth-first search from each cell on the board.

If the current path does not exist in the Trie, we stop that search.

When we find a node marked as a word, we add the word to the result.

The solution also removes paths that no longer need to be visited, which helps reduce repeated searches.

## Quick example

If:

```js
board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
]
words = ["oath", "pea", "eat", "rain"]
```

The result is:

```js
["eat", "oath"]
```

## Results for the examples

### Example 1

```js
words = ["oath", "pea", "eat", "rain"]
result = ["eat", "oath"]
```

### Example 2

```js
words = ["abcb"]
result = []
```

### Example 3

```js
words = ["ab", "cb", "ad", "bd", "ac", "ca"]
result = ["ab", "ac", "bd", "ca"]
```

## Complexity

- Time: `O(m * n * 4^l)`
- Space: `O(w * l)`

Where `m` and `n` are the board dimensions, `w` is the number of words, and `l` is the average word length.

## Summary

This solution uses a Trie to cut impossible searches and DFS to explore valid paths on the board.
