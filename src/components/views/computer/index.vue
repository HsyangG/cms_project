<template>
  <div class="computer">
    <div class="computerList televisionWrapper" ref="televisionWrapper">
      <div class="listContent">
        <div class="carouselMap">
          <v-carousel :carouselList="carouselList" :height="305"></v-carousel>
        </div>
        <v-submenu :submenuType="submenuType"></v-submenu>
        <div class="listTitle">
          <span>热卖爆品</span>
        </div>
        <div class="dailySelectionContentList">
          <ul>
            <li v-for="item in shopList" :key="item.id" v-if="item.type == 'computer'">
              <div class="dailySelectContentListLeft"  style="width: 100%;height: 100%;">
                <img v-if="item.picture" :src="item.picture" alt="" style="width: 100%;height: 200px;">
                <p class="dailyTitle">{{item.name}}</p>
                <p class="dailyDescription">{{item.brief}}</p>
                <div class="dailyPrice">
                  <span class="dailyPriceNew">&yen;{{item.price}}&nbsp;起 </span><span class="dailyPriceOld"> &yen;{{item.old_price}}</span>
                </div>
                <button class="success" style="width: 50%;margin-top: 2px;">立即预约</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Submenu from './../../Submenu/submenu'
import { initScroll } from './../../../utils/index'

export default {
  components: {
    'v-submenu': Submenu
  },
  data () {
    return {
      submenuType: 2, // 1 是有轮播图的详情页，2 是没有轮播图的详情页
      carouselList: null,
      shopList: null
    }
  },
  created () {
    this.$nextTick(() => {
      initScroll(this.scroll, this.$refs.televisionWrapper)
    })
    this.getShopList()
    this.getCarousel()
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
  }
}

</script>

<style scoped>
.computer{
  background: #971c27;
}
.computerList{
  width: 100%;
  height: 650px;
  overflow: hidden;
}
.listContent{
  width: 100%;
  height: 3000px;
}
.carousel-container{
  width: 100%;
  height: 305px;
}
  .submenu{
    background: #b21e2e;
    color: #eebabd;
  }
.listTitle{
  display: inline-block;
  width: 90%;
  height: 55px;
  color: #fff;
  line-height: 55px;
  text-align: center;
  font-size: 20px;
  /*background: #d32138;*/
  background: -webkit-linear-gradient(to right, #d32138, #b31f2f, #d32138); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(to right, #d32138, #b31f2f, #d32138); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(to right, #d32138, #b31f2f, #d32138); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #d32138, #b31f2f, #d32138); /* 标准的语法 从左到右渐变*/
  border-radius: 40px;
  margin: 5px 0;
}
.dailySelectionContentList{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.dailySelectionContentList ul{
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
  width: 49.4%;
  /* height: 305px; */
  /* box-sizing: border-box; */
  padding-bottom: 15px;
  text-align: center;
  background: #fff;
}
.dailyTitle{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: black;
  margin-top: 15px;
  font-weight: 700;
  font-size: 14px;
  padding: 0 10px;
  box-sizing: border-box;

}
.dailyDescription{
  font-size: 10px;
  color: #000;
}
.dailyPriceNew{
  font-size: 12px;
  color: red
}
.dailyPriceOld{
  font-size: 10px;
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
.success{
  border: 0;
  /*background-color: transparent;*/
  outline: none;
  width: 100%;
  height: 25px;
  background: #eb635b;
  color: #fefaf5;
  border-radius: 3px;
}
</style>
