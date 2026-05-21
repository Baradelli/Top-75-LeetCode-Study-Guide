# Number of Connected Components in an Undirected Graph

Problem link:
https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/

## The problem

We receive `n` nodes numbered from `0` to `n - 1`.

We also receive an `edges` array with connections between those nodes.

We need to find how many connected components exist in the graph.

A connected component is a group of nodes where every node can reach the others.

## How the solution works

The solution builds an adjacency list to represent the graph.

Then it goes through all nodes.

Whenever it finds a node that has not been visited yet, that means a new component is starting.

At that moment it:

- marks the node as visited
- runs DFS to visit all nodes connected to it
- adds `1` to the answer

This way, each DFS consumes exactly one full component.

## Quick example

If:

```js
n = 5
edges = [[0, 1], [1, 2], [3, 4]]
```

We have two groups:

```js
[0, 1, 2] and [3, 4]
```

So the result is:

```js
2
```

## Results for the examples

### Example 1

```js
n = 5
edges = [[0, 1], [1, 2], [3, 4]]
result = 2
```

### Example 2

```js
n = 5
edges = [[0, 1], [1, 2], [2, 3], [3, 4]]
result = 1
```

### Example 3

```js
n = 6
edges = [[0, 1], [2, 3], [4, 5]]
result = 3
```

## Complexity

- Time: `O(n + numberOfEdges)`
- Space: `O(n + numberOfEdges)`

## Summary

This solution traverses the graph with DFS. Every time it finds a node that has not been visited yet, it identifies one more connected component.
