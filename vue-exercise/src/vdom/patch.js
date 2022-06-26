/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-30 09:33:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-03 17:55:20
 */

export function patch(oldVnode, vnode) {
    // 1.判断是更新还是要渲染 old是否是真实dom
    //说明是组件的挂载
    if (!oldVnode) {
        //创建虚拟节点并返回
        return createElm(vnode)
    }
    const isRealElement = oldVnode?.nodeType;
    if (isRealElement) {
        const oldElm = oldVnode
        const parentElm = oldElm.parentNode

        let el = createElm(vnode)
        parentElm.insertBefore(el, oldElm.nextSibling)

        parentElm.removeChild(oldElm)
        //需要将渲染好的返回
        return el
    } else {
        if (oldVnode.tag !== vnode.tag) {
            //标签不一致,直接替换即可
            oldVnode
                .el.parentNode
                .replaceChild(createElm(vnode), oldVnode.el)
        } else
            //文本情况
            if (!oldVnode.tag) {
                if (oldVnode.text !== vnode.text) {
                    oldVnode.el.textContent = vnode.text
                }
            } else {

                //标签一致，不是文本(比对属性是否一致)
                let el = vnode.el = oldVnode?.el
                if (!el) {
                    console.log(vnode, oldVnode)
                }
                updateProperties(vnode, oldVnode.data)

                //比较儿子
                let oldChildren = oldVnode.children || []
                let newChildren = vnode.children || []
                if (oldChildren.length > 0
                    && newChildren.length > 0) {
                    //新老都有儿子
                    updateChildren(el, oldChildren, newChildren)
                } else if (newChildren.length > 0) {
                    //新的有子节点
                    for (let i = 0; i < newChildren.length; i++) {
                        let child = newChildren[i]
                        el?.appendChild(createElm(child))
                    }
                } else if (oldChildren.length > 0) {
                    el.innerHTML = ''
                }
            }
    }

}
function createComponent(vnode) {//初始化的作用
    //需要创建的实例
    let init = vnode?.data?.hook?.init
    if (init) {
        init(vnode)
    }
    if (vnode.componentInstance) {
        return true
    }
    return false
}
/**
 * @description: 根据虚拟节点创建真实的节点
 * @param {*} vnode
 * @return {*}
 */
export function createElm(vnode) {
    //
    let { tag, children, key, data, text } = vnode
    if (typeof tag === 'string') {

        //尝试实例化组件,判断实例化组件是否成功
        if (createComponent(vnode)) {
            return vnode.componentInstance.$el
        }
        vnode.el = document.createElement(tag)
        //递归创建儿子节点
        updateProperties(vnode)
        children?.forEach(child => {
            vnode.el.appendChild(createElm(child))
        })
        // //比较儿子
        // let oldChildren = oldVnode.children || []
        // let newChildren = vnode.children || []
        // if (oldChildren.length > 0
        //     && newChildren.length > 0) {
        //     //新老都有儿子
        //     updateChildren(el,oldChildren,newChildren)
        // } else if (newChildren.length > 0) {
        //     //新的有子节点
        //     for(let i = 0;i<newChildren.length;i++){
        //         let child = newChildren[i]
        //         el.appendChild(createElm(child))
        //     }
        // } else if(oldChildren.length > 0){
        //     el.innerHTML = ''
        // }
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}
function updateProperties(vnode, oldProps = {}) {
    let newProps = vnode.data || {}
    let el = vnode.el

    let newStyle = newProps.style || {}
    let oldStyle = oldProps.style || {}
    for (let key in oldStyle) {
        if (!newStyle[key]) {
            el.style[key] = ''
        }
    }

    for (let key in oldProps) {
        //老的有，新的没有，把老的删除
        if (!newProps[key]) {
            el.removeAttribute(key)
        }
    }
    //以新的为准
    for (let key in newProps) {
        if (key === 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key === 'class') {
            el.className = newProps.class
        } else {
            el.setAttribute(key, newProps[key])
        }
    }
}
/**
 * @name: 
 * @test: test font
 * @msg: 
 * @param {*} oldVnode
 * @param {*} newVnode
 * @return {*}
 */
function isSameVnode(oldVnode, newVnode) {
    return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key)
}
/**
 * @name: 
 * @test: test font
 * @msg: 
 * @param {*} parent
 * @param {*} oldChildren
 * @param {*} newChildren
 * @return {*} 
 */
