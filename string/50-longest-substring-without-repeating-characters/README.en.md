# Longest Substring Without Repeating Characters

Problem link:
https://leetcode.com/problems/longest-substring-without-repeating-characters/

## The problem

We receive a string `s`.

We need to find the length of the longest substring without repeated characters.

Important: a substring must be a contiguous part of the string.

## How the solution works

The solution uses a sliding window with two pointers:

- `left`
- `right`

We also use a `Set` to store the characters currently inside the window.

While the character on the right is already in the `Set`, we remove characters from the left until the window has only unique letters again.

Then we update the maximum length found so far.

## Quick example

If:

```js
s = "abcabcbb"
```

The result should be:

```js
3
```

Because one valid substring is `"abc"`.

## Results for the examples

### Example 1

```js
s = "abcabcbb"
result = 3
```

### Example 2

```js
s = "bbbbb"
result = 1
```

### Example 3

```js
s = "pwwkew"
result = 3
```

## Complexity

- Time: `O(n)`
- Space: `O(k)`, where `k` is the number of unique characters in the window

## Summary

This solution keeps a window with unique characters and moves its left side whenever a repetition appears. That lets us find the longest valid substring in a single pass through the string.
