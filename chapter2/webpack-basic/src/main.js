// CommonJS规范  在浏览器中不支持
// let a = require('./a.js')

// ES6的导入导出语法规范
import a from './a.js'

// 引入css
import './css/index.css'
import './css/b.css'

// 引入less
import './less/index.less'
// 引入sass
import './scss/index.scss'

// 引入bootstrap的css文件
import 'bootstrap/dist/css/bootstrap.css'

// console.log(a)
// console.log('黑马程序员真牛逼!')
// console.log('黑马程序员真牛逼! 是的牛逼!!!')

// console.log('黑马程序员真牛逼! 是的牛逼!!!嘿嘿嘿')
// console.log('黑马程序员真牛逼! 是的牛逼!!!嘿嘿嘿123567')

// window.onload = function() {
//   document.querySelector('ul').style.listStyle = 'none'
//   document.querySelector('li').style.backgroundColor = 'yellow'
// }

// setTimeout(function() {
//   // 如果是function 内部this直接指向window
//   console.log('没用箭头函数, 一秒后我执行了')
// }, 1000)

// setTimeout(() => {
//   console.log('我是用了箭头函数的setTimeout')
// }, 1000)

// // ES6提供了class关键字 是原型的语法糖
// class Person {
//   constructor (name) {
//     this.name = name
//   }
// }

// let p = new Person('小黑')
// console.log(p)

// class Dog {
//   // 创建Dog对象时默认的name为大黄
//   name = '大黄'
//   static color = 'yellow'
// }

// let d = new Dog()
// console.dir(d)
// console.dir(Dog)

function *fn() {
  yield 1
  yield 2
  return 3
}

let newFn = fn()
console.log(newFn.next()) // 1
console.log(newFn.next()) // 2
console.log(newFn.next()) // 3
// console.log(newFn.next()) // undefined

// let arr = []
// arr.forEach()
// arr.some()
// arr.reduce()
// arr.includes()

import '@babel/polyfill'

// String.prototype.indexOf
let str = '123'
// JS是一门动态语言, 在代码执行时可以随时为对象添加属性或方法
// babel在看到对象调用方法时默认不会进行转换
// includes这样的新方法, 默认不会转换
console.log(str.includes('2'))