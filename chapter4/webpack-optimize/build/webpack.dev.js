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
    hot: true, // 开启热更新
    compress: true,
    port: 3000,
    // contentBase: './src'
    proxy: {
      // /api/getUserInfo
      // 当前端请求 /api 地址时, 会将请求转发到 
      // http://localhost:9999/api
      // 举例: 客户端现在请求的时 /api/getUserInfo
      // 此时会将请求转发到: http://localhost:9999/api/getUserInfo
      // '/api': 'http://localhost:9999',
      // 此时会将请求转发到: http://localhost:9999/getUserInfo
      // '/getUserInfo': 'http://localhost:9999'
      '/api': {
        target: 'http://localhost:9999',
        // 转发请求时不会携带 /api
        // http://localhost:9999/getUserInfo
        pathRewrite: {
          '^/api': ''
        }
      }
    }
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