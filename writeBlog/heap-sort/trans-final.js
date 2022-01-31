/**
 * 将数组转化为最大堆
 * @param {any []} arr 需要转化的数组，会在原数组上进行修改
 * @param {*} compare 比较方法
 * @returns maxHeap 最大堆
 */
 function transToMaxHeap(arr, compare) {
  // 从后面的顶点往前构建最大堆
  let top = Math.floor(arr.length / 2), end = arr.length;
  let child, adjustTop;
  while (top > -1) {
    adjustTop = top;
    child = 2 * adjustTop + 1;
    while (child < end) {
      // 找最大子节点的索引
      if (child + 1 < end && compare(arr[child], arr[child + 1]) < 0) child++;
      // 如果顶点小于最大子节点，则进行交换，并将此子节点作为顶点的堆调整为最大堆
      if (compare(arr[adjustTop], arr[child]) < 0) {
        swap(arr, adjustTop, child);
        adjustTop = child;
        child = 2 * adjustTop + 1;
      } else {
        break;
      }
    }
    top--;
  }
}
function swap(arr, i1, i2) {
  const temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
}
// 测试
let arr = [0, 1, 2, 3, 4, 2, 2, 3, 5, 7, 3, 1, 3, 4,10];
logArrAsTree(arr, 'trans before');
transToMaxHeap(arr, (p, n) => p - n);
logArrAsTree(arr, 'trans after');
function logArrAsTree(arr, start = '树形结构示意图') { let str = insertArrow(getHeapStr(arr)); console.log('------' + start + '------' + '\n' + str); if (arr.some(item => item.toString().length !== 1)) console.error('有元素的长度不为1，打印会错乱！！！'); }
function getHeapStr(arr) { if (arr.length < 2) return arr.join(' '); let lineIndex = Math.ceil(Math.log2(arr.length)) - 1; let i = -1, line = 2, str = ' '.repeat(Math.pow(2, lineIndex) - 1); while (++i < arr.length) { if (i === line - 2) { lineIndex--; str = str + arr[i] + '\n' + ' '.repeat(Math.pow(2, lineIndex) - 1); line = line * 2; } else { str = str + arr[i] + ' '.repeat(Math.pow(2, lineIndex + 1) - 1); } } return str; }
function insertArrow(str) { const lines = str.split('\n'); const getArrowLine = (line, i = 0) => line.replace(/[^ ]+/g, () => i++ % 2 === 0 ? '/' : '\\'); return lines.reduceRight((pre, line, index) => (index !== 0 ? getArrowLine(line) + '\n' : '') + line + '\n' + pre, '') }