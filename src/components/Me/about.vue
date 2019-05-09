<template>
  <div class="aboue_bubble">
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
      <div class="logo">
        <img src="@/assets/logo.jpg" alt="" style="display: inline-block;width: 60%;height: 60%;">
      </div>
      <div class="info_list">
        <ul>
          <li>
            <div class="list_title">说明</div>
            <div class="list_content">
              <div class="list_left">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;气泡网上商城是我的毕业设计项目，不会商用。但是我尽量会在气泡网上商城中使用较新的技术，因为目前的前端技术栈还不像后端的那么稳定。本商城中所有的依赖都是遵循开源协议的，特此说明。</span>
              </div>
              <!-- <div class="list_right">
                <svg-icon icon-class="qianjin"></svg-icon>
              </div> -->
            </div>
          </li>
          <li>
            <div class="list_content">
              <div class="list_left">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本商城目前所设定的还是单用户模式，没有考虑高并发的情况。等到我的技术成熟了之后，我会将这个项目构造成多用户模式，并且考虑做成商业项目。</span>
              </div>
              <!-- <div class="list_right">
                <svg-icon icon-class="qianjin"></svg-icon>
              </div> -->
            </div>
          </li>
          <li class="copyright">
            &copy; 2019 气泡网上商城 by 华世洋
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
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
    goBack () {
      this.$router.push('/me/setting')
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
.logo{
  width: 100%;
  padding-top: 80px;
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
  /* display: flex; */
  width: 100%;
  /* align-items: center; 上下居中 */
  /* justify-content: center; */ /* 左右居中 */
  text-align: left;
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
.copyright{
  margin-top: 20px;
  font-size: 12px;
  color: #9c9c9c;
}
</style>

