/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-30 17:31:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-30 17:38:49
 */
import { nextTick } from '../util/next-tick'
let queue = []
let has = {}
function flushSchedularQueue() {
    queue.forEach(watcher => watcher.run())
    queue = []
    has = {}
}
export function queueWathcer(watcher) {
    const { id } = watcher
    if (has[id] == null || has[id] == undefined) {
        queue.push(watcher)
        has[id] = true

        // vue.nextTick = promise->mutationObserver ->setImmediate->setTimeout
        nextTick(flushSchedularQueue)
    }
}