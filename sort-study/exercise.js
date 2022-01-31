const hadDead = (() => {
    let ranCount = 0;
    const limit = 100000;
    return (str) => {
        if (ranCount > limit) {
            throw Error(`超出执行次数( ${limit} )：` + str)
        } else {
            ranCount++
            return true
        }
    }
})();
const toSort = (arr, compare, low, high) => {
    if (low >= high) return arr;
    // 取第一个元素作为基准，此处可以作为优化之处，可以随机取一个元素作为基准
    const left = low, right = high;
    const toCompare = (() => {
        const tempIndex = low + Math.floor(Math.random() * (high - low)), temp = arr[tempIndex];
        console.log(tempIndex, temp)
        return (index) => tempIndex > index
            ? compare(arr[index], temp, arr)
            : compare(temp, arr[index], arr);
    })();
    while (low < high) {
        hadDead('外层循环')
        console.log(low,high,toCompare(high))
        while (low < high && toCompare(high) < 1) hadDead('high--') && (high--);
        arr[low] = arr[high];
        console.log(toCompare(low))
        while (low < high && toCompare(low) > 0) hadDead('low++') && (low++);
        arr[high] = arr[low];
    }
    hadDead('toSort')
    arr[low] = temp;
    toSort(arr, compare, left, low - 1);
    return toSort(arr, compare, low + 1, right);
}
const quickSort = (arr, compare) => toSort(arr, compare, 0, arr.length - 1);
module.exports = {
    quickSort
}