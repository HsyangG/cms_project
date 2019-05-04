<template>
  <div class="phone">
    <div class="phoneList phoneListWrapper" ref="phoneListWrapper">
      <div class="listContent" ref="listContent">
        <div class="carouselMap">
          <v-carousel :carouselList="carouselList"></v-carousel>
        </div>
        <ul class="submenu">
          <li v-for="(item, index) in submitItemList" :class="item.class" ref="submitList" :key="index">
            <div class="submenu-item">
              <div class="imageBorder">
                <img :src="item.imgUrl" alt="" style="margin-top: 5px">
              </div>
              <p style="margin-top: 3px">{{ item.text }}</p>
            </div>
          </li>
        </ul>
        <ul class="hotSellList">
          <li v-for="item in shopList" :key="item.id" v-if="item.type == 'phone'">
            <div class="hotSellListItem">
              <div class="itemTitle">极具收藏价值的科技艺术品</div>
              <div class="itemImage" style="width: 100%;height: 255px;background: rgba(0,0,0,0.5);">
                <img v-if="item.picture" :src="item.picture" alt="" style="width: 100%;height: 100%">
              </div>
              <div class="itemBottom">
                <div class="itemBottomLeft">
                  <div class="itemBottomLeftTitle">{{item.name}}</div>
                  <div class="itemBottomLeftDescription">{{item.brief}}</div>
                </div>
                <div class="itemBottomRight">
                  <div class="itemPrice">&yen;{{item.price}}</div>
                  <button class="success">立即购买</button>
                </div>
              </div>
            </div>
          </li>
          <!-- <li>
            <div class="hotSellListItem">
              <div class="itemTitle">极具收藏价值的科技艺术品</div>
              <div class="itemImage" style="width: 100%;height: 235px;background: rgba(0,0,0,0.5);"></div>
              <div class="itemBottom">
                <div class="itemBottomLeft">
                  <div class="itemBottomLeftTitle">小米MIX 3 故宫特别版</div>
                  <div class="itemBottomLeftDescription">磁动力滑盖全面屏，前后旗舰AI双摄</div>
                </div>
                <div class="itemBottomRight">
                  <div class="itemPrice">&yen;4999</div>
                  <button class="success">立即购买</button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="hotSellListItem">
              <div class="itemTitle">极具收藏价值的科技艺术品</div>
              <div class="itemImage" style="width: 100%;height: 235px;background: rgba(0,0,0,0.5);"></div>
              <div class="itemBottom">
                <div class="itemBottomLeft">
                  <div class="itemBottomLeftTitle">小米MIX 3 故宫特别版</div>
                  <div class="itemBottomLeftDescription">磁动力滑盖全面屏，前后旗舰AI双摄</div>
                </div>
                <div class="itemBottomRight">
                  <div class="itemPrice">&yen;4999</div>
                  <button class="success">立即购买</button>
                </div>
              </div>
            </div>
          </li> -->
        </ul>
        <div class="goodGoods">
          <div class="goodGoodsTitle">好货推荐</div>
          <div class="goodGoodsContent">
            <div style="width: 100%;height: 250px;background-color: #ccc;">
              <img src="" alt="" style="width: 100%;height: 100%">
            </div>
            <div class="goodGoodsDetail">
              <div class="goodGoodsDetailLeft">
                <div class="itemBottomLeftTitle">红米Note 7</div>
                <div class="itemBottomLeftDescription">4800万拍照千元机，18个月超长质保</div>
              </div>
              <div class="goodGoodsContentRight">
                <div class="itemPrice">&yen;999起</div>
                <button class="success">立即预约</button>
              </div>
            </div>
          </div>
        </div>
        <ul class="goodGoodsList">
          <!-- <li>
            <div class="goodGoodsListLeft" style="width: 100%;height: 100%;">
              <div class="goodsListImage" style="width: 100%;height: 200px;background: rgba(0,0,0,0.5);margin-bottom: 20px">
                <img src="" alt="">
              </div>
              <p style="font-weight: 700;">小米9</p>
              <p style="font-size: 12px;margin-bottom: 5px">骁龙855，索尼4800万三摄</p>
              <p style="font-size: 14px;color: red;">&yen;2999起</p>
              <button class="success" style="width: 50%;margin-top: 2px;">立即预约</button>
            </div>
            <div class="splitDiv"></div>
            <div class="goodGoodsListRight" style="width: 100%;height: 100%;">
              <div class="goodsListImage" style="width: 100%;height: 200px;background: rgba(0,0,0,0.5);margin-bottom: 20px">
                <img src="" alt="">
              </div>
              <p style="font-weight: 700;">小米9</p>
              <p style="font-size: 12px;margin-bottom: 5px;">骁龙855，索尼4800万三摄</p>
              <p style="font-size: 14px;color: red;">&yen;2999起</p>
              <button class="success" style="width: 50%;margin-top: 2px">立即预约</button>
            </div>
          </li> -->
          <li v-for="item in shopList" :key="item.id" v-if="item.type == 'phone'">
             <div class="goodGoodsListRight" style="width: 100%;height: 100%;">
              <div class="goodsListImage" style="width: 100%;height: 200px;background: rgba(0,0,0,0.5);margin-bottom: 20px">
                <img v-if="item.picture" :src="item.picture" alt="" style="width: 100%;height: 100%">
              </div>
              <p style="font-weight: 700;">{{item.name}}</p>
              <p style="font-size: 12px;margin-bottom: 5px;">{{item.brief}}</p>
              <p style="font-size: 14px;color: red;">&yen;{{item.price}}起</p>
              <button class="success" style="width: 50%;margin-top: 2px">立即预约</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { initScroll } from './../../../utils/index'

