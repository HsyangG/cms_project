<template>
  <div class="register">
    <div class="back" @click.prevent="toMe"><svg-icon icon-class="houtui"></svg-icon></div>
    <h3>注册账号</h3>
    <div class="verify" v-show="verShowTip"><p>该账号已存在！</p></div>
    <div class="verify" v-if="errors.length"><p v-for="error in errors" :key="error.index">{{error}}</p></div>
    <form id="login_form">
      <div class="login-group">
        <!-- 限制输入长度为10 -->
        <input type="text" v-model="RegForm.username" placeholder="用户名" maxlength="10">
      </div>
      <div class="login-group">
        <input type="number" v-model="RegForm.phone" placeholder="手机号码">
      </div>
      <div class="login-group">
        <input type="password" v-model="RegForm.password" placeholder="密码">
      </div>
    </form>
    <div class="get-ver">
      <input class="auth_input" type="number" v-model="RegForm.authCode" placeholder="输入验证码">
      <div class="get_auth_code" ref="getAuth">
        <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click.prevent="getAuthCode">获取验证码</span>
        <span v-show="!sendAuthCode" class="auth_text"><span class="auth_text_blue">{{auth_time}}</span> 秒后重发</span>
      </div>
    </div>
    <form class="sub">
      <button type="success" class="submitBtn" @click.prevent="submit" :loading="logining">注册</button>
      <hr>
      <p>已有账号，马上去 <span class="to" @click.prevent="tologin">登录</span></p>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import request from '@/utils/request'
import qs from 'qs'
import { setInterval, clearTimeout, clearInterval } from 'timers';
export default {
  data () {
    return {
      RegForm: {
        username: '',
        phone: '',
        password: '',
        avatar: '',
        authCode: '',
        over: '',
      },
      verShowTip: false,
      logining: false,
      sendAuthCode: true, // 控制按钮的显示
      auth_time: 0, // 计时器，倒计时
      verification: '', // 绑定输入验证码框
      errors: [],
      timer: null,
    }
  },
  methods: {
    getAuthCode: function () {
      // 验证输入号码是否合法
      let tel = this.RegForm.phone
      let pwd = this.RegForm.password
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
      this.verification = this.RegForm.phone
      let url = '/api/get_auth_code?phone=' + tel
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
    resetForm () {
      this.RegForm = {
        username: '',
        phone: '',
        password: '',
        avatar: '',
        authCode: '',
        over: '',
      }
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
      this.$axios.post('/api/register', qs.stringify(this.RegForm))
        .then(res => {
          console.log(res)
          if (res.data.code == 1) {
            this.verShowTip = true
            return false
          }
          if (res.data.code == 0) {
            let _this = this
            this.timer = setInterval(() => {
              _this.$router.push('/me')
              clearInterval(this.timer)
            }, 500)
          }
          this.resetForm()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.verShowTip = false
        })
    },
    // 表单校验
    checkForm: function () {
      let tel = this.RegForm.phone
      let pwd = this.RegForm.password
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
    },
    toMe () {
      this.$router.push('/me')
    }
  }
}
</script>

<style scoped>
  .register{
    position: relative;
    margin: 20px auto;
    width: 310px;
    height: 100%;
    background: #fff;
    padding: 30px 30px 0 30px;
  }
  .back{
    width: 25px;
    height: 25px;
    font-size: 16px;
    line-height: 25px;
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
    /*width: 65%;*/
    width: 100%;
    height: 38px;
    border: none;
    border-radius: 5px;
    background-color: #ff6c02;
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
    background: #ff6c02;
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
