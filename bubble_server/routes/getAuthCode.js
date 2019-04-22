let express = require('express')
let authCode = express.Router()
let database = require('./../model/database')

authCode.get('/api/get_auth_code', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.query
  let authCode = parseInt(Math.random() * 1000000)
  let sql = 'SELECT * FROM auth_code WHERE phone = ' + body.phone
  let connect = database.connection()
  let result = database.insert(connect, sql, body)

  if (!result) {
    let sql = 'INSERT INTO auth_code(id,phone,authCode) VALUES(0,?,?)'
    let insert_data = []
    insert_data.push(body.phone,authCode)
    console.log(insert_data)
    let results = database.insert(connect, sql, insert_data)
    database.close(connect)
    return results
  }
  database.close(connect)
  return true
})

module.exports = authCode
