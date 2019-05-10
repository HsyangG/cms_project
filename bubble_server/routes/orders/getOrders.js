let express = require('express')
let orders = express.Router()
let query = require('./../../model/db')
let sillyDatetime = require('silly-datetime') // 获取当前时间，第三方插件

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
  queryOrders: 'SELECT * FROM `order` WHERE `phone` = ? order by `id` desc',
  queryOrderShop: 'SELECT * FROM `order`,`order_info`,`shops` WHERE order.phone = order_info.phone AND order.order_number = order_info.order_number AND order_info.shop_id = shops.id AND order.phone = ? AND order.order_number = ?',
  // queryOrderShop: 'SELECT * FROM `order_info` WHERE `phone` = ? AND `order_number` = ?',
  queryFromType: 'SELECT * FROM `shops` WHERE `type` = ?',
  addShop: 'INSERT INTO `shopcart` (`phone`,`shop_id`,`shop_count`,`total_price`,`selected`) VALUES(?,?,?,?,?)',
  updateShopcart: 'UPDATE `shopcart` SET `shop_count` = ?, `total_price` = ? WHERE `phone` = ? and `shop_id` = ?',
  getAll: 'SELECT shops.id,shops.name,shops.picture,shops.format,shops.price,shops.old_price,shopcart.shop_count,shopcart.total_price,shopcart.selected FROM `shopcart`,`shops` WHERE shopcart.shop_id = shops.id',
  getByPayment: 'select *from user where phone = ? and status = ? and payment = ?',
  createdOrder: 'insert into `order` (`phone`,`order_number`,`total`,`total_price`,`status`,`address_id`,`created_at`) values(?,?,?,?,?,?,?)',
  createOrderInfo: 'insert into order_info (phone,shop_id,order_number,created_at) values (?,?,?,?)',
  updateUserInfo: 'UPDATE `user` SET `over` = ?,`updated_at` = ? WHERE `phone` = ?',
  deleteShopcartShop: 'DELETE FROM `shopcart` WHERE `phone` = ? AND `shop_id` = ?',
}

orders.get('/api/get_orders', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  let body = req.query
  let rows = await query(sql.queryOrders,[body.phone])
  // console.log(rows)
  if (rows.length != 0) {
    for (let i = 0; i < rows.length; i++) {
      let shop_list = await query(sql.queryOrderShop,[rows[i].phone,rows[i].order_number])
      rows[i].shop_list = shop_list
    }
    res.json({
      code: 0,
      msg: '操作成功',
      data: rows
    })
  }
  if (rows.length == 0) {
    res.json({
      code: 1,
      msg: '暂无商品信息',
      data: []
    })
  }
})

orders.post('/api/update_shopcart', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.body
  let check_shopcart = await query(sql.queryShopcart,[body.phone,body.shop_id])
  if (check_shopcart.length != 0) {
    let update_shopcart_list = await query(sql.updateShopcart, [body.shop_count,body.total_price,body.phone,body.shop_id])
    res.json({
      code: 0,
      msg: '操作成功',
      data: []
    })
  } else {
    let update_shopcart_list = await query(sql.addShop, [body.phone,body.shop_id,body.shop_count,body.total_price,body.selected])
    res.json({
      code: 0,
      msg: '添加成功',
      data: []
    })
  }
})

orders.post('/api/user/info', async (req, res) => {
  /**
   * 需要接收以下参数
   * phone status payment shop_count total_price
   * body.shopList在前端经过了转字符串处理，在后端需要将其转换成JavaScript对象
   *
   * 这里面包含了创建订单的内容
   */
  let body = req.body
  let shop_list = JSON.parse(body.shopList)
  // console.log(body)
  if (body.status == 1) {
    let get_by_payment = await query(sql.getByPayment,[body.phone,body.status,body.payment])
    if (get_by_payment.length != 0) {
      let user_info = get_by_payment[0]
      if (user_info.over < body.total_price) {
        res.json({
          code: 1,
          msg: '您的账户余额不足',
          data: []
        })
      } else {
        // 创建订单
        // 操作三张表
        let created_at = sillyDatetime.format(new Date, 'YYYY-MM-DD HH:mm:ss')
        let order_number = sillyDatetime.format(new Date, 'YYYYMMDDHHmmss')
        let status = 'wait_receipt'
        let created_order = await query(sql.createdOrder,[body.phone,order_number,body.shop_count,body.total_price,status,body.address_id,created_at])
        // 订单商品表
        for (let i = 0; shop_list.length; i++) {
          // 在删除之前先做一次判断，对象不为空在执行操作。为空则退出循环
          if (!shop_list[i]) break
          let created_order_info = await query(sql.createOrderInfo,[shop_list[i].phone,shop_list[i].id,order_number,created_at])
          // 下单成功，删除购物车信息
          let delete_shop = await query(sql.deleteShopcartShop,[shop_list[i].phone,shop_list[i].id])
        }
        // 用户信息表
        let over = user_info.over - body.total_price
        let updated_user_info = await query(sql.updateUserInfo, [over,created_at,body.phone])
        res.json({
          code: 0,
          msg: '操作成功',
          data: []
        })
      }
    } else {
      res.json({
        code: 1,
        msg: '支付密码错误',
        data: []
      })
    }
  } else {
    res.json({
      code: 1,
      msg: '该账号未登录',
      data: []
    })
  }
})

module.exports = orders
