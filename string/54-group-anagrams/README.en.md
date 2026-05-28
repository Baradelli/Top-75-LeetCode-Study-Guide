# Group Anagrams

Problem link:
https://leetcode.com/problems/group-anagrams/

## The problem

We receive an array of strings `strs`.

We need to group the words that are anagrams of each other.

The order of the groups and the order of words inside each group do not matter.

## How the solution works

The solution uses a `Map`.

For each word, we sort its letters. This sorted version becomes the group key.

Words that are anagrams have the same key, because they contain the same letters with the same counts.

At the end, we return all groups stored in the map.

## Quick example

If:

```js
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
```

One valid answer is:

```js
[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

Because `"eat"`, `"tea"`, and `"ate"` are anagrams, as are `"tan"` and `"nat"`.

## Results for the examples

### Example 1

```js
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
result = [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

### Example 2

```js
strs = [""]
result = [[""]]
```

### Example 3

```js
strs = ["a"]
result = [["a"]]
```

## Complexity

- Time: `O(n * k log k)`, where `n` is the number of words and `k` is the average word length
- Space: `O(n * k)`, to store the groups

## Summary

This solution turns each word into a sorted key. Words with the same key go into the same anagram group.
