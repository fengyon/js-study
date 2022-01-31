const { quickSort } = require("./memory/shellSort");
const getRandomArr = () => {
    const length = 100000 * (1 + 9 * Math.random());
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push({ id: i, value: Math.floor(Math.random() * 100000) })
    }
    return arr;
}
// const isEqual = (...args) => args.every((p, c) => p.length === c.length) &&
//     args.every((arr1, arr2) => arr1.every((item, index) => item === arr2[index]));
const isEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((item, index) => item.value === arr2[index].value);
// console.log = ()=>1;
const toTest = (arr1) => {
    arr1 || (arr1 = getRandomArr());
    const arr2 = arr1.map(item => item);

    let counts1 = 0;
    arr1.sort((cur, next) => {
        counts1++;
        return cur.value - next.value;
    });
    // arr1.forEach((item, index) => {
    //     if (arr1[index - 1] && item.value === arr1[index - 1].value && arr1[index - 1].id > item.id) {
    //         throw Error('稳定性出错')
    //     }
    // })
    // console.log('稳定性正常')
    let counts2 = 0;
    // console.log('排序前:', arr2.map(item=>item.value).join(','))
    quickSort(arr2, (cur, next) => {
        counts2++;
        return cur.value - next.value;
    });
    arr2.some((item, index) => {
        if (arr2[index - 1] && item.value === arr2[index - 1].value && arr2[index - 1].id > item.id) {
            console.log('!!!!quickSort--稳定性出错--', arr2[index - 1], item)
            return true;
        }
    }) || console.log('√√√√√√√quickSort稳定性正确');
    // console.log('customSort稳定性正常')
    // console.log('排序后:', arr2.map(item=>item.value).join(','))
    arr1.length > 0 && console.log('sort排序次数:', counts1, '快速排序次数：', counts2,
        `${arr1[0].value} -> ${arr1[arr1.length - 1].value} ( ${(counts2 / counts1).toFixed(3)}倍 )`,
        '数组长度:' + arr1.length
    )
    if (!isEqual(arr2, arr1)) {
        console.log(arr2)
        throw Error('数组排序出错');
    } else {
        return ('数组长度' + arr1.length) && '';
    }
}
const testCounts = 10;
const startTime = Date.now();
console.log('[]：排序正确', toTest([]), '\n');
console.log('[{ value: 2 }]：排序正确', toTest([{ value: 2 }]), '\n');
console.log('[{ value: 2 }, { value: 1 }]：排序正确', toTest([{ value: 2 }, { value: 1 }]), '\n');
for (let i = 0; i < testCounts; i++) {
    console.log(i + 1, '：排序正确', toTest(), '\n');
}
console.log(`所有排序( ${testCounts} 个 )正确: ${Date.now() - startTime}ms`)
// console.log('sort before', [1, 5, 6, 3, 5, 7, 3, 5, 0])
// console.log('sort after', quickSort([1, 5, 6, 3, 5, 7, 3, 5, 0], (item1, item2) => item1 - item2))