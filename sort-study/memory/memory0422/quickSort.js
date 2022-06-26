const sortOnce = (arr, compare, low, high) => {
  const left = low, right = high, temp = arr[low];
  while (low < high) {
    while (low < high && compare(temp, arr[high]) <= 0) high--;
    arr[low] = arr[high]
    while (low < high && compare(temp, arr[low]) >= 0) low++;
    arr[high] = arr[low]
  }
  if (low !== left) arr[low] = temp;
  left < low - 1 && sortOnce(arr, compare, left, low - 1)
  low + 1 < right && sortOnce(arr, compare, low + 1, right)
  return arr
}
const quickSort = (arr, compare) => sortOnce(arr, compare, 0, arr.length - 1)
module.exports = quickSort