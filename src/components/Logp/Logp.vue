<template>
  <div class="login">
    <div class="back" @click.prevent="toMe"><svg-icon icon-class="houtui"></svg-icon></div>
    <h3>密码登录</h3>
    <div class="verify" v-show="verShowTip"><p>该账号未注册！</p></div>
    <div class="verify" v-if="errors.length"><p v-for="error in errors" :key="error.index">{{error}}</p></div>
    <form id="login_form">
      <div class="login-group">
        <input type="number" v-model="RegForm.phone" placeholder="手机号码">
        <input type="password" v-model="RegForm.password" placeholder="8-16位密码">
      </div>
      <div class="sub">
        <button type="submit" class="submitBtn" @click.prevent="submit" :disabled="is_disable">登录</button>
        <div class="usingP" @click.prevent="toLogin">短信登录</div>
        <hr>
        <p>没有账号，马上去 <span class="to" @click.prevent="toReg">注册</span></p>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs'
import request from '@/utils/request'
import { clearTimeout, setInterval, clearInterval } from 'timers';
export default {
  data () {
    return {
      RegForm: {
        phone: '',
        password: '',
      },
      verShowTip: false, // 控制显示未注册提示
      logining: false,
      errors: [],
      timer: null,
      is_disable: false,
    }
  },
  methods: {
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
      this.is_disable = true
      setTimeout(() => {
        this.is_disable = false
      }, 1000)
      this.$axios.post('/api/logp', qs.stringify(this.RegForm))
      .then(res => {
        if (res.data.code == 0) {
          let _this = this
          // 如果验证成功，保存登录状态
          localStorage.user_id = res.data.data[0].id
          localStorage.login_status = res.data.data[0].status
          localStorage.phone = res.data.data[0].phone
          localStorage.username = res.data.data[0].username
          // console.log(localStorage.login_status,localStorage.phone,localStorage.username)
          clearInterval()
          this.timer = setInterval(() => {
            _this.$router.push('/me')
            clearInterval(this.timer)
          }, 500)
          // _this.$router.push('/me')
        }
        if (res.data.code == 1) {
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
    },
    toLogin: function () {
      // 使用密码登录
      this.$router.push('/callme/login')
    },
    toReg () {
      // 没有账号，跳转去注册
      this.$router.push('/callme/register')
    },
    toMe () {
      this.$router.push('/me')
    }
  }
}
</script>

<style scoped>
  .login{
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
    background: #ff6c02;
    color: white;
    outline: none;
    margin-bottom: 20px;
  }
  .to{
    color: #fa5555;
    cursor: pointer;
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
