const getNextGap = (gap) => Math.floor(gap / 3) + 1;
const insertGapSort = (arr, compare, start, gap) => {
    let length = arr.length, temp = arr[start], j;
    start += gap;
    while (start < length) {
        j = start;
        temp = arr[start];
        while (j >= gap && compare(arr[j - gap], temp) > 0) arr[j] = arr[(j = j - gap)];
        if (j !== start) arr[j] = temp;
        start += gap;
    }
    return arr;
}
const shellSort = (arr, compare) => {
    let gap = getNextGap(arr.length), start;
    while (gap > 1) {
        start = 0;
        while (start < gap) insertGapSort(arr, compare, start++, gap);
        gap = getNextGap(gap);
    }
    return insertGapSort(arr, compare, 0, 1);
}
module.exports = shellSort;