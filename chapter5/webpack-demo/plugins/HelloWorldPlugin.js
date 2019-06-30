// 1. 构造函数
// 2. prototype中需要有一个apply方法
module.exports = class HelloWorldPlugin {
  // 3. apply中有一个compiler的形参
  apply(compiler) {
    // console.log('HelloWorld')
    // 通过compiler对象可以注册对应的事件
    compiler.hooks.done.tap('HelloWorldPlugin', (stats) => {
      console.log('整个webpack打包结束了!!!', stats)
    })

    compiler.hooks.emit.tap('HelloWorldPlugin', (compilation) => {
      console.log('文件发射结束了!!!', compilation)
    })
  }
}
