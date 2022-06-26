/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-02 12:14:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-30 10:28:29
 */
import { parseHTML } from './parse-html'
import {generate} from'./generate'
export function compileToFunction(template) {
    //ast语法树 用对象描述原生语法的   虚拟dom 用对象描述dom节点
    //{tag: "div", type: 1, children: Array(3), attrs: Array(2), parent: null}
    let root = parseHTML(template.toString())
    //生成ast语法树后 生成render函数
    // _c("div",{id:"app"style:{"border":" 1px solid #fff"},_v("hello"),_c("p",undefined,_v(_s(name))),_c("p",undefined,_v(_s(age))))
    let code = generate(root)
    // console.log(code)
    let renderFun = new Function(` with(this){ return  ${code} }`)

    return renderFun
}