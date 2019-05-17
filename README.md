# webpack从入门到进阶

# 第1章 课程介绍

## 学什么

- [webpack官网](https://www.webpackjs.com)

> 本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

![1556458624028](./assets/webpack.png)

- 代码转译
- 模块合并
- 混淆压缩
- 代码分割
- 自动刷新
- 代码校验
- 自动部署

## 课程安排

- webpack基础配置
- webpack高级配置
- webpack性能优化
- tapable钩子
- AST抽象语法树的应用
- webpack原理分析, 手写webpack
- 手写常见的loader和plugin

## 学习前提

- JS基础
- ES6 / ES7 语法
- node基础
- npm的基本使用

## 课程目标

- 掌握webpack的安装
- 掌握webpack的基础配置
- 掌握loader的配置
- 掌握plugin的配置
- 了解webpack性能优化
- 了解webpack中的tapable
- 了解AST的应用
- 深入学习webpack原理，手写webpack

# 第2章 webpack基础

## webpack的安装

注意：请先自行安装[nodejs](https://nodejs.org)最新版的环境

- 全局安装webpack

  `npm i webpack webpack-cli -g`

- 项目中安装webpack (推荐)

  `npm i webpack webpack-cli -D`

## webpack的使用

### webpack-cli

npm 5.2 以上的版本中提供了一个`npx`命令

npx 想要解决的主要问题，就是调用项目内部安装的模块，原理就是在`node_modules`下的`.bin` 目录中找到对应的命令执行

使用webpack命令：`npx webpack`

webpack4.0之后可以实现0配置打包构建，0配置的特点就是限制较多，无法自定义很多配置

开发中常用的还是使用webpack配置进行打包构建

### webpack配置

webpack有四大核心概念:

- 入口(entry): 程序的入口js
- 输出(output): 打包后存放的位置
- loader: 用于对模块的源代码进行转换
- 插件(plugins): 插件目的在于解决 loader无法实现的**其他事**

1. 配置webpack.config.js
2. 运行`npx webpack`

```js
const path = require('path')

module.exports = {
  // 入口文件配置
  entry: './src/index.js',
  // 出口文件配置项
  output: {
    // 输出的路径，webpack2起就规定必须是绝对路径
    path: path.join(__dirname, 'dist'),
    // 输出文件名字
    filename: 'bundle.js'
  },
  mode: 'development' // 默认为production, 可以手动设置为development, 区别就是是否进行压缩混淆
}
```

将`npx webpack`命令配置到`package.json`的脚本中

1. 配置`package.json`
2. 运行`npm run build`

```json
{
  "name": "webpack-basic",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.1"
  }
}
```

### 开发时自动编译工具

每次要编译代码时，手动运行 `npm run build` 就会变得很麻烦。

webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：

1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware

多数场景中，可能需要使用 `webpack-dev-server`，但是不妨探讨一下以上的所有选项。

#### watch

在`webpack`指令后面加上`--watch`参数即可

主要的作用就是监视本地项目文件的变化, 发现有修改的代码会自动编译打包, 生成输出文件

1. 配置`package.json`的scripts`"watch": "webpack --watch"`

2. 运行`npm run watch`

以上是cli的方式设置watch的参数

还可以通过配置文件对watch的参数进行修改：

```js
const path = require('path')

// webpack的配置文件遵循着CommonJS规范
module.exports = {
  entry: './src/main.js',
  output: {
    // path.resolve() : 解析当前相对路径的绝对路径
    // path: path.resolve('./dist/'),
    // path: path.resolve(__dirname, './dist/'),
    path: path.join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  mode: 'development',
  watch: true
}
```

运行`npm run build`

#### webpack-dev-server (推荐)

1. 安装`devServer`：

   `devServer`需要依赖`webpack`，必须在项目依赖中安装`webpack`

   `npm i webpack-dev-server webpack -D`

2. index.html中修改 `<script src="/bundle.js"></script>`

3. 运行：`npx webpack-dev-server`

4. 运行：`npx webpack-dev-server --hot --open --port 8090`

5. 配置`package.json`的scripts：`"dev": "webpack-dev-server --hot --open --port 8090"`

6. 运行`npm run dev`

devServer会在内存中生成一个打包好的`bundle.js`，专供开发时使用，打包效率高，修改代码后会自动重新打包以及刷新浏览器，用户体验非常好

以上是cli的方式设置devServer的参数

还可以通过配置文件对devServer的参数进行修改：

1. 修改`webpack.config.js`

```js
const path = require('path')

module.exports = {
  // 入口文件配置
  entry: './src/index.js',
  // 出口文件配置项
  output: {
    // 输出的路径，webpack2起就规定必须是绝对路径
    path: path.join(__dirname, 'dist'),
    // 输出文件名字
    filename: 'bundle.js'
  },
  devServer: {
    port: 8090,
    open: true,
    hot: true
  },
  mode: 'development'
}
```

2. 修改package.json的scripts: `"dev": "webpack-dev-server"`
3. 运行`npm run dev`

#### html插件

1. 安装html-webpack-plugin插件`npm i html-webpack-plugin -D`
2. 在`webpack.config.js`中的`plugins`节点下配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'template.html'
    })
]
```

1. devServer时根据模板在express项目根目录下生成html文件(类似于devServer生成内存中的bundle.js)
2. devServer时自动引入bundle.js
3. 打包时会自动生成index.html

#### webpack-dev-middleware

`webpack-dev-middleware` 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 `webpack-dev-server` 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。

1. 安装 `express` 和 `webpack-dev-middleware`：

   `npm i express webpack-dev-middleware -D`

2. 新建`server.js`

   ```js
   const express = require('express');
   const webpack = require('webpack');
   const webpackDevMiddleware = require('webpack-dev-middleware');
   const config = require('./webpack.config.js');
   
   const app = express();
   const compiler = webpack(config);
   
   app.use(webpackDevMiddleware(compiler, {
     publicPath: '/'
   }));
   
   app.listen(3000, function () {
     console.log('http://localhost:3000');
   });
   ```

3. 配置`package.json`中的scripts:`"server": "node server.js"`

4. 运行: `npm run server`

注意: 如果要使用`webpack-dev-middleware`, 必须使用`html-webpack-plugin`插件, 否则html文件无法正确的输出到express服务器的根目录

#### 小结

只有在开发时才需要使用自动编译工具, 例如: webpack-dev-server

项目上线时都会直接使用webpack进行打包构建, 不需要使用这些自动编译工具

自动编译工具只是为了**提高开发体验**

### 处理css

1. 安装`npm i css-loader style-loader -D`
2. 配置`webpack.config.js`

```js
  module: {
    rules: [
      // 配置的是用来解析.css文件的loader(style-loader和css-loader)
      {
        // 用正则匹配当前访问的文件的后缀名是  .css
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // webpack底层调用这些包的顺序是从右到左
      }
    ]
  }
