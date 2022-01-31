const toSort = (arr, compare, low, high) => {
    if (low >= high) return arr;
    const temp = arr[low], left = low, right = high;
    while (low < high) {
        while (low < high && compare(temp, arr[high]) < 0) high--;
        arr[low] = arr[high];
        while (low < high && compare(temp, arr[low]) > -1) low++;
        arr[high] = arr[low];
    }
    arr[low] = temp;
    // console.log(`left:${left}, low - 1:${low - 1}, low + 1:${low + 1} right:${right}, high:${high}, arr.length:${arr.length}`);
    toSort(arr, compare, left, low - 1);
    return toSort(arr, compare, low + 1, right);
}
const quickSort = (arr, compare) => {
    return toSort(arr, compare, 0, arr.length - 1)
};
module.exports = quickSort;