"use client";

import TracePlayer from "./TracePlayer";
import TwoSumVisualizer from "./visualizers/TwoSumVisualizer";

const PYTHON_CODE = `def two_sum(nums, target):
    seen = {}
    for i in range(len(nums)):
        complement = target - nums[i]
        if complement in seen:
            return [seen[complement], i]
        seen[nums[i]] = i
    return []

resultado = two_sum([2, 7, 11, 15], 9)
print(resultado)`;

const JAVASCRIPT_CODE = `function twoSum(nums, target) {
  var seen = {};
  for (var i = 0; i < nums.length; i++) {
    var complement = target - nums[i];
    if (seen[complement] !== undefined) {
      return [seen[complement], i];
    }
    seen[nums[i]] = i;
  }
  return [];
}

var resultado = twoSum([2, 7, 11, 15], 9);
console.log(resultado);`;

/**
 * POC do trace & replay: two-sum executando de verdade no navegador,
 * com visualização do array, do ponteiro e do hash map passo a passo.
 */
export default function TwoSumDemo() {
  return (
    <TracePlayer
      python={PYTHON_CODE}
      javascript={JAVASCRIPT_CODE}
      visualizer={TwoSumVisualizer}
    />
  );
}
