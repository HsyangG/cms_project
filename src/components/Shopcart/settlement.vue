<template>
  <div class="settlement">
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
      <div class="address">
        <div>
          <ul v-if="address_list">
            <li v-for="item in address_list" v-if="selectIndex == item.id" :key="item.id">
              <div class="address_box">
                <div class="address_title">收货地址</div>
                <div @click="toSelectAddress">
                  <div class="address_type">
                    <span v-if="item.type == 'home'">家庭地址</span>
                    <span v-else-if="item.type == 'company'">工作地址</span>
                    <span v-else-if="item.type == 'moren'">默认地址</span>
                    <span v-else>未知类型</span>
                  </div>
                  <div class="address_name">我的姓名: <span>{{item.name}}</span></div>
                  <div class="address_phone">联系电话: <span>{{item.phone}}</span></div>
                  <div class="address_address">我的地址: <span>{{item.province}} {{item.city}} {{item.district}} {{item.site}}</span></div>
                </div>
                <div class="address_go_ahead">
                  <svg-icon icon-class="qianjin"></svg-icon>
                </div>
              </div>
            </li>
            <!-- <li v-else>
              <div v-for="item in address_list" v-if="item.selected" :key="item.id">
                <div class="address_box">
                  <div class="address_title">收货地址</div>
                  <div @click="toSelectAddress">
                    <div class="address_type">
                      <span v-if="item.type == 'home'">家庭地址</span>
                      <span v-else-if="item.type == 'company'">工作地址</span>
                      <span v-else-if="item.type == 'moren'">默认地址</span>
                      <span v-else>未知类型</span>
                    </div>
                    <div class="address_name">我的姓名: <span>{{item.name}}</span></div>
                    <div class="address_phone">联系电话: <span>{{item.phone}}</span></div>
                    <div class="address_address">我的地址: <span>{{item.province}} {{item.city}} {{item.district}} {{item.site}}</span></div>
                  </div>
                  <div class="address_go_ahead">
                    <svg-icon icon-class="qianjin"></svg-icon>
                  </div>
                </div>
              </div>
            </li> -->
          </ul>
        </div>
      </div>
      <div style="width: 100%;height: 15px;"></div>
      <div class="shop_list" ref="shopList">
        <ul>
          <li v-for="item in shopList" :key="item.id">
            <div class="shop_info">
              <div class="shop_image">
                <img v-if="item.picture" :src="item.picture" alt="" style="width: 100%;height: 100%">
              </div>
              <div class="shop_info_list">
                <div class="shop_info_name">{{item.name}}</div>
                <div class="shop_info_info">
                  <div class="shop_info_size">
                    <div class="shop_info_format">{{item.format}}</div>
                    <div class="shop_info_count"><span>x</span><span></span>{{item.shop_count}}</div>
                  </div>
                  <div class="shop_info_total_price">&yen; {{item.total_price}}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="settlement_bottom">
      <div class="shop_total">
        共{{shop_count}}件，应付金额：<span style="color: #ff6a20;">&yen; {{total_price}}</span>
      </div>
      <div class="settlement_pay" @click="toPay">立即支付</div>
    </div>
    <div class="logout_dialog" v-if="showDialog" ref="logout_dialog">
      <div class="dialog_box" ref="dialog_box">
        <div class="dialog_title">请输入支付密码</div>
        <div class="dialog_content">
          <!-- 引用 https://www.cnblogs.com/cjh1111/p/6971801.html -->
          <div id="payPwd">
            <div style="text-align: center">
              <!-- 支付密码设置 -->
            </div>
            <input ref="pwd" type="password" maxlength="6" v-model="payment"  style="position: absolute;z-index: -1;left:-100%;opacity: 0"/>
            <ul class="pwd_wrap" @click="focus">
              <li><i v-if="msgLength > 0"></i></li>
              <li><i v-if="msgLength > 1"></i></li>
              <li><i v-if="msgLength > 2"></i></li>
              <li><i v-if="msgLength > 3"></i></li>
              <li><i v-if="msgLength > 4"></i></li>
              <li><i v-if="msgLength > 5"></i></li>
            </ul>
          </div>
        </div>
        <div class="dialog_bottom">
          <div class="dialog_button">
            <div class="dialog_cancel" @click.prevent="handleCancel">取消</div>
            <div class="dialog_confirm" @click.prevent="handleConfirm">确定</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tips_container">
      <div class="login_tips" v-if="showTips">{{addTips}}</div>
    </div>
  </div>
  </div>
