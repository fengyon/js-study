/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-30 10:27:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-30 10:28:07
 */
const defaultTageRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function genProps(attrs) {
    let str = ''
    for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (attr.name === 'style') {
            let obj = new Object()
            attr?.value?.split(';').forEach(item => {
                let [key, value] = item.split(':')
                obj[key] = value
            })
            attr.value = obj
        }
        str += `,${attr.name}:${JSON.stringify(attr.value)}`
    }
    return `{${str.slice(1)}}`
}
function gen(node){
    if(node.type === 1){
        //元素标签
        return generate(node)
    }else{
        let text = node.text
        let tokens = []
        let match,index
        //每次的偏移量 buffer.split()
        //全局匹配，每次匹配完需要将lastIndex置为0
        let lastIndex = defaultTageRE.lastIndex = 0
        while ((match = defaultTageRE.exec(text))) {
            index = match.index
            if(index > lastIndex){
                tokens.push(JSON.stringify(text.slice(lastIndex,index)))
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length
        }
        if(lastIndex < text.length){
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return `_v(${tokens.join('+')})`
    }
}
function genChildren (el){
    let {children} = el
    if(children?.length){
        return `${children.map(c=>gen(c)).join(',')}`
    }else{
        return false
    }
}
export function generate(el) {
    let children = genChildren(el)
    let code = `_c("${el.tag}",${el?.attrs?.length
            ? genProps(el.attrs)
            : 'undefined'
        }${
            children 
            ? `,${children}`
            : ''
        })`
    return code
}