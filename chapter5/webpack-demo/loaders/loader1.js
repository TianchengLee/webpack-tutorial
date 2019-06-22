const loaderUtils = require('loader-utils')

// 其实loader 就是一个函数
// 使用loader1  将js文件中所有的今天 替换成 明天
module.exports = function(source) {
  // this.query已废弃，最新的api是使用loaderUtils.getOptions方法来获取
  // console.log('我是loader1', this.query)
  // loader处理完后需要把处理的结果返回
  // return source.replace(/今天/g, this.query.name)
  // let options = loaderUtils.getOptions(this)
  // console.log('我是loader1', this.query)
  // return source.replace(/今天/g, options.name || '明天')
  // return source.replace(/今天/g, '昨天')
  return source.replace(/今天/g, this.query.name || '昨天')
}