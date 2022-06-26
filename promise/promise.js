
const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const resolvePromise = (promise, returnedValue, resolve, reject) => {
    if (promise === returnedValue) {
        reject(new TypeError('返回自身错误'))
    }
    try {
        //判断返回值是否为 promise
        if (
            (
                (typeof returnedValue === 'object'
                    && returnedValue !== null)
                || typeof returnedValue === 'function'
            )
            && returnedValue.then) {
            //如果是promise，需要执行其的构造参数
            setTimeout(() => {
                let x = returnedValue.then()
                resolvePromise(returnedValue, x, resolve, reject)
            }, 0);
        } else {
            resolve(returnedValue)
        }
    } catch (e) {
        reject(e)
    }
}
class MyPromise {
    constructor(executor) {
        this.status = PENDING
        this.data = null
        this.reason = null

        //执行方法的数组，用来执行多个 then
        this.onFulfilleds = []
        this.onRejects = []

        let resolve = (data) => {
            setTimeout(() => {
                if (this.status !== PENDING) return
                this.status = RESOLVED
                this.data = data
                this.then()
            }, 0);
        }
        let reject = (reason) => {
            setTimeout(() => {
                if (this.status !== PENDING) return
                this.status = REJECTED
                this.reason = reason
                this.then()
            }, 0);
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onFulfilled, onReject) {
        if (this.status === RESOLVED) {
            this.onFulfilleds.forEach(fn => fn(this.data))
        } else if (this.status === REJECTED) {
            this.onRejects.forEach(fn => fn(this.reason))
        } else {
            console.log(this.onFulfilleds, this.onRejects)
            this.onFulfilleds.push((data) => {
                onFulfilled(data)
            })
            this.onRejects.push((reason) => {
                onReject(reason)
            })
        }
        return new MyPromise(() => { })
    }
}

let myPro = new MyPromise((resolve, reject) => {
    resolve(new MyPromise((resolve)=>resolve(1)))
    reject(2)
})
myPro.then(data => console.log('myPromise', data), reason => console.log('MyPromise', reason))
myPro.then(data => console.log('myPromise2', data), reason => console.log('MyPromise2', reason))
setTimeout(() => {
    console.log(myPro)
}, 10);
/*
new Promise((resolve, reject) => {
    reject(2)
    resolve(1)
}).then(data => {
    console.log('promise', data)
    return data + 1
}, data => {
    console.log('promise', data)
    return data + 1
}).then(data => console.log('resolve', data), reason => console.log('reason', reason))
*/
// new Promise((resolve) => resolve(new Promise(resolve => resolve(1)))).then(data => console.log('returnPromise', data))