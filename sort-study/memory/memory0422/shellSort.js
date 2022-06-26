const getNextGap = (gap) => Math.floor(gap / 3) + 1
const insertGapSort = (arr, compare, start, gap) => {
  let j, temp;
  const len = arr.length
  start += gap
  while (start < len) {
    j = start
    temp = arr[j]
    while (j >= gap && compare(arr[j - gap], temp) > 0) arr[j] = arr[(j = j - gap)];
    if (j !== start) arr[j] = temp
    start += gap
  }
  return arr
}
const shellSort = (arr, compare) => {
  let gap = getNextGap(arr.length), start = 0
  while (gap > 1) {
    start = 0
    while (start < gap) insertGapSort(arr, compare, start++, gap);
    gap = getNextGap(gap)
  }
  return insertGapSort(arr, compare, 0, 1)
}
// console.log(insertGapSort([2, 3, 1, 2, 3], (a, b) => a - b, 0, 1))
module.exports = shellSort