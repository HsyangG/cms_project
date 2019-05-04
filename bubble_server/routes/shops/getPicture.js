let express = require('express')
let picture = express.Router()
let query = require('./../../model/db')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
  queryAllPicture: 'SELECT * FROM `shop_picture`',
  queryAllCarousel: 'SELECT * FROM `carousel`',
  queryFromType: 'SELECT * FROM `shops` WHERE `type` = ?',
}

picture.get('/api/get_carousel', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  let body = req.query
  const rows = await query(sql.queryAllCarousel)
  // console.log(rows)
  if (rows.length != 0) {
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

module.exports = picture
