<template>
  <div class="me wrapper" ref="wrapper">
    <div class="content" ref="content">
      <div class="meHeader">
        <div class="me_login" v-if="user_info.login_status == 1">
          <img src="@/assets/img/avatar_default.png" alt="" @click.prevent="toUserInformation">
          <div @click.prevent.prevent="toUserInformation">{{user_info.username}}</div>
        </div>
        <div class="me_login" v-else>
          <img src="@/assets/img/avatar_default.png" alt="" @click.prevent="toLogin">
          <div>登录/注册</div>
        </div>
      </div>
      <div class="myOrder" @click.prevent="toMyOrder">
        <div class="myOrder_left">我的订单</div>
        <div class="myOrder_right">全部订单 <svg-icon icon-class="qianjin" style="color: #ccc !important;"></svg-icon></div>
      </div>
      <div class="line"></div>
      <div class="payManage">
        <ul>
          <li class="pendingPayment" @click.prevent="toWaitPay">
            <span class="icon-qianbao2"></span>
            <span style="font-size: 12px;margin-top: 5px;">待付款</span>
          </li>
          <li class="pendingReceipt" @click.prevent="toWaitRececipt">
            <span class="icon-daishouhuo"></span>
            <span style="font-size: 12px;margin-top: 5px;">待收货</span>
          </li>
          <li class="comment" @click.prevent="toWaitEvaluation">
            <span class="icon-daipingjia"></span>
            <span style="font-size: 12px;margin-top: 5px;">已完成</span>
          </li>
          <!-- <li class="afterSale">
            <span class="icon-weixiu"></span>
            <span style="font-size: 12px;margin-top: 5px;">退换修</span>
          </li> -->
        </ul>
      </div>
      <div class="split"></div>
      <div class="menuList">
        <ul>
          <!-- <li>
            <div class="menu_list_item">
              <div class="menu_list_item_icon">
                <span class="icon-youhuiquan1"></span>
              </div>
              <div class="menu_list_item_title">
                <span>优惠券</span>
              </div>
              <div class="go_ahead">
                <span class="icon-you"></span>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="menu_list_item">
              <div class="menu_list_item_icon">
                <img src="./../../assets/img/vip.png" alt="">
              </div>
              <div class="menu_list_item_title">
                <span>会员福利</span>
              </div>
              <div class="go_ahead">
                <span class="icon-you"></span>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="menu_list_item">
              <div class="menu_list_item_icon">
                <span class="icon-qianbao1"></span>
              </div>
              <div class="menu_list_item_title">
                <span>我的钱包</span>
              </div>
              <div class="go_ahead">
                <span class="icon-you"></span>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="menu_list_item">
              <div class="menu_list_item_icon">
                <img src="./../../assets/img/fuwuwangdian.png" alt="">
              </div>
              <div class="menu_list_item_title">
                <span>服务中心</span>
              </div>
              <div class="go_ahead">
                <span class="icon-you"></span>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="menu_list_item">
              <div class="menu_list_item_icon">
                <span class="icon-shangdian1"></span>
              </div>
              <div class="menu_list_item_title">
                <span>小米之家</span>
              </div>
              <div class="go_ahead">
                <span class="icon-you"></span>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="menu_list_item">
              <div class="menu_list_item_icon">
                <span class="icon-hezuo"></span>
              </div>
              <div class="menu_list_item_title">
                <span>直供点</span>
              </div>
              <div class="go_ahead">
                <span class="icon-you"></span>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="menu_list_item">
              <div class="menu_list_item_icon">
                <span class="icon-gengduo"></span>
              </div>
              <div class="menu_list_item_title">
                <span>更多功能</span>
              </div>
              <div class="go_ahead">
                <span class="icon-you"></span>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li class="split"></li> -->
          <li>
            <div class="menu_list_item" @click="toSetting">
              <div class="menu_list_item_icon">
                <span class="icon-shezhi1"></span>
              </div>
              <div class="menu_list_item_title">
                <span>设置</span>
              </div>
              <div class="go_ahead">
                <span class="icon-you"></span>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
    <bt-menu></bt-menu>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      user_info: {
        user_id: '',
        phone: '',
        username: '',
        login_status: '', // 0 未登录  1 已登录
      },
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {
    this.initScroll()
    // console.log(localStorage)
  },
  methods: {
    getUserInfo () {
      // this.$axios.get('/api/user/info')
      this.user_info.user_id = localStorage.user_id
      this.user_info.phone = localStorage.phone
      this.user_info.username = localStorage.username
      this.user_info.login_status = localStorage.login_status
    },
    initScroll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.initScroll()
            }
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    toLogin () {
      this.$router.push('/callme/logp')
    },
    toUserInformation () {
      this.$router.push('/me/user_information')
    },
    toMyOrder () {
      if (this.user_info.login_status == 0) {
        this.toLogin()
      } else if (this.user_info.login_status == 1) {
        this.$router.push('/me/mine_order')
      }
    },
    toWaitPay () {
      if (this.user_info.login_status == 0) {
        this.toLogin()
      } else if (this.user_info.login_status == 1) {
        this.$router.push('/me/mine_order?index=' + 1)
      }
    },
    toWaitRececipt () {
      if (this.user_info.login_status == 0) {
        this.toLogin()
      } else if (this.user_info.login_status == 1) {
        this.$router.push('/me/mine_order?index=' + 2)
      }
    },
    toWaitEvaluation () {
      if (this.user_info.login_status == 0) {
        this.toLogin()
      } else if (this.user_info.login_status == 1) {
        this.$router.push('/me/mine_order?index=' + 3)
      }
    },
    toSetting () {
      if (this.user_info.login_status == 0) {
        this.toLogin()
      } else if (this.user_info.login_status == 1) {
        this.$router.push('/me/setting')
      }
    }
  }
}
</script>

