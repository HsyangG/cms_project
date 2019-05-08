<template>
  <div class="mine_address">
    <div class="container">
      <div class="header">
        <div class="go_back" @click.prevent="goBack">
          <svg-icon icon-class="houtui"></svg-icon>
        </div>
        <div class="title">{{title}}</div>
        <!-- <div class="header_left"></div>
        <div class="header_right">
          <div class="find">
            <svg-icon icon-class="find"></svg-icon>
          </div>
          <div class="shopcart"><i class="icon-gouwuche"></i></div>
        </div> -->
      </div>
      <div class="info_list">
        <ul>
          <li>
            <div class="list_title">地址管理</div>
            <div class="list_content">
              <div class="list_left">
                <span>地址类型</span>
              </div>
              <div class="list_right">
                <!-- <svg-icon icon-class="qianjin"></svg-icon> -->
                <select class="com-opt" v-model="form.type">
                  <!-- 默认提示信息 -->
                  <option value="" disabled selected hidden>请选择地址类型</option>
                  <option value="home" selected="selected">家庭地址</option>
                  <option value="company">工作地址</option>
                  <option value="moren">默认地址</option>
                </select>
              </div>
            </div>
          </li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>我的姓名</span>
              </div>
              <div class="list_right">
                <!-- <svg-icon icon-class="qianjin"></svg-icon> -->
                <input class="my_input" placeholder="请输入姓名" v-model="form.name" type="text">
              </div>
            </div>
          </li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>我的手机</span>
              </div>
              <div class="list_right">
                <!-- <svg-icon icon-class="qianjin"></svg-icon> -->
                <input class="my_input" placeholder="请输入手机号" v-model="form.phone" type="text">
              </div>
            </div>
          </li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>省市区</span>
              </div>
              <div class="list_right">
                <!-- <svg-icon icon-class="qianjin"></svg-icon> -->
                <input class="my_input" placeholder="省" v-model="form.province" type="text" style="width: 33%;">
                <input class="my_input" placeholder="市" v-model="form.city" type="text" style="width: 33%;">
                <input class="my_input" placeholder="区" v-model="form.district" type="text" style="width: 33%;">
              </div>
            </div>
          </li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>详细地址</span>
              </div>
              <input class="my_input" placeholder="请输入详细地址" v-model="form.site" type="textarea">
            </div>
          </li>
        </ul>
        <div class="logout" @click="handleSubmit">提交</div>
      </div>
    </div>
    <div class="logout_dialog" v-if="showDialog" ref="logout_dialog">
      <div class="dialog_box" ref="dialog_box">
        <div class="dialog_title">退出账号</div>
        <div class="dialog_content">确定要退出账号吗？</div>
        <div class="dialog_bottom">
          <div class="dialog_button">
            <div class="dialog_cancel" @click.prevent="handleCancel">取消</div>
            <div class="dialog_confirm" @click.prevent="handleConfirm" :disabled="is_disable">确定</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tips_container">
      <div class="login_tips" v-if="showTips">{{addTips}}</div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import { setInterval, clearTimeout, clearInterval, setTimeout } from 'timers';
