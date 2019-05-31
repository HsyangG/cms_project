<template>
  <div class="user_info">
    <div class="container">
      <div class="header">
        <div class="go_back" @click.prevent.prevent="goBack">
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
            <div class="list_content">
              <div class="list_left">
                <span>头像</span>
              </div>
              <div class="list_right">
                <img v-if="user_info.avatar" class="avatar" :src="user_info.avatar" alt="">
                <img v-else class="avatar" src="@/assets/img/avatar_default.png" alt="">
              </div>
            </div>
          </li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>用户名</span>
              </div>
              <div class="list_right">
                <span style="margin-right: 5px;">{{user_info.username}}</span>
                <svg-icon icon-class="qianjin"></svg-icon>
              </div>
            </div>
          </li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>性别</span>
              </div>
              <div class="list_right">
                <span style="margin-right: 5px;">
                  <span v-if="user_info.gender == 0">男</span>
                  <span v-else-if="user_info.gender == 1">女</span>
                  <span v-else>未知</span>
                </span>
                <svg-icon icon-class="qianjin"></svg-icon>
              </div>
            </div>
          </li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>账号</span>
              </div>
              <div class="list_right">
                <span style="margin-right: 5px;">{{user_info.phone}}</span>
                <svg-icon icon-class="qianjin"></svg-icon>
              </div>
            </div>
          </li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>账户余额</span>
              </div>
              <div class="list_right">
                <span style="margin-right: 5px;">&yen; {{user_info.over}}</span>
                <svg-icon icon-class="qianjin"></svg-icon>
              </div>
            </div>
          </li>
          <li style="width: 100%;height: 15px;"></li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>修改支付密码</span>
              </div>
              <div class="list_right">
                <!-- <span style="margin-right: 5px;">username</span> -->
                <svg-icon icon-class="qianjin"></svg-icon>
              </div>
            </div>
          </li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>修改密码</span>
              </div>
              <div class="list_right">
                <!-- <span style="margin-right: 5px;">username</span> -->
                <svg-icon icon-class="qianjin"></svg-icon>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      title: '',
      listQuery: {
        phone: '',
        status: ''
      },
      user_info: {}
    }
  },
  created () {
    this.title = this.$route.meta.title
    // console.log(this.title)
    this.listQuery.phone = localStorage.phone
    this.listQuery.status = localStorage.login_status
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      // console.log(localStorage)
      this.$axios.get('/api/get_user_info', {
        params: this.listQuery
      })
      .then((response) => {
        if (response.data.code == 0) {
          this.user_info = response.data.data[0]
          console.log(this.user_info)
        }
        if (response.data.code != 0) {
          // this.user_info = response.data.data
          console.log(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    goBack () {
      // this.$router.push('/me')
      this.$router.go(-1)
    },
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
</style>

