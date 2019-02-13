<template>
  <div class="login">
    <h3>短信登录</h3>
    <div class="verify" v-show="verShowTip"><p>该账号未注册！</p></div>
    <div class="verify" v-if="errors.length"><p v-for="error in errors" :key="error.index">{{error}}</p></div>
    <form id="login_form">
      <div class="login-group">
        <input type="number" v-model="RegForm.tel" placeholder="手机号码">
      </div>
      <div class="get-ver">
        <input class="auth_input" type="number" v-model="RegForm.authCode" placeholder="输入验证码">
        <div class="get_auth_code" ref="getAuth">
          <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</span>
          <span v-show="!sendAuthCode" class="auth_text"><span class="auth_text_blue">{{auth_time}}</span> 秒后重发</span>
        </div>
      </div>
      <div class="sub">
        <button type="submit" class="submitBtn" @click="submit" :loading="logining">登录</button>
        <div class="usingP" @click="toLog">密码登录</div>
        <hr>
        <p>没有账号，马上去 <span class="to" @click="toReg">注册</span></p>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs'
export default {
  data () {
    return {
      RegForm: {
        tel: '',
        authCode: ''
      },
      verShowTip: false, // 控制显示未注册提示
      logining: false,
      sendAuthCode: true, // 控制按钮的显示
      auth_time: 0, // 计时器，倒计时
      verification: '', // 绑定输入验证码框
      errors: []
    }
  },
  methods: {
    getAuthCode: function () {
      // 验证输入号码是否合法
      let tel = this.RegForm.tel
      // 每次进来先把 errors 置空，否则会影响本次判断
      this.errors = []
      if (!tel) {
        this.errors.push('手机号码不能为空')
        return false
      } else if (tel.toString().length !== 11) {
        this.errors.push('手机号码必须是11位')
      }
      if (this.errors.length) return false
      this.verification = this.RegForm.tel
      let url = '/auth?telNumber=' + tel
      this.$axios.get(url)
        .then(function (res) {
          console.log('请求成功', res)
        }, function (err) {
          console.log('请求失败', err)
        })
      this.sendAuthCode = false
      this.auth_time = 10 // 设置倒计时
      this.$refs.getAuth.style.background = '#ccc'
      let authTimeTimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time < 0) {
          this.$refs.getAuth.style.background = '#28a3ff'
          this.sendAuthCode = true
          clearInterval(authTimeTimer)
        }
      }, 1000)
    },
    // 封装注册发送请求
    thisAjax () {
      /* let passwordData = this.RegForm.password
      let phoneData = this.RegForm.tel
      let mCodeData = this.verification */
      let url = ''
      // 手机注册
      // emulateJSON: true 设置后 post 可以发送跨域请求
      this.$http.post(url, { }, {emulateJSON: true})
        .then(function (response) {
          // 登录后跳转的页面
          this.router.push('/')
        }, function (error) {
          alert(error)
        })
    },
    submit () {
      /* this.$refs.RegForm.validete(valid => {
        if (valid) {
          this.logining = true
          this.thisAjax()
          console.log('开始写入后台数据！')
        } else {
          console.log('submit err')
        }
      }) */
      // 先校验输入是否合法
      this.checkForm()
      if (this.errors.length) return false
      this.$axios.post('/login', qs.stringify({
        telNumber: this.RegForm.tel,
        authCode: this.RegForm.authCode
      }))
        .then(res => {
          if (res.data.err_code === 1) {
            this.verShowTip = true
            return false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
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
    reset () {
      this.$refs.RegForm.resetFields()
    },
    toLog: function () {
      // 使用密码登录
      this.$router.push('/callme/logp')
    },
    toReg () {
      // 没有账号，跳转去注册
      this.$router.push('/callme/register')
    }
  }
}
</script>

<style scoped>
.login{
  margin: 20px auto;
  width: 310px;
  height: 100%;
  background: #fff;
  padding: 30px 30px 0 30px;
}
h3{
  font-size: 25px;
  margin-bottom: 20px;
}
.verify{
  margin: 0 0 5px 5px;
  text-align: left;
  font-size: 10px;
  color: red
}
.submitBtn{
  width: 65%;
  height: 38px;
  border: none;
  border-radius: 20px;
  background: #28a3ff;
  color: white;
  outline: none;
  margin-bottom: 20px;
}
.to{
  color: #fa5555;
  cursor: pointer;
}
.get-ver{
  text-align: left;
}
.auth_input{
  width: 110px;
  height: 38px;
  margin: 0 10px 20px 0;
  border: 1px solid #dcdfe6;
  padding-left: 10px;
  border-radius: 8%;
  outline: none;
}
.login-group input{
  width: 100%;
  height: 38px;
  margin-bottom: 20px;
  text-indent: 10px; /*防止输入框添加padding而变形*/
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  outline: none;
}
.get_auth_code{
  display: inline-block;
  width: 110px;
  height: 40px;
  float: right;
  background: #28a3ff;
  color: white;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  margin-right: 60px;
}
.usingP{
  margin: 20px 0 10px 0;
  color: #fa5555;
}
  .sub{
    text-align: left;
    padding-bottom: 10px;
  }
  .sub p{
    margin-top: 40px;
  }
</style>
