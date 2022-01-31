function swap(arr, i1, i2) {
  const temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
}
function transToMaxHeap(arr) {
  let top = Math.floor(arr.length / 2);
  let leftChild, rightCHild;
  while (top > -1) {
    leftChild = 2 * top + 1;
    rightCHild = leftChild + 1;
    if (arr[leftChild] >= arr[rightCHild] && arr[top] < arr[leftChild]) {
      logArrAsTree(arr, 'swap之前');
      swap(arr, top, leftChild);
      logArrAsTree(arr, 'swap之后');
    } else if (arr[top] < arr[rightCHild]) {
      logArrAsTree(arr, 'swap之前');
      swap(arr, top, rightCHild);
      logArrAsTree(arr, 'swap之后');
    }
    top--;
  }
}
// 测试
let arr = [0, 1, 2, 3, 4, 5, 6];
logArrAsTree(arr, 'trans before');
transToMaxHeap(arr);
logArrAsTree(arr, 'trans after');
function logArrAsTree(arr, start = '树形结构示意图') { let str = insertArrow(getHeapStr(arr)); console.log('------' + start + '------' + '\n' + str); if (arr.some(item => item.toString().length !== 1)) console.error('有元素的长度不为1，打印会错乱！！！'); }
function getHeapStr(arr) { if (arr.length < 2) return arr.join(' '); let lineIndex = Math.ceil(Math.log2(arr.length)) - 1; let i = -1, line = 2, str = ' '.repeat(Math.pow(2, lineIndex) - 1); while (++i < arr.length) { if (i === line - 2) { lineIndex--; str = str + arr[i] + '\n' + ' '.repeat(Math.pow(2, lineIndex) - 1); line = line * 2; } else { str = str + arr[i] + ' '.repeat(Math.pow(2, lineIndex + 1) - 1); } } return str; }
function insertArrow(str) { const lines = str.split('\n'); const getArrowLine = (line, i = 0) => line.replace(/[^ ]+/g, () => i++ % 2 === 0 ? '/' : '\\'); return lines.reduceRight((pre, line, index) => (index !== 0 ? getArrowLine(line) + '\n' : '') + line + '\n' + pre, '') }