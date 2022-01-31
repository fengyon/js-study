const toSort = (arr, fun, low, high) => {
    if (low >= high) return arr;
    const left = low, right = high;
    let temp = arr[left];
    while (low < high) {
        while (low < high && fun(temp, arr[high]) < 1) high--;
        arr[low] = arr[high];
        while (low < high && fun(temp, arr[low]) > 0) low++;
        arr[high] = arr[low];
    }
    arr[low] = temp;
    toSort(arr, fun, left, low - 1);
    toSort(arr, fun, low + 1, right);
    return arr;
}
const quickSort = (arr, fun) => toSort(arr, fun, 0, arr.length - 1);
console.log(quickSort([-0,0,-0,0,1,2,1], (pre, cur) => pre - cur));
module.exports = {
    quickSort
}