function updateChildren(parent, oldChildren, newChildren) {

    // vue采用的是双指针的方式
    let oldStartIndex = 0
    let oldStartVnode = oldChildren[0]
    let oldEndIndex = oldChildren.length - 1
    let oldEndVnode = oldChildren[oldEndIndex]

    let newStartIndex = 0
    let newStartVnode = newChildren[0]
    let newEndIndex = newChildren.length - 1
    let newEndVnode = newChildren[newEndIndex]

    //有一组指针重合则停止循环
    let index = 100
    //有相同的 每次循环必须要减少一个新的、老的
    const makeIndexMapByChildren = (children) => children.reduce(
        (map, child, index) => {
            //undefined则不创建map
            child.key && (map[child.key] = index)
            return map
        },
        {})
    let map = makeIndexMapByChildren(oldChildren)
    while (oldStartIndex <= oldEndIndex
        && newStartIndex <= newEndIndex
        && (--index) > 0) {
        //头部比较，优化向后插入的情况
        if (!oldStartVnode) {
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndVnode]
        } else
            if (isSameVnode(oldStartVnode, newStartVnode)) {
                //如果是同一个元素 需要比对这个元素的属性
                patch(oldStartVnode, newStartVnode)
                console.log(oldStartVnode, newStartVnode,'sameHead')
                oldStartVnode = oldChildren[++oldStartIndex]
                newStartVnode = newChildren[++newStartIndex]
                //尾部比较，优化向前插入的情况
            } else if (isSameVnode(oldEndVnode, newEndVnode)) {
                patch(oldEndVnode, newEndVnode)

                oldEndVnode = oldChildren[--oldEndIndex]
                newEndVnode = newChildren[--newEndIndex]
                //头移尾 还可以 优化倒序变正序
                //比较新头旧尾
            } else if (isSameVnode(oldStartVnode, newEndVnode)) {
                patch(oldStartVnode, newEndVnode)
                parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
                oldStartVnode = oldChildren[++oldStartIndex]
                newEndVnode = newChildren[--newEndIndex]
                //尾移头
                //比较新尾旧头
            } else if (isSameVnode(oldEndVnode, newStartVnode)) {
                patch(oldEndVnode, newStartVnode)
                parent.insertBefore(oldEndVnode.el, oldStartVnode.el)
                oldEndVnode = oldChildren[--oldEndIndex]
                newStartVnode = newChildren[++newStartIndex]
            }
            else {
                //都不一样，需要暴力比对 乱序问题
                let moveIndex = map[newStartVnode.key]
                if(newStartVnode.key.toLocaleLowerCase() === 'b'){
                    console.log('B',newStartVnode,oldStartVnode)
                }
                if (moveIndex) {
                    //找到了相同key的元素 则直接将元素移走 
                    //并将当前位置的元素删除
                    let moveVnode = oldChildren[moveIndex]
                    //需要在前面判断是否为空
                    //占位，可以不用更改index
                    oldChildren[moveIndex] = undefined
                    parent.insertBefore(moveVnode.el, oldStartVnode.el)
                    patch(moveVnode, newStartVnode)
                } else {//没找到相同key 不需要复用
                    parent.insertBefore(createElm(newStartVnode), oldStartVnode.el)
                }
                newStartVnode = newChildren[++newStartIndex]
            }
    }
    //新节点尚未查找完，需插入
    //将新增的元素直接插入 可能往前也可能往后
    for (let i = newStartIndex; i <= newEndIndex; i++) {
        let el = newChildren[newEndIndex + 1]
            ? newChildren[newEndIndex + 1].el
            : null
        parent.insertBefore(createElm(newChildren[i]), el)
    }
    //旧节点尚未查找完，说明这部分节点不需要
    //需删除旧节点尚未比对的节点
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
        oldChildren[i] === undefined || parent.removeChild(oldChildren[i].el)
    }

}