// import { toStopPrevent } from '@/utils/index'
export default {
  data () {
    return {
      title: '',
      listQuery: {
        id: '',
        account: '',
        status: '',
        timer: null
      },
      showDialog: false,
      is_disable: false,
      form: {
        name: '',
        account: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        site: '',
        type: '',
      },
      showTips: false,
      addTips: '您还未登录',
    }
  },
  created () {
    this.listQuery.id = this.$route.query.id || ''
    if (this.listQuery.id) {
      this.getAddress()
    }
    this.title = this.$route.meta.title
    // console.log(this.title)
    this.listQuery.account = localStorage.phone
    this.listQuery.status = localStorage.login_status
    // console.log(localStorage)
  },
  methods: {
    getAddress () {
      this.$axios.get('/api/get_address_by_id', {
        params: {
          id: this.listQuery.id
        }
      })
      .then((response) => {
        if (response.data.code == 0) {
          this.form = response.data.data[0]
        } else {
          console.log(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    goBack () {
      this.$router.push('/me/mine_address')
    },
    toUserInfo () {
      this.$router.push('/me/user_information')
    },
    toMineAddress () {
      this.$router.push('/me/mine_address')
    },
    handleSubmit () {
      // console.log(this.form)
      this.form.account = localStorage.phone
      this.$axios.post('/api/update_address', qs.stringify(this.form))
      .then((response) => {
        if (response.data.code == 0) {
          this.getAddress()
            this.showDialog = false
            this.addTips = '操作成功'
            this.showTips = true
            this.timer = setTimeout(() => {
              this.showTips = false
              clearInterval(this.timer)
            }, 1000)
            this.$router.push('/me/mine_address')
            return false
        } else {
          console.log(response.data.msg)
        }
      }).catch((err) => {

      });
    },
    toLogout () {
      // this.$axios.post('/api/logout', qs.stringify(this.listQuery))
      // .then((response) => {
      //   if (response.data.code == 0) {
      //     localStorage.phone = ''
      //     localStorage.username = ''
      //     localStorage.login_status = ''
      //     this.timer = setInterval(() => {
      //       // console.log('hello')
      //       this.$router.push('/me')
      //       clearInterval(this.timer)
      //     }, 1000)
      //   }
      // }).catch((err) => {
      //   console.log(err)
      // });
      this.showDialog = true
    },
    handleCancel () {
      this.showDialog = false
    },
    handleConfirm () {
      this.is_disable = true
      setTimeout(() => {
        this.is_disable = false
      }, 1000)
      this.$axios.post('/api/logout', qs.stringify(this.listQuery))
      .then((response) => {
        if (response.data.code == 0) {
          localStorage.phone = ''
          localStorage.username = ''
          localStorage.login_status = ''
          this.showDialog = false
          clearInterval()
          this.timer = setInterval(() => {
            // console.log('hello')
            this.$router.push('/me')
            clearInterval(this.timer)
          }, 500)
        }
      }).catch((err) => {
        console.log(err)
      });
    }
  }
}
</script>
<style scoped>
.container{
  width: 100%;
  height: 100vh; /* 视窗高度 */
  background: #f5f5f5;
  position: relative;
}
.header{
  display: flex;
  position: relative;
  width: 100%;
  height: 60px;
  background: #fafafa;
  box-sizing: border-box;
  /* padding: 16px 10px; */
  border-bottom: 1px solid #ccc;
}
.go_back{
  position: absolute;
  top: 18px;
  left: 10px;
  width: 24px;
  height: 24px;
  font-size: 20px;
  z-index: 100;
}
.title{
  position: absolute;
  top: 18px;
  left: 38px;
  width: 100px;
  height: 20px;
}
.header_left{
  width: 100%;
  height: 100%;
}
.header_right{
  display: flex;
  width: 100%;
  height: 100%;
  line-height: 60px;
}
.info_list{
  margin-top: 15px;
}
.list_title{
  padding: 10px 15px;
  box-sizing: border-box;
  text-align: left;
  font-size: 14px;
  font-weight: 700;
}
.list_content{
  display: flex;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
}
.list_left{
  display: flex;
  width: 90px;
  align-items: center; /* 上下居中 */
  /* justify-content: center; */ /* 左右居中 */
  font-weight: 500;
  /* background: #ff6a20; */
}
.list_right{
  display: flex;
  width: 100%;
  align-items: center; /*上下居中*/
  justify-content: flex-start;
  /* text-align: left; */
  /* background: #ccc; */
}
.avatar{
  /* display: inline-block; */
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.logout{
  margin: 30px auto;
  width: 90%;
  padding: 7px 15px;
  box-sizing: border-box;
  background: #fff;
  font-size: 14px;
  border-radius: 23px;
}
.logout_dialog{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5)
}
.dialog_box{
  width: 100%;
  /* height: 200px; */
  margin: 200px auto;
  background: #fff;
  /* border-radius: 5px; */
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 200;
}
.dialog_title{
  padding: 20px;
  font-weight: 700;
}
.dialog_content{
  font-size: 12px;
  color: #9c9c9c;
}
.dialog_bottom{
  margin-top: 30px;
}
.dialog_button{
  display: flex;
  width: 90%;
  border: 1px solid #eaeaea;
  font-size: 12px;
  margin: 0 auto;
  border-radius: 20px;
}
.dialog_cancel{
  width: 100%;
  padding: 10px 0 10px 0;
  text-align: center;
  border-right: 1px solid #eaeaea;
}
.dialog_confirm{
  width: 100%;
  padding: 10px 0 10px 0;
  text-align: center;
  color: #ff6a20;
}
.my_input{
  display: inline-block;
  /* width: 100%; */
  font-size: 14px;
  border: none;
  outline: none;
}
.tips_container{
  position: absolute;
  top: 300px;
  left: 0;
  width: 100%;
  /* background: #eee; */
}
.login_tips{
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  background: rgba(0,0,0,0.5);
  color: rgba(255,255,255,0.9);
}
.com-sel {
    line-height: 5rem;
    cursor: pointer;        /*鼠标上移变成小手*/
}

.com-opt {
    padding-right: 1.8rem;
    color: #afbac0;
    font-size: 14px;
    border: none;
    outline: none;
    /*去掉默认的下拉三角*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    /*添加下拉三角图标*/
}
/* ---------------------
作者：修炼ing
来源：CSDN
原文：https://blog.csdn.net/nishiwodebocai21/article/details/82350679
版权声明：本文为博主原创文章，转载请附上博文链接！ */
</style>

