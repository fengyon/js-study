/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function reverse(arr, start, end) {
  let temp;
  console.log(`arr:${arr},start:${start},end:${end}`)
  while (start < end) {
    temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp
    start++;
    end--;
  }
}
var nextPermutation = function (nums) {
  let i = nums.length;
  while (--i > 0) {
    if (nums[i - 1] < nums[i]) {
      break;
    }
  }
  let left = i - 1;
  i = nums.length;
  while (--i > left) {
    if (nums[i] > nums[left]) {
      let temp = nums[i]
      nums[i] = nums[left]
      nums[left] = temp
      break;
    }
  }
  reverse(nums, left + 1, nums.length - 1)
  return nums
};
console.log(nextPermutation([2, 2, 5, 4]))
console.log(nextPermutation([4, 3, 2, 1]))