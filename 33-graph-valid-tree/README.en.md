# Graph Valid Tree

Problem link:
https://leetcode.com/problems/graph-valid-tree/

## The problem

We receive `n` nodes numbered from `0` to `n - 1`.

We also receive an `edges` array with the connections between those nodes.

We need to check whether this graph forms a valid tree.

A valid tree must satisfy two conditions:

- it cannot have a cycle
- all nodes must be connected

## How the solution works

The solution starts with an important rule:

```js
edges.length === n - 1
```

If that is not true, we can already return `false`.

Then we build an adjacency list to represent the graph and use DFS.

During the search, we store visited nodes in a `Set`.

If DFS finds a node that was already visited and it is not the current parent, then a cycle exists.

At the end, besides having no cycle, the size of `visited` must be equal to `n`.

This guarantees that the whole graph is connected.

## Quick example

If:

```js
n = 5
edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
```

We have 5 nodes and 4 edges, no cycle, and all nodes are reachable.

So the result is:

```js
true
```

## Results for the examples

### Example 1

```js
n = 5
edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
result = true
```

### Example 2

```js
n = 5
edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
result = false
```

### Example 3

```js
n = 4
edges = [[0, 1], [2, 3], [1, 2]]
result = true
```

## Complexity

- Time: `O(n + numberOfEdges)`
- Space: `O(n + numberOfEdges)`

## Summary

This solution first checks whether the number of edges is valid. Then it uses DFS to confirm there is no cycle and that all nodes belong to the same connected component.
