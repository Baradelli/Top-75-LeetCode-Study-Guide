# Decode Ways

Problem link:
https://leetcode.com/problems/decode-ways/

## The problem

Given a string `s` containing digits, we need to find how many different ways it can be decoded.

The mapping is:

- `"1"` -> `A`
- `"2"` -> `B`
- ...
- `"26"` -> `Z`

Not every sequence is valid. For example, values with a leading zero, such as `"06"`, cannot be decoded.

## How the solution works

This solution uses recursion with memoization.

We create a function `dfs(index)` that answers:

```js
how many ways exist to decode the string starting at index
```

We also use `dp` to store results that were already computed and avoid repetition.

If the current character is `"0"`, the answer is `0`, because there is no letter for it alone.

At each position, we try:

1. decoding one digit
2. decoding two digits, when the formed number is between `10` and `26`

In the code, the two-digit check is:

```js
s[index] === "1" || (s[index] === "2" && "0123456".includes(s[index + 1]))
```

## Quick example

If:

```js
s = "12"
```

The possible decodings are:

```js
"1" + "2" -> "AB"
"12" -> "L"
```

Result:

```js
2
```

## Results for the examples

### Example 1

```js
s = "12"
result = 2
```

### Example 2

```js
s = "226"
result = 3
```

### Example 3

```js
s = "06"
result = 0
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Summary

This solution breaks the problem into smaller suffixes of the string and stores each computed answer. That way, each position is solved only once.
