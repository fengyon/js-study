/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-02 11:03:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-30 16:43:19
 */
//导致数组发生变化的方法 push shift unshift
// pop reverse  sort splice
const arrayProto = Array.prototype
const noObserveMethods = [
    'shift',
    'pop',
    'reverse',
    'sort',
    'splice'
]
export const arrayMethods = noObserveMethods.reduce((preMethods,methodKey)=>{
    preMethods[methodKey] = function (...args){
        let ob = this.__ob__
        arrayProto[methodKey].apply(this,args)
        ob.dep.notify()
    }
    return preMethods
},{
    push: function (...args) {
        arrayProto.push.apply(this, args)
        let ob = this.__ob__ 
        ob.observeArray(args)
        ob.dep.notify()
    },
    unshift: function (...args) {
        arrayProto.unshift.apply(this, args)
        let ob = this.__ob__ 
        ob.observeArray(args)
        ob.dep.notify()
    }
})
arrayMethods.__proto__ = arrayProto
export default arrayMethods;