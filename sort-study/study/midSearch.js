// 
const midFind = (getItem, target, left, right) => {
    let midIndex, midItem;
    while (left < right - 1) {
        midIndex = Math.floor((left + right) / 2);
        midItem = getItem(midIndex);
        if (midItem === target) {
            return midIndex;
        } else if (midItem < target) {
            left = midIndex;
        } else {
            right = midIndex;
        }
    }
    return left;
}
const findY = (matrix, target) => {
    const left = midFind((i) => matrix[i][0], target, 0, matrix.length);
    const diff = matrix[left][0] - target;
    return diff === 0 || diff < 0 && left;

}
const findX = (arr, target) => midFind(
    (i) => arr[i],
    target,
    0,
    arr.length
) === true;
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean} 先确定在哪一条数组中，再在这条数组中继续找在哪个索引
 */
var searchMatrix = function (matrix, target) {
    const Y = findY(matrix, target);
    if (Y === true) return true;
    else if (Y === false) return false;
    else return findX(matrix[Y], target);
};
console.log(searchMatrix([[1], [3]], 3));