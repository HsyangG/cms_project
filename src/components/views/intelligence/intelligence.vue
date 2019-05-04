<template>
  <div class="intelligence">
    <div class="intelligenceList intelligenceListWrapper" ref="intelligenceListWrapper">
      <div class="listContent">
        <div class="carouselMap">
          <v-carousel :carouselList="carouselList"></v-carousel>
        </div>
        <v-submenu :submitItemList="submenuItem"></v-submenu>
        <div class="listTitle">
          <span>热卖爆品</span>
        </div>
        <div class="goodsList">
          <ul>
            <!-- <li>
              <div class="goodsListItem">
                <img src="" alt="">
                <div class="goodsListItemContent">
                  <p>投影仪青春版</p>
                  <div class="itemContentPrice">
                    <span>&yen;2399 </span>
                    <span> &yen;2799</span>
                  </div>
                </div>
              </div>
              <div class="splitDiv"></div>
              <div class="goodsListItem">
                <img src="" alt="">
                <div class="goodsListItemContent">
                  <p>投影仪青春版</p>
                  <div class="itemContentPrice">
                    <span>&yen;2399 </span>
                    <span> &yen;2799</span>
                  </div>
                </div>
              </div>
              <div class="splitDiv"></div>
              <div class="goodsListItem">
                <img src="" alt="">
                <div class="goodsListItemContent">
                  <p>投影仪青春版</p>
                  <div class="itemContentPrice">
                    <span>&yen;2399 </span>
                    <span> &yen;2799</span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="goodsListItem">
                <img src="" alt="">
                <div class="goodsListItemContent">
                  <p>投影仪青春版</p>
                  <div class="itemContentPrice">
                    <span>&yen;2399 </span>
                    <span> &yen;2799</span>
                  </div>
                </div>
              </div>
              <div class="splitDiv"></div>
              <div class="goodsListItem">
                <img src="" alt="">
                <div class="goodsListItemContent">
                  <p>投影仪青春版</p>
                  <div class="itemContentPrice">
                    <span>&yen;2399 </span>
                    <span> &yen;2799</span>
                  </div>
                </div>
              </div>
              <div class="splitDiv"></div>
              <div class="goodsListItem">
                <img src="" alt="">
                <div class="goodsListItemContent">
                  <p>投影仪青春版</p>
                  <div class="itemContentPrice">
                    <span>&yen;2399 </span>
                    <span> &yen;2799</span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="goodsListItem">
                <img src="" alt="">
                <div class="goodsListItemContent">
                  <p>投影仪青春版</p>
                  <div class="itemContentPrice">
                    <span>&yen;2399 </span>
                    <span> &yen;2799</span>
                  </div>
                </div>
              </div>
              <div class="splitDiv"></div>
              <div class="goodsListItem">
                <img src="" alt="">
                <div class="goodsListItemContent">
                  <p>投影仪青春版</p>
                  <div class="itemContentPrice">
                    <span>&yen;2399 </span>
                    <span> &yen;2799</span>
                  </div>
                </div>
              </div>
              <div class="splitDiv"></div>
              <div class="goodsListItem">
                <img src="" alt="">
                <div class="goodsListItemContent">
                  <p>投影仪青春版</p>
                  <div class="itemContentPrice">
                    <span>&yen;2399 </span>
                    <span> &yen;2799</span>
                  </div>
                </div>
              </div>
            </li> -->
            <li v-for="item in shopList" :key="item.id" v-if="item.type != 'phone' && item.type != 'television' && item.type != 'computer'">
              <div class="goodsListItem">
                <img v-if="item.picture" :src="item.picture" alt="">
                <div class="goodsListItemContent">
                  <p>{{item.name}}</p>
                  <div class="itemContentPrice">
                    <span>&yen;2399 </span>
                    <span> &yen;2799</span>
                  </div>
                </div>
              </div>
            </li>
            <li></li>
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
      submenuItem: [
        {
          imgUrl: 'http://localhost:3000/public/img/shop/crown.png',
          text: '111',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/shop/bell.png',
          text: '222',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/shop/monitor.png',
          text: '333',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/shop/donut.png',
          text: '444',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/shop/ad.png',
          text: '555',
          class: 'submitList'
        }
      ],
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
      initScroll(this.scroll, this.$refs.intelligenceListWrapper)
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
  }
}
</script>

<style scoped>
.intelligenceList{
  width: 100%;
  height: 650px;
  overflow: hidden;
  background-color: #f3f3ff;
}
  .listContent{
    width: 100%;
    height: 3000px;
  }
  .submenu{
    background-color: #f0f1f3;
  }
  .listTitle{
    width: 100%;
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: 20px;
  }
  .goodsList ul{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    text-align: left;
  }
  .goodsList ul li {
    /* display: flex; */
    display: inline-block;
    /* width: 100%; */
    width: 33%;
    height: 250px;
    box-sizing: border-box;
    margin-top: 15px;
  }
  .goodsListItem{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .goodsListItem img{
    width: 100%;
    height: 170px;
    background-color: rgba(0,0,0,0.5);
  }
  .goodsListItemContent{
    text-align: left;
    font-size: 14px;
    padding: 10px 10px 0 10px;
  }
  .goodsListItemContent p{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .itemContentPrice{
    margin-top: 5px;
  }
  .goodsListItemContent span:nth-child(1) {
    color: red;
  }
  .goodsListItemContent span:nth-child(2){
    font-size: 10px;
    color: #ccc;
    text-decoration: line-through;
  }
.splitDiv{
  width: 5px;
  height: 100%;
}
</style>
