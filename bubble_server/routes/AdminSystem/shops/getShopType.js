let express = require('express')
let ShopType = express.Router()
let query = require('./../../../model/db')
let sillyDatetime = require('silly-datetime')

let sql = {
  queryAll: 'SELECT * FROM shop_type',
  queryOne: 'SELECT * FROM shop_type WHERE type=? OR name=?',
  queryById: 'SELECT * FROM shop_type WHERE id=?',
  insertType: 'INSERT INTO shop_type (type,name,created_at) VALUES(?,?,?)',
  updateType: 'UPDATE shop_type SET type=?,name=?,updated_at=? WHERE id=?',
  deleteType: 'DELETE FROM shop_type WHERE id=?'
}

ShopType.get('/api/shops/type/index', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.query
  let row = await query(sql.queryAll)
  // console.log(row)
  res.json({
    code: 0,
    msg: '操作成功',
    total: row.length,
    data: row
  })
})
ShopType.post('/api/shops/type/store', async (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.body
  let shop_type = body.type || ' '
  let shop_name = body.name || ' '
  if (!body.id) {
    let row = await query(sql.queryOne,[shop_type,shop_name])
    // console.log(row)
    if (row.length !== 0) {
      res.json({
        code: 1,
        msg: '该类型已存在！',
        data: []
      })
      return false
    }
    let currentTime = sillyDatetime.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    let insert_type = await query(sql.insertType,[body.type, body.name, currentTime])
    res.json({
      code: 0,
      msg: '操作成功',
      data: []
    })
  } else {
    let currentTime = sillyDatetime.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    let update_type = await query(sql.updateType,[body.type,body.name,currentTime,body.id])
    res.json({
      code: 0,
      msg: '操作成功',
      data: []
    })
  }
})
ShopType.post('/api/shops/type/delete', async (req,res) => {
  let body = req.body
  let row = await query(sql.queryById,[body.id])
  if (row.length === 0) {
    res.json({
      code: 1,
      msg: '该类型不存在',
      data: []
    })
    return false
  } else {
    let delete_type = await query(sql.deleteType,[body.id])
    res.json({
      code: 0,
      msg: '删除成功',
      data: []
    })
  }
})

module.exports = ShopType
