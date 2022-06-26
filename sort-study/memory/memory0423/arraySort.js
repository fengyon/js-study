const insertSort = (arr, compare) => {
  let i = 1, j, temp
  while (i < arr.length) {
    j = i
    temp = arr[i]
    while (j > 0 && compare(arr[j - 1], temp) > 0) arr[j] = arr[--j]
    if (i !== j) arr[j] = temp
    i++
  }
  return arr
}
const mergeSort = (merges, compare, arr1, arr2) => {
  let i = 0, j = 0
  while (i < arr1.length || j < arr2.length) {
    merges[i + j] = (i < arr1.length && j < arr2.length)
      ? compare(arr1[i], arr2[j]) > 0
        ? arr2[j++] : arr1[i++]
      : (i < arr1.length && arr1[i++])
      || (j < arr2.length && arr2[j++])
  }
  return merges
}
const arraySort = (arr, compare) => {
  const mid = Math.floor(arr.length / 2)
  return mid < 8
    ? insertSort(arr, compare)
    : mergeSort(
      arr,
      compare,
      arraySort(arr.slice(0, mid), compare),
      arraySort(arr.slice(mid), compare)
    )
}
module.exports = arraySort