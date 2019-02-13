let express = require('express')
let UserReg = require('./../models/user_reg')
let md5 = require('blueimp-md5')

let register = express()

register.post('/register', function (req, res) {
  /**
   *1. 获取表单提交的数据
   *    req.body
   *2. 操作数据库
   *     判断该用户是否已存在
   *     如果已存在，不允许注册
   *     如果不存在，注册新建用户
   *3. 发送响应
   */
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.body
  UserReg.findOne({
    telNumber: body.telNumber
  }, function (err, data) {
    console.log(data)
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Server error.'
      })
    }
    if (data) {
      return res.status(200).json({
        err_code: 1,
        message: 'TelNumber is already exists.'
      })
    }
    // 对密码进行加密
    body.userPwd = md5(md5(body.userPwd))
    new User_reg(body).save(function (err, user, next) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Server error'
        })
      }
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    })
  })
})

module.exports = register
