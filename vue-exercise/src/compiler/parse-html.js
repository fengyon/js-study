const ncname = '[a-zA-z_][\\-\\.0-9_a-zA-Z]*';//abc-aaa
// ?: 匹配不捕获
const qnameCapture = `((?:${ncname}\\:)?${ncname})` //<abc:>
const startTageOpen = new RegExp(`^<${qnameCapture}`);  //匹配标签开头
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)  //匹配标签结尾

//匹配属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^"]*)'+|([^\s"'=<>`]+)))?/
//匹配自闭标签
const startTageClose = /^\s*(\/?)>/
//匹配
const defaultTageRE = /\{\{((?:.|\r?\n)+?)\}\}/g


export function parseHTML(html) {
    let root = null
    let currentParent
    let stack = []
    const ELEMENT_TYPE = 1;
    const TEXT_TYPE = 3

    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,
            type: ELEMENT_TYPE,
            children: [],
            attrs,
            parent: null
        }
    }

    function start(tagName, attrs) {
        let element = createASTElement(tagName, attrs)
        if (!root) {
            root = element
        }
        currentParent = element //当前元素标记为父元素
        stack.push(element)
    }
    function end(tagName) {
        let element = stack.pop()
        if (element.tag !== currentParent.tag) {
            console.error('元素嵌套错误',
                'start:',
                currentParent.tag,
                ';end:', tagName)

        } else {
            if (stack.length > 0) {

                currentParent = stack[stack.length - 1]
                element.parent = currentParent
                currentParent.children.push(element)
            }
        }
    }
    function chars(text) {
        text = text.replace(/^\s*/, '').replace(/\s*$/, '')
        if (text) {
            currentParent.children.push({
                text,
                type: TEXT_TYPE
            })
        }
    }
    while (html) {
        let textStart = html.indexOf('<')
        if (textStart == 0) {
            let startTagMatch = parseStartTag();
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue // 如果开始标签匹配完毕后 继续下一次 匹配
            }
            let endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }
        }
        if (textStart > -1) {
            let text = html.substring(0, textStart)
            if (text) {
                advance(text.length)
                chars(text)
            }
        }
    }
    function parseStartTag() {
        let start = html.match(startTageOpen)
        if (start) {
            advance(start[0].length)
            let end, attr;
            let match = {
                tagName: start[1],
                attrs: []
            }
            while (!(end = html.match(startTageClose))
                && (attr = html.match(attribute))) {
                advance(attr[0].length)
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
            }
            if (end) { //去掉开始标签的>
                advance(end[0].length)
                return match

            }
        }
    }
    function advance(n) {
        html = html.substring(n)
    }
    return root
    // console.log(html)
}