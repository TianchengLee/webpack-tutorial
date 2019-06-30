const fs = require('fs')
const cheerio = require('cheerio')
module.exports = class HTMLPlugin {
  constructor(options) {
    // template   filename
    this.options = options
  }
  apply(compiler) {
    // console.log(Object.keys(compiler))
    // 1. 注册`afterEmit`钩子
    compiler.hooks.afterEmit.tap('HTMLPlugin', compilation => {
      // console.log(Object.keys(compilation))
      // 如果大家使用done钩子  则需要使用stats.compilation.assets获取数据
      // console.log(...Object.keys(stats))
      // console.log(...Object.keys(stats.compilation.assets))
      // console.log(stats.hash)
      // console.log(stats.startTime)
      // console.log(stats.endTime)
      // 2. 根据创建对象时传入的template属性来读取html模板
      // console.log(this.options.template)
      let result = fs.readFileSync(this.options.template, 'utf-8')
      // 3. 使用工具分析HTML，推荐使用cheerio，可以直接使用jQuery api
      let $ = cheerio.load(result)
      // console.log(compilation.assets)
      // 4. 循环遍历webpack打包的资源文件列表，如果有多个bundle就都打包进去（可以根据需求自己修改，因为可能有chunk，一般只引入第一个即可）
      Object.keys(compilation.assets).forEach(item => $(`<script src="${item}"></script>`).appendTo('body'))
      // 5. 输出新生成的HTML字符串到dist目录中  (根据传入的filename来输出)
      // console.log($.html())
      // console.log('./dist/' + this.options.filename)
      // path.join(process.cwd(), 'dist', this.options.filename)
      fs.writeFileSync('./dist/' + this.options.filename, $.html())
    })
  }
}