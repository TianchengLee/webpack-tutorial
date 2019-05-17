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

import str from './hotmodule.js'
console.log(str)

if (module.hot) {
  module.hot.accept('./hotmodule.js', function () {
    // 当hotmodule模块内容更新时触发
    // console.log('hotmodule被更新了!')
    // import / export语法必须在顶级作用域中使用,无法在子级作用域中使用
    // import str from './hotmodule'
    var hotmodule = require('./hotmodule.js')
    console.log(hotmodule)
  })
}
