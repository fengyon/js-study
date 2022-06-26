const str = "Hello Word"
// 可读性好
console.log(str.split('').reverse().join(''))
// 性能好
let reversedStr = '', i = str.length - 1
while (i > -1) reversedStr += str[i--]
console.log(reversedStr)