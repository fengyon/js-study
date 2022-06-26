const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
const moveMaxToTop = (arr, compare, top, end) => {
  let child = top * 2 + 1
  while (child < end) {
    // 找出最大的子节点
    if (child + 1 < end && compare(arr[child], arr[child + 1]) < 0) child++
    if (compare(arr[top], arr[child]) < 0) {
      swap(arr, top, child)
      top = child
      child = 2 * top + 1
    } else {
      break
    }
  }
  return arr
}
const transToMaxHeap = (arr, compare) => {
  let top = Math.floor(arr.length / 2), len = arr.length
  while (top > -1) moveMaxToTop(arr, compare, top--, len)
  return arr
}
const sortMaxHeap = (maxHeap, compare) => {
  let end = maxHeap.length - 1
  while (end > 0) {
    swap(maxHeap, 0, end)
    moveMaxToTop(maxHeap, compare, 0, end--)
  }
  return maxHeap
}
const heapSort = (arr, compare) => sortMaxHeap(
  transToMaxHeap(arr, compare),
  compare
)
module.exports = heapSort
