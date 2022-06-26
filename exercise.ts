/*
 * @Author: your name
 * @Date: 2021-06-12 10:20:26
 * @LastEditTime: 2021-08-21 23:06:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fyg1234.github.io\exercise.ts
 */
const parseDecToDigits = (num: number, digits: number, codeArr: string[])
    : string => {
    if (digits === 10) {
        return String(num)
    }
    const getCode = (num: number): string => codeArr[num]
    let str: string = getCode(num % digits)
    while (num >= digits) {
        num = Math.floor(num / digits)
        str = getCode(num % digits) + str
    }
    return str
}
const parseToDec = (str: string, digits: number, codeArr: string[]) => {
    if (digits === 10) {
        return Number(str) || 0
    }
    const getNum = (code: string): number => Number(codeArr.findIndex(c => c === code)) || 0
    let sum = str.split('').reduce(
        (preSum: number, code, index) => preSum
            + getNum(code)
            * Math.pow(digits, str.length - index - 1)
        , 0)
    return sum
}
/**
 * @description: 
 * @param {string} fromStr  需要转换的数值
 * @param {string[]} fromCodes  转换数值对应的字符数组,如[0,1,2,3...]
 * @param {number} fromDigit   转换数值所在的进制
 * @param {number} toDigit  需要转换的目标进制
 * @param {string[]} toCodes 转换后数值对应的字符数组，如[0,1,2...]
 * @return {string} 
 */
const parseDigit = //转换成10进制，再转换成其他进制
    (fromStr: string | number,
        fromCodes: string[],
        fromDigit: number,
        toDigit: number,
        toCodes: string[]) =>
        parseDecToDigits(
            parseToDec(fromStr.toString(), fromDigit, fromCodes),
            toDigit,
            toCodes
        )
const getColumnByNum = (num) => {
    let codeArr = []
    //将codeArr变为[A,B,C...Z]
    for (let i = 0; i < 26; i++) {
        codeArr.push(String.fromCharCode('A'.charCodeAt(0) + i))
    }
    return parseDecToDigits(num, 26, codeArr)
}

type keys = '1' | '2' | '3'
type obj = {
    a: number,
    b: number
}
interface A {
    a: number
}
type Flags = {
    [key in keys]: boolean
}

interface B {
    b: number
}
let obj: A & B = { a: 1, b: 2 }
function unproxify<T>(t: any): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}
unproxify('')


const isPlandirm = (num) => {
    if (num < 0) {
        return false
    }
    let arr = [num % 10]
    let current = num
    while (current > 9) {
        current = Math.floor(current / 10)
        arr.push(current % 10)
    }
    let left = 0
    let right = arr.length - 1
    while (right > left) {
        if (arr[right] != arr[left]) {
            return false
        }
        left++
        right--
    }
    return true
}