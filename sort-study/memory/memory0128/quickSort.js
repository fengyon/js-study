function getArgsLength(args) {
    return args.reduce(
        (total, arg) => arg === curry._
            ? total
            : total + 1
        , 0
    );
}
function replaceInsert(args, targetIndex) {
    if (args.length > targetIndex) {
        let i = 0, length = args.length, funLen = targetIndex;
        // 占坑行动，将多出的参数替换到curry._的位置上
        while (i < targetIndex && targetIndex < length) {
            args[i] === curry._
                && (args[i] = args[targetIndex++]);
            i++;
        }
        // 不相等说明有坑被占了
        if (funLen !== targetIndex) {
            // 候补上台，多出的参数已经占坑去了
            while (targetIndex < length) args[funLen++] = args[targetIndex++];
            // 剔除重复参数，候补参数已经到已占坑参数的位置上了
            args.splice(funLen, args.length - funLen);
        }
    }
    return args;
}
function curry(fun, args = []) {
    return getArgsLength(args) >= fun.length
        ? fun.apply(this, replaceInsert(args, fun.length))
        : (function () {
            return curry(fun, args.concat(Array.from(arguments)));
        });
}
curry._ = curry.insert = Symbol('insert');
function sortOnce(arr, compare, low, high, stack) {
    const left = low, right = high, temp = arr[low];
    while (low < high) {
        while (low < high && compare(temp, arr[high]) <= 0) high--;
        arr[low] = arr[high];
        while (low < high && compare(temp, arr[low]) >= 0) low++;
        arr[high] = arr[low];
    }
    if (low !== left) arr[low] = temp;
    left < low - 1 && stack.push({ low: left, high: low - 1 });
    low + 1 < right && stack.push({ low: low + 1, high: right });
}
function quickSort(arr, compare) {
    const stack = [];
    let sortObj;
    const toSort = curry(sortOnce)(arr, compare, curry._, curry._, stack);
    toSort(0, arr.length - 1);
    while ((sortObj = stack.pop())) toSort(sortObj.low, sortObj.high);
    return arr;
}
console.log(quickSort([0, 9, 8, 7, 3, 4, 2, 24, 2, 2, -28, 521], (p, n) => p - n))
module.exports = quickSort;