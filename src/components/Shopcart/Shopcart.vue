<template>
  <div class="shopcart">
    <div class="headTitle">购物车</div>
    <div class="content" ref="content">
      <div class="toLogin" v-if="login_status == 0">
        <div class="toLoginTips">登录后享受更多优惠</div>
        <div class="toLoginText">
          <div><span>去登录</span><img src="@/assets/svg/gengduo.svg" style="display: inline-block;width: 12px;margin: 0 0 0 5px"></div>
        </div>
      </div>
      <!-- 这里用 v-if 会报错，用 v-show 则不会 -->
    <div v-show="login_status == 1" class="listContent"  ref="listContentWrapper">
        <div class="goodsList">
          <div class="goodsListItem">
            <div class="goodsListItemStatus">
              <div class="selected"></div>
            </div>
            <div class="goodsListItemInfo">
              <div class="goodsListItemImage">
                <img src="" alt="">
              </div>
              <div class="goodsListItemInfoComtent">
                <div class="goodsListItemInfoTitle">小米8 屏幕指纹版 8GB内存</div>
                <div class="goodsListItemInfoDescription">透明 128GB</div>
                <div class="goodsListItemInfoPrice"><span class="newPrice">&yen;2899</span> <span class="oldPrice">&yen;3399</span></div>
              </div>
            </div>
            <div class="goodsListItemCount">
              <div style="border-right: 1px solid #ccc;">
                <svg-icon icon-class="jian" />
              </div>
              <div style="font-size: 14px;">1</div>
              <div style="border-left: 1px solid #ccc;"><svg-icon icon-class="tianjia" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="login_status == 1">
      <div class="settlement">
        <div class="settlement_left">
          <div class="settlementSelect">
            <div class="selected"></div>
            <p style="font-size: 14px;margin-left: 5px;">全选</p>
          </div>
          <div class="settlementCount">
            <div class="settlementCountText">合计:</div>
            <div class="settlementCountPrice">&yen; 0.00</div>
          </div>
        </div>
        <div class="settlement_right">
          <span>结算</span><span>(0)</span>
        </div>
      </div>
    </div>
    <bt-menu></bt-menu>
  </div>
</template>

<script type="text/ecmascript-6">
import { initScroll } from '../../utils'

export default {
  data () {
    return {
      touchIndex: 0,
      startIndex: 0,
      tranX: 0,
      login_status: 0,
    }
  },
  mounted () {
    this.login_status = localStorage.login_status
    if (this.login_status == 1) {
      initScroll(this.scroll, this.$refs.listContentWrapper)
    }
  }
}
</script>

<style scoped>
.shopcart{
  width: 100%;
  height: 560px;
  overflow: hidden;
}
.listContent{
  position: relative;
  width: 100%;
  height: 560px;
  overflow: hidden;
}
.headTitle{
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #fafafa;
  color: #000;
}
.toLogin{
  display: flex;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  font-size: 12px;
}
.toLoginTips{
  width: 100%;
  padding: 0 15px;
  text-align: left;
  line-height: 40px;
}
.toLoginText{
  width: 100%;
  text-align: right;
}
.toLoginText div {
  display: inline-block;
  height: 14px;
  padding: 13px 10px;
  font-size: 12px;
}
.goodsList{
  width: 100%;
  height: 3000px;
}
.goodsListItem{
  position: relative;
  width: 100%;
  height: 90px;
  background: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
}
.goodsListItemStatus{
  position: absolute;
  top: 35px;
  left: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 20px;
}
.goodsListItemStatusActive{
  position: absolute;
  top: 35px;
  left: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 1px solid #fff;
  border-radius: 50%;
  font-size: 20px;
  background:  #ff6b04;
  color: #fff;
}
.goodsListItemInfo{
  position: absolute;
  top: 10px;
  left: 40px;
  width: 90%;
  height: 70px;
  box-sizing: border-box;
  text-align: left;
}
.goodsListItemImage{
  position: absolute;
  top: 5px;
  left: 0;
  display: inline-block;
  width: 60px;
  height: 60px;
  background: rgba(0,0,0,0.5);
}
.goodsListItemInfoComtent{
  position: absolute;
  top: 0;
  left: 60px;
  display: inline-block;
  width: 70%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px 10px;
}
.goodsListItemInfoDescription{
  font-size: 12px;
  margin-top: 3px;
  color: #919191;
}
.goodsListItemInfoPrice{
  font-size: 12px;
  margin-top: 3px;
}
.newPrice{
  color: #ff6b04;
}
.oldPrice{
  font-size: 10px;
  text-decoration: line-through;
  margin-left: 5px;
  color: #a1a1a1;
}
.goodsListItemCount{
  display: flex;
  position: absolute;
  right:15px;
  bottom: 15px;
  width: 69px;
  height: 23px;
  font-size: 16px;
  /*background: rgba(0,0,0,0.5);*/
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.goodsListItemCount div{
  width: 100%;
  height: 21px;
  line-height: 21px;
  text-align: center;
}
.settlement{
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 47px;
  width: 100%;
  height: 54px;
  box-sizing: border-box;
}
.settlement_left{
  width: 140%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.settlementSelect{
  display: flex;
  position: absolute;
  top: 17px;
  left: 10px;
  width: 60px;
  height: 20px;
  box-sizing: border-box;
  font-size: 20px;
  text-align: left;
  line-height: 18px;
}
.settlementCount{
  text-align: right;
  font-size: 14px;
  padding: 7px 20px 7px 0;
}
.settlementCount div{
  display: inline-block;
}
.settlementCountPrice{
  margin-left: 5px;
  color: #ff6b04;
}
.settlement_right{
  width: 60%;
  height: 100%;
  background: #ccc;
  line-height: 54px;
  text-align: center;
  color: #fff;
}
.selected{
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-sizing: border-box;
}
  .list{}
</style>
