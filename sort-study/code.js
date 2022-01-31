const hadDead = (() => {
    let ranCount = 0;
    return (str) => {
        if (ranCount > 10000) {
            throw Error(str + '::超出执行次数')
        } else {
            ranCount++
            return true
        }
    }
})();
function toSort(arr, fun, lo, hi) {
    let i = lo, j = hi;
    hadDead('sort递归')
    if (i < j) {
        let temp = arr[i];
        while (i < j) {
            while (j > i && fun(temp, arr[j]) < 0) hadDead('--j') && (--j);
            arr[i] = arr[j];
            while (i < j && fun(temp, arr[i]) > -1) hadDead('++i') && (++i);
            arr[j] = arr[i];
        }
        arr[i] = temp;
        toSort(arr, fun, lo, i - 1);
        toSort(arr, fun, i + 1, hi);
    }
}
function quickSort(arr, fun) {
    toSort(arr, fun, 0, arr.length - 1);
    return arr
}
console.log('sort before', [1, 5, 6, 3, 5, 7, 3, 5, 0].join(','))
console.log('sort after', quickSort([1, 5, 6, 3, 5, 7, 3, 5, 0], (pre, cur) => cur - pre).join(','))