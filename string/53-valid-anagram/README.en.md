# Valid Anagram

Problem link:
https://leetcode.com/problems/valid-anagram/

## The problem

We receive two strings, `s` and `t`.

We need to return `true` if `t` is an anagram of `s`.

An anagram uses exactly the same characters, with the same counts, but possibly in a different order.

## How the solution works

The solution uses a `Map` to count the characters in `s`.

Then we scan `t` and decrease the count for each character found.

If a character does not exist in the map, or its count is already gone, the strings are not anagrams.

At the end, the map must be empty so every character was used the correct number of times.

## Quick example

If:

```js
s = "anagram"
t = "nagaram"
```

The result should be:

```js
true
```

Because both strings have the same letters with the same counts.

## Results for the examples

### Example 1

```js
s = "anagram"
t = "nagaram"
result = true
```

### Example 2

```js
s = "rat"
t = "car"
result = false
```

### Example 3

```js
s = "aacc"
t = "ccac"
result = false
```

## Complexity

- Time: `O(n + m)`, where `n` is the length of `s` and `m` is the length of `t`
- Space: `O(k)`, where `k` is the number of different characters in `s`

## Summary

This solution counts the characters in the first string and tries to consume that count with the second string. If everything matches exactly, the strings are anagrams.
