import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';


export default {
    input: './src/index.js',
    output: {
        file: 'dist/umd/vue.js',//出口文件
        name: 'Vue',//指定打包后全局变量的文字
        format: 'umd',//统一模块规范
        sourcemap: true,  //es6->es5 开启源码调试，定位代码报错位置
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        process.env.ENV === 'development'
            ? serve({
                open: true,
                openPage: '/public/index.html',
                port: 3000,
                contentBase: ''
            })
            : null
    ]
}