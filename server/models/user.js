/**
 *保存用户的登录信息
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema

// 连接到数据库
mongoose.connect('mongodb://localhost/mall', {useNewUrlParser: true})

let userSchema = new Schema({
  telNumber: {
    type: String,
    required: true
  },
  userPwd: {
    type: String,
    required: true
  },
  authCode: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)
