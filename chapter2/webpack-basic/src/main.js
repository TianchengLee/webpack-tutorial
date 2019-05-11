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

console.log(a)
console.log('黑马程序员真牛逼!')
console.log('黑马程序员真牛逼! 是的牛逼!!!')

console.log('黑马程序员真牛逼! 是的牛逼!!!嘿嘿嘿')
console.log('黑马程序员真牛逼! 是的牛逼!!!嘿嘿嘿123567')

window.onload = function() {
  document.querySelector('ul').style.listStyle = 'none'
  document.querySelector('li').style.backgroundColor = 'yellow'
}

setTimeout(function() {
  // 如果是function 内部this直接指向window
  console.log('没用箭头函数, 一秒后我执行了')
}, 1000)

setTimeout(() => {
  console.log('我是用了箭头函数的setTimeout')
}, 1000)

// ES6提供了class关键字 是原型的语法糖
class Person {
  constructor (name) {
    this.name = name
  }
}

let p = new Person('小黑')
console.log(p)