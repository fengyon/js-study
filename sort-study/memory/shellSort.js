const insertSort = (arr, compare, start, gap) => {
    let sortedLeft = start + gap, sorting, temp;
    const length = arr.length
    while (sortedLeft < length) {
        sorting = sortedLeft;
        temp = arr[sorting];
        while (sorting >= gap && compare(arr[sorting - gap], temp) > 0)
            arr[sorting] = arr[(sorting = sorting - gap)];
        if (sorting !== sortedLeft) arr[sorting] = temp;
        sortedLeft = sortedLeft + gap;
    }
    return arr;
}
const shellSort = (arr, compare) => {
    let gap = Math.floor(arr.length / 3) + 1, start;
    while (gap > 1) {
        start = 0;
        while (start < gap) insertSort(arr, compare, start++, gap);
        gap = Math.floor(gap / 3) + 1;
    }
    return insertSort(arr, compare, 0, 1);// 最后对整个数组进行一次插入排序
}

var elements = [3, 1, 5, 7, 2, 4, 9, 6, 10, 8, 1, 2, 3, 4, 6, 3, 4, 3, 2, 3, 99, 64, 23, 24, 25];
console.log(elements.length, 'before: ' + elements);
const arr = shellSort([...elements], (pre, cur) => pre - cur);
console.log(elements.length, ' after: ' + arr.join(','));
console.log('after 是否排序正确', elements.sort((p, c) => p - c))
console.log('after 是否排序正确', elements.sort((p, c) => p - c).every((e, i) => e === arr[i]));
module.exports = shellSort;