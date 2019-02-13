<template>
  <div class="login">
    <h3>密码登录</h3>
    <div class="verify" v-show="verShowTip"><p>该账号未注册！</p></div>
    <div class="verify" v-if="errors.length"><p v-for="error in errors" :key="error.index">{{error}}</p></div>
    <form id="login_form">
      <div class="login-group">
        <input type="number" v-model="RegForm.tel" placeholder="手机号码">
        <input type="password" v-model="RegForm.userPwd" placeholder="8-16位密码">
      </div>
      <div class="sub">
        <button type="submit" class="submitBtn" @click="submit" :loading="logining">登录</button>
        <div class="usingP" @click="toLogin">短信登录</div>
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
        userPwd: ''
      },
      verShowTip: false, // 控制显示未注册提示
      logining: false,
      errors: []
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
      this.$axios.post('/logp', qs.stringify({
        telNumber: this.RegForm.tel,
        userPwd: this.RegForm.userPwd
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
