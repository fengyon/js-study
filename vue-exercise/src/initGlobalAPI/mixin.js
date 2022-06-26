/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-08-02 09:05:01
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-02 09:06:50
 */
import {mergeOptions} from '../util/index'
export function initMixin(Vue){
    Vue.mixin = function(mixin){
        //如何实现两个对象的合并
        this.options = mergeOptions(this.options,mixin)
    }
}