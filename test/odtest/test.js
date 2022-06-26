// 5.在七夕那天晚上，海绵宝宝去广场玩，他看到所有人衣服上面都有数字m，在广场上如果有两个人衣服上面的数字是一样的，那么他们就是一对情
// 侣。海绵宝宝比较奇葩，他不想知道有多少对情侣，他想知道在广场上有多少人是单身(单身的意思就是，某个数字不能被匹配）。（15min）
// 【输入】
// 第一行给你一个数字n（0<n<=200000)。表示广场上有n个人。接下来给出n个整数，表示这n个人衣服上面的数字（由于衣服不是很大，所以写不了
// 很大的数字，这数字的范围是0<=m<=100000。
// 【输出】
// 输出单身的人数。
// 【样例】
// 输入样例 ：
// 6
// 1 1 1 2 2 3
// 输出样例 ：
// 2
console.log(3 + 3 + '3')
const findSinge = (num, nums) => {
  const singleMap = {}
  return nums.reduce((result, element) =>
    element in singleMap
      ? void (delete singleMap[element]) || result - 1 // 如果当前是偶数 -1并去除单身标记
      : void (singleMap[element] = true) || result + 1 // 如果当前是奇数 +1并作单身标记
    , 0);
}
console.log(findSinge(6, [1, 1, 1, 2, 2, 3]));
(function () {
  var undefined = 1
  console.log(undefined, globalThis.undefined, void (1))
})();
function mySplit(str, length = 5) {
  let result = [], i = 0
  const gap = Math.max(Math.ceil(str.length / length), 1)
  while (i < str.length)
    result.push(str.substring(i, (i = i + gap)))
  return result
}
console.log(JSON.stringify(mySplit('123sdifjslavag&%$$#')))