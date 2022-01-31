const insertSort = (arr, compare) => {
    let i = 1, j, temp, length = arr.length;
    while (i < length) {
        j = i;
        temp = arr[i];
        while (j > 0 && compare(arr[j - 1], temp) > 0) arr[j] = arr[--j];
        if (i++ !== j) arr[j] = temp;
    }
    return arr;
}
const mergeSort = (target, compare, arr1, arr2) => {
    let i1 = 0, i2 = 0;
    const l1 = arr1.length, l2 = arr2.length;
    while (i1 < l1 && i2 < l2) target[i1 + i2] = compare(arr1[i1], arr2[i2]) > 0
        ? arr2[i2++]
        : arr1[i1++];
    while (i1 < l1) target[i1 + i2] = arr1[i1++];
    while (i2 < l2) target[i1 + i2] = arr2[i2++];
    return target;
}
const arraySort = (arr, compare) => {
    const mid = Math.floor(arr.length / 2)
    return mid < 8
        ? insertSort(arr, compare)
        : mergeSort(
            arr,
            compare,
            arraySort(arr.slice(0, mid), compare),
            arraySort(arr.slice(mid), compare)
        )
}
module.exports = arraySort;