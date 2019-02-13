<template>
  <div class="me wrapper" ref="wrapper">
    <div class="content" ref="content">
      <div class="meHeader"></div>
      <div class="myOrder"></div>
      <div class="line"></div>
      <div class="payManage">
        <ul>
          <li class="pendingPayment">
            <span class="icon-qianbao2"></span>
            <span>待付款</span>
          </li>
          <li class="pendingReceipt">
            <span class="icon-daishouhuo"></span>
            <span>待收货</span>
          </li>
          <li class="comment">
            <span class="icon-daipingjia"></span>
            <span>待评价</span>
          </li>
          <li class="afterSale">
            <span class="icon-weixiu"></span>
            <span>退换修</span>
          </li>
        </ul>
      </div>
      <div class="split"></div>
      <div class="menuList">
        <ul>
          <li>
            <span class="icon-youhuiquan1"></span>
            <span>优惠券</span>
            <span class="icon-you"></span>
            <div class="line"></div>
          </li>
          <li>
            <span><img src="./../../assets/img/vip.png" alt=""></span>
            <span>会员福利</span>
            <span class="icon-you"></span>
            <div class="line"></div>
          </li>
          <li>
            <span class="icon-qianbao1"></span>
            <span>我的钱包</span>
            <span class="icon-you"></span>
            <div class="line"></div>
          </li>
          <li>
            <span><img src="./../../assets/img/fuwuwangdian.png" alt=""></span>
            <span>服务中心</span>
            <span class="icon-you"></span>
            <div class="line"></div>
          </li>
          <li>
            <span class="icon-shangdian1"></span>
            <span>小米之家</span>
            <span class="icon-you"></span>
            <div class="line"></div>
          </li>
          <li>
            <span class="icon-hezuo"></span>
            <span>直供点</span>
            <span class="icon-you"></span>
            <div class="line"></div>
          </li>
          <li>
            <span class="icon-gengduo"></span>
            <span>更多功能</span>
            <span class="icon-you"></span>
            <div class="line"></div>
          </li>
          <li class="split"></li>
          <li>
            <span class="icon-shezhi1"></span>
            <span>设置</span>
            <span class="icon-you"></span>
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
    }
  },
  created () {
    this.initScroll()
  },
  methods: {
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
  width: 100%;
  height: 120px;
  background-color: red;
}
.myOrder{
  width: 100%;
  height: 45px;
}
.payManage{
  width: 100%;
  height: 103px;
}
.payManage li{
  float: left;
  width: 25%;
  height: 100%;
  text-align: center;
}
.payManage li span{
  display: block;
}
.payManage li span:first-child{
  margin-top: 30px;
}
.menuList ul li{
  position: relative;
  width: 100%;
  height: 60px;
}
.menuList ul li span:first-child{
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
}
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
