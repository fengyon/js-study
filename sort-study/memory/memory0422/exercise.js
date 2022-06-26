var thirdMax = function (nums) {
  const maxNums = [nums[0]]
  let i = 1, j = 0, temp
  const insertNum = (num) => {
    j = 0
    while (j < maxNums.length && maxNums[j] > num) j++;
    console.log(`num:${num},maxNums:${maxNums}`)
    if (maxNums[j] === num) return
    console.log(`j:${j}`)
    if (j === maxNums.length) {
      j < 3 && (maxNums[j] = num)
    } else {
      temp = Math.min(maxNums.length, 2)
      while (temp > j) maxNums[temp] = maxNums[--temp];
      maxNums[j] = num
    }
    console.log(`num:${num},maxNums:${maxNums}`)
  }
  while (i < nums.length) insertNum(nums[i++]);
  return maxNums[maxNums.length - 1]
};
console.log(thirdMax([1,2]))