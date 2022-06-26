const getNextGap = (gap) => gap === 1
  ? 0
  : Math.floor(gap / 3) + 1
const insertGapSort = (arr, compare, start, gap) => {
  let temp, j
  start += gap
  while (start < arr.length) {
    j = start
    temp = arr[j]
    while (j >= gap && compare(arr[j - gap], temp) > 0)
      arr[j] = arr[(j = j - gap)];
    if (j !== start) arr[j] = temp
    start += gap
  }
  return arr
}
const shellSort = (arr, compare) => {
  let gap = getNextGap(arr.length), start
  while (gap >= 1) {
    start = 0
    while (start < gap) insertGapSort(arr, compare, start++, gap)
    gap = getNextGap(gap)
  }
  return arr
}
module.exports = shellSort