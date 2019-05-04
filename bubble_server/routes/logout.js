let express = require('express')
let logout = express.Router()
let query = require('./../model/db')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
  update: 'UPDATE `user` SET `status` = ? WHERE `phone` = ?'
}

logout.post('/api/logout', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  let body = req.body
  const rows = await query(sql.getByPhone, [body.phone,body.status])
  // console.log(rows)
  if (rows.length != 0) {
    body.status = 0
    let select_data = await query(sql.update,  [body.status,body.phone])
    // delete select_data[0].password // 去掉敏感字段 password
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

module.exports = logout
