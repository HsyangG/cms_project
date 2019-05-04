let express = require('express')
let register = express.Router()
let database = require('./../model/database')
let query = require('./../model/db')
let sillyDatetime = require('silly-datetime') // 获取当前时间，第三方插件

let sql = {
  insert: "INSERT INTO `user`(`phone`,`username`,`password`,`status`,`over`,`created_at`) VALUES(?,?,?,?,?,?)", 
  queryAll: 'SELECT * FROM user',
  queryPage: 'SELECT * FROM user LIMIT ?, ?', 
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ?', 
  updata: 'UPDATE user SET username = ? WHERE phone = ?'
}

register.post('/api/register', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  let body = req.body
  const rows = await query(sql.getByPhone, [body.phone])
  // console.log(rows)
  // res.json({
  //   code: 0,
  //   msg: '请求成功',
  //   data: rows
  // })
  // insert: "INSERT INTO `user` (`phone`,`username`,`password`,`status`,`over`,`created_at`) VALUES(?,?,?,?,?,?)", 
  if (rows.length == 0) {
    // 当查询结果为空时，可以插入数据
    body.status = '1'
    body.over = 0.00,
    body.updated_at = '',
    body.id = 0,
    body.created_at = sillyDatetime.format(new Date, 'YYYY-MM-DD HH:mm:ss')
    console.log(body.phone)
    let insert_data = await query(sql.insert, [body.phone,body.username,body.password,body.status,body.over,body.created_at])
    console.log(insert_data.insertId)
    res.json({
      code: 0,
      msg: '操作成功',
      data:[]
    })
  }
  if (rows.length > 0) {
    res.json({
      code: 1,
      msg: '该用户已存在',
      data: []
    })
  }
})

module.exports = register
