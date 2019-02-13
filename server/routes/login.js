let express = require('express')
let md5 = require('blueimp-md5')
let User = require('./../models/user')
let UserReg = require('./../models/user_reg')

let login = express()

// 配置登录验证信息
login.post('/login', function (req, res) {
  console.log(req.body)
  let body = req.body
  res.setHeader('Access-Control-Allow-Origin', '*')
  User.findOne({
    telNumber: body.telNumber,
    authCode: body.authCode
  }, function (err, user) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Server error.'
      })
    }
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'TelNumber or verification is invalid.'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})
// 验证码请求处理
login.get('/auth', function (req, res) {
  console.log(req.query)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send('hello')
})

// 配置密码登录
login.post('/logp', function (req, res) {
  /**
   * 1. 获取表单数据
   * 2. 查询数据库账号密码是否正确
   * 3. 发送响应数据
   */
  res.setHeader('Access-Control-Allow-Origin', '*')
  let body = req.body
  UserReg.findOne({
    telNumber: body.telNumber,
    userPwd: md5(md5(body.userPwd))
  }, function (err, data) {
    console.log(data)
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Server error'
      })
    }
    if (!data) {
      return res.status(200).json({
        err_code: 1,
        message: 'TelNumber or password is invalid.'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

module.exports = login
