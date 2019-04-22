let express = require('express')
let register = express.Router()
let database = require('./../model/database')

register.post('/api/register', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = {
    phone: req.body.phone,
    username: req.body.username,
    password: req.body.password
  }
  console.log(body)
  let sql = 'INSERT INTO user SET ?'
  // let sql = 'SELECT * FROM user'
  let connect = database.connection()
  database.insert(connect, sql, body)
  database.close(connect)
  return true
})

module.exports = register
