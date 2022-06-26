const getType = (data) => Object.prototype.toString.call(data)

const cloneFunctions = (() => {
    //先用数组存起来，方便生成策略对象
    let variousData = [
        { type: [], cloneFun: (arr) => arr.map(data => deepClone(data)) },
        {
            type: {},
            cloneFun: (obj) => {
                let objForR = {}
                objForR.__proto__ = obj.prototype
                Object
                    .keys(obj)
                    .forEach(key => (objForR[`${key}`] = deepClone(obj[`${key}`])))
                return objForR
            }
        },
        {
            type: new Set(),
            cloneFun: (set) => {
                let setR = new Set()
                set.forEach(data => setR.add(deepClone(data)))
                return setR
            }
        },
        {
            type: new Map(),
            cloneFun: (map) => {
                let mapR = new Map()
                map.forEach((key, value) => mapR.set(deepClone(key), deepClone(value)))
                return mapR
            }
        }
    ]
    //用对象将策略存储起来，查找clone方法时的时间复杂度几乎为常数，当类型特别多时可以极大地优化性能
    return variousData.reduce((obj, data) => {
        obj[`${getType(data.type)}`] = data.cloneFun
        return obj
    }, {})
})()
let arrClone = new Map()
let deepClone = (data) => {
    if (arrClone.get(data)) {
        console.log('1', arrClone)
        debugger
        return data
    } else if (cloneFunctions[`${getType(data)}`]) {
        let cloneTarget = cloneFunctions[`${getType(data)}`](data)
        arrClone.set(data, cloneTarget)
        console.log('2', arrClone)
        return cloneTarget
    } else {
        return data
    }
}
let obj = { a: { a: { a: { a: { a: { a: { a: { a: { a: { a: { a: { a: { a: { a: { a: 1 } } } } } } } } } } } } } } }
// obj['b'] = obj
deepClone(obj)

const fun = (type) => {
    switch (type) {
        case 1:
            return 1
        case 2:
            return {}
        case 3:
            return []
        case 4:
            return new Set()
        case 5:
            return new Map()
        case 6:
            return new Symbol('666')
        case 7:
            return new WeakMap()
        case 8:
            return new WeakSet()
        case 9:
            return
        case 10:
            return
        case 11:
            return
        case 12:
            return
        case 13:
            return
        case 14:
            return
        case 15:
            return
        case 16:
            return
        case 17:
            return
        case 18:
            return
        case 19:
            return
        case 20:
            return
        case 21:
            return
        case 22:
            return
        default:
            throw new Error()
    }
}
const funs = {
    1: () => 1,
    2: () => ({}),
    3: () => [],
    4: () => new Set(),
    5: () => new Map(),
    6: () => new Symbol('666'),
    7: () => new WeakMap(),
    8: () => new WeakSet(),
    22: () => undefined
    //...
}
const fun2 = (type) => {
    if (funs[`${type}`]) {
        funs[`${type}`]()
    } else {
        throw new Error()
    }
}

let inte = setInterval(() => {
    console.log('fun1')
    console.time()
    for (let i = 0; i < 10000; i++) {
        fun(22)
    }
    console.timeEnd()
    console.log('fun2')
    console.time()
    for (let i = 0; i < 10000; i++) {
        fun2(22)
    }
    console.timeEnd()
}, 1000)

const getRegOld = (str) =>
    new RegExp(
        str.split('').reduce(
            (str, code) =>
                (/[^0-9a-zA-Z]/.test(code) && code.length)
                    ? str + '\\' + code
                    : str + code
            , ''
        )
    )

const getReg = (str) =>
    new RegExp(
        str.replaceAll(/[\*\.\?\+\$\^\{\}\[\]\|\\\/\(\)]/g,
            (replacedCode) => '\\' + replacedCode
        )
    )
let str = ''
for (let i = 0; i < 100000; i++) {
    str = str + String.fromCharCode(i)
}
if (getReg(str).test(str)) {
    console.log('success')
} else {
    console.log('failed')
}
let insertParam = Symbol('insertParam')
let curry = (fun, ...args1) => {
    let getParaLen = (argsArr) => argsArr.reduce((preLen, arg) =>
        arg !== insertParam
            ? 1 + preLen
            : preLen
        , 0)
    let runFun = (...args) => {
        let funLen = fun.length
        return fun.apply(
            this,
            args.map(arg =>
                arg === insertParam
                    ? args[funLen++]
                    : arg
            )
        )
    }
    return getParaLen(args1) >= fun.length
        ? runFun.apply(this, args1)
        : (
            function curried(...args2) {
                return getParaLen(args1.concat(args2)) >= fun.length
                    ? runFun.apply(this, args1.concat(args2))
                    : (...args3) => curried.apply(this, args2.concat(args3))
            }
        )
}

const _ = Symbol('insertParam')//或者new Object()
let curry = (fun) => {
    let getParaLen = (argsArr) => argsArr.reduce((preLen, arg) =>
        arg !== _
            ? 1 + preLen
            : preLen
        , 0)
    let runFun = function (...args) {
        let funLen = fun.length
        let argsForRun = []
        for (let i = 0; i < fun.length; i++) {
            argsForRun.push(
                args[i] === _
                    ? args[funLen++]//取位于fun.length的参数“蹲坑”,并且下一次取下一个参数
                    : args[i]
            )
        }
        return fun.apply(this, argsForRun)
    }
    return (
        function curried(...args1) {
            return getParaLen(args1) >= fun.length
                ? runFun.apply(this, args1)
                : (...args2) => curried.apply(this, args1.concat(args2))
        }
    )
}
//测试
let fn = curry((a,b,c,d,e)=>[a,b,c,d,e])
console.log(fn(_, 2, 3, 4, 5)(1));
console.log(fn(1, _, 3, 4, 5)(2));
console.log(fn(1, _, 3)(_, 5)(2)(4));
console.log(fn(1, _, _, 4)(_, 2)(3)(5));
console.log(fn(_, 2)(_, _, 5)(1)(3)(4))



function add(){
    let args = [...arguments]
    function added(){
        args = args.concat([...arguments])
        return added
    }
    added.toString = function(){
        console.log('toString')
        return args.reduce((prev,next)=>{
            return prev+next
        },0)
    }
    return added
}

console.log(add(1)(2)(3)(4,5))

class ListNode {
    constructor(value,next=null){
        this.value = value
        this.next = next
    }
}
class LinkedList{
    constructor(){
        this.length = 0
        this.head = null
    }
    append(value){
        if(this.head){
            let current = this.head
            while(current.next){
                current = current.next
            }
            current.next = new ListNode(value)
        }else{
            this.head = new ListNode(value)
        }
        this.length++
    }

}
let linkedList = new LinkedList()
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
linkedList.append(4)
console.log(linkedList)