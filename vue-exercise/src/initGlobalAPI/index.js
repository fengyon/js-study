/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-30 11:08:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-02 10:45:06
 */
import {mergeOptions} from '../util/index'
import {initMixin} from './mixin'
import initAssetRegisters from './assets'
import {ASSETS_TYPE} from './const'
import initExtend from './initExtend.js'
export function initGolabalAPI(Vue){
    //整合了所有的全局相关的内容
    Vue.options = {}
    initMixin(Vue)
    ASSETS_TYPE.forEach(type=>{
        Vue.options[type+'s'] = {}
    })
    Vue.options._base = Vue
    //注册extend方法
    initExtend(Vue)
    initAssetRegisters(Vue)
}