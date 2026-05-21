# Alien Dictionary

Problem link:
https://leetcode.com/problems/alien-dictionary/

## The problem

We receive a list `words` already sorted according to the alphabet of an unknown language.

We need to find a valid order of the letters.

If the order is impossible, the result must be an empty string.

## How the solution works

The solution builds a graph between letters.

When two neighboring words differ for the first time, that difference tells us which letter must come before the other.

Example:

```js
"hrn" and "hrf"
```

Show that:

```js
"n" comes before "f"
```

After that, the solution uses DFS to perform a topological sort.

If during DFS a letter points back to one that is already in the current path, there is a cycle and the answer is invalid.

It also handles the case where a longer word appears before its own prefix, such as `["abc", "ab"]`.

## Quick example

If:

```js
words = ["z", "o"]
```

Then we know:

```js
"z" comes before "o"
```

Result:

```js
"zo"
```

## Results for the examples

### Example 1

```js
words = ["z", "o"]
result = "zo"
```

### Example 2

```js
words = ["hrn", "hrf", "er", "enn", "rfnn"]
result = "hernf"
```

### Example 3

```js
words = ["abc", "ab"]
result = ""
```

## Complexity

- Time: `O(C)`
- Space: `O(C)`

`C` represents the total number of characters used to build the graph and traverse the relations.

## Summary

This solution compares neighboring words to discover letter relations and then uses DFS with topological sorting to build a valid alphabet order.
