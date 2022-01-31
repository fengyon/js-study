const SORT_OBJ = require("./index");
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
const toTest = (arr1, obj, quickSort, funName) => {
    arr1 || (arr1 = getRandomArr());
    const arr2 = arr1.map(item => item);

    let counts1 = 0;
    (function () {
        const startTime = Date.now();
        arr1.sort((cur, next) => {
            counts1++;
            return cur.value - next.value;
        });
        obj.time1 = obj.time1 + Date.now() - startTime;
    })();
    // arr1.forEach((item, index) => {
    //     if (arr1[index - 1] && item.value === arr1[index - 1].value && arr1[index - 1].id > item.id) {
    //         throw Error('稳定性出错')
    //     }
    // })
    // console.log('稳定性正常')
    let counts2 = 0;
    (function () {
        const startTime = Date.now();
        // console.log('排序前:', arr2.map(item=>item.value).join(','))
        quickSort(arr2, (cur, next) => {
            counts2++;
            return cur.value - next.value;
        });
        obj.time2 = obj.time2 + Date.now() - startTime;
    })();

    arr2.some((item, index) => {
        if (arr2[index - 1] && item.value === arr2[index - 1].value && arr2[index - 1].id > item.id) {
            console.log(`!!!!${funName}--稳定性出错--`, arr2[index - 1], item)
            return true;
        }
    }) || console.log(`√√√√√√√${funName}稳定性正确`);
    // console.log('customSort稳定性正常')
    // console.log('排序后:', arr2.map(item=>item.value).join(','))
    arr1.length > 0 && console.log(`Array.prototype.sort排序次数:`, counts1, `${funName}排序次数:`, counts2,
        `${arr1[0].value} -> ${arr1[arr1.length - 1].value} ( ${(counts2 / counts1).toFixed(3)}倍 )`,
        '数组长度:' + arr1.length
    )
    if (!isEqual(arr2, arr1)) {
        console.log(arr2)
        throw Error('数组排序出错');
    } else {
        obj.counts1 = obj.counts1 + counts1;
        obj.counts2 = obj.counts2 + counts2;
        return ('数组长度' + arr1.length) && '';
    }
}
const testCounts = 10;
let startTime = Date.now();
const loggers = [];
console.log(SORT_OBJ);
for (let funName in SORT_OBJ) {
    SORT_OBJ[funName] = { sortFun: SORT_OBJ[funName], arr: [] }
}
for (let funName in SORT_OBJ) {
    startTime = Date.now();
    const obj = {
        counts1: 0,
        counts2: 0,
        time1: 0,
        time2: 0
    };
    const args = [obj, SORT_OBJ[funName].sortFun, funName];
    console.log('[]：排序正确', toTest([], ...args), '\n');
    console.log('[{ value: 2 }]：排序正确', toTest([{ value: 2 }], ...args), '\n');
    console.log('[{ value: 2 }, { value: 1 }]：排序正确', toTest([{ value: 2 }, { value: 1 }], ...args), '\n');
    for (let i = 0; i < testCounts; i++) {
        console.log(
            i + 1,
            '：排序正确',
            toTest(
                (SORT_OBJ[funName].arr[i] || (SORT_OBJ[funName].arr[i] = getRandomArr()))
                    .map(o => o),
                ...args
            ),
            '\n'
        );
    }
    loggers.push(`${funName}: 所有的排序( ${testCounts
        } 个 )正确: ${Date.now() - startTime
        }ms Array.prototype.sort排序次数: ${obj.counts1
        } ${funName
        }排序次数:${obj.counts2} ( ${(obj.counts2 / obj.counts1).toFixed(3)
        }倍 ) \nArray.prototype.sort排序时间: ${obj.time1
        }  ${funName
        }排序时间:${obj.time2} ( ${(obj.time2 / obj.time1).toFixed(3)
        }倍 )`);
}
loggers.forEach(m => console.log(m + '\n'));
loggers.length = 0;
// console.log('测试排好序的数组');
// for (let funName in SORT_OBJ) {
//     startTime = Date.now();
//     const args = [SORT_OBJ[funName].sortFun, funName];
//     console.log('[]：排序正确', toTest([], ...args), '\n');
//     console.log('[{ value: 2 }]：排序正确', toTest([{ value: 2 }], ...args), '\n');
//     console.log('[{ value: 2 }, { value: 1 }]：排序正确', toTest([{ value: 2 }, { value: 1 }], ...args), '\n');
//     for (let i = 0; i < testCounts; i++) {
//         console.log(i + 1,
//             '：排序正确',
//             toTest(
//                 SORT_OBJ[funName].arr[i].sort((c, n) => c.value - n.value),
//                 ...args
//             ),
//             '\n'
//         );
//     }
//     loggers.push(`排序好的数组测试-》${funName}: 所有的排序( ${testCounts} 个 )正确: ${Date.now() - startTime}ms`);
// }
// loggers.forEach(m => console.log(m + '\n'));