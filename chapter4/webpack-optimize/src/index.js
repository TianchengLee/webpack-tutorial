console.log('我是index.js')

// import $ from 'jquery' // node_modules/jquery/package.json > main

// console.log($, jQuery)

// console.log(window.$)

// $('body').css('backgroundColor', 'green')

// import { getUserInfo } from './api/http.js'
// getUserInfo().then(() => { }, (err) => {
//   console.log(err)
// })

// console.log(IS_DEV, test, test2)

// import axios from 'axios'
// axios.get('/api/getUserInfo')
// .then(result => console.log(result))

// console.log('嘿嘿嘿233')

// import str from './hotmodule.js'
// console.log(str)

// if (module.hot) {
//   module.hot.accept('./hotmodule.js', function () {
//     // 当hotmodule模块内容更新时触发
//     // console.log('hotmodule被更新了!')
//     // import / export语法必须在顶级作用域中使用,无法在子级作用域中使用
//     // import str from './hotmodule'
//     var hotmodule = require('./hotmodule.js')
//     console.log(hotmodule)
//   })
// }

// let math = require('./math.js')
// console.log(math)
// console.log(math.add(1, 2))

// import { add } from './math.js'
// console.log(add(1, 2))

// if (xxx === yyy) {
//   import {add} from './math.js'
// } else {
//   import {minus} from './math.js'
// }

// 动态导入 可以在if判断时进行导入
// require()

// let a = 1
// let b = 2
// let c = 3
// console.log(a + b + c)
// console.log(a, b, c)

import {a, b, c} from './constant.js'
// 类似于 预执行  将结果推断后打包放在这里
console.log(a + b + c)