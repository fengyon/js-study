const arraySlice = (arr, start, end) => {
    if (end === undefined) end = arr.length;
    let newArr = [], i = 0;
    while (start < end) newArr[i++] = arr[start++];
    return newArr;
}
const insertSort = (arr, compare) => {
    let i = 1, length = arr.length, j, temp;
    while (i < length) {
        j = i;
        temp = arr[i];
        while (j > 0 && compare(arr[j - 1], temp) > 0) arr[j] = arr[--j];
        if (i++ !== j) arr[j] = temp;
    }
    return arr;
}
const mergeArrTo = (target, compare, arr1, arr2) => {
    const len1 = arr1.length, len2 = arr2.length;
    let i1 = 0, i2 = 0;
    while (i1 < len1 && i2 < len2) target[i1 + i2] =
        compare(arr1[i1], arr2[i2]) > 0
            ? arr2[i2++]
            : arr1[i1++];
    while (i1 < len1) target[i1 + i2] = arr1[i1++];
    while (i2 < len2) target[i1 + i2] = arr2[i2++];
    return target;
}
const toSort = (arr, compare) => {
    const mid = Math.floor(arr.length / 2);
    return mid < 8
        ? insertSort(arr, compare)
        : mergeArrTo(
            arr,
            compare,
            toSort(arraySlice(arr, 0, mid), compare),
            toSort(arraySlice(arr, mid), compare)
        )
}
const arraySort = (arr, compare) => toSort(arr, compare);
module.exports = arraySort;