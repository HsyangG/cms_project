<template>
  <div class="life">
    <div class="lifeList lifeWrapper" ref="lifeWrapper">
      <div class="listContent">
        <div class="carouselMap">
          <v-carousel :carouselList="carouselList"></v-carousel>
        </div>
        <v-submenu :submenuType="1"></v-submenu>
        <div class="splitDiv"></div>
        <div class="dailySelectionTitle">热卖爆品</div>
        <div class="dailySelectionContentList">
          <ul>
            <li v-for="item in shopList" :key="item.id" v-if="item.type != 'phone' && item.type != 'television' && item.type != 'computer'" @click="toRecommendInfo(item.id)">
              <div class="dailySelectContentListLeft"  style="width: 100%;height: 100%;">
                <img v-if="item.picture" :src="item.picture" alt="" style="width: 100%;height: 200px;">
                <p class="dailyTitle">{{item.name}}</p>
                <p class="dailyDescription">{{item.brief}}</p>
                <div class="dailyPrice">
                  <span class="dailyPriceNew">&yen;{{item.price}}&nbsp;起 </span><span class="dailyPriceOld"> &yen;{{item.old_price}}</span>
                </div>
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
import { initScroll } from './../../../utils'

export default {
  components: {
    'v-submenu': Submenu
  },
  data () {
    return {
      shopList: null,
      carouselList: null
    }
  },
  created () {
    this.getShopList()
    this.getCarousel()
  },
  mounted () {
    this.$nextTick(() => {
      initScroll(this.scroll, this.$refs.lifeWrapper)
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
    toRecommendInfo (val) {
      this.$router.push('/recommend/recommend_info?id=' + val)
    }
  }
}
</script>

<style scoped>
.lifeList{
  width: 100%;
  height: 650px;
  overflow: hidden;
}
.listContent{
  width: 100%;
  height: 3000px;
}
.dailySelectionTitle{
  display: flex;
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: 700;
  padding: 20px 15px;
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
  font-size: 14px;
  color: #ccc;
  padding: 0 10px;
  box-sizing: border-box;
}
.dailyPriceNew{
  font-size: 14px;
  color: red;
  padding: 0 10px;
  box-sizing: border-box;
}
.dailyPriceOld{
  font-size: 12px;
  color: #ccc;
  text-decoration: line-through;
}
  .splitDiv{
    width: 100%;
    height: 15px;
    background: #f5f5f5;
  }
  .splitLine{
    width: 5px;
    height: 100%;
  }
</style>
