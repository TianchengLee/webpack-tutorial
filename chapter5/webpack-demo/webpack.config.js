const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [

      // loader的加载顺序永远遵循: pre > inline > normal > post
      {
        test: /\.js$/, use: {
          loader: './loaders/loader1.js',
          options: {
            name: '后天2222222'
          }
        },
        enforce: 'pre'
      },
      // { test: /\.js$/, use: './loaders/loader2.js' },
      // { test: /\.js$/, use: './loaders/loader3.js', enforce: 'post' },

      // {
      //   test: /\.js$/,
      //   use: [
      //     './loaders/loader1.js',
      //     './loaders/loader2.js',
      //     './loaders/loader3.js'
      //   ]
      // }
    ]
  },
  mode: 'development'
}