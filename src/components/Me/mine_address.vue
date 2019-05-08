<template>
  <div class="mine_address" ref="myAddress">
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
      <ul v-if="list">
        <li v-for="item in list" :key="item.id">
          <div class="address_box">
            <div class="address_type">
              <span v-if="item.type == 'home'">家庭地址</span>
              <span v-else-if="item.type == 'company'">工作地址</span>
              <span v-else-if="item.type == 'moren'">默认地址</span>
              <span v-else>未知类型</span>
            </div>
            <div class="address_name">我的姓名: <span>{{item.name}}</span></div>
            <div class="address_phone">联系电话: <span>{{item.phone}}</span></div>
            <div class="address_address">我的地址: <span>{{item.province}} {{item.city}} {{item.district}} {{item.site}}</span></div>
            <div class="address_button">
              <div class="address_edit" @click="onEdit(item)">编辑</div>
              <div class="address_delete" @click="handleDelete(item)">删除</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="add_address">
        <img src="@/assets/mine-address-add.png" @click="toAddAddress" alt="" style="display: inline-block;width: 30px;height: 30px;">
        <div>添加新地址</div>
      </div>
      <div class="logout_dialog" v-if="showDialog" ref="logout_dialog">
        <div class="dialog_box" ref="dialog_box">
          <div class="dialog_title">删除地址</div>
          <div class="dialog_content">确定要删除地址吗？</div>
          <div class="dialog_bottom">
            <div class="dialog_button">
              <div class="dialog_cancel" @click.prevent="handleCancel">取消</div>
              <div class="dialog_confirm" @click.prevent="handleConfirm" :disabled="is_disable">确定</div>
            </div>
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
import { initScroll } from '@/utils/index'
import qs from 'qs'
export default {
  data () {
    return {
      title: '',
      showDialog: false,
      is_disable: false,
      listQuery:{
        account: '',
        status: ''
      },
      list: null,
      addTips: '您还未登录',
      showTips: false,
    }
  },
  created () {
    this.getAddressList()
  },
  mounted () {
    this.title = this.$route.meta.title || ''
    this.listQuery.account = localStorage.phone
    this.listQuery.status = localStorage.login_status
    this.$nextTick(() => {
      initScroll(this.scroll,this.$refs.myAddress)
    })
  },
  methods: {
    getAddressList () {
      this.$axios.get('/api/get_address', {
        params: this.listQuery
      })
      .then((response) => {
        if (response.data.code == 0) {
          this.list = response.data.data
        } else {
          console.log(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    goBack () {
      this.$router.push('/me')
    },
    onEdit (row) {
      this.$router.push('/me/mine_address_add?id=' + row.id)
    },
    handleDelete (row) {
      this.showDialog = true;
      if (row.type == 'moren') {
        this.showDialog = false
        this.addTips = '默认地址不可删除'
        this.showTips = true
        this.timer = setTimeout(() => {
          this.showTips = false
          clearInterval(this.timer)
        }, 1000)
        return false
      }
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
    },
    toAddAddress () {
      this.$router.push('/me/mine_address_add')
    }
  }
}
</script>
<style scoped>
.mine_address{
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.container{
  width: 100%;
  height: 3000px;
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
.address_box{
  margin: 10px 15px;
  padding: 0 15px;
  box-sizing: border-box;
  text-align: left;
  background: #fff;
  border-radius: 5px;
}
.address_type{
  padding: 15px 0;
  box-sizing: border-box;
  font-weight: 700;
}
.address_name, .address_phone, .address_address{
  padding-bottom: 5px;
  box-sizing: border-box;
  font-size: 14px;
  word-break: break-all;
}
.address_button{
  display: flex;
  margin-top: 15px;
  padding: 15px;
  box-sizing: border-box;
  border-top: 1px solid #eaeaea;
}
.address_edit{
  width: 100%;
  text-align: center;
  border-right: 1px solid #eaeaea;
}
.address_delete{
  width: 100%;
  text-align: center;
}
.add_address{
  margin-top: 20px;
  font-size: 14px;
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
</style>