</template>
<script>
import { initScroll } from '@/utils/index'
import qs from 'qs'
import { setTimeout, clearTimeout } from 'timers';
export default {
  data () {
    return {
      title: '',
      listQuery: {
        account: '',
        status: '',
      },
      address_list: null,
      shopList: [],
      total_price: 0,
      shop_count: 0,
      addTips: '您还未登录',
      showTips: false,
      showDialog: false,
      payment: '',
      msgLength: 0,
      timer: null,
      form: {
        phone: '',
        status: '',
        payment: '',
        shop_count: '',
        total_price: '',
        address_id: '',
        shopList: null
      },
      selectIndex: 1, // 第三条数据是默认地址，进入页面默认选中默认地址
    }
  },
  watch:{
    payment(curVal){
      if(/[^\d]/g.test(curVal)){
        this.payment = this.payment.replace(/[^\d]/g,'');
      }else{
          this.msgLength = curVal.length;
      }
    },
  },
  created () {
    this.title = this.$route.meta.title || ''
    this.listQuery.account = this.$route.query.phone || ''
    this.listQuery.status = localStorage.login_status
    if (this.listQuery.account) {
      this.getAddress()
    }
    this.getShopList()
    // 页面创建就接收传递过来的selectIndex
    // this.$root.eventHub.$on('selectAddress', this.selectOne)
    this.selectIndex = this.$route.query.selected || '1' // 第三条数据是默认地址，进入页面默认选中默认地址
  },
  mounted () {
    this.$nextTick(() => {
      initScroll(this.scroll, this.$refs.shopList)
    })
  },
  methods: {
    goBack () {
      this.$router.push('/shopcart')
    },
    getAddress () {
      this.$axios.get('/api/get_address', {
        params: this.listQuery
      })
      .then((response) => {
        if (response.data.code == 0) {
          this.address_list = response.data.data
        } else {
          console.log(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getShopList () {
      this.$axios.get('/api/get_shopcart_shop', {
        params: this.listQuery
      })
      .then((response) => {
        if (response.data.code == 0) {
          this.shopList = response.data.data
          // console.log(this.shopList)
          for (let i = 0; i < this.shopList.length; i++) {
            this.total_price = this.total_price + this.shopList[i].total_price
            this.shopList[i].phone = localStorage.phone
            this.shop_count = this.shop_count + this.shopList[i].shop_count
          }
        } else {
          console.log(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    resetForm () {
      this.form = {
        phone: '',
        status: '',
        payment: '',
        shop_count: '',
        total_price: '',
        address_id: '',
        shopList: null
      }
    },
    toSelectAddress () {
      this.$router.push('/shopcart/add_address')
    },
    toPay () {
      this.showDialog = true
    },
    focus(){
      this.$refs.pwd.focus();
    },
    handleConfirm () {
      this.resetForm()
      this.showDialog = true
      // console.log(this.payment)
      this.form.phone = this.listQuery.account
      this.form.status = this.listQuery.status
      this.form.payment = this.payment
      this.form.shop_count = this.shop_count
      this.form.total_price = this.total_price
      this.form.address_id = this.selectIndex
      this.form.shopList = JSON.stringify(this.shopList)
      console.log(this.form)
      this.$axios.post('/api/user/info', qs.stringify(this.form))
      .then((response) => {
        if (response.data.code == 0) {
          // console.log(response.data.data)
          this.$router.push('/shopcart/pay_success')
        } else {
          /**
           * 当服务器返回错误状态码的时候
           * 通过提示器显示错误提示，提示1.5s后自动消失
           */
          this.addTips = response.data.msg
          this.showDialog = false
          this.showTips = true
          setTimeout(() => {
            this.showTips = false
            clearTimeout
          }, 1500)
        }
      }).catch((err) => {
        console.log(err)
      })
      .finally(() => {
        // this.showDialog = false
        this.payment = '' // 退出弹框将支付密码清空
      })
    },
    handleCancel () {
      this.showDialog = false
      this.payment = '' // 退出弹框将支付密码清空
    },
    selectOne (index) {
      this.selectIndex = index
      console.log(index)
    }
  }
}
</script>
<style scoped>
.settlement{
  position: relative;
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
.address_title{
  padding: 15px 0;
  text-align: left;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  background: #fff;
}
.address_box{
  /* margin: 10px 15px; */
  position: relative;
  padding: 10px 15px;
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
  padding-bottom: 3px;
  box-sizing: border-box;
  font-size: 12px;
  word-break: break-all;
}
.address_go_ahead{
  position: absolute;
  top: 120px;
  right: 15px;
}
.shop_info{
  display: flex;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.shop_image{
  /* display: inline-block; */
  width: 82px;
  height: 60px;
  background: rgba(0,0,0,0.5);
  flex: 0 0 1;
}
.shop_info_list{
  width: 100%;
  padding-left: 15px;
}
.shop_info_name{
  height: 42px;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
}
.shop_info_info{
  display: flex;
  font-size: 12px;
}
.shop_info_size{
  display: flex;
  width: 100%;
}
.shop_info_format{
  width: 100%;
  text-align: left;
}
.shop_info_count{
  width: 60px;
}
.shop_info_total_price{
  width: 100px;
  text-align: right;
  color: #ff6a20;
}
.settlement_bottom{
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  background: #fff;
}
.shop_total{
  width: 100%;
  padding: 13px 15px;
  box-sizing: border-box;
  text-align: left;
  font-size: 14px;
}
.settlement_pay{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  background: #ff6a20;
  color: #fff;
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
.pwd_wrap{
  width: 90%;
  height: 44px;
  padding-bottom: 1px;
  margin: 0 auto;
  background: #fff;
  border:1px solid #ddd;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  cursor: pointer;
}
.pwd_wrap li{
  list-style-type:none;
  text-align: center;
  line-height: 44px;
  -webkit-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  border-right:1px solid #ddd ;
}
.pwd_wrap li:last-child{
  border-right: 0;
}
.pwd_wrap li i{
  height: 10px;
  width: 10px;
  border-radius:50% ;
  background: #000;
  display: inline-block;
}
</style>
