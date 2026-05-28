# Valid Parentheses

Problem link:
https://leetcode.com/problems/valid-parentheses/

## The problem

We receive a string `s` containing only parentheses, brackets, and braces.

We need to check whether every opening symbol is closed by the same type of symbol and in the correct order.

## How the solution works

The solution uses a stack.

When we find an opening symbol, we push it onto the stack.

When we find a closing symbol, it must match the last opening symbol.

If it does not match, the string is invalid. At the end, the stack must be empty.

## Quick example

If:

```js
s = "([])"
```

The result should be:

```js
true
```

Because `[` closes before `(`, respecting the correct order.

## Results for the examples

### Example 1

```js
s = "()"
result = true
```

### Example 2

```js
s = "()[]{}"
result = true
```

### Example 3

```js
s = "(]"
result = false
```

### Example 4

```js
s = "([])"
result = true
```

### Example 5

```js
s = "([)]"
result = false
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`, in the worst case, when all symbols are opening symbols

## Summary

This solution uses a stack to ensure each closing symbol matches the latest opening symbol. This pattern is ideal for validating well-formed pairs.
