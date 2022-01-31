const stack = [];
const sortOnce = (arr, compare, low, high) => {
    const left = low, right = high, temp = arr[low];
    while (low < high) {
        while (low < high && compare(temp, arr[high]) < 1) high--;
        arr[low] = arr[high];
        while (low < high && compare(temp, arr[low]) > -1) low++;
        arr[high] = arr[low];
    }
    if (low !== left) arr[low] = temp;
    left < low - 1 && stack.push({ low: left, high: low - 1 });
    low + 1 < right && stack.push({ low: low + 1, high: right });
}
const quickSort = (arr, compare) => {
    let nextSort;
    sortOnce(arr, compare, 0, arr.length - 1);
    while (stack.length > 0) {
        nextSort = stack.pop();
        sortOnce(arr, compare, nextSort.low, nextSort.high);
    }
    return arr;
}

module.exports = quickSort;
