let path = require('path')
let express = require('express')
let bodyParser = require('body-parser')
let session = require('express-session')

let app = express()
let router = require('./router')

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 配置解析表单 POST 请求体，需要在挂载路由之前完成配置
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/**
 * 使用 session 来记录状态
 *     添加 session 数据：req.session = 'bar'
 *     访问 session 数据：req.session
 */
app.use(session({
  // secret 可以自定义，配置加密字符串，它会在原来的基础上加入这个字符串一起加密
  // 增加安全性，防止客户端恶意篡改 session
  secret: 'atlantic',
  resave: false,
  saveUninitialized: true // 无论是否使用 session，这里都分配一把钥匙出来
}))

// 解决跨域问题
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'Cache-Control');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Content-Type','application/x-www-form-urlencoded')
  next();
});

// 挂载路由
app.use(router)

// 配置全局错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(3000, function () {
  console.log('server is running at port 3000')
})
