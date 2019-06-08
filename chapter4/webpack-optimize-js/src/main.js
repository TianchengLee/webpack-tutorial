// import vue from 'vue' // runtime-only 的 vue 包
// import Vue from 'vue/dist/vue.js' // 完整版的vuejs
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

// const homeComponent = {
//   template: '<h2>我是homeaaa页面,你好哇!!!黑马程序员!!!!!!嘿嘿嘿!!!哇 好厉害哦!</h2>'
// }

// const newsComponent = {
//   template: '<h2>我是newsheiheihei页面</h2>'
// }

// const router = new VueRouter({
//   routes: [
//     {
//       path: '/home',
//       component: homeComponent
//     },
//     {
//       path: '/news',
//       component: newsComponent
//     }
//   ]
// })

// new Vue({
//   el: '#app',
//   data: {
//     msg: 'helloworld'
//   },
//   router
// })

// import moment from 'moment'
// // 手动引入语言包
// import 'moment/locale/zh-cn'
// // 设置语言
// moment.locale('zh-CN')
// console.log(moment().subtract(6, 'days').calendar())


// 静态导入
// import $ from 'jquery'
// import和export必须写在顶级作用域中,否则会报错,因为是静态导入
// let a = 1
// if (a = 1) {
//   import $ from 'jquery'
// } else {
//   import $ from 'webpack'
// }

// import 'bootstrap'

// 需求: 当用户点击按钮时  添加一个div
// $(function() {
//   $('#btn').click(function() {
//     $('<div></div>').html('我是main').appendTo('body')
//   })
// })

// import a from './a.js'
// console.log(a.name)

// window.onload = function() {
//   document.getElementById('btn').onclick = function() {
//     // 当用户点击按钮时才会执行
//     $('<div></div>').html('我是main').appendTo('body')
//   }
// }


// import('jquery') 其实返回的就是一个promise对象
// function getComponent() {
//   return import('jquery').then(({ default: $ }) => {
//     // 执行resolve时就表示jQuery导入完成了
//     return $('<div></div>').html('我是main')
//   })
// }

// getComponent().then(item => {
//   item.appendTo('body')
// })



window.onload = function () {
  document.getElementById('btn').onclick = function () {
    // 当用户点击按钮时才会执行
    getComponent().then(item => {
      item.appendTo('body')
    })
  }
}

// 动态导入
function getComponent() {
  return import(/* webpackPrefetch: true */ 'jquery').then(({ default: $ }) => {
    return $('<div></div>').html('我是main')
  })
}