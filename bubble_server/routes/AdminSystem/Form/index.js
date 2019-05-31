let express = require('express')
let form = express.Router()
let query = require('./../../../model/db')

form.post('/api/form', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.body
  console.log(body)
  res.json({
    code: 0,
    msg: '操作成功',
    data: []
  })
})

module.exports = form
