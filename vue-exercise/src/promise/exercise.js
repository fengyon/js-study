// 重头实现promise

//promise的三个状态
const status = { PENDING: 'PENDING', RESOLVED: 'RESOLVED', REJECTED: 'REJECTED' }
// promise
class MyPromise {
    //构造参数为一个函数，函数中的两个参数是resolve,reject
    constructor(excutor) {
        this.status = status.PENDING
        this.value = undefined
        this.reason = undefined

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        //箭头函数 自动绑定this为创建时的this
        let reject = (reason) => {
            if (this.status === status.PENDING) {
                this.reason = reason
                this.status = status.REJECTED
                //异步执行回调
                setTimeout(()=>{
                    this.onResolvedCallbacks.forEach(fn=>fn())
                },0)
            }
        }
        let resolve = (value) => {
            if (this.status === status.PENDING) {
                this.value = value
                this.status = status.RESOLVED
                setTimeout(()=>{
                    this.onRejectedCallbacks.forEach(fn=>fn())
                },0)
            }
        }
        try{
            excutor((value)=>{
                resolve(value)
            },reject)
        }catch(e){
            reject(e)
        }
    }
    then(onFufilled,onRejected){
        
    }
}