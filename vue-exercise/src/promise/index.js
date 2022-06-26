
const PENDING = 'PENDING'
const REJECTED = 'REJECTED'
const RESOLVED = 'RESOLVED'
const resolvePromise = (promise, x, resolve, reject) => {
    //去掉循环引用
    if (x === promise) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    let called = false;
    //优化，保证能与其他promise库结合使用
    if ((typeof x === 'object' && x !== null)
        || typeof x === 'function') {
        try {
            //只取一次then，符合外界调用逻辑
            let then = x?.then
            //认为是一个promise
            if (typeof then === 'function') {
                //x.then 会再次取值，可能会导致错误
                then.call(x, y => {
                    //递归调用，直到把所有promise执行完
                    if (called) return
                    called = true
                    resolvePromise(promise, y, resolve, reject)
                }, e => {
                    if (called) return
                    called = true
                    reject(e)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            reject(e)
        }

    } else { //防止失败了再次成功
        if (called) return
        called = true
        resolve(x)
    }
}

class MyPromise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolveCallbacks = []
        this.onRejectedCallbacks = []
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks
                    .forEach(fn => fn())
            }
        }
        //resolve只有resolvePromsie中能直接使用，其他地方均需通过resolvePromise
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                try {
                    this.status = RESOLVED
                    this.onResolveCallbacks
                        .forEach(fn => fn())

                } catch (e) {
                    reject(e)
                }
            }
        }
        try {
            executor((value) => {
                resolvePromise(this, value, resolve, reject)
            }, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onFufilled, onRejected) {
        let promise2 = new MyPromise(
            (resolve, reject) => {
                if (this.status === RESOLVED) {
                    //外层try-catch无法捕获内部异步错误
                    setTimeout(() => {
                        try {
                            let x = onFufilled(this.value)
                            //x可能是一个promise
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                } else if (this.status === REJECTED) {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                } else {
                    this.onResolveCallbacks.push(() => {
                        try {
                            let x = onFufilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                    this.onRejectedCallbacks.push(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                }
            }
        )
        return promise2
    }
    static all(promiseList) {
        return new MyPromise((resolve, reject) => {
            let datas = []
            let leng = promiseList.length
            try {
                promiseList.forEach((promise, index) =>
                    datas &&
                    promise.then(
                        x => {
                            // console.log('promise', 'index:', index, ' ', x)
                            datas[index] = x
                            leng--
                            if (leng === 0) {
                                // console.log('promise0')
                                resolve(datas)
                            }
                        },
                        e => {
                            reject(e)
                            datas = null
                        }
                    )

                )

            } catch (e) {
                reject(e)
            }
        })
    }
    static race(promiseList) {
        return new MyPromise((resolve, reject) => {
            try {
                let isReturn = false
                for(let i = 0;i<promiseList.length;i++){
                    promiseList[i].then(
                        x => {
                            isReturn = true
                            resolve(x)
                        },
                        e => {
                            reject(e)
                            isReturn = true
                        }
                    )
                    if(isReturn){
                        break
                    }
                }
            } catch (e) {
                reject(e)
            }
        })
    }
    static catch(){
        
    }
}
let pro = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve(new MyPromise((resolve, reject) => resolve(1000))), 1000)
    return 'hello'
})
pro.then(data => {
    console.log(data)
    return new MyPromise(
        (resolve) =>
            resolve(
                new MyPromise((resolve) =>
                    resolve('return and resolvePromise')
                )
            )
    )
}, err => console.log(err))
    .then((data) => console.log(data))
pro.then(data => console.log('then2', data))
// setTimeout(() => {
//     pro.then(data=>console.log('无效then'))
// }, 100);
MyPromise.all([
    new MyPromise(resolve => resolve(0)),
    new MyPromise(resolve => resolve(1)),
    new MyPromise(resolve => resolve(2)),
    new MyPromise(resolve => resolve(3)),
    new MyPromise(resolve => resolve(4)),
    new MyPromise((resolve, reject) => reject('error'))
]).then(data => console.log(data), reason => console.log(reason))
MyPromise.race([
    new MyPromise(resolve => setTimeout(()=>resolve(100),100)),
    new MyPromise(resolve => setTimeout(()=>resolve(20),20)),
    new MyPromise(resolve => setTimeout(()=>resolve(30),30)),
    new MyPromise(resolve => setTimeout(()=>resolve(40),40)),
    new MyPromise(resolve => setTimeout(()=>resolve(50),50)),
    new MyPromise(resolve => setTimeout(()=>resolve(60),60)),
].reverse()).then(data => console.log(data), reason => console.log(reason))

new Promise((resolve)=>resolve(1))
