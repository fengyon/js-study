class Sheduler {
  constructor() {
    this.runCount = 0
    this.callbacks = []
  }
  add(creator) {
    let promise;
    if (this.runCount <= 1) {
      promise = new Promise(creator)
      this.runCount++
    } else {
      let resovle, reject;
      console.log('执行队列满了，先存起来')
      promise = new Promise((res, rej) => {
        resovle = res
        reject = rej
      })
      this.callbacks.push({
        creator,
        resovle,
        reject
      })
    }
    promise.then(this.run)
    return promise
  }
  run(r) {
    this.runCount--;
    console.log(`${r}执行成功了，去看一下有库存没有`)
    while (this.runCount < 2 && this.callbacks.length > 0) {
      const {
        creator,
        resovle,
        reject
      } = this.callbacks.shift();
      creator(resovle, reject);
      this.runCount++
    }
  }
}
let creators = [
  (r) => setTimeout(() => r(0), 200),
  (r) => setTimeout(() => r(1), 100),
  (r) => setTimeout(() => r(2), 300),
  (r) => setTimeout(() => r(3), 400)
]
const sheduler = new Sheduler()
creators.forEach((creator, index) => {
  console.log(`第${index}个任务尝试加入队列`)
  sheduler.add((...args) => {
    console.log(`第${index}个任务开始执行了`)
    creator(...args)
  }).then(() => {
    console.log(`第${index}个then开始执行了`)
  })
})