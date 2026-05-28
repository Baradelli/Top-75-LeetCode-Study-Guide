# Minimum Window Substring

Problem link:
https://leetcode.com/problems/minimum-window-substring/

## The problem

We receive two strings, `s` and `t`.

We need to find the smallest substring of `s` that contains all characters from `t`, including repeated characters.

If no substring works, we return an empty string.

## How the solution works

The solution uses a sliding window.

First, we count how many times each character appears in `t`.

Then we scan `s` with a window, expanding the right side until the window contains everything we need.

When the window becomes valid, we try to move the left side to make it smaller. Every time we find a smaller valid window, we save its indexes.

## Quick example

If:

```js
s = "ADOBECODEBANC"
t = "ABC"
```

The result should be:

```js
"BANC"
```

Because `"BANC"` is the smallest substring that contains `A`, `B`, and `C`.

## Results for the examples

### Example 1

```js
s = "ADOBECODEBANC"
t = "ABC"
result = "BANC"
```

### Example 2

```js
s = "a"
t = "a"
result = "a"
```

### Example 3

```js
s = "a"
t = "aa"
result = ""
```

## Complexity

- Time: `O(m + n)`, where `m` is the length of `s` and `n` is the length of `t`
- Space: `O(k)`, where `k` is the number of different characters used in the maps

## Summary

This solution keeps a window that tries to contain all characters from `t`. When the window becomes valid, it shrinks from the left to find the smallest possible answer.
