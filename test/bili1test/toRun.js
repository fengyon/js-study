// 比如给个5，输出数组如下：

// 1    2    3   4  5
// 22 23 24 25 6
// 21 20 19 18 7
// 14 15 16 17 8
// 13 12 11 10 9

// 这样的数组称蚊香数组

// 给定参数N
// 求data[N][N]蚊香数组的实现

// 分处理法

const getSpecialArr = (n) => {
  if (n < 1) return [];
  let i = 0, arr = [[]], curNum = 1;
  const end = n - 1, limit = n * n + 1;
  while (i < n) {
    arr[0][i] = curNum++;
    i++
  }
  i = 1;
  while (i < n) {
    arr[i] = []
    arr[i][n - 1] = curNum++;
    i++
  }
  let j = end, goLeft = true;
  while (curNum < limit) {
    if (j < 0) {
      j = 0;
      goLeft = false;
      i--;
    } else if (j >= end) {
      j = end - 1;
      goLeft = true;
      i--;
    }
    if (goLeft) {
      arr[i][j--] = curNum++;
    } else {
      arr[i][j++] = curNum++;
    }
  }
  return arr
}
console.log(getSpecialArr(7))