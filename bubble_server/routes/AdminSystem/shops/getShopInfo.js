let express = require('express')
let shop = express.Router()
let query = require('./../../../model/db')
let sillyDatetime = require('silly-datetime')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
  queryAll: 'SELECT * FROM `shops`',
  queryOne: 'SELECT * FROM `shops` WHERE `id` = ?',
  queryAllAdvertisement: 'SELECT * FROM `advertisement`',
  queryFromType: 'SELECT * FROM `shops` WHERE `type` = ?',
  queryClasscification: 'SELECT * FROM `classcification`',
  queryShopByType: 'SELECT * FROM `shops` WHERE `type` = ?',
  queryShopType: 'SELECT * FROM shop_type',
  insertShop: 'INSERT INTO shops (name,quantity,price,old_price,brief,specification,description,format,type,tag,picture,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
  updateShop: 'UPDATE shops SET name=?,quantity=?,price=?,old_price=?,brief=?,specification=?,description=?,format=?,type=?,tag=?,picture=?,updated_at=? WHERE id=?'
}

// 获取所有商品信息
shop.get('/api/shop/info', async (req, res) => {
  let body = req.query
  let rows = await query(sql.queryAll)
  let shop_type = await query(sql.queryShopType)
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < shop_type.length; j++) {
      if (rows[i].type === shop_type[j].type) {
        rows[i].typeName = shop_type[j].name
      }
    }
  }
  res.json({
    code: 0,
    msg: '操作成功',
    total: rows.length,
    data: rows
  })
})
shop.get('/api/get_hot_shops', async (req, res) => {
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
shop.get('/api/shops/search', async (req,res) => {
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
shop.get('/api/shops/classcification', async (req,res) => {
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
shop.post('/api/shops/store', async (req, res) => {
  let body = req.body
  console.log(body)
  if (!body.name) {
    res.json({
      code: 1,
      msg: '商品名称不能为空',
      data: []
    })
    return false
  } else if (!body.type) {
    res.json({
      code: 1,
      msg: '商品类型不能为空',
      data: []
    })
    return false
  } else if (!body.format) {
    res.json({
      code: 1,
      msg: '商品规格不能为空',
      data: []
    })
    return false
  } else if (!body.quantity) {
    res.json({
      code: 1,
      msg: '商品库存不能为空',
      data: []
    })
    return false
  } else if (!body.price) {
    res.json({
      code: 1,
      msg: '商品价格不能为空',
      data: []
    })
    return false
  } else if (!body.old_price) {
    res.json({
      code: 1,
      msg: '商品原价不能为空',
      data: []
    })
    return false
  } else if (!body.tag) {
    res.json({
      code: 1,
      msg: '商品标签不能为空',
      data: []
    })
    return false
  } else if (!body.specification) {
    res.json({
      code: 1,
      msg: '商品特点不能为空',
      data: []
    })
    return false
  } else if (!body.brief) {
    res.json({
      code: 1,
      msg: '商品简介不能为空',
      data: []
    })
    return false
  } else if (!body.description) {
    res.json({
      code: 1,
      msg: '商品描述不能为空',
      data: []
    })
    return false
  } else {
    // (name,quantity,price,old_price,brief,specification,description,format,type,tag,picture,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)
    if (!body.id || body.id === '') {
      console.log('hello')
      let nowTime = sillyDatetime.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      let insert_shop = await query(sql.insertShop,[body.name,parseInt(body.quantity),parseFloat(body.price),parseFloat(body.old_price),body.brief,body.specification,body.description,body.format,body.type,body.tag,body.picture,nowTime])
      res.json({
        code: 0,
        msg: '操作成功',
        data: []
      })
    } else {
      let nowTime = sillyDatetime.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      let update_shop = await query(sql.updateShop,[body.name,parseInt(body.quantity),parseFloat(body.price),parseFloat(body.old_price),body.brief,body.specification,body.description,body.format,body.type,body.tag,body.picture,nowTime,body.id])
      res.json({
        code: 0,
        msg: '操作成功1',
        data: []
      })
    }
  }
})

module.exports = shop
