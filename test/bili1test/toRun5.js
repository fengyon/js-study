var removeElement = function (nums, val) {
  let i = 0, move = 0;
  const clone = nums.filter(i => i !== val)
  while (i + move < nums.length) {
    if (nums[i + move] === val) {
      move++;
    } else {
      nums[i] = nums[i + move];
      i++;
    }
  }
  while (move > 0) {
    nums.pop();
    move--
  }
  console.log(nums, nums.length === clone.length && nums.every((it, index) => it === clone[index]))
};
removeElement([1, 2, 3, 5, 3, 6, 5, 5, 5, 56, 74, 5, 6, 5, 6, 7], 5)