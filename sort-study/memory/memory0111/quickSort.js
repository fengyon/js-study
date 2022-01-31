const sortOnce = (arr, compare, low, high) => {
    if (low >= high) return arr;
    const base = arr[low], left = low, right = high;
    while (low < high) {
        while (low < high && compare(base, arr[high]) < 1) high--;
        arr[low] = arr[high];
        while (low < high && compare(base, arr[low]) > -1) low++;
        arr[high] = arr[low];
    }
    if (low !== left) arr[low] = base;
    sortOnce(arr, compare, left, low - 1);
    return sortOnce(arr, compare, low + 1, right);
}
const quickSort = (arr, compare) => sortOnce(arr, compare, 0, arr.length - 1);
module.exports = quickSort;