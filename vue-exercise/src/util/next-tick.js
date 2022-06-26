/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-30 17:35:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-02 08:57:24
 */
let callbacks = []
let waiting = false
function flushCallBacks() {
    let callback = callbacks.shift()
    callback && callback()
    if(waiting){
        //执行
        waiting = false                                                                                                                                                                              
    }else{

    }
}
export function nextTick(fn) {
    callbacks.push(fn)
    if (!waiting) {
        waiting = true
        setTimeout(flushCallBacks, 0);
    }
    
}