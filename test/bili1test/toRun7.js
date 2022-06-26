var singleNumber = function (nums) {
  if (nums.length === 1) return nums[0];
  let total = nums.reduce((sum, cur) => sum + cur, 0);
  let num = 0
  while (total > 1) {
    num = num + (total % 3)
    total = Math.floor(total / 3)
  }
  return num
};
console.log(singleNumber([0, 1, 0, 1, 0, 1, 99]))

var mySqrt = function (x) {
  return x < 4
    ? 1
    : 2 + mySqrt(x / 4)
};
console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].forEach((item) => {
  console.log(item, mySqrt(item))
}))