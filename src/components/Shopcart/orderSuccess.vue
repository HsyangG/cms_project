<template>
  <div class="order_success">
    <div class="container">
      <div class="pay_image">
        <img src="@/assets/mine-phone-success.png" alt="" style="display: inline-block;width: 60%;height:60%;">
      </div>
      <p class="success_tips">下单成功</p>
      <div class="order_button">
        <div class="to_order" @click="toOrder">查看订单</div>
        <div class="to_home" @click="toHome">返回首页</div>
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
    toHome () {
      this.$router.push('/home')
    },
    toOrder () {
      this.$router.push('/me/mine_order')
    }
  }
}
</script>
<style scoped>
.container{
  width: 100%;
  text-align: center;
}
.pay_image{
  width: 100%;
  padding-top: 130px;
}
.success_tips{
  padding: 15px 0;
  font-size: 18px;
  font-weight: 700;
}
.to_order{
  margin: 20px 15px 0 15px;
  padding: 10px 15px;
  box-sizing: border-box;
  background: #ff6a20;
  color: #fff;
  border-radius: 5px;
}
.to_home{
  margin: 20px 15px 0 15px;
  padding: 10px 15px;
  box-sizing: border-box;
  /* background: #ff6a20;
  color: #fff; */
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
