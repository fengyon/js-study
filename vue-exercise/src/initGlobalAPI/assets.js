/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-08-02 09:10:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-02 09:26:53
 */
import {ASSETS_TYPE} from './const'
export default function initAssetRegisters(Vue){
    ASSETS_TYPE.forEach(type=>{
        Vue[type] = function(id,definition){
            if(type === 'component'){
                //注册全局组件
                //使用extend方法 将对象变成构造函数
                // 子组件可能也有这个VueCOmponent.component方法
                definition = this.options._base.extend(definition)
            }else if(type === 'filter'){

            }else if(type === 'deirective'){

            }
            this.options[`${type}s`][id] = definition
        }
    })
}