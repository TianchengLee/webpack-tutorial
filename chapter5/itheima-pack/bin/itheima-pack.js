#!/usr/bin/env node

const path = require('path')
// 1. 读取需要打包项目的配置文件
let config = require(path.resolve('webpack.config.js'))
// console.log(config)

// 2. 通过面向对象的方式来进行项目推进
const Compiler = require('../lib/Compiler')
new Compiler(config).start()