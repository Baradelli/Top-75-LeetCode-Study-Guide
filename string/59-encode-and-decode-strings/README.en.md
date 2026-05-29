# Encode and Decode Strings

Problem link:
https://neetcode.io/problems/string-encode-and-decode/question

## The problem

We receive a list of strings `strs`.

We need to turn this list into a single string and later rebuild the original list.

The encoding must work even when strings contain special characters, numbers, `#`, or are empty.

## How the solution works

The solution stores each string together with its length.

For each text, we add:

```js
length + "#" + text
```

When decoding, we read the digits until we find `#`.

That number tells us exactly how many characters belong to the next string.

This way, even if the string contains `#`, the split still works correctly.

## Quick example

If:

```js
strs = ["Hello", "World"]
```

The encoded string becomes:

```js
"5#Hello5#World"
```

After decoding, we get back:

```js
["Hello", "World"]
```

## Results for the examples

### Example 1

```js
strs = ["Hello", "World"]
result = ["Hello", "World"]
```

### Example 2

```js
strs = [""]
result = [""]
```

### Example 3

```js
strs = ["neet", "code#", "4#five", ""]
result = ["neet", "code#", "4#five", ""]
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Summary

This solution uses each string length as a prefix. That makes decoding safe without relying on a separator that could appear inside the text itself.
