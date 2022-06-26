/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = []
  const dfs = (arr, sum, start) => {
    if (start >= candidates.length) return;
    if (sum === 0) return result.push(arr);
    // 跳过自己
    dfs(arr, sum, start + 1);
    // 算上自己，可以重复取值
    if (sum - candidates[start] >= 0) {
      dfs([...arr, candidates[start]], sum - candidates[start], start);
    }
  }
  dfs([], target, 0)
  return result
};
console.log(combinationSum([2, 3, 6, 7], 7))