const { SyncHook } = require('tapable')
// 来黑马学前端
// 流程: 1.开班  2.学html  3.学css  4.学js  5.学react
// 生命周期
class Frontend {
  constructor() {
    // 1. 定义好钩子(定义生命周期)
    this.hooks = {
      // 如果需要在call时传参,则需要在new SyncHook时定义需要的参数
      beforeStudy: new SyncHook(),
      afterHtml: new SyncHook(),
      afterCss: new SyncHook(),
      afterJs: new SyncHook(),
      afterReact: new SyncHook(['name']),
    }
  }
  study() {
    // 2. 让钩子在指定阶段触发
    console.log('同学们好!!!开班啦!!!')
    this.hooks.beforeStudy.call()

    console.log('同学们好!!!开始学习html啦!!!')
    this.hooks.afterHtml.call()
    // 抽象化

    console.log('同学们好!!!开始学习css啦!!!')
    this.hooks.afterCss.call()

    console.log('同学们好!!!开始学习js啦!!!')
    this.hooks.afterJs.call()

    console.log('同学们好!!!开始学习react啦!!!')
    this.hooks.afterReact.call('紫阳')
  }
}

let f = new Frontend()
// 3. 注册事件
f.hooks.afterHtml.tap('afterHtml', () => {
  console.log('学完html后我想造淘宝!!!')
})
f.hooks.afterJs.tap('afterJs', () => {
  console.log('学完js后我想造webpack!!!')
})
f.hooks.afterReact.tap('afterReact', (name) => {
  console.log(name + '真牛逼!')
  console.log('学完react后我想造地球!!!')
})
f.study()