export default {
  data () {
    return {
      submitItemList: [
        {
          imgUrl: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-.png',
          text: '小苹果系列',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-5.png',
          text: '大黄糕系列',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-10.png',
          text: '小蛋糕系列',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-18.png',
          text: '小坚果系列',
          class: 'submitList'
        },
        {
          imgUrl: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-15.png',
          text: '奇异果系列',
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
      initScroll(this.scroll, this.$refs.phoneListWrapper)
      // console.log(this.$refs.phoneListWrapper, this.$refs.listContent)
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
  .phone{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .phoneList {
    overflow: hidden;
    width: 100%;
    height: 650px; /* wrapper 的高度设为 650px，即可使 swiper 生效*/
  }
  .listContent{
    width: 100%;
    height: 3000px;
    overflow: hidden;
    background: #f4f5fa;
  }
  .submenu{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 20px 10px;
    background-color: #ebedfb;
    /*line-height: 64px;*/
  }
  .submenu li div{
    width: 64px;
    height: 64px;
    font-size: 12px;
    text-align: center;
    /*line-height: 64px;*/
  }
  .imageBorder{
    display: inline-block;
    width: 38px !important;
    height: 38px !important;
    border: 2px solid #8e5aea;
    border-radius: 50%;
  }
  .submenu li div img{
    display: inline-block; /*将图片变成行内块级元素，可以实现图片居中*/
    width: 36px;
    height: 36px;
    margin-top: 5px;
  }
  .hotSellList{
    margin-top: 5px;
  }
  .hotSellListItem{
    width: 100%;
    /*height: 460px;*/
    box-sizing: border-box;
    background: #e0e3f4;
    margin-top: 15px;
    padding: 0 20px 20px 20px;
  }
  .itemTitle{
    width: 100%;
    height: 45px;
    font-size: 18px;
    line-height: 45px;
  }
  .itemBottom{
    display: flex;
    margin-top: 20px;
    width: 100%;
  }
  .itemBottomLeft{
    width: 150%;
    text-align: left;
  }
  .itemBottomLeftTitle{
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
  }
  .itemBottomLeftDescription{
    /*margin-top: 5px;*/
    font-size: 14px;
  }
  .itemBottomRight{
    width: 50%;
    text-align: right;
  }
  .itemPrice{
    width: 100%;
    font-size: 18px;
    color: #eb635b;
    margin-bottom: 5px;
    text-align: center;
  }
  .goodGoodsTitle{
    width: 100%;
    height: 90px;
    line-height: 90px;
    font-size: 20px;
    font-weight: 700;
  }
  .goodGoodsDetail{
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 15px 15px 15px;
    background: #fff;
  }
  .goodGoodsDetailLeft{
    width: 150%;
    text-align: left;
  }
  .goodGoodsContentRight{
    width: 50%;
    text-align: right;
  }
  .goodGoodsList{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    text-align: left;
  }
  .goodGoodsList li{
    display: inline-block;
    width: 49.4%;
    height: 345px;
    box-sizing: border-box;
    margin-top: 15px;
    text-align: center;
  }
  .success{
    border: 0;
    /*background-color: transparent;*/
    outline: none;
    width: 100%;
    height: 30px;
    background: #eb635b;
    color: #fefaf5;
    border-radius: 3px;
  }
  .splitDiv{
    width: 5px;
    height: 100%;
  }
</style>
