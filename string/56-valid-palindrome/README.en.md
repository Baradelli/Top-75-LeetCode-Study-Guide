# Valid Palindrome

Problem link:
https://leetcode.com/problems/valid-palindrome/

## The problem

We receive a string `s`.

We need to check whether it is a palindrome after removing non-alphanumeric characters and converting everything to lowercase.

A palindrome reads the same from left to right and from right to left.

## How the solution works

The solution creates a new clean string.

We scan `s` and keep only alphanumeric characters.

Each kept character is converted to lowercase.

At the end, we compare the clean string with its reversed version.

## Quick example

If:

```js
s = "A man, a plan, a canal: Panama"
```

The clean string becomes:

```js
"amanaplanacanalpanama"
```

The result should be:

```js
true
```

## Results for the examples

### Example 1

```js
s = "A man, a plan, a canal: Panama"
result = true
```

### Example 2

```js
s = "race a car"
result = false
```

### Example 3

```js
s = " "
result = true
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`, because of the clean string and the reversed string

## Summary

This solution normalizes the phrase by removing symbols and ignoring uppercase/lowercase differences. Then it compares the clean text with its reversed version.
