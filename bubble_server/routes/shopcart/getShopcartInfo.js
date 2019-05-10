let express = require('express')
let shopcart_shop = express.Router()
let query = require('./../../model/db')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
  queryShopcart: 'SELECT * FROM `shopcart` WHERE `phone` = ? and `shop_id` = ?',
  queryFromType: 'SELECT * FROM `shops` WHERE `type` = ?',
  addShop: 'INSERT INTO `shopcart` (`phone`,`shop_id`,`shop_count`,`total_price`,`selected`) VALUES(?,?,?,?,?)',
  updateShopcart: 'UPDATE `shopcart` SET `shop_count` = ?, `total_price` = ? ,`selected` = ? WHERE `phone` = ? AND `shop_id` = ?',
  getAll: 'SELECT shops.id,shops.name,shops.picture,shops.format,shops.price,shops.old_price,shopcart.shop_count,shopcart.total_price,shopcart.selected FROM `shopcart`,`shops` WHERE shopcart.shop_id = shops.id'
}

shopcart_shop.get('/api/get_shopcart_shop', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  let body = req.query
  console.log(body)
  let rows = null
  if (!req.body.shop_id) {
    rows = await query(sql.getAll)
  } else {
    rows = await query(sql.queryShopcart, [body.phone, body.shop_id])
  }
  // console.log(rows)
  if (rows && rows.length != 0) {
    res.json({
      code: 0,
      msg: '操作成功',
      data: rows
    })
  } else {
    res.json({
      code: 1,
      msg: '暂无商品信息',
      data: []
    })
  }
})

shopcart_shop.post('/api/update_shopcart', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.body
  let check_shopcart = await query(sql.queryShopcart,[body.phone,body.shop_id])
  if (check_shopcart.length != 0) {
    let update_shopcart_list = await query(sql.updateShopcart, [body.shop_count,body.total_price,body.selected,body.phone,body.shop_id])
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

shopcart_shop.post('/api/shopcart/update', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.body
  // console.log(body)
  let update_cart = await query(sql.updateShopcart, [body.shop_count,body.total_price,body.selected,body.phone,body.id])
  res.json({
    code: 0,
    msg: '操作成功',
    data: []
  })
})

shopcart_shop.post('/api/leave_and_update', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.body
  // console.log(body)
  // 注意：body里面有shopList，但值为'null'，要加以判断
  if (body && body.shopList != 'null') {
    let shopList = JSON.parse(body.shopList)
    for (let i = 0; i < shopList.length; i++) {
      if (!shopList[i]) break
      let updateShop = await query(sql.updateShopcart, [shopList[i].shop_count,shopList[i].total_price,shopList[i].selected,shopList[i].phone,shopList[i].id])
      console.log(shopList[i])
    }
    res.json({
      code: 0,
      msg: '操作成功',
      data: []
    })
  } else {
    res.json({
      code: 1,
      msg: '暂无数据',
      data: []
    })
  }
})
// shop_info.get('/api/get_shop_picture', async (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   let body = req.query
//   const picture_list = await query(sql.queryShopPicture, [body.id])
//   if (picture_list.length != 0) {
//     res.json({
//       code: 0,
//       msg: '操作成功',
//       data: picture_list
//     })
//   }
//   if (picture_list == 0) {
//     res.json({
//       code: 1,
//       msg: '暂无该商品的图片信息',
//       data: []
//     })
//   }
// })

module.exports = shopcart_shop
