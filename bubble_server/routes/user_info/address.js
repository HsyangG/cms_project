let express = require('express')
let address = express.Router()
let query = require('./../../model/db')

let sql = {
  getByPhone: 'SELECT * FROM `user` WHERE `phone` = ? and `status` = ?',
  queryAddress: 'SELECT * FROM `address` WHERE `phone` = ?',
  queryOne: 'SELECT * FROM `address` WHERE `id` = ?',
  insert: 'INSERT INTO `address` (name,phone,province,city,district,site,type) VALUES(?,?,?,?,?,?,?)',
  updateAddress: 'UPDATE `address` SET name = ?,phone = ?,province = ?,city = ?,district = ?,site = ?,type = ? WHERE `id` = ?',
  delete: 'DELETE FROM `address` WHERE `phone` = ?'
}

address.get('/api/get_address', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  let body = req.query
  if (body.status == 1) {
    //校验登录状态
    let rows = await query(sql.queryAddress,[body.phone])
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
  } else {
    res.json({
      code: 1,
      msg: '抱歉，未登录用户无法查询地址信息',
      data: []
    })
  }
})
address.get('/api/get_address_by_id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.query
  let get_by_id = await query(sql.queryOne, [body.id])
  if (get_by_id.length != 0) {
    res.json({
      code: 0,
      msg: '操作成功',
      data: get_by_id
    })
  } else {
    res.json({
      code: 1,
      msg: '该地址不存在',
      data: []
    })
  }
})

address.post('/api/update_address', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.body
  if (body.id) {
    // 如果参数带了 id 则是更新地址表
    let update_address = await query(sql.updateAddress, [body.name,body.phone,body.province,body.city,body.district,body.site,body.type,body.id])
    res.json({
      code: 0,
      msg: '操作成功',
      data: []
    })
  } else {
    let add_address = await query(sql.insert, [body.name,body.phone,body.province,body.city,body.district,body.site,body.type])
    res.json({
      code: 0,
      msg: '操作成功',
      data: []
    })
  }
})

module.exports = address
