#系统模块
##1. 首页

### 1.0. 轮播图

设置轮播图从服务器获取

首先在项目文件夹下的 config/index.js 中添加跨域请求

```javascript
module.exports = {
    dev: {
        proxyTable: {
            // 这里设置请求接口，'/*' 是默认所有请求接口都可以访问
            '/*': {
                target: 'localhost:3000' // 这里填写需要跨域请求的 url
            }
        }
    }
}
```



### 1.1. 新闻资讯

#### 1.1.1. 实现导航栏和内容的左右联动效果

在现代的移动应用中，大多是采用单页应用的模式，这就会引起一些内容显示的问题。由于页面的大小有限，那我们怎样才能让有限的页面显示更多的内容呢？我们可以通过页面切换来实现。在 vue 中，大多数页面都是基于组件开发的，也就是说进行页面切换就是进行组件切换。

我自己在设计页面的过程中，遇到了不少麻烦，仅是开发导航条和页面内容的联动效果就想了大半天时间。一开始我的思路是切换页面，在切换页面的时候加入动画效果，使之能够平滑过渡。但是 vue 的页面切换是基于路由来实现的，如果通过切换页面来实现左右滑动效果，会进行路由跳转（url 的切换），这样是很难实现平滑的过渡效果。

既然切换页面这个方法无法实现，那另一个方法就是切换组件。vue 有一个强大的地方在于页面内容可以通过组件来实现，简单来说就是模块化开发。vue 提供了一个动态组件的概念，具体的请参考官方文档

> https://cn.vuejs.org/v2/guide/components-dynamic-async.html

切换组件的实质就是操作 DOM 元素，这是 HTML 的领域了，这样就可以通过 CSS 来操作样式，以实现动画效果

由于我设计不出来这一块的操作，所以为了提高开发效率，我引入了一个框架 `Swiper` ，这个框架的就是基于上面的原理来实现动画效果的

> swiper 官方文档：https://www.swiper.com.cn/api/start/new.html

具体的实现方法参考下面这篇文章

> https://www.cnblogs.com/zishang91/p/7940433.html

### 1.2. 图片分享

### 1.3. 商品展示

### 1.4. 留言反馈

### 1.5. 搜索资讯

### 1.6. 联系我们

#### 1.6.1. 这个页面做成登录页面

在登录页中，设置验证码登录，这样做是参考了当下的大公司的登陆做法，验证码是服务器生成的，然后发送到用户的手机上，比使用密码登录更安全，而且这样做也有利于服务器记住用户的登录状态，方便权限管理

有一个登录按钮，如果用户没有输入内容，则发出提示，提示用户登录

下面有一个注册页面的跳转链接

#### 1.6.2. 设计样式

设计两个输入框，一个保存账号，另一个保存验证码

配置路由：

```javascript
import CallMe from '@/components/CallMe'

{
    name: 'callMe.callMe' // 在 Home 页面会用到这个 name属性
    path: 'callme/callme'
    component: CallMe
}
```

#### 1.6.3 向服务器提交数据

#####1.6.3.1. 无法找到通过 axios 发送的数据

这个问题困惑了我一个晚上，因为我使用 axios 向后台发送不到数据

在网上找了很多决绝办法，但我一一尝试了都没用

最终的解决办法是：

> https://www.jianshu.com/p/cbf3a66d5891

```javascript
// 在 Login.vue 组件中
<script type="text/ecmascript-6">
/*
qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库。
主要维护者：Jordan Harband
最初创建者和维护者：TJ Holowaychuk

qs.parse()将URL解析成对象的形式
qs.stringify()将对象 序列化成URL的形式，以&进行拼接

qs.stringify() 和JSON.stringify()有什么区别
var a = {name:'hehe',age:10};
qs.stringify序列化结果如下：
name=hehe&age=10
而JSON.stringify序列化结果如下：
"{"a":"hehe","age":10}"
*/
import qs from 'qs'
export default {
    ...
    methods: {
        ...
        submit () {
            this.$axios.post('/login', qs.stringify({
                telNumber: this.RegForm.tel,
                verification: this.RegForm.verification
            }))
        }
    }
}
</script>
```

原因是axios默认发送数据时，数据格式是Request Payload，而并非我们常用的Form Data格式，后端未必能正常获取到，所以在发送之前，需要使用qs模块对其进行处理。 

关于 HTTP 请求中的 form data 和 request rayload 的区别，请参考下面的文章：

> https://www.cnblogs.com/btgyoyo/p/6141480.html



