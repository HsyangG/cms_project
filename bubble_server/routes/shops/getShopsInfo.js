let express = require('express')
let shops = express.Router()
let query = require('./../../model/db')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
  queryAll: 'SELECT * FROM `shops`',
  queryOne: 'SELECT * FROM `shops` WHERE `id` = ?',
  queryAllAdvertisement: 'SELECT * FROM `advertisement`',
  queryFromType: 'SELECT * FROM `shops` WHERE `type` = ?',
  queryClasscification: 'SELECT * FROM `classcification`',
  queryShopByType: 'SELECT * FROM `shops` WHERE `type` = ?'
}

// 获取所有商品信息
shops.get('/api/get_shops_info', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  let body = req.query
  if (!body.id) {
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
  } else {
    const rows = await query(sql.queryOne, [body.id])
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
  }
})
shops.get('/api/get_hot_shops', async (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*')
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
shops.get('/api/shops/search', async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.query
  console.log(body)
  if (body.search == '' || body.search == null) {
    res.json({
      code: 1,
      msg: '请输入内容',
      data: []
    })
    return false
  }
  // 模糊查询 '%value%'，注意%前面需要带引号
  let search_info = await query('SELECT * FROM `shops` WHERE `name` like "%' + body.search + '%"')
  if (search_info.length != 0) {
    res.json({
      code: 0,
      msg:'操作成功',
      data: search_info
    })
  } else {
    res.json({
      code: 1,
      msg: '暂无该商品信息',
      data: []
    })
  }
})

// 获取商品分类以及对应类别的商品 暂未使用
shops.get('/api/shops/classcification', async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.query
  let classcifications = await query(sql.queryClasscification)
  // console.log(classcifications)
  if (classcifications.length != 0) {
    for (let i = 0; i < classcifications.length; i++) {
      // 根据type查询商品表，拿到数据后保存到classcification[i]里面
      let shopList = await query(sql.queryShopByType, [classcifications[i].type])
      classcifications[i].shopList = shopList
    }
    // console.log(classcifications)
    res.json({
      code: 0,
      msg: '操作成功',
      data: classcifications
    })
  } else {
    res.json({
      code: 1,
      msg: '暂无商品分类',
      data: []
    })
  }
})

module.exports = shops
