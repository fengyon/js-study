const midFindIndex = (sortedArr, compare) => {
  let l = 0, r = sortedArr.length - 1;
  let mid, result;
  while (l <= r) {
    mid = Math.floor((l + r) / 2)
    result = compare(sortedArr[mid])
    if (result === 0) {
      return mid
    } else if (result < 0) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }
  return -1
}
const getRandomArr = (length) => {
  let arr = []
  while (length-- > 0) {
    arr.push(Math.floor(Math.random() * 1000))
  }
  return arr.sort((a, b) => a - b)
}
const target = Math.floor(Math.random() * 1000)
const arr = getRandomArr(1000)
console.log(midFindIndex(arr, (item) => item - target), target)
console.log((arr.findIndex((item) => item === target)), target)

console.log(arr[midFindIndex(arr, (item) => item - target)], arr[arr.findIndex((item) => item === target)])

console.log(midFindIndex([4, 5, 6, 7, 0, 1, 2], (item) => item - target))
