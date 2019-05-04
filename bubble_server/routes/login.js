let express = require('express')
let login = express.Router()
let database = require('./../model/database')
let query = require('./../model/db')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `password` = ?',
  update: 'UPDATE `user` SET `status` = ? WHERE `phone` = ? and `password` = ?'
}

login.post('/api/logp', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  let body = req.body
  const rows = await query(sql.getByPhone, [body.phone,body.password])
  // console.log(rows)
  if (rows.length != 0) {
    // 先修改登录状态，在查询结果
    body.status = 1
    let update_status = await query(sql.update, [body.status,body.phone,body.password])

    let select_data = await query(sql.getByPhone,  [body.phone,body.password])
    delete select_data[0].password // 去掉敏感字段 password
    console.log(select_data)
    res.json({
      code: 0,
      msg: '操作成功',
      data: select_data
    })
  }
  if (rows.length = 0) {
    res.json({
      code: 1,
      msg: '该用户不存在',
      data: []
    })
  }
})

module.exports = login
