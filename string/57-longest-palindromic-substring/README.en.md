# Longest Palindromic Substring

Problem link:
https://leetcode.com/problems/longest-palindromic-substring/

## The problem

We receive a string `s`.

We need to return the longest substring of `s` that is a palindrome.

A substring must be a contiguous part of the string.

## How the solution works

The solution tests each position as the center of a palindrome.

For each index, we expand to both sides looking for odd-length palindromes.

We also test the center between two characters to find even-length palindromes.

Every time we find a longer palindrome, we save its start index and length.

## Quick example

If:

```js
s = "babad"
```

One valid answer is:

```js
"bab"
```

`"aba"` would also be a valid answer.

## Results for the examples

### Example 1

```js
s = "babad"
result = "bab" or "aba"
```

### Example 2

```js
s = "cbbd"
result = "bb"
```

### Example 3

```js
s = "a"
result = "a"
```

## Complexity

- Time: `O(n²)`
- Space: `O(1)`

## Summary

This solution expands from each possible center. That finds both even and odd palindromes without generating every substring.
