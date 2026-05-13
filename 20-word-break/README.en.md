# Word Break

Problem link:
https://leetcode.com/problems/word-break/

## The problem

Given a string `s` and an array `wordDict`, we need to determine whether the string can be split into words that exist in the dictionary.

Words may be reused as many times as needed.

## How the solution works

This solution uses dynamic programming.

We create an array `dp` where:

```js
dp[i]
```

indicates whether the part of the string that starts at `i` can be formed using words from the dictionary.

We start with:

```js
dp[s.length] = true
```

because the empty string at the end is already correctly formed.

Then we move through the string from right to left. For each position, we test all words:

```js
if (i + word.length <= s.length && s.slice(i, i + word.length) === word) {
  dp[i] = dp[i + word.length];
}
```

If the word fits at the current position and the rest of the string can also be formed, then `dp[i]` becomes `true`.

## Quick example

If:

```js
s = "leetcode"
wordDict = ["leet", "code"]
```

We can split the string like this:

```js
"leet" + "code"
```

Result:

```js
true
```

## Results for the examples

### Example 1

```js
s = "leetcode"
wordDict = ["leet", "code"]
result = true
```

### Example 2

```js
s = "applepenapple"
wordDict = ["apple", "pen"]
result = true
```

### Example 3

```js
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
result = false
```

## Complexity

- Time: `O(n * numberOfWords * averageWordLength)`
- Space: `O(n)`

## Summary

This solution checks, for each position in the string, whether there is a word that fits there and leaves a valid remainder. That avoids testing the same parts many times.
