// 其实loader 就是一个函数
// 使用loader1  将js文件中所有的今天 替换成 明天
module.exports = function(source) {
  console.log('我是loader3')
  // loader处理完后需要把处理的结果返回
  return source.replace(/今天/g, '昨天')
}