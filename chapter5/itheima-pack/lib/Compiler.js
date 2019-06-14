const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const ejs = require('ejs')
class Compiler {
  constructor(config) {
    this.config = config
    this.entry = config.entry
    // 获取执行itheima-pack指令的目录
    this.root = process.cwd()
    // 初始化一个空对象, 存放所有的模块
    this.modules = {}
  }
  getSource(path) {
    return fs.readFileSync(path, 'utf-8')
  }
  depAnalyse(modulePath) {
    // console.log(modulePath)
    // 读取模块内容
    let source = this.getSource(modulePath)
    // console.log(source)

    // 准备一个依赖数组,用于存储当前模块的所有依赖
    let dependencies = []

    let ast = parser.parse(source)
    // console.log(ast.program.body)
    traverse(ast, {
      CallExpression(p) {
        if (p.node.callee.name === 'require') {
          // 修改require
          p.node.callee.name = '__webpack_require__'

          // 修改路径
          let oldValue = p.node.arguments[0].value
          oldValue = './' + path.join('src', oldValue)
          // 避免Windows出现反斜杠 : \ 
          p.node.arguments[0].value = oldValue.replace(/\\+/g, '/')

          // 每找到一个require调用, 就将其中的路径修改完毕后加入到依赖数组中
          dependencies.push(p.node.arguments[0].value)
        }
      }
    })
    let sourceCode = generator(ast).code

    // console.log(sourceCode)

    // 构建modules对象
    // { './src/index.js': 'xxxx', './src/news.js': 'yyyy' }
    // this.modules
    let modulePathRelative = './' + path.relative(this.root, modulePath)
    modulePathRelative = modulePathRelative.replace(/\\+/g, '/')
    this.modules[modulePathRelative] = sourceCode

    // 递归加载所有依赖
    // ./src/news.js   ./src/news2.js
    dependencies.forEach(dep => this.depAnalyse(path.resolve(this.root, dep)))
  }
  emitFile() {
    // 使用模板进行拼接字符串,生成最终的结果代码
    let template = this.getSource(path.join(__dirname, '../template/output.ejs'))
    let result = ejs.render(template, {
      entry: this.entry,
      modules: this.modules
    })
    // 获取输出目录
    let outputPath = path.join(this.config.output.path, this.config.output.filename)
    fs.writeFileSync(outputPath, result)
  }
  start() {
    // 开始打包了!
    // 依赖的分析
    // __dirname表示的是 itheima-pack 项目中Compiler.js所在目录
    // 而非入口文件所在的目录
    // 如果需要获取执行itheima-pack指令的目录, 需要使用 process.cwd()
    this.depAnalyse(path.resolve(this.root, this.entry))
    this.emitFile()
    // console.log(this.modules)
  }
}

module.exports = Compiler