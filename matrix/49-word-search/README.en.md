# Word Search

Problem link:
https://leetcode.com/problems/word-search/

## The problem

We receive an `m x n` grid of letters and a word.

We need to check whether that word can be formed using adjacent letters horizontally or vertically.

The same cell cannot be used more than once in the same path.

## How the solution works

The solution tries to start the word from every position in the board.

When it finds a possible starting letter, it uses depth-first search (`DFS`) to continue the word in four directions:

- up
- down
- left
- right

During the search, the solution temporarily marks the current cell with a special character and then restores the original value during backtracking.

If any attempt reaches the end of the word, the answer is `true`.

## Quick example

If:

```js
board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
]
word = "ABCCED"
```

The result should be:

```js
true
```

## Results for the examples

### Example 1

```js
board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
word = "ABCCED"
result = true
```

### Example 2

```js
board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
word = "SEE"
result = true
```

### Example 3

```js
board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
word = "ABCB"
result = false
```

## Complexity

- Time: `O(m * n * 4^L)`, where `L` is the word length
- Space: `O(L)` because of the recursion stack, where `L` is the word length

## Summary

This solution tests possible paths with `DFS` starting from each cell. By marking and restoring the board itself during backtracking, it avoids an extra visited structure and still prevents reusing letters in the same path.
