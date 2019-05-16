const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

// webpack的配置文件遵循着CommonJS规范
module.exports = {
  entry: './src/main.js',
  output: {
    // path.resolve() : 解析当前相对路径的绝对路径
    // path: path.resolve('./dist/'),
    // path: path.resolve(__dirname, './dist/'),
    path: path.join(__dirname, './dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'production',
  // 开启监视模式, 此时执行webpack指令进行打包会监视文件变化自动打包
  // watch: true
  devServer: {
    open: true,
    hot: true,
    compress: true,
    port: 3000,
    // contentBase: './src'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'assets'),
        to: 'assets'
      }
    ]),
    new webpack.BannerPlugin('黑马程序员真牛biubiu!')
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // webpack读取loader时 是从右到左的读取, 会将css文件先交给最右侧的loader来处理
        // loader的执行顺序是从右到左以管道的方式链式调用
        // css-loader: 解析css文件
        // style-loader: 将解析出来的结果 放到html中, 使其生效
        use: ['style-loader', 'css-loader']
      },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(jpg|jpeg|png|bmp|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
            outputPath: 'images',
            name: '[name]-[hash:4].[ext]'
          }
        }
      },
      { test: /\.(woff|woff2|eot|svg|ttf)$/, use: 'url-loader' },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/env'],
          //   plugins: [
          //     '@babel/plugin-proposal-class-properties',
          //     '@babel/plugin-transform-runtime'
          //   ]
          // }
        },
        exclude: /node_modules/,

      }
    ]
  },
  // devtool: 'cheap-module-eval-source-map'
}