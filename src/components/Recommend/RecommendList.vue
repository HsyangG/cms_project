<template>
  <transition name="move">
    <div class="recommendList recommendListWrapper" ref="recommendListWrapper">
      <div class="listContent">
        <div class="carouselMap">
          <v-carousel :carouselList="carouselList"></v-carousel>
        </div>
        <v-submenu></v-submenu>
        <div class="line"></div>
        <div class="morningNewspaper">
          <img src="http://localhost:3000/public/img/img/shangchengzaobao.png" alt="">
          <span style="color: #ccc;line-height: 44px;">|</span>
          <span style="padding: 15px 10px;font-size: 12px">正月十五闹花灯，特惠礼物请收好！</span>
        </div>
        <div class="shopList">
          <div class="content">
            <div class="contentLeft" @click.prevent="toRecommendInfo">
              <img v-if="hot_shops" :src="hot_shops[0].picture" alt="" style="width: 100%;height: 100%">
            </div>
            <div class="splitDiv"></div>
            <div class="contentRight">
              <div class="contentRightTop">
                <img v-if="hot_shops" :src="hot_shops[1].picture" alt="" style="width: 100%;height: 100%">
              </div>
              <div class="contentRightButton">
                <img v-if="hot_shops" :src="hot_shops[2].picture" alt="" style="width: 100%;height: 100%">
              </div>
            </div>
          </div>
          <div class="SpecialPart">
            <img v-if="hot_shops" :src="hot_shops[3].picture" alt="" style="width: 100%;height: 100%">
          </div>
          <div class="dailySelection">
            <div class="dailySelectionTitle">每日精选</div>
            <div class="dailySelectionContent"></div>
            <div class="dailySelectionContentList">
              <ul v-if="shopList">
                <!-- <li v-if="shopList">
                  <div class="dailySelectContentListLeft"  style="width: 100%;height: 100%;">
                    <img src="http://localhost:3000/public/img/commodities/redminote7.png" alt="" style="width: 100%;height: 270px;">
                    <p class="dailyTitle">小米8</p>
                    <p class="dailyDescription">相机全新升级，骁龙845</p>
                    <div class="dailyPrice">
                      <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
                    </div>
                  </div>
                  <div class="splitDiv"></div>
                  <div class="dailySelectContentListRight"  style="width: 100%;height: 100%;">
                    <img src="http://localhost:3000/public/img/commodities/redminote7.png" alt="" style="width: 100%;height: 270px;">
                    <p class="dailyTitle">小米8</p>
                    <p class="dailyDescription">相机全新升级，骁龙845</p>
                    <div class="dailyPrice">
                      <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
                    </div>
                  </div>
                </li> -->
                <!-- <li>
                  <div class="dailySelectContentListLeft"  style="width: 100%;height: 100%;">
                    <img src="http://localhost:3000/public/img/commodities/redminote7.png" alt="" style="width: 100%;height: 270px;">
                    <p class="dailyTitle">小米8</p>
                    <p class="dailyDescription">相机全新升级，骁龙845</p>
                    <div class="dailyPrice">
                      <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="dailySelectContentListLeft"  style="width: 100%;height: 100%;">
                    <img src="http://localhost:3000/public/img/commodities/redminote7.png" alt="" style="width: 100%;height: 270px;">
                    <p class="dailyTitle">小米8</p>
                    <p class="dailyDescription">相机全新升级，骁龙845</p>
                    <div class="dailyPrice">
                      <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
                    </div>
                  </div>
                </li> -->
                <li v-for="item in shopList" :key="item.id" v-if="item.type == 'phone'">
                  <div class="dailySelectContentListLeft"  style="width: 100%;height: 100%;">
                    <img v-if="item.picture" :src="item.picture" alt="" style="width: 100%;height: 270px;">
                    <p class="dailyTitle">{{item.name}}</p>
                    <p class="dailyDescription">{{item.brief}}</p>
                    <div class="dailyPrice">
                      <span class="dailyPriceNew">&yen;{{item.price}}&nbsp;起 </span><span class="dailyPriceOld" v-if="item.price != item.old_price"> &yen;{{item.old_price}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import VCarousel from '../Carousel/Carousel'
import Submenu from './../Submenu/submenu'
import { initScroll } from './../../utils'

export default {
  name: 'recommendList',
  components: {
    VCarousel,
    'v-submenu': Submenu
  },
  data () {
    return {
      submitItemList: [
        {
          imgUrl: 'http://localhost:3000/public/img/shop/crown.png',
          text: '新品发布',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/shop/bell.png',
          text: '每日臻选',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/shop/monitor.png',
          text: '电视热卖',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/shop/donut.png',
          text: '礼品卡',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/shop/ad.png',
          text: '超值特卖',
          class: 'submitList'
        }
      ],
      carouselList: [],
      hot_shops: null,
      shopList: null,
    }
  },
  // created适合操作数据
  created () {
    /* this.$axios.get('getnewslist')
      .then(res => {
        this.newsList = res.data.message
      })
      .catch(err => console.log('新闻列表异常', err)) */
      this.getCarousel()
      this.getHotShops()
      this.getShopList()
  },
  mounted () {
    this.$nextTick(() => {
      initScroll(this.scroll, this.$refs.recommendListWrapper)
    })
  },
  methods: {
    getShopList () {
      this.$axios.get('/api/get_shops_info')
      .then((response) => {
        this.shopList = response.data.data
      }).catch((err) => {
        console.log(err)
      });
    },
     getCarousel () {
      this.$axios.get('/api/get_carousel')
      .then((response) => {
        // console.log(response.data)
        this.carouselList = response.data.data
        // console.log(this.carouselList)
      }).catch((err) => {
        console.log(err)
      });
    },
    getHotShops () {
      this.$axios.get('/api/get_hot_shops')
      .then((response) => {
        this.hot_shops = response.data.data
      }).catch((err) => {
        console.log(err)
      });
    },
    toRecommendInfo () {
      this.$router.push('/recommend/recommend_info?id=' + 25)
    }
  }
}
</script>

<style scoped>
  .cms-s-header {
    background-color: #f7f7f7
  }
  .recommendList{
    width: 100%;
    height: 650px;
    overflow: hidden;
    transition: all 0.5s linear;
  }
  .move-enter, .move-leave-active{
    transform: translate3d(100%,0,0)
  }
  .listContent{
    width: 100%;
    height: 3000px;
    overflow: hidden;
  }
  .mapList li{
    width: 100%;
    height: 200px;
  }
  .mapList img{
    width: 100%;
  }
  .submenu ul {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 20px 10px;
    /*line-height: 64px;*/
    text-align: center;
  }
  .submitList{
    display: inline-block;
    /*float: left;*/
  }
  .submenu li div{
    width: 64px;
    height: 64px;
    font-size: 12px;
    text-align: center;
    /*line-height: 64px;*/
  }
  .submenu li div img{
    display: inline-block; /*将图片变成行内块级元素，可以实现图片居中*/
    width: 36px;
    height: 36px;
  }
  .morningNewspaper{
    display: flex;
    width: 100%;
    box-sizing: border-box;
  }
  .morningNewspaper img{
    display: inline-block;
    width: 80px;
    height: 45px;
  }
  .shopList{
    border-top: 15px solid #f5f5f5;
  }
  .content{
    display: flex;
    width: 100%;
    height: 266px;
    box-sizing: border-box;
    /*background: red;*/
  }
  .contentRight{
    height: 100%;
  }
  .SpecialPart{
    display: flex;
    width: 100%;
    height: 143px;
    margin-top: 15px;
    border-bottom: 15px solid #f5f5f5;
  }
  .dailySelectionTitle{
    display: flex;
    width: 100%;
    text-align: left;
    font-size: 20px;
    font-weight: 700;
    padding: 20px 15px;
  }
  .dailySelectionContent{
    width: 100%;
    height: 275px;
    background: #ccd2f6;
    margin-bottom: 10px;
  }
  .dailySelectionContentList{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .dailySelectionContentList ul{
    /* width: 100%; */
    /* height: 100%; */
    /* 实现均匀布局，又可换行 */
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    text-align: left;
  }
  .dailySelectionContentList ul li{
    /* display: flex; */
    display: inline-block;
    /* width: 100%; */
    width: 49.4%;
    height: 350px;
    box-sizing: border-box;
    margin-bottom: 15px;
    /* text-align: left; */
  }
  .dailyTitle{
    color: black;
    margin-top: 15px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .dailyDescription{
    font-size: 14px;
    padding-left: 10px;
    box-sizing: border-box;
    color: #ccc;
  }
  .dailyPriceNew{
    font-size: 14px;
    padding-left: 10px;
    box-sizing: border-box;
    color: red
  }
  .dailyPriceOld{
    font-size: 12px;
    color: #ccc;
    text-decoration: line-through;
  }
  .line{
    width: 100%;
    height: 1px;
    background: #ccc;
  }
  .splitDiv{
    width: 5px;
    height: 100%;
  }
</style>
