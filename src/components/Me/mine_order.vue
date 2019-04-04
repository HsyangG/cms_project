<template>
  <div class="mine_order">
    <div class="container">
      <div class="listContent">
        <div class="header">
          <div class="go_back" @click.prevent="goBack">
            <svg-icon icon-class="houtui"></svg-icon>
          </div>
          <div class="title">我的订单</div>
          <div class="header_left"></div>
          <div class="header_right">
            <div class="find">
              <svg-icon icon-class="find"></svg-icon>
            </div>
            <div class="shopcart"><i class="icon-gouwuche"></i></div>
          </div>
        </div>
        <div class="menu">
          <ul>
            <li>
              <div>全部</div>
            </li>
            <li>
              <div>待付款</div>
            </li>
            <li>
              <div>待收货</div>
            </li>
            <li>
              <div>待评价</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    goBack () {
      this.$router.push('/me')
    }
  }
}
</script>
<style scoped>
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
.find{
  width: 150%;
  text-align: right
}
.shopcart{
  width: 50%;
}
.menu ul{
  display: flex;
  width: 100%;
  height: 50px;
}
.menu ul li{
  /* display: inline-block; */
  width: 25%;
  text-align: center;
  line-height: 49px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
</style>


