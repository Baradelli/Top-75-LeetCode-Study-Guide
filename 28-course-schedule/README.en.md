# Course Schedule

Problem link:
https://leetcode.com/problems/course-schedule/

## The problem

We have `numCourses` courses numbered from `0` to `numCourses - 1`.

We also receive an array `prerequisites`, where each pair:

```js
[a, b]
```

means that course `b` must be taken before course `a`.

We need to determine whether it is possible to finish all courses.

## How the solution works

This problem becomes a cycle detection problem in a graph.

If a cycle exists, then some course depends on itself indirectly, and the answer is `false`.

We create:

```js
preMap
```

This object stores the prerequisites for each course.

Then we use DFS.

During the search, `visitSet` marks the courses that are in the current recursion path.

If we try to visit again a course that is already in that path:

```js
if (visitSet.has(course)) {
  return false;
}
```

then we found a cycle.

When a course is validated, we clear its prerequisite list to avoid repeated work.

## Quick example

If:

```js
numCourses = 2
prerequisites = [[1, 0], [0, 1]]
```

This means:

- to take `1`, we need `0`
- to take `0`, we need `1`

There is a cycle, so:

```js
false
```

## Results for the examples

### Example 1

```js
numCourses = 2
prerequisites = [[1, 0]]
result = true
```

### Example 2

```js
numCourses = 2
prerequisites = [[1, 0], [0, 1]]
result = false
```

### Example 3

```js
numCourses = 4
prerequisites = [[1, 0], [2, 1], [3, 2]]
result = true
```

## Complexity

- Time: `O(numCourses + numberOfPrerequisites)`
- Space: `O(numCourses + numberOfPrerequisites)`

## Summary

This solution builds a dependency graph and uses DFS to detect cycles. If there is no cycle, then it is possible to complete all courses.
