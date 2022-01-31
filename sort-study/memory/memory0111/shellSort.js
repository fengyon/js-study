const insertSort = (arr, compare, start, gap) => {
    start = start + gap;
    let len = arr.length, sorted, temp;
    while (start < len) {
        sorted = start;
        temp = arr[sorted];
        while (sorted >= gap && compare(arr[sorted - gap], temp) > 0)
            arr[sorted] = arr[(sorted = sorted - gap)];
        if (sorted !== start) arr[sorted] = temp;
        start = start + gap;
    }
    return arr;
}
const shellSort = (arr, compare) => {
    let gap = Math.floor(arr.length / 3) + 1, start = 0;
    while (gap > 1) {
        start = 0;
        while (start < gap) insertSort(arr, compare, start++, gap);
        gap = Math.floor(gap / 3) + 1;
    }
    insertSort(arr, compare, 0, 1);
    return arr;
}
module.exports = shellSort;