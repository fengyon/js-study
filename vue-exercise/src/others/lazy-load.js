/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-08-04 17:52:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-04 17:52:52
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-08-04 14:44:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-04 17:30:52
 */
const getScrollParent = (el) => {
    let parent = el.parentNode
    let htmlNode = document.body.parentNode
    while (parent !== htmlNode) {
        if (/(scroll)|(auto)/.test(window.getComputedStyle(parent)['overflow'])) {
            return parent
        }
        parent = parent.parentNode
    }
    return null
}
const loadImageAsync = (src, callback, errorHandler) => {
    try {
        let image = new Image()
        image.src = src
        image.onload = callback
        image.onerror = errorHandler
    } catch (e) {
        console.log(e)
        errorHandler(e)
    }
}
const Lazy = (Vue) => {
    class ReactiveListener {
        constructor({ el, src, options, elRender }) {
            this.el = el
            this.src = src
            this.options = options
            this.elRender = elRender
        }
        chechInView() {
            let { top } = this.el.getBoundingClientRect()
            return top < window.innerHeight * (this.options.preLoad || 1.3)
        }
        load() {
            loadImageAsync(this.src,
                () => {
                    this.elRender(this, 'finish')
                }, () => {
                    this.elRender(this, 'error')
                })
        }

    }
    return class LazyClass {
        constructor(options) {
            this.options = options
            this.bindHandler = false

            this.listenerQueue = []
            this.state = {
                laodding: false
            }
        }
        handleLazyLoad() {

            //判断是否需要显示图片
            this.listenerQueue.forEach(listener => {
                let catIn = listener.chechInView()
                catIn && listener.load()
            })
        }
        add(el, bindings, vnode) {
            Vue.nextTick(() => {
                let scrollParent = getScrollParent(el)
                if (scrollParent && !this.bindHandler) {
                    console.log(scrollParent)
                    this.bindHandler = true
                    scrollParent.addEventListener(
                        //scroll 触发需加高度
                        'scroll',
                        // this.handleLazyLoad.bind(this)
                        this.handleLazyLoad.bind(this)
                    )
                }
                const listener = new ReactiveListener({
                    el,
                    src: bindings.value,
                    options: this.options,
                    elRender: this.elRender.bind(this)
                })
                //把所有的人都创建一个实例 并放入队列
                this.listenerQueue.push(listener)
                this.handleLazyLoad()
            })
        }
        elRender(listener, state) {
            let el = listener.el
            let src = ''
            switch (state) {
                case 'loading':
                    src = listener.options.loading || ''
                    break
                case 'error':
                    src = listener.options.error || ''
                    break
                default:
                    src = listener.src
                    break
            }
            console.log(src)
            el.setAttribute('src', src)
        }

    }
}
const VueLazyLoad = {
    install(Vue, options) {
        const LazyClass = Lazy(Vue)
        const lazy = new LazyClass(options)
        Vue.directive('mylazy', {
            bind: lazy.add.bind(lazy)
        })
    }
}
let initBind = () => {
    Function.prototype.myBind = function (obj) {
        const that = this
        return function myBind(...args) {
            if (typeof obj === 'object'
                && obj !== null) {
                const initKey = '__fn__'
                let count = 0
                let key = initKey + count
                while (key in obj) {
                    count++
                    key = initKey + count
                }
                Object.defineProperty(obj, key, {
                    enumerable: false,
                    configurable: true,
                    value: that
                })
                let value = obj[key](...args)
                delete obj[key]
                return value
            } else if (typeof obj == 'number') {
                obj = new Number(obj)
                return myBind(...args)
            } else if (typeof obj == 'string') {
                obj = new String(obj)
                return myBind(...args)
            } else {
                return that(...args)
            }
        }
    }
    let a = function (ele) { console.log(this, ele); return 1 }
    a.myBind(1)(3)
}