#####1.6.3.2. 当服务器响应请求后，发送的响应数据 axios 读取失败，浏览器报错：

```
Failed to load http://localhost:3000/login: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed access.
```

解决办法：

> https://blog.csdn.net/idomyway/article/details/79572973

在服务端发送响应数据的时候，先设置响应的请求头（因为产生了跨域问题）

```javascript
res.setHeader('Access-Control-Allow-Origin', '*')
```

原因：

W3C标准里是这么实现HTTP跨域请求的， Cross-Origin Resource Sharing

简单的来说，就是跨域的目标服务器要返回一系列的Headers，通过这些Headers来控制是否同意跨域。

Access-Control-Allow-Origin HTTP Response Header
Access-Control-Max-Age HTTP Response Header
Access-Control-Allow-Credentials HTTP Response Header
Access-Control-Allow-Methods HTTP Response Header
Access-Control-Allow-Headers HTTP Response Header
Origin HTTP Request Header
Access-Control-Request-Method HTTP Request Header
Access-Control-Request-Headers HTTP Request Header

在 Request 包和 Response 包中都有一些。  其中最敏感的就是 Access-Control-Allow-Origin 这个 Header, 他是W3C标准里用来检查该跨域请求是否可以被通过。 (Access Control Check) 

##### 1.6.3.3. 限制输入

在前台控制输入数据的格式，防止垃圾数据发送到后台

在提交数据之前，先用输入框限制输入数字类型（type = “number”）

```html
<input type="number" v-model="RegForm.tel" placeholder="手机号码">
```

然后在 methods 中定义号码校验方法

```javascript
// 表单校验
    checkForm: function () {
      let tel = this.RegForm.tel
      let auth = this.RegForm.authCode
      // 每次进来先把 errors 置空，否则会影响本次判断
      this.errors = []
      if (!tel) {
        this.errors.push('手机号码不能为空')
        return false
      } else if (tel.toString().length !== 11) {
        this.errors.push('手机号码必须是11位')
      } else if (!auth) {
        this.errors.push('验证码不能为空')
      } else if (auth.toString().length !== 6) {
        this.errors.push('验证码必须是6位')
      }
    },
```

然后在提交函数提交数据之前先调用校验方法

```javascript
submit () {
    // 先校验输入是否合法
    this.checkForm()
    if (this.errors.length) return false
    ...
}
```

####1.6.4. 后台处理数据

##### 1.6.4.1. 后台加密用户的密码

这里用到一个开源的加密包 `blueimp-md5` ，下面是它的官网：

> https://www.npmjs.com/package/blueimp-md5

用法：

```javascript
let md5 = require('blueimp-md5')

...
// 所以使用 md5 进行加密两次
        body.password = md5(md5(body.password))
```



###1.7.  路由管理

#### 1.7.1. Login 的路由

| 请求方法 | 请求路径 | 请求参数            | 备注           |
| -------- | -------- | ------------------- | -------------- |
|          |          |                     |                |
| get      | /auth    | telNumber           | 请求获取验证码 |
| post     | /login   | telNumber、authCode | 请求短信登录   |
| post     | /logp    | telNumber、userPwd  | 请求密码登录   |

#### 1.7.2. Register 的路由

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |
|      |      |      |



### 1.8.0. 设计数据库

#### 1.8.1. user

| telNumber      | userPwd        | authCode       |
| -------------- | -------------- | -------------- |
| type: String   | type: String   | type: String   |
| required: true | required: true | required: true |
|                |                |                |

#### 1.8.2. user_reg

| telNumber      | userPwd        | authCode       |
| -------------- | -------------- | -------------- |
| type: String   | type: String   | type: String   |
| required: true | required: true | required: true |
|                |                |                |
##2. 搜索页

### 2.1. 设计思路

大多数应用都有搜索功能，这个功能可以帮助用户快速的找到用户所需要的信息。所以我专门设计了一个模块用来专门维护搜索功能。

这个页面有一个输入框，点击搜索之后，应用会向服务器发起一个查询请求，请求内包含用户的 id 和 需要查询的字段，然后服务器通过该字段匹配内容。如果该内容存在，则返回对应的数据，客户端根据该数据渲染出内容页面，如果该内容不存在；则服务器返回状态码（状态码是前端跟后端约定好的特殊数字），客户端根据状态码给出相应的提示。

该模块还提供了记录历史搜索功能，记录的内容与搜索框的内容是同步的，如果点击了历史记录，那搜索框里面的内容也会发生改变，然后向服务器发起请求

