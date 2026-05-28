# Longest Repeating Character Replacement

Problem link:
https://leetcode.com/problems/longest-repeating-character-replacement/

## The problem

We receive a string `s` with uppercase letters and a number `k`.

We can replace at most `k` characters with any other uppercase letter.

We need to return the length of the longest substring that can be made of one repeated letter after those replacements.

## How the solution works

The solution uses a sliding window.

We store how many times each letter appears in the current window and also the highest frequency found inside it.

If the window size minus that highest frequency is greater than `k`, we would need too many replacements. In that case, we move the left side of the window.

While the window is valid, we update the longest size found so far.

## Quick example

If:

```js
s = "ABAB"
k = 2
```

The result should be:

```js
4
```

Because we can replace two letters and make the whole substring contain the same letter.

## Results for the examples

### Example 1

```js
s = "ABAB"
k = 2
result = 4
```

### Example 2

```js
s = "AABABBA"
k = 1
result = 4
```

### Example 3

```js
s = "AAAA"
k = 0
result = 4
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`, because the problem only uses uppercase English letters

## Summary

This solution keeps a window that can be turned into a substring of equal letters using at most `k` replacements. That lets us find the longest possible length in a single pass through the string.
