<template>
  <div class="user_info">
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
            <div class="list_title">账号管理</div>
            <div class="list_content" @click="toUserInfo">
              <div class="list_left">
                <span>个人资料</span>
              </div>
              <div class="list_right">
                <svg-icon icon-class="qianjin"></svg-icon>
              </div>
            </div>
          </li>
          <li>
            <div class="list_content" @click="toMineAddress">
              <div class="list_left">
                <span>收货地址</span>
              </div>
              <div class="list_right">
                <svg-icon icon-class="qianjin"></svg-icon>
              </div>
            </div>
          </li>
          <li style="width: 100%;height: 15px;"></li>
          <li>
            <div class="list_title">关于</div>
            <div class="list_content" @click="toAbout">
              <div class="list_left">
                <span>关于气泡网上商城</span>
              </div>
              <div class="list_right">
                <!-- <span style="margin-right: 5px;">username</span> -->
                <svg-icon icon-class="qianjin"></svg-icon>
              </div>
            </div>
          </li>
        </ul>
        <div class="logout" @click="toLogout">退出登录</div>
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
      </div>
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
        phone: '',
        status: '',
        timer: null
      },
      showDialog: false,
      is_disable: false
    }
  },
  created () {
    this.title = this.$route.meta.title
    // console.log(this.title)
    this.listQuery.phone = localStorage.phone
    this.listQuery.status = localStorage.login_status
    // console.log(localStorage)
  },
  methods: {
    // resetUserStatus () {
    //   localStorage.removeItem(phone)
    //   localStorage.removeItem(login_status)
    //   localStorage.removeItem(username)
    // },
    goBack () {
      this.$router.push('/me')
    },
    toUserInfo () {
      this.$router.push('/me/user_information')
    },
    toMineAddress () {
      this.$router.push('/me/mine_address')
    },
    toAbout () {
      this.$router.push('/me/setting/about')
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
  padding: 10px 15px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
}
.list_left{
  display: flex;
  width: 100%;
  align-items: center; /* 上下居中 */
  /* justify-content: center; */ /* 左右居中 */
  font-weight: 500;
}
.list_right{
  display: flex;
  width: 100%;
  align-items: center; /* 上下居中 */
  justify-content: flex-end;
  /* text-align: right; */
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
</style>

