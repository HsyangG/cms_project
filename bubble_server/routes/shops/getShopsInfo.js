let express = require('express')
let shops = express.Router()
let query = require('./../../model/db')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
  queryAll: 'SELECT * FROM `shops`',
  queryAllAdvertisement: 'SELECT * FROM `advertisement`',
  queryFromType: 'SELECT * FROM `shops` WHERE `type` = ?',
}

shops.get('/api/get_shops_info', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  let body = req.query
  const rows = await query(sql.queryAll)
  // console.log(rows)
  if (rows.length != 0) {
    res.json({
      code: 0,
      msg: '操作成功',
      data: rows
    })
  }
  if (rows.length = 0) {
    res.json({
      code: 1,
      msg: '暂无商品信息',
      data: []
    })
  }
})
shops.get('/api/get_hot_shops', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.query
  const hot_shop = await query(sql.queryAllAdvertisement)
  if (hot_shop.length != 0) {
    res.json({
      code: 0,
      msg: '操作成功',
      data: hot_shop
    })
  }
  if (hot_shop.length == 0) {
    res.json({
      code: 1,
      msg: '暂无商品信息',
      data: []
    })
  }
})

module.exports = shops
