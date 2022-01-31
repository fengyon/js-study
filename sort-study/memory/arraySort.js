const { insertSort } = require('./insertSort')
const slice = (arr, start, end) => {
    if (end === undefined) end = arr.length;
    let target = [], i = 0;
    while (start < end) target[i++] = arr[start++];
    return target;
}
const mergeArrayTo = (target, compare, arr1, arr2) => {
    let i1 = 0, i2 = 0, len1 = arr1.length, len2 = arr2.length;
    while (i1 < len1 && i2 < len2) {
        target[i1 + i2] = compare(arr1[i1], arr2[i2]) > 0
            ? arr2[i2++]
            : arr1[i1++]
    }
    while (i1 < len1) target[i1 + i2] = arr1[i1++];
    while (i2 < len2) target[i1 + i2] = arr2[i2++];
    return target;
}
const toSort = (arr, compare) => {
    const mid = Math.floor(arr.length / 2);
    return mid < 8
        ? insertSort(arr, compare)
        : mergeArrayTo(
            arr,
            compare,
            toSort(slice(arr, 0, mid), compare),
            toSort(slice(arr, mid), compare)
        )
}
module.exports = toSort;