```

loader的释义:

1. css-loader: 解析css文件
2. style-loader: 将解析出来的结果 放到html中, 使其生效

### 处理less 和 sass

`npm i less less-loader sass-loader node-sass -D`

```js
{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
```

```js
{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
```

### 处理图片和字体

1. `npm i file-loader url-loader -D`

url-loader封装了file-loader, 所以使用url-loader时需要安装file-loader

```js
{
    test: /\.(png|jpg|gif)/,
    use: [{
        loader: 'url-loader',
        options: {
            // limit表示如果图片大于5KB，就以路径形式展示，小于的话就用base64格式展示
            limit: 5 * 1024,
            // 打包输出目录
            outputPath: 'images',
            // 打包输出图片名称
            name: '[name]-[hash:4].[ext]'
        }
    }]
}
```

### babel

1. `npm i babel-loader @babel/core @babel/preset-env webpack -D`

2. 如果需要支持更高级的ES6语法, 可以继续安装插件:

   `npm i @babel/plugin-proposal-class-properties -D`

   也可以根据需要在babel官网找插件进行安装

```js
{
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    }
  },
  exclude: /node_modules/
}
```

官方更建议的做法是在项目根目录下新建一个`.babelrc`的babel配置文件

```json
{
  "presets": ["@babel/env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

如果需要使用`generator`，无法直接使用babel进行转换，因为会将`generator`转换为一个`regeneratorRuntime`，然后使用`mark`和`wrap`来实现`generator`

但由于babel并没有内置`regeneratorRuntime`，所以无法直接使用

需要安装插件:

​	`npm i @babel/plugin-transform-runtime -D`

同时还需安装运行时依赖:

​	`npm i @babel/runtime -D`

在`.babelrc`中添加插件:

```json
{
  "presets": [
    "@babel/env"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ]
}
```

如果需要使用ES6/7中对象原型提供的新方法，babel默认情况无法转换，即使用了`transform-runtime`的插件也不支持转换原型上的方法

需要使用另一个模块:

​	`npm i @babel/polyfill -S`

该模块需要在使用新方法的地方直接引入:

​	`import '@babel/polyfill'`

### source map的使用

#### devtool

此选项控制是否生成，以及如何生成 source map。

使用 [`SourceMapDevToolPlugin`](https://www.webpackjs.com/plugins/source-map-dev-tool-plugin) 进行更细粒度的配置。查看 [`source-map-loader`](https://www.webpackjs.com/loaders/source-map-loader) 来处理已有的 source map。

选择一种 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。

> 可以直接使用 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` 来替代使用 `devtool` 选项，它有更多的选项，但是切勿同时使用 `devtool` 选项和 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` 插件。因为`devtool` 选项在内部添加过这些插件，所以会应用两次插件。

| devtool | 构建速度 | 重新构建速度 | 生产环境 | 品质(quality) |
| ------- | -------- | ------------ | -------- | ------------- |
| (none)        | +++         | +++             | yes         | 打包后的代码              |
| eval        | +++         |  +++            | no         |   生成后的代码            |
| cheap-eval-source-map        |+          | ++             | no         |  转换过的代码（仅限行）             |
| cheap-module-eval-source-map        | o         |++              | no         |  原始源代码（仅限行）             |
| eval-source-map        | --         | +             |  no        |  原始源代码             |
| cheap-source-map        | +         | o             |no          | 转换过的代码（仅限行）              |
| cheap-module-source-map        | o         | -             |  no        | 原始源代码（仅限行）              |
| inline-cheap-source-map        | +         | o             | no         | 转换过的代码（仅限行）              |
| inline-cheap-module-source-map        |  o        | -             |  no        |  原始源代码（仅限行）             |
|source-map         | --         | --             | yes         |  原始源代码             |
| inline-source-map        | --         | --             | no         | 原始源代码              |
| hidden-source-map        |  --        | --             | yes         | 原始源代码              |
| nosources-source-map        |  --        | --             | yes         | 无源代码内容              |

#### 这么多模式用哪个好？

开发环境推荐：

​	**cheap-module-eval-source-map**

生产环境推荐：

​	**none(不使用source map)**

原因如下：

1. **使用 cheap 模式可以大幅提高 soure map 生成的效率。**大部分情况我们调试并不关心列信息，而且就算 source map 没有列，有些浏览器引擎（例如 v8） 也会给出列信息。
2. **使用 module 可支持 babel 这种预编译工具，映射转换前的代码**。
3. **使用 eval 方式可大幅提高持续构建效率。**官方文档提供的速度对比表格可以看到 eval 模式的重新构建速度都很快。
4. **使用 eval-source-map 模式可以减少网络请求。**这种模式开启 DataUrl 本身包含完整 sourcemap 信息，并不需要像 sourceURL 那样，浏览器需要发送一个完整请求去获取 sourcemap 文件，这会略微提高点效率。而生产环境中则不宜用 eval，这样会让文件变得极大。

### 插件

#### clean-webpack-plugin

该插件在`npm run build`时自动清除`dist`目录后重新生成，非常方便

1. 安装插件

   `npm i clean-webpack-plugin -D`

2. 引入插件

   ```js
   const CleanWebpackPlugin = require('clean-webpack-plugin')
   ```

3. 使用插件, 在plugins中直接创建对象即可

   ```js
   plugins: [
       new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './src/index.html'
       }),
       new CleanWebpackPlugin()
     ],
   ```

#### copy-webpack-plugin

1. 安装插件

   `npm i copy-webpack-plugin -D`

2. 引入插件

   ```js
   const CopyWebpackPlugin = require('copy-webpack-plugin')
   ```

3. 使用插件, 在plugins中插件对象并配置源和目标

   from: 源, 从哪里拷贝, 可以是相对路径或绝对路径, 推荐绝对路径

   to: 目标, 拷贝到哪里去, 相对于`output`的路径, 同样可以相对路径或绝对路径, 但更推荐相对路径(直接算相对dist目录即可)

   ```js
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
       ])
     ],
   ```

#### BannerPlugin

   这是一个webpack的内置插件，用于给打包的JS文件加上版权注释信息

   1. 引入webpack

      ```js
      const webpack = require('webpack')
      ```

   2. 创建插件对象

      ```js
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
          new webpack.BannerPlugin('黑马程序员牛逼!')
        ],
      ```


# 第3章 webpack高级配置

## HTML中img标签的图片资源处理

1. 安装`npm install -S html-withimg-loader`

2. 在`webpack.config.js`文件中添加loader

   ```js
   {
       test: /\.(htm|html)$/i,
       loader: 'html-withimg-loader'
   }
   ```

   使用时，只需要在html中正常引用图片即可，webpack会找到对应的资源进行打包，并修改html中的引用路径

## 多页应用打包

1. 在`webpack.config.js`中修改入口和出口配置

   ```js
     // 1. 修改为多入口
     entry: {
         main: './src/main.js',
         other: './src/other.js'
     },
     output: {
       path: path.join(__dirname, './dist/'),
       // filename: 'bundle.js',
       // 2. 多入口无法对应一个固定的出口, 所以修改filename为[name]变量
       filename: '[name].js',
       publicPath: '/'
     },
     plugins: [
         // 3. 如果用了html插件,需要手动配置多入口对应的html文件,将指定其对应的输出文件
         new HtmlWebpackPlugin({
             template: './index.html',
             filename: 'index.html',
             chunks: ['main']
         }),
         new HtmlWebpackPlugin({
             template: './index.html',
             filename: 'other.html',
             // chunks: ['other', 'main']
             chunks: ['other']
         })
     ]
   ```

2. 修改入口为对象，支持多个js入口，同时修改output输出的文件名为`'[name].js'`表示各自已入口文件名作为输出文件名，但是`html-webpack-plugin`不支持此功能，所以需要再拷贝一份插件，用于生成两个html页面，实现多页应用

## 第三方库的两种引入方式

可以通过`expose-loader`进行全局变量的注入，同时也可以使用内置插件`webpack.ProvidePlugin`对每个模块的闭包空间，注入一个变量，自动加载模块，而不必到处 `import` 或 `require`

- expose-loader **将库引入到全局作用域**

  1. 安装`expose-loader`

     `npm i -D expose-loader`

  2. 配置loader

     ```js
     module: {
       rules: [{
         test: require.resolve('jquery'),
         use: {
           loader: 'expose-loader',
           options: '$'
         }
       }]
     }
     ```

     tips: `require.resolve` 用来获取模块的绝对路径。所以这里的loader只会作用于 jquery 模块。并且只在 bundle 中使用到它时，才进行处理。

- webpack.ProvidePlugin **将库自动加载到每个模块**

  1. 引入webpack

     ```js
     const webpack = require('webpack')
     ```

  2. 创建插件对象

     要自动加载 `jquery`，我们可以将两个变量都指向对应的 node 模块

     ```js
     new webpack.ProvidePlugin({
       $: 'jquery',
       jQuery: 'jquery'
     })
     ```

## Development / Production不同配置文件打包

项目开发时一般需要使用两套配置文件，用于开发阶段打包（不压缩代码，不优化代码，增加效率）和上线阶段打包（压缩代码，优化代码，打包后直接上线使用）

抽取三个配置文件：

- webpack.base.js

- webpack.prod.js

- webpack.dev.js

步骤如下：

1. 将开发环境和生产环境公用的配置放入base中，不同的配置各自放入prod或dev文件中（例如：mode）

2. 然后在dev和prod中使用`webpack-merge`把自己的配置与base的配置进行合并后导出

   `npm i -D webpack-merge`

3. 将package.json中的脚本参数进行修改，通过`--config`手动指定特定的配置文件

## 定义环境变量

除了区分不同的配置文件进行打包，还需要在开发时知道当前的环境是开发阶段或上线阶段，所以可以借助内置插件`DefinePlugin`来定义环境变量。最终可以实现开发阶段与上线阶段的api地址自动切换。

1. 引入webpack

   ```js
   const webpack = require('webpack')
   ```

2. 创建插件对象，并定义环境变量

   ```js
   new webpack.DefinePlugin({
     IS_DEV: 'false'
   })
   ```

3. 在src打包的代码环境下可以直接使用

## 使用devServer解决跨域问题

在开发阶段很多时候需要使用到跨域，何为跨域？请看下图：

![跨域](.\assets\跨域.png)

开发阶段往往会遇到上面这种情况，也许将来上线后，前端项目会和后端项目部署在同一个服务器下，并不会有跨域问题，但是由于开发时会用到webpack-dev-server，所以一定会产生跨域的问题

目前解决跨域主要的方案有：

1. jsonp（淘汰）
2. cors
3. http proxy

此处介绍的使用devServer解决跨域，其实原理就是http proxy

将所有ajax请求发送给devServer服务器，再由devServer服务器做一次转发，发送给数据接口服务器

由于ajax请求是发送给devServer服务器的，所以不存在跨域，而devServer由于是用node平台发送的http请求，自然也不涉及到跨域问题，可以完美解决！

![解决跨域](.\assets\解决跨域.png)

服务器代码（返回一段字符串即可）：

```js
const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
app.get('/api/getUserInfo', (req, res) => {
  res.send({
    name: '黑马儿',
    age: 13
  })
});

app.listen(9999, () => {
  console.log('http://localhost:9999!');
});
```

前端需要配置devServer的proxy功能，在`webpack.dev.js`中进行配置：

```js
devServer: {
    open: true,
    hot: true,
    compress: true,
    port: 3000,
    // contentBase: './src'
    proxy: {
      '/api': 'http://localhost:9999'
    }
  },
```

意为前端请求`/api`的url时，webpack-dev-server会将请求转发给`http://localhost:9999/api`处，此时如果请求地址为`http://localhost:9999/api/getUserInfo`，只需要直接写`/api/getUserInfo`即可，代码如下：

```js
axios.get('/api/getUserInfo').then(result => console.log(result))
```

## HMR的高级用法

