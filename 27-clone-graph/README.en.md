# Clone Graph

Problem link:
https://leetcode.com/problems/clone-graph/

## The problem

Given a starting node from an undirected graph, we need to create a full copy of that graph.

This copy must be deep.

That means:

- the values must be the same
- the connections must be the same
- the cloned nodes cannot be the same original objects

## How the solution works

This solution uses depth-first search with a `Map`.

We create:

```js
oldToNew
```

This map stores the relation between:

- the original node
- the cloned node

When we visit a node:

1. if it was already cloned, we reuse the copy
2. if it was not cloned yet, we create a new node
3. then we recursively clone all neighbors

In the code:

```js
if (oldToNew.has(currentNode)) {
  return oldToNew.get(currentNode);
}
```

This avoids infinite loops in graphs with cycles.

## Quick example

If:

```js
adjList = [[2,4],[1,3],[2,4],[1,3]]
```

This represents a graph with 4 nodes where each node points to its neighbors.

The created copy must have the same adjacency list:

```js
[[2,4],[1,3],[2,4],[1,3]]
```

## Results for the examples

### Example 1

```js
adjList = [[2,4],[1,3],[2,4],[1,3]]
result = [[2,4],[1,3],[2,4],[1,3]]
```

### Example 2

```js
adjList = [[]]
result = [[]]
```

### Example 3

```js
adjList = []
result = []
```

## Complexity

- Time: `O(V + E)`
- Space: `O(V)`

Where:

- `V` is the number of nodes
- `E` is the number of edges

## Summary

This solution traverses the graph once and uses a map to guarantee that each node is cloned only one time.
