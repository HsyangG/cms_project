<template>
  <div class="register">
    <h3>注册账号</h3>
    <div class="verify" v-show="verShowTip"><p>该账号已存在！</p></div>
    <div class="verify" v-if="errors.length"><p v-for="error in errors" :key="error.index">{{error}}</p></div>
    <form id="login_form">
      <div class="login-group">
        <input type="number" v-model="RegForm.tel" placeholder="手机号码">
      </div>
      <div class="login-group">
        <input type="password" v-model="RegForm.userPwd" placeholder="密码">
      </div>
    </form>
    <div class="get-ver">
      <input class="auth_input" type="number" v-model="RegForm.authCode" placeholder="输入验证码">
      <div class="get_auth_code" ref="getAuth">
        <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</span>
        <span v-show="!sendAuthCode" class="auth_text"><span class="auth_text_blue">{{auth_time}}</span> 秒后重发</span>
      </div>
    </div>
    <form class="sub">
      <button type="success" class="submitBtn" @click="submit" :loading="logining">注册</button>
      <hr>
      <p>已有账号，马上去 <span class="to" @click="tologin">登录</span></p>
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
        userPwd: '',
        authCode: ''
      },
      verShowTip: false,
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
      let pwd = this.RegForm.userPwd
      // 每次进来先把 errors 置空，否则会影响本次判断
      this.errors = []
      if (!tel) {
        this.errors.push('手机号码不能为空')
        return false
      } else if (tel.toString().length !== 11) {
        this.errors.push('手机号码必须是11位')
      } else if (!pwd) {
        this.errors.push('密码不能为空')
      } else if (pwd.length < 8 || pwd.length > 16) {
        this.errors.push('密码必须是8-16位')
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
      this.$axios.post('/register', qs.stringify({
        telNumber: this.RegForm.tel,
        userPwd: this.RegForm.userPwd,
        authCode: this.RegForm.authCode
      }))
        .then(res => {
          console.log(res.data)
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
      let pwd = this.RegForm.userPwd
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
      } else if (!pwd) {
        this.errors.push('密码不能为空')
      } else if (pwd.length < 8 || pwd.length > 16) {
        this.errors.push('密码必须是8-16位')
      }
    },
    tologin () {
      // 已有账号，跳转去登录
      this.$router.push('/callme/login')
    }
  }
}
</script>

<style scoped>
  .register{
    margin: 20px auto;
    width: 310px;
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
    background-color: #68c23b;
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
    width: 140px;
    height: 38px;
    margin-bottom: 20px;
    border: 1px solid #dcdfe6;
    padding-left: 10px;
    border-radius: 8%;
    outline: none;
  }
  .login-group input{
    width: 100%;
    height: 38px;
    margin-left: 0;
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
    margin-right: 20px;
  }
  .sub{
    text-align: left;
    padding-bottom: 10px;
  }
  .sub p{
    margin-top: 40px;
  }
</style>
