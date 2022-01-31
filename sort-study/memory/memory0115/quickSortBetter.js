const sortOnce = (arr, compare, low, high) => {
    if (low >= high) return low;
    const temp = arr[low], left = low;
    while (low < high) {
        while (low < high && compare(temp, arr[high]) < 1) high--;
        arr[low] = arr[high];
        while (low < high && compare(temp, arr[low]) > -1) low++;
        arr[high] = arr[low];
    }
    if (low !== left) arr[low] = temp;
    return low;
}
const toSort = (arr, compare) => {
    let left, right, stack = [0, arr.length - 1];
    const toPush = (low, high) => low < high && stack.push(low, high);
    while (stack.length > 1) {
        right = stack.pop();
        left = stack.pop();
        const mid = sortOnce(arr, compare, left, right);
        toPush(left, mid - 1);
        toPush(mid + 1, right);
    }
    return arr;
}
const quickSortBetter = (arr, compare) => toSort(arr, compare);
// var elements = [3, 1, 5, 7, 2, 4, 9, 6, 10, 8, 1, 2, 3, 4, 6, 3, 4, 3, 2, 3, 99, 64, 23, 24];
// console.log(elements.length, 'before: ' + elements);
// const arr = quickSortBetter([...elements], (pre, cur) => pre - cur);
// console.log(elements.length, ' after: ' + arr.join(','));
// console.log('after 是否排序正确', elements.sort((p, c) => p - c))
// console.log('after 是否排序正确', elements.sort((p, c) => p - c).every((e, i) => e === arr[i]));
module.exports = quickSortBetter;