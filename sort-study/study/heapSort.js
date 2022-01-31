const forEachDeep = (arr, fun, parentIndex = 0) => {
    if (parentIndex >= arr.length) return;
    fun(arr[parentIndex], parentIndex, arr);
    forEachDeep(arr, 2 * parentIndex + 1, fun);
    forEachDeep(arr, 2 * parentIndex + 2, fun);
}
// const forEachBreadth = (arr, fun, parentIndex = 0) => {
//     let line = 0; // 行数
//     let currentI = 2 * parentIndex + 1 + line;
//     while (currentI < arr.length) {
//         fun(arr[currentI], currentI);
//         currentI = 2 * parentIndex + 1 + line++;
//     }

// }
const swap = (arr, i1, i2) => {
    const temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
    return arr;
}
/**
 * 在 top->end 且是top的子节点中寻找最大的元素 并移动到top 并在寻找过程中做相应的处理
 * 条件: top 的两个子节点是最大堆的顶点或者不存在
 * @param { any [] } arr 要移动的数组
 * @param { number } top 顶部
 * @param { number } end 结束的位置
 * @param { function } compare 比较函数 参数：(preItem,curItem)
 * @returns { any []} arr 处理好的数组
 */
const moveMaxToTop = (arr, top, end, compare) => {
    let child = top * 2 + 1; // top的左边子节点
    while (child < end) {
        // 如果有右节点 且 右节点大于 左节点，则使用右节点比较
        if (child + 1 < end && compare(arr[child], arr[child + 1]) < 0) child++;
        // 如果顶点小于此子节点 则将顶点替换为此子节点
        if (compare(arr[top], arr[child]) < 0) {
            swap(arr, top, child);
            top = child; // 接下来找此节点的子节点
            child = top * 2 + 1;
        } else {
            break;
        }
    }
    return arr;
}
/**
 * 将数组转为最大堆的数组
 * @param { any []} arr 
 * @param { function } compare 比较函数 参数：(preItem,curItem)
 * @returns { any []} arr 最大堆的数组
 */
const transToMaxHeap = (arr, compare) => {
    let top = Math.round(arr.length / 2), length = arr.length;// 顶点
    while (top > -1) moveMaxToTop(arr, top--, length, compare);
    return arr;
}
/**
 * 将最大堆数组排序为 从小到大的数组
 * @param { any [] } maxHeap 最大堆的数组
 * @param { Function } compare 比较函数 参数：(preItem,curItem)
 */
const sortMaxHeap = (maxHeap, compare) => {
    let lastIndex = maxHeap.length - 1, lastItem;
    const topRoot = 0;
    // 每次取最大堆得顶点 置于lastIndex，直到lastIndex = 1截止
    // 将 0 -> lastIndex 调整为最大堆
    while (lastIndex > 0) {
        swap(maxHeap, topRoot, lastIndex);
        moveMaxToTop(maxHeap, topRoot, lastIndex--, compare);
    }
    return maxHeap;
}
const sort = (arr, compare) => {
    transToMaxHeap(arr, compare)
    return sortMaxHeap(arr, compare)
};
var elements = [3, 1, 5, 7, 2, 4, 9, 6, 10, 8];
console.log('before: ' + elements);
sort(elements, (pre, cur) => pre - cur);
console.log(' after: ' + elements);
module.exports = {
    quickSort: sort
}