<style>
.me{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.meHeader{
  position: relative;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 15px;
  background-color: #f37e11;
}
.me_login{
  display: flex;
  position: absolute;
  left: 15px;
  bottom: 15px;
  /* width: 100%;
  box-sizing: border-box; */
  height: 50px;
  box-sizing: border-box;
}
.me_login img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.me_login div{
  margin-left: 10px;
  line-height: 50px;
  font-size: 14px;
  color: #ffeff2;
}
.myOrder{
  display: flex;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  padding: 10px 15px;
}
.myOrder_left{
  width: 100%;
  text-align: left;
  font-size: 14px;
  line-height: 25px;
}
.myOrder_right{
  width: 100%;
  text-align: right;
  font-size: 14px;
  line-height: 25px;
}
.payManage{
  width: 100%;
  height: 93px;
}
.payManage li{
  float: left;
  /* width: 25%; */
  width: 33.33%;
  height: 93px;
  text-align: center;
  font-size: 20px;
}
.payManage li span{
  display: block;
}
.payManage li span:first-child{
  margin-top: 25px;
}
.menuList ul li{
  position: relative;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding-left: 55px;
}
.menu_list_item{
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 15px 0 0;
}
.menu_list_item_icon{
  position: absolute;
  top: 0;
  left: 15px;
  width: 40px;
  line-height: 52px; /* 把字体撑下去，否则不会对齐 */
  text-align: left;
  font-size: 20px;
}
.menu_list_item_icon img{
  display: inline-block;
  width: 20px;
  height: 20px;
}
.menu_list_item_title{
  width: 100%;
  line-height: 50px;
  text-align: left;
}
.go_ahead{
  line-height: 50px;
}

/* .menuList ul li span:first-child{
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-size: 20px;
}
.menuList ul li span:first-child img{
  width: 20px;
  height: 20px;
}
.menuList ul li span:nth-child(2){
  position: absolute;
  left: 55px;
  bottom: 20px;
  font-size: 16px;
}
.menuList ul li span:nth-child(3){
  position: absolute;
  right: 15px;
  bottom: 20px;
  font-size: 20px;
}
.menuList ul li div{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 85%;
  margin-left: 15%;
} */
.split{
  width: 100%;
  height: 16px;
  background: #f3f5f7;
}
.line{
  width: 100%;
  height: 1px;
  background: #f3f5f7;
}
{}
</style>
