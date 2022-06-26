/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  if (nums.length === 1) return nums[0];
  let maxLength = 0; // 记录转为二进制后最大的长度
  nums.forEach((item, index) => {
    nums[index] = item.toString(2)
    maxLength = Math.max(maxLength, nums[index].length);
  })
  let result = []
  let i = 0, j
  while (i < maxLength) result[i++] = '0';
  // 相加为二进制字符串
  nums.forEach((item) => {
    i = item.length - 1
    j = maxLength - 1
    while (i > -1) {
      result[j] = (Number(result[j]) + Number(item[i])) % 3
      i--
      j--
    }
  })
  console.log(nums)
  console.log(result)
  return Number.parseInt(result.join(''), 2)
};
console.log(singleNumber([1, 2, 3, 4, 5, 1, 2, 3, 4, 1, 2, 3, 4]))