<template>
  <transition name="move">
    <div class="newsList newsListWrapper" ref="newsListWrapper">
      <div class="listContent">
        <div class="carouselMap">
          <v-carousel></v-carousel>
        </div>
        <ul class="submenu">
          <li v-for="(item, index) in submitItemList" :class="item.class" ref="submitList" :key="index">
            <div class="submenu-item">
              <img :src="item.imgUrl" alt="" style="margin-top: 5px">
              <p style="margin-top: 3px">{{ item.text }}</p>
            </div>
          </li>
        </ul>
        <div class="line"></div>
        <div class="morningNewspaper">
          <img src="http://localhost:3000/public/img/img/shangchengzaobao.png" alt="">
          <span style="color: #ccc;line-height: 44px;">|</span>
          <span style="padding: 15px 10px;font-size: 12px">正月十五闹花灯，特惠礼物请收好！</span>
        </div>
        <div class="shopList">
          <div class="content">
            <div class="contentLeft">
              <img src="http://localhost:3000/public/img/commodities/redminode7.png" alt="" style="width: 100%;height: 100%">
            </div>
            <div class="splitDiv"></div>
            <div class="contentRight">
              <div class="contentRightTop">
                <img src="http://localhost:3000/public/img/commodities/haowu.png" alt="" style="width: 100%;height: 100%;">
              </div>
              <div class="contentRightButton">
                <img src="http://localhost:3000/public/img/commodities/xiaomitv4a.png" alt="" style="width: 100%;height: 100%;">
              </div>
            </div>
          </div>
          <div class="SpecialPart">
            <img src="http://localhost:3000/public/img/commodities/xiaomi8.png" alt="">
          </div>
          <div class="dailySelection">
            <div class="dailySelectionTitle">每日精选</div>
            <div class="dailySelectionContent"></div>
            <div class="dailySelectionContentList">
              <ul>
                <li>
                  <!--想要两个 div 平均水平排列，需要用到 flex 布局，在标签上设置宽度，不能统一设置-->
                  <div class="dailySelectContentListLeft"  style="width: 100%;height: 100%;">
                    <img src="http://localhost:3000/public/img/commodities/redminode7.png" alt="" style="width: 100%;height: 270px;">
                    <p class="dailyTitle">小米8</p>
                    <p class="dailyDescription">相机全新升级，骁龙845</p>
                    <div class="dailyPrice">
                      <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
                    </div>
                  </div>
                  <div class="splitDiv"></div>
                  <div class="dailySelectContentListRight"  style="width: 100%;height: 100%;">
                    <img src="http://localhost:3000/public/img/commodities/redminode7.png" alt="" style="width: 100%;height: 270px;">
                    <p class="dailyTitle">小米8</p>
                    <p class="dailyDescription">相机全新升级，骁龙845</p>
                    <div class="dailyPrice">
                      <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
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

import { initScroll } from './../../utils'

export default {
  name: 'news-list',
  components: {VCarousel},
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
      ]
    }
  },
  // created适合操作数据
  created () {
    /* this.$axios.get('getnewslist')
      .then(res => {
        this.newsList = res.data.message
      })
      .catch(err => console.log('新闻列表异常', err)) */
  },
  mounted () {
    this.addSubmitMeuList()
    // this._initScroll()
    this.$nextTick(() => {
      initScroll(this.scroll, this.$refs.newsListWrapper)
    })
  },
  methods: {
    addSubmitMeuList () {
      // console.log(this.$refs.submitList)
      // console.log(this.$refs.submitList)
    }
    /* _initScroll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.newsListWrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    } */
  }
}
</script>

<style scoped>
  .cms-s-header {
    background-color: #f7f7f7
  }
  .listContent{
    width: 100%;
    height: 3000px;
    overflow: hidden;
  }
  .newsList{
    width: 100%;
    height: 650px;
    overflow: hidden;
    transition: all 0.5s linear;
  }
  .move-enter, .move-leave-active{
    transform: translate3d(100%,0,0)
  }
  .mapList li{
    width: 100%;
    height: 200px;
  }
  .mapList img{
    width: 100%;
  }
  .submenu{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 20px 10px;
    /*line-height: 64px;*/
  }
  .submitList{
    display: inline-block;
    float: left;
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
  /*.dailySelectionContentList ul{
    width: 100%;
    height: 100%;
  }*/
  .dailySelectionContentList ul li{
    display: flex;
    width: 100%;
    height: 350px;
    box-sizing: border-box;
    margin-bottom: 15px;
    text-align: left;
  }
  .dailyTitle{
    color: black;
    margin-top: 15px;
  }
  .dailyDescription{
    font-size: 14px;
    color: #ccc;
  }
  .dailyPriceNew{
    font-size: 14px;
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
