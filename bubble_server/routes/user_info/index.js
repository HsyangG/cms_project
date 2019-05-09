let express = require('express')
let user_info = express.Router()
let query = require('./../..//model/db')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
  getByPayment: 'select *from user where phone = ? and status = ? and payment = ?'
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
    delete select_data[0].payment
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
// user_info.post('/api/user/info', async (req, res) => {
//   /**
//    * 需要接收以下参数
//    * phone status payment shop_count total_price
//    * body.shopList在前端经过了转字符串处理，在后端需要将其转换成JavaScript对象
//    */
//   let body = req.body
//   let shop_list = JSON.parse(body.shopList)
//   // console.log(body)
//   if (body.status == 1) {
//     let get_by_payment = await query(sql.getByPayment,[body.phone,body.status,body.payment])
//     if (get_by_payment.length != 0) {
//       let user_info = get_by_payment[0]
//       if (user_info.over < body.total_price) {
//         res.json({
//           code: 1,
//           msg: '您的账户余额不足',
//           data: []
//         })
//       } else {
//         // 创建订单
//       }
//       console.log(user_info)
//     } else {
//       res.json({
//         code: 1,
//         msg: '支付密码错误',
//         data: []
//       })
//     }
//   } else {
//     res.json({
//       code: 1,
//       msg: '该账号未登录',
//       data: []
//     })
//   }
// })

module.exports = user_info
