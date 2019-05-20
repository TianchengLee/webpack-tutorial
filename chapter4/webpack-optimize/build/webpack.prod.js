const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')

// webpack的配置文件遵循着CommonJS规范
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: 'false',
      // test: '1 + 1', // DefinePlugin会解析定义的环境变量表达式, 当成JS执行
      // test2: '"zs"'
    })
  ]
})