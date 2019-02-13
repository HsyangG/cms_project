<template>
  <div class="home wrapper" ref="wrapper">
    <div class="content" ref="content">
      <!--<mt-swipe :auto="4000">
        &lt;!&ndash;<mt-swipe-item v-for="img in imgs" v-bind:key="img.index">
          <img :src="img.img" alt="">
        </mt-swipe-item>&ndash;&gt;
        <mt-swipe-item>
          <img src="http://localhost:3000/public/img/01.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="http://localhost:3000/public/img/02.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="http://localhost:3000/public/img/03.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="http://localhost:3000/public/img/04.jpg" alt="">
        </mt-swipe-item>
      </mt-swipe>-->
      <!--<ul class="grid">
        <li>
          <a href="javascript:">
            <span class="cms-news">
              <img src="../../assets/img/news.png" alt="">
            </span>
            <div>新闻资讯</div>
          </a>
        </li>
        <li>
          <a href="javascript:">
            <span class="cms-picShare">
              <img src="../../assets/img/picShare.png" alt="">
            </span>
            <div>图文分享</div>
          </a>
        </li>
        <li>
          <a href="javascript:">
            <span class="cms-goodsShow">
              <img src="../../assets/img/goodsShow.png" alt="">
            </span>
            <div>商品展示</div>
          </a>
        </li>
        <li>
          <a href="javascript:">
            <span class="cms-feedback">
              <img src="../../assets/img/feedback.png" alt="">
            </span>
            <div>留言反馈</div>
          </a>
        </li>
        <li>
          <a href="javascript:">
            <span class="cms-search">
              <img src="../../assets/img/search.png" alt="">
            </span>
            <div>搜索资讯</div>
          </a>
        </li>
        <li>
          <a href="javascript:">
            <span class="cms-callMe">
              <img src="../../assets/img/callme.png" alt="">
            </span>
            <div>联系我们</div>
          </a>
        </li>
      </ul>-->
      <!--<div class="grid barWrapper" ref="barWrapper">
        <ul class="barList" ref="barList">
          <li v-for="grid in grids" :key="grid.index">
                &lt;!&ndash;<span :class="grid.className"></span>&ndash;&gt;
                <div class="gridTitle" @click="addContent">{{grid.title}}</div>
          </li>
        </ul>
      </div>
      <div class="barContent conWrapper" ref="conWrapper"></div>-->
      <v-header></v-header>
      <v-nav></v-nav>
      <v-swiper></v-swiper>
    </div>
    <bt-menu></bt-menu>
  </div>
</template>

<script type="text/ecmascript-6">
// import BScroll from 'better-scroll'
import nav from './nav/nav'
import swiper from './swiper/swiper'
export default {
  data () {
    return {
      imgs: [], // 轮播图数据
      grids: [
        {className: 'cms-news', title: '新闻资讯', router: {name: 'news.list'}},
        {className: 'cms-picShare', title: '图文分享', router: {name: 'news.list'}},
        {className: 'cms-goodsShow', title: '商品展示', router: {name: 'news.list'}},
        {className: 'cms-feedback', title: '留言反馈', router: {name: 'news.list'}},
        {className: 'cms-search', title: '搜索资讯', router: {name: 'news.list'}},
        {className: 'cms-callMe', title: '联系我们', router: {name: 'login'}}]
    }
  },
  // created创建组件的生命周期函数中，可以操作数据
  created () {
    // http://api.mtyqx.cn/tapi/random.php
    // https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture
    /* this.$axios.get('/lunbo')
      .then(res => {
        // res.data.message = [{img: '图片地址'}]
        // this.imgs = res.data.message
        console.log(res)
      })
      .catch(err => { console.log('轮播图获取异常', err) }) */
    /* this.$nextTick(() => {
      this._initScroll()
    }) */
  },
  methods: {
    /* _initScroll () {
      let barWidth = 100
      let width = barWidth * this.grids.length
      this.$refs.barList.style.width = width + 'px'
      if (!this.gridScroll) {
        this.gridScroll = new BScroll(this.$refs.barWrapper, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      } else {
        this.gridScroll.refresh()
      }
    }, */
    addContent () {}
  },
  components: {
    'v-nav': nav,
    'v-swiper': swiper
  }
}
</script>

<style scoped>
  .home{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .mint-swipe {
    height: 200px;
  }
  img {
    width: 100%;
  }
  .grid{
    white-space: nowrap;
  }
  .grid ul li{
    display: inline-block;
    width: 100px;
    height: 40px;
    color: black;
    background-color: #fff;
  }
  .grid ul li div{
    line-height: 40px;
    font-size: 14px;
    color: #a0a0a0;
  }
  .barContent{
    white-space: nowrap;
  }
  .barContent li{
    display: inline-block;
    float: left;
  }
  /*九宫格图片*/
  .grid li span {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 20px 0 5px 0;
  }
  .cms-news {
    background: url("../../assets/img/news.png") round 50px 50px;
  }
  .cms-picShare {
    background: url("../../assets/img/picShare.png") round 50px 50px;
  }
  .cms-goodsShow {
    background: url("../../assets/img/goodsShow.png") round 50px 50px;
  }
  .cms-feedback {
    background: url("../../assets/img/feedback.png") round 50px 50px;
  }
  .cms-search {
    background: url("../../assets/img/search.png") round 50px 50px;
  }
  .cms-callMe {
    background: url("../../assets/img/callme.png") round 50px 50px;
  }
</style>
