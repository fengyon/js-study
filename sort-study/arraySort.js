const { hadDead } = require('./headDead')
// 插入排序
const insertSort = (arr, compare, left, right) => {
    let i = left + 1, element, j;
    hadDead('insertSort')
    while (i < right) { // 这个从1开始遍历整个数组
        j = i;
        element = arr[i]; // 将第i个元素存起来
        // 从第 i-1 处开始对比，如果第j个元素大于第i个元素，则将第j个元素前移 
        while (j > 0 && compare(arr[j - 1], element) > 0) arr[j] = arr[--j];
        // 如果已经移动，则将第i个元素移到j的位置
        if (j !== i++) arr[j] = element;
    }
    return arr;
}
// 合并有序序列，左右两边是有序序列以mid为分界线
const orderArraySort = (arr, compare, left, mid, right) => {
    let i = left, j = 0;
    const leftMax = mid, target = [];
    hadDead('orderArraySort:' + arr.join(','))
    while (i < right) {
        hadDead(`orderArraySort while i:${i} left:${left} mid:${mid} right:${right}`)
        i++;
        target[j++] = (left < leftMax && mid < right)
            ? compare(arr[left], arr[mid]) > 0 ? arr[mid++] : arr[left++]
            : left < leftMax
                ? arr[left++]
                : arr[mid++]
        console.log('sorted:' + arr.join(','))
    }
    i = left;
    j = 0;
    while (i < right) {
        arr[i++] = target[j++];
    }
    return arr;
}
const mergeSort = (arr, compare, left, right) => {
    const mid = Math.round((right + left + 1) / 2);
    hadDead('mergeSort mid')
    console.log(`mergeSort mid:${mid} left:${left} right:${right}`)
    if (right - left < 16) {
        hadDead('insertSort')
        return insertSort(arr, compare, left, right)
    } else {
        console.log(`mergeSort mid:${mid} left:${left} right:${right}`)
        hadDead(`mergeSort mid:${mid}`)
        mergeSort(arr, compare, left, mid);
        mergeSort(arr, compare, mid, right);
        return orderArraySort(arr, compare, left, mid, right);
    }
}
const arraySort = (arr, compare) => mergeSort(arr, compare, 0, arr.length)
module.exports = {
    arraySort,
    quickSort: arraySort
}