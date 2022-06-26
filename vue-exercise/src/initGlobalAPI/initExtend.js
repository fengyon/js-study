import { mergeOptions } from "../util/index"

/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-08-02 09:28:01
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-02 11:11:33
 */
export default function initExtend(Vue){

    // 为什么要有子类和父类  new Vue (Vue的构造函数)
    // 创建子类 继承于父类 扩展的时候都扩展到自己的属性上
    let cid = 0
    Vue.extend = function (extendOptions){
        const Sub = function VueComponent(options){
            this._init(options)
        }
        //此方法会改变子类的构造函数，是一个缺陷，需要手动更改
        //不直接赋值，直接赋值后子类会影响父类
        Sub.cid = cid++
        Sub.prototype = Object.create(this.prototype)
        Sub.prototype.constructor = Sub
        Sub.options = mergeOptions(
            this.options,
            extendOptions
        )
        return Sub
    }
}