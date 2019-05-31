<template>
  <transition name="move">
    <div>
      <div class="list_header">
        <!-- <div class="go_back" @click.prevent.prevent="goBack">
          <svg-icon icon-class="houtui"></svg-icon>
        </div> -->
        <v-header :scanShow="false"></v-header>
      </div>
      <div class="recommendList recommendListWrapper" ref="listWrapper">
        <div class="listContent">
          <div class="carouselMap">
            <v-carousel v-if="carouselList" :carouselList="carouselList"></v-carousel>
          </div>
          <div class="topGoods">人气好物TOP 5</div>
          <div class="line"></div>
          <div class="dailySelection">
            <div class="dailySelectionContent" v-for="item in hotShop" :key="item.id">
              <div class="dailySelectionContentImage">
                <img v-if="item.picture" :src="item.picture" alt="" style="width: 100%;height: 100%;">
              </div>
              <div class="dailySelectionContentInfo">
                <div class="dailySelectionContentInfoLeft">
                  <p>{{item.name}}</p>
                  <p>{{item.specification}}</p>
                </div>
                <div class="dailySelectionContentInfoRight">
                  &yen;{{item.price}}
                </div>
              </div>
            </div>
            <div class="dailySelectionContentList">
              <ul>
                <li>
                  <!--想要两个 div 平均水平排列，需要用到 flex 布局，在标签上设置宽度，不能统一设置-->
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
  name: 'recommend-list',
  components: {
    VCarousel,
    'v-submenu': Submenu
  },
  data () {
    return {
      carouselList: null,
      hotShop: null
    }
  },
  // created适合操作数据
  created () {
    this.getCarouselList()
    this.getHotShopList()
  },
  mounted () {
    // this._initScroll()
    this.$nextTick(() => {
      initScroll(this.scroll, this.$refs.listWrapper)
    })
  },
  methods: {
    goBack () {
      // this.$router.push('/home')
      this.$router.go(-1)
    },
    getCarouselList () {
      this.$axios.get('/api/get_carousel')
      .then((response) => {
        if (response.data.code == 0) {
          this.carouselList = response.data.data
        } else {
          console.log(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getHotShopList () {
      this.$axios.get('/api/get_hot_shops')
      .then((response) => {
        if (response.data.code == 0) {
          this.hotShop = response.data.data
        } else {
          console.log(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    toRecommendInfo (val) {
      this.$router.push('/recommend/recommend_info?id=' + val)
    }
  }
}
</script>

<style scoped>
  .cms-s-header {
    background-color: #f7f7f7
  }
  .list_header{
    position: relative;
  }
  .go_back{
    position: absolute;
    top: 11px;
    left: 10px;
    width: 24px;
    height: 24px;
    font-size: 20px;
    z-index: 100;
  }
  .header{
    background: #fafafa;
  }
  .listContent{
    width: 100%;
    height: 3000px;
    overflow: hidden;
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
  .topGoods{
    width: 100%;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    background: #7bacd2;
    margin: 15px 0;
    color: #fff;
  }
  .mapList li{
    width: 100%;
    height: 200px;
  }
  .mapList img{
    width: 100%;
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
    height: 290px;
    /* background: #ccd2f6; */
    margin-bottom: 10px;
  }
  .dailySelectionContentImage{
    width: 100%;
    height: 230px;
    background: rgba(0,0,0,0.2);
  }
  .dailySelectionContentInfo{
    display: flex;
    width: 100%;
    height: 60px;
    font-size: 14px;
    box-sizing: border-box;
    padding: 15px 10px 0 10px;
  }
  .dailySelectionContentInfoLeft{
    width: 160%;
    text-align: left;
    font-weight: 700;
  }
  .dailySelectionContentInfoLeft p:last-child{
    margin-top: 5px;
    font-weight: 500;
    font-size: 12px;
    color: #ccc;
  }
  .dailySelectionContentInfoRight{
    width: 40%;
    text-align: right;
    color: #ff7035;
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
    color: #ff7035;
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
