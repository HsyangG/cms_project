let express = require('express')
let user_info = express.Router()
let query = require('./../..//model/db')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
}

user_info.get('/api/get_user_info', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  // console.log(req.query)
  let body = req.query
  const rows = await query(sql.getByPhone, [body.phone,body.status])
  // console.log(rows)
  if (rows.length != 0) {
    let select_data = await query(sql.getByPhone,  [body.phone,body.status])
    delete select_data[0].password // 去掉敏感字段 password
    // console.log(select_data)
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
user_info.post('/api/user/info', async (req, res) => {
  /**
   * 需要接收以下参数
   * phone status payment shop_count total_price
   */
  let body = req.body
  console.log(body)
})

module.exports = user_info
