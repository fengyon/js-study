import { isObject,isReservedTag } from "../util/index"
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-30 09:16:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-02 14:11:10
 */
export function createElement(vm,tag, data = {}, ...children) {
    // ast -> render ->调用
    let key = data.key
    if (key) {
        delete data.key
    }
    if (isReservedTag(tag)) {
        return vnode(tag, data, key, children, undefined)
    }else{
        //找到这个组件
        let Ctor = vm.$options.components[tag]
        return createComponent(vm,tag,data,key,children,Ctor)
    }
    //标签比较好表示 
    //组件有 名字、上下文
}
function createComponent(vm,tag,data,key,children,Ctor){
    if(isObject(Ctor)){
        Ctor = vm.$options._base.extend(Ctor)
    }
    data.hook = {
        init(vnode){
            // 当前组件的实例 就是 componentInstance
            let child = vnode.componentInstance = new Ctor({
                _isComponent:true
            })
            //  组件的挂载
            child.$mount()
        },
        inserted(){
            
        }
    }
    return vnode(`vue-component-${Ctor.cid}-${tag}`,data,key,undefined,{
        Ctor,
        children
    })
}

export function createTextNode(vm,text) {
    return vnode(undefined, undefined, undefined, undefined, text)
}
function vnode(tag, data, key, children, text,componentOptions) {
    return {
        tag,
        data,
        key,
        children,
        text,
        componentOptions
    }
}
//虚拟节点 用自己定义的对象描述dom节点