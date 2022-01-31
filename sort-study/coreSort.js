const insertSort = (arr, compare) => {
    let i = 1, j, temp; // 0 -> i 是有序的部分，i->length是要进行排序的部分
    while (i < arr.length) {
        j = i;
        temp = arr[i];
        // 一直往i前面的元素查找，直到找到 小于或等于i元素
        // 如果大于第i个元素，则此元素后移一位，因为第i个元素将要插入他的前方
        while (j > 0 && compare(arr[j - 1], temp) > 0) arr[j] = arr[--j];
        // j!== i 说明发生了移动，则将第i个元素插入至j的位置
        if (j !== i++) arr[j] = temp;
    }
    return arr;
}
const mergeSort = (target, arr1, arr2, compare) => {
    let index1 = 0, index2 = 0;
    while (index1 < arr1.length && index2 < arr2.length) {
        target[index1 + index2] = compare(arr1[index1], arr2[index2]) > 0
            ? arr2[index2++]
            : arr1[index1++];
    }
    while (index1 < arr1.length) target[index1 + index2] = arr1[index1++];
    while (index2 < arr2.length) target[index1 + index2] = arr2[index2++];
    return target;
}
const toSort = (arr, compare) => {
    const mid = Math.floor(arr.length / 2);
    return mid < 8
        ? insertSort(arr, compare)
        : mergeSort(
            arr,
            toSort(arr.slice(0, mid), compare),
            toSort(arr.slice(mid), compare),
            compare
        );
}
const sort = (arr, compare) => {
    return toSort(arr, compare);
}
module.exports = {
    quickSort: sort
}