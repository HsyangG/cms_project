let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let router = require('./router')

let app = express()

app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/node_modules/', express.static(path.join(__dirname, './../node_modules/')))

// 配置解析表单 POST 请求体插件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(3000, function () {
  console.log('Server is running...')
})
