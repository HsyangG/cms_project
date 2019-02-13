let mongoose = require('mongoose')
let Schema = mongoose.Schema

// 连接到数据库
mongoose.connect('mongodb://localhost/mall', { useNewUrlParser: true})

let userRegSchema = new Schema({
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
    required: false
  }
})

module.exports = mongoose.model('User_reg', userRegSchema)
