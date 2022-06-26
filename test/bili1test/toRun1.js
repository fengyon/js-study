// 比如给个5，输出数组如下：

// 1    2    3   4  5
// 22 23 24 25 6
// 21 20 19 18 7
// 14 15 16 17 8
// 13 12 11 10 9

// 这样的数组称蚊香数组

// 给定参数N
// 求data[N][N]蚊香数组的实现

// 方向探索法

const getSpecialArr = (n) => {
  let i = 0, j = 0, arr = [[]], curNum = 1
  const limit = n * n + 1, insert = {};
  while (i < n) arr[0][i++] = insert;
  i = 1;
  // 初始化
  while (i < n) arr[i++] = [...arr[0]];
  i = 0
  j = -1;
  while (curNum < limit) {
    if (arr[i][j + 1] === insert) {
      arr[i][++j] = curNum++;// 右
    } else if (arr[i + 1] && arr[i + 1][j] === insert) {
      arr[++i][j] = curNum++;// 下
    } else if (arr[i][j - 1] === insert) {
      arr[i][--j] = curNum++;// 左
    } else if (arr[i - 1] && arr[i - 1][j] === insert) {
      arr[--i][j] = curNum++;// 上
    } else {
      console.log('执行出错', `i:${i} j:${j} curNum: ${curNum}`, arr.join('\n'))
      curNum++;
    }
  }
  return arr
}
console.log(getSpecialArr(5))