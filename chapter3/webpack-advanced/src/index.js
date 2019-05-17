console.log('我是index.js')

// import $ from 'jquery' // node_modules/jquery/package.json > main

// console.log($, jQuery)

// console.log(window.$)

// $('body').css('backgroundColor', 'green')

// import { getUserInfo } from './api/http.js'
// getUserInfo().then(() => { }, (err) => {
//   console.log(err)
// })

// console.log(IS_DEV, test, test2)

import axios from 'axios'
axios.get('/api/getUserInfo')
.then(result => console.log(result))