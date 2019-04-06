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
            <li v-for="(item, index) in menu_list" :key="index">
              <!-- <transition name="move">
                <div :class="{'active': currentIndex == index}" @click="tabClick(index)">{{ item }}</div>
              </transition> -->
              <div :class="{'active': currentIndex == index}" @click="tabClick(index)">{{ item }}</div>
            </li>
          </ul>
        </div>
        <v-swiper :list="routersList"></v-swiper>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from '@/components/Home/swiper/swiper'
export default {
  components: {
    'v-swiper': Swiper
  },
  data () {
    return {
      menu_list: ['全部', '待付款', '待收货', '待评价'],
      currentIndex: 0,
      routersList: [
        {path: '/me/orders/all', name: 'all', component: () => import('@/components/views/orders/all')},
        {path: '/me/orders/wait_pay', name: 'wait_pay', component: () => import('@/components/views/orders/waitPay')},
        {path: '/me/orders/wait_receipt', name: 'wait_receipt', component: () => import('@/components/views/orders/waitReceipt')},
        {path: '/me/orders/wait_evaluation', name: 'wait_evaluation', component: () => import('@/components/views/orders/waitEvaluation')}
      ]
    }
  },
  created () {
    this.currentIndex = this.$route.query.index || 0
  },
  watch: {
    currentIndex(newVal, oldVal) {
      /**
       * 这个事件发射原来是在 tabClick() 里面的
       * 因为在监听到 currentIndex 变化时，会调用一次
       * 然后函数本身又会调用一次，即这个函数执行了两次，会消耗性能
       * 所以直接在 watch 里面调用事件发射，原函数的被移除
       * 就能解决问题了
       */
      // console.log(newVal)
      this.tabClick(newVal)
      this.$root.eventHub.$emit('orderTabChange', this.currentIndex)
    }
  },
  mounted () {
    this.$root.eventHub.$on('slideTab', this.slideTab)
  },
  methods: {
    goBack () {
      this.$router.push('/me')
    },
    tabClick (index) {
      this.currentIndex = index
      // console.log(this.currentIndex)
      // this.$root.eventHub.$emit('orderTabChange', this.currentIndex)
    },
    slideTab (index) {
      this.currentIndex = index
    },
    offEventHubListener () {
      this.$root.eventHub.$off('slideTab')
    }
  },
  beforeDestroy () {
    this.offEventHubListener()
  }
}
</script>
<style scoped>
.listContent{
  width: 100%;
  height: 100%;
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
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  justify-content: space-around; /* 在弹性布局里面才有效 */
}
.menu ul li{
  display: inline-block;
  line-height: 49px;
  text-align: center;
  box-sizing: border-box;
  /* border-bottom: 1px solid #ccc; */
}
.active{
  box-sizing: border-box;
  color: #ff6a20;
  border-bottom: 1px solid #ff6a20;
}
</style>


