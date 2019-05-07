let express = require('express')
let orders = express.Router()
let query = require('./../../model/db')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
  queryOrders: 'SELECT * FROM `order` WHERE `phone` = ?',
  queryOrderShop: 'SELECT * FROM `order`,`order_info`,`shops` WHERE order.phone = order_info.phone AND order.order_number = order_info.order_number AND order_info.shop_id = shops.id AND order.phone = ? AND order.order_number = ?',
  // queryOrderShop: 'SELECT * FROM `order_info` WHERE `phone` = ? AND `order_number` = ?',
  queryFromType: 'SELECT * FROM `shops` WHERE `type` = ?',
  addShop: 'INSERT INTO `shopcart` (`phone`,`shop_id`,`shop_count`,`total_price`,`selected`) VALUES(?,?,?,?,?)',
  updateShopcart: 'UPDATE `shopcart` SET `shop_count` = ?, `total_price` = ? WHERE `phone` = ? and `shop_id` = ?',
  getAll: 'SELECT shops.id,shops.name,shops.picture,shops.format,shops.price,shops.old_price,shopcart.shop_count,shopcart.total_price,shopcart.selected FROM `shopcart`,`shops` WHERE shopcart.shop_id = shops.id'
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

module.exports = orders
