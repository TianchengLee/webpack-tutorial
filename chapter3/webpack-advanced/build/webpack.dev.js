const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
// 引入webpack
const webpack = require('webpack')
// webpack的配置文件遵循着CommonJS规范
module.exports = merge(baseConfig, {
  mode: 'development',
  // 开启监视模式, 此时执行webpack指令进行打包会监视文件变化自动打包
  // watch: true
  devServer: {
    open: true,
    hot: true,
    compress: true,
    port: 3000,
    // contentBase: './src'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: 'true',
      // test: '1 + 1', // DefinePlugin会解析定义的环境变量表达式, 当成JS执行
      // test2: '"zs"'
    })
  ]
})