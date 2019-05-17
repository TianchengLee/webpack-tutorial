const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
app.get('/getUserInfo', (req, res) => {
  res.send({
    name: '黑马儿',
    age: 13
  })
});

app.listen(9999, () => {
  console.log('http://localhost:9999');
});