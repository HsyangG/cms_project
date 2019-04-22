let express = require('express')
let login = express.Router()
let database = require('./../model/database')

login.post('/api/logp', function (req, res) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.body
  console.log(body)
  let sql = 'INSERT INTO user SET ?'
  // let sql = 'SELECT * FROM user'
  let connect = database.connection()
  database.insert(connect, sql, body)
  database.close(connect)
  return true
})

module.exports = login
