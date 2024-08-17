/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  let max = Number.MIN_SAFE_INTEGER;
  if (numbers.length == 0) return undefined;
  for (let ele of numbers) {
    max = Math.max(max, ele);
  }
  return max;
}

module.exports = findLargestElement;
