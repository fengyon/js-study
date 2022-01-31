/**
 * 堆排序 时间复杂度 最好=最坏=平均=O(NlogN) 空间复杂度 最好=最坏=平均=O(1)
 * @param { any [] } arr 需要进行排序的数组，会在此数组上直接改变
 * @param { Function } compare 比较元素的方法，会传入两个元素（索引小的在前面）作为参数，返回数字
 * @returns { any [] } arr 排序好的数组
 */
function heapSort(arr, compare) {
  transToMaxHeap(arr, compare);
  return sortMaxHeap(arr, compare);
}
/**
 * 将数组转化为最大堆
 * @param {any []} arr 需要转化的数组，会在原数组上进行修改
 * @param {*} compare 比较方法
 * @returns maxHeap 最大堆
 */
function transToMaxHeap(arr, compare) {
  let top = Math.floor(arr.length / 2);
  while (top > -1) moveMaxToTop(arr, compare, top--, arr.length);
  return arr;
}
/**
 * 对最大堆进行从小到大的排序，注意是根据执行compare来比较大小的
 * @param { any [] } arr 最大堆的数组
 * @param {*} compare
 * @returns 从小到大排序好的数组
 */
function sortMaxHeap(maxHepa, compare) {
  let end = maxHepa.length - 1;
  while (end > 0) {
    swap(maxHepa, 0, end);
    moveMaxToTop(maxHepa, compare, 0, end--);
  }
  return maxHepa;
}
/**
 * 将top最大的子节点移动到top上，这个需要满足的条件是以top的两个子节点作为顶点的堆时最大堆
 * @param { any []} arr 数组,部分为最大堆
 * @param { (item1,item2)=>number } compare 比较方法
 * @param { number } top 顶点
 * @param { number } end 结束位置
 */
function moveMaxToTop(arr, compare, top, end) {
  let child = 2 * top + 1;
  while (child < end) {
    if (child + 1 < end && compare(arr[child], arr[child + 1]) < 0) child++;
    if (compare(arr[top], arr[child]) < 0) {
      swap(arr, top, child);
      top = child;
      child = 2 * top + 1;
    } else {
      break;
    }
  }
}
// 对arr数组的两个索引的元素进行位置交换
function swap(arr, i1, i2) {
  const temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
}
module.exports = heapSort;
