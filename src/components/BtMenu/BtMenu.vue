<template>
  <div class="bt_menu">
    <div id="home" @click="toHome">
      <span class="icon-shouye"></span>
      <span class="meun_text">首页</span>
    </div>
    <div id="sort" @click="toSort">
      <span class="icon-fenlei"></span>
      <span class="meun_text">分类</span>
    </div>
    <!--<div id="find" @click="toFind">
      <span class="icon-faxian2"></span>
      <span class="meun_text">发现</span>
    </div>-->
    <div id="shopcart" @click="toShopcart">
      <span class="icon-gouwuche"></span>
      <span class="meun_text">购物车</span>
    </div>
    <div id="me" @click="toMe">
      <span class="icon-wode"></span>
      <span class="meun_text">我的</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'bt-menu',
  data () {
    return {}
  },
  methods: {
    toHome () {
      this.$router.push('/home')
    },
    toSort () {
      this.$router.push('/sort')
    },
    toFind () {
      this.$router.push('/find')
    },
    toShopcart () {
      this.$router.push('/shopcart')
    },
    toMe () {
      this.$router.push('/me')
    }
  }
}
</script>

<style>
  .bt_menu{
    display: flex;
    position: absolute;
    padding: 5px 0;
    right: 0;
    bottom: -5px;
    width: 100%;
    height: 42px;
    z-index: 100;
    overflow: hidden;
    justify-content: space-around; /* 只有设置了  display: flex 才会生效 */
    background: #fff;
    box-shadow: 0 -0.1px 0.1px 0.1px #a1a1a1;
  }
  .bt_menu div{
    float: left;
    width: 20%;
    margin-bottom: 5px;
  }
  .bt_menu span {
    display: block;
    margin: 0 auto;
  }
  .bt_menu span:first-child {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .meun_text{
    font-size: 12px;
  }
</style>
