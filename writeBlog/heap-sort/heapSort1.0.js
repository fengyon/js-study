function heapSort(arr) {
  transToMaxHeap(arr);
  sortMaxHeap(arr);
  return arr;
}
function transToMaxHeap(arr, top, length) {
  if (length === undefined) length = arr.length;
  if (top === undefined) top = Math.floor(arr.length / 2);
  let child, transingTop;
  while (top > -1) {
    transingTop = top;
    while (transingTop > -1) {
      child = 2 * transingTop + 1;
      if (child + 1 < length && arr[child + 1] > arr[child]) child++;
      if (child < length && arr[child] > arr[transingTop]) {
        swap(arr, transingTop, child);
        transingTop = child;
      } else {
        break;
      }
    }
    top--;
  }
}
function sortMaxHeap(maxHeap) {
  let end = maxHeap.length - 1;
  while (end > 0) {
    swap(maxHeap, 0, end);
    transToMaxHeap(maxHeap, 0, end--);
  }
  return maxHeap;
}
function swap(arr, i1, i2) {
  const temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
}

// 简单测试方法，对长度为1000的随机数组进行排序，排序结果与array.prototype.sort的排序结果作对比，一致则排序正确
; ((mySort, arrLength = 1000, max = 1000) => { const getRandomArr = (len) => { let arr = [], i = 0; while (i < len) arr[i++] = Math.floor(Math.random() * max) / 10; return arr; }; const isEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((item, index) => item === arr2[index]); const toTest = (arr) => { const sortFun = (p, n) => p - n; let sortedArr = [...arr].sort(sortFun); if (isEqual(sortedArr, mySort([...arr], sortFun))) { console.log(`长度为${arr.length}的数组排序正确`, sortedArr.slice(0, 10).join(', ') + (sortedArr.length > 10 ? ', ...' : '')) } else { throw Error('排序出错'); }; };[0, 1, 2, arrLength].forEach(num => toTest(getRandomArr(num))); })(heapSort);