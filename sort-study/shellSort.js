const { createHadDead } = require('./headDead');
const hadDead = createHadDead(10000);
const log = console.log;
const textReg = /before|after/
console.log = function (...args) {
    if (args.some(t => textReg.test(t))) {
        return log.apply(console, args);
    }
}
const shellSort = (arr, compare) => {
    const length = arr.length;
    let dep = Math.floor(length / 3) + 1, start, sortedLeft, sorting, temp;
    while (dep > 1) {
        start = 0;
        hadDead('dep > 1')
        while (start < dep) {
            sortedLeft = start + dep;
            console.log(start, dep);
            hadDead(`start < dep  start:${start} dep:${dep}`);
            console.log(`start < dep  start:${start} dep:${dep}`);
            while (sortedLeft < length) {
                sorting = sortedLeft;
                temp = arr[sorting];
                console.log(arr.join(','));
                console.log(`sortedLeft:${sortedLeft} sorting:${sorting} dep:${dep}`)
                while (sorting >= dep && compare(arr[sorting - dep], temp) > 0) {
                    console.log(`sorting:${sorting}`);
                    arr[sorting] = arr[(sorting = sorting - dep)];
                }
                if (sorting !== sortedLeft) arr[sorting] = temp;
                sortedLeft = sortedLeft + dep;
            }
            start++;
            console.log(arr.join(','))
            console.log(`start++:${start}`)
        }
        dep = Math.floor(dep / 3) + 1;
    }
    start = 1;
    while (start < length) {
        sorting = start;
        temp = arr[sorting];
        while (sorting > 0 && compare(arr[sorting - 1], temp) > 0) arr[sorting] = arr[--sorting];
        if (start++ !== sorting) arr[sorting] = temp;
    }
    return arr;
}

var elements = [3, 1, 5, 7, 2, 4, 9, 6, 10, 8, 1, 2, 3, 4, 6, 3, 4, 3, 2, 3, 99, 64, 23, 24];
console.log(elements.length, 'before: ' + elements);
const arr = shellSort([...elements], (pre, cur) => pre - cur);
console.log(elements.length, ' after: ' + arr.join(','));
console.log('after 是否排序正确', elements.sort((p, c) => p - c))
console.log('after 是否排序正确', elements.sort((p, c) => p - c).every((e, i) => e === arr[i]));
module.exports = {
    quickSort: shellSort
}