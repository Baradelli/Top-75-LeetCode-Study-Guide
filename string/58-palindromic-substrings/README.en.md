# Palindromic Substrings

Problem link:
https://leetcode.com/problems/palindromic-substrings/

## The problem

We receive a string `s`.

We need to return how many substrings of `s` are palindromes.

A substring must be a contiguous part of the string.

## How the solution works

The solution tests each position as the center of a palindrome.

For each index, we expand to both sides counting odd-length palindromes.

We also test the center between two characters to count even-length palindromes.

Every time the expansion finds a valid palindrome, we increase the counter.

## Quick example

If:

```js
s = "aaa"
```

The palindromic substrings are:

```js
"a", "a", "a", "aa", "aa", "aaa"
```

The result is:

```js
6
```

## Results for the examples

### Example 1

```js
s = "abc"
result = 3
```

### Example 2

```js
s = "aaa"
result = 6
```

### Example 3

```js
s = "racecar"
result = 10
```

## Complexity

- Time: `O(n²)`
- Space: `O(1)`

## Summary

This solution expands from each possible center. That counts both even and odd palindromes without generating every substring.
