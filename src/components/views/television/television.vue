<template>
  <div class="television">
    <div class="televisionList televisionWrapper" ref="televisionWrapper">
      <div class="listContent">
        <div class="carouselMap">
          <v-carousel></v-carousel>
        </div>
        <v-submenu :submenuType="submenuType"></v-submenu>
        <div class="listTitle">
          <span>热卖爆品</span>
        </div>
        <div class="dailySelectionContentList">
          <ul>
            <li>
              <!--想要两个 div 平均水平排列，需要用到 flex 布局，在标签上设置宽度，不能统一设置-->
              <div class="dailySelectContentListLeft"  style="width: 100%;height: 100%;background: #fff;">
                <img src="http://localhost:3000/public/img/commodities/redminode7.png" alt="" style="width: 100%;height: 200px;">
                <p class="dailyTitle">小米8</p>
                <p class="dailyDescription">相机全新升级，骁龙845</p>
                <div class="dailyPrice">
                  <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
                </div>
                <button class="success" style="width: 50%;margin-top: 2px;">立即预约</button>
              </div>
              <div class="splitDiv"></div>
              <div class="dailySelectContentListRight"  style="width: 100%;height: 100%;background: #fff;">
                <img src="http://localhost:3000/public/img/commodities/redminode7.png" alt="" style="width: 100%;height: 200px;">
                <p class="dailyTitle">小米8</p>
                <p class="dailyDescription">相机全新升级，骁龙845</p>
                <div class="dailyPrice">
                  <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
                </div>
                <button class="success" style="width: 50%;margin-top: 2px;">立即预约</button>
              </div>
            </li>
            <li>
              <!--想要两个 div 平均水平排列，需要用到 flex 布局，在标签上设置宽度，不能统一设置-->
              <div class="dailySelectContentListLeft"  style="width: 100%;height: 100%;background: #fff;">
                <img src="http://localhost:3000/public/img/commodities/redminode7.png" alt="" style="width: 100%;height: 200px;">
                <p class="dailyTitle">小米8</p>
                <p class="dailyDescription">相机全新升级，骁龙845</p>
                <div class="dailyPrice">
                  <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
                </div>
                <button class="success" style="width: 50%;margin-top: 2px;">立即预约</button>
              </div>
              <div class="splitDiv"></div>
              <div class="dailySelectContentListRight"  style="width: 100%;height: 100%;background: #fff;">
                <img src="http://localhost:3000/public/img/commodities/redminode7.png" alt="" style="width: 100%;height: 200px;">
                <p class="dailyTitle">小米8</p>
                <p class="dailyDescription">相机全新升级，骁龙845</p>
                <div class="dailyPrice">
                  <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
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
      submenuType: 2 // 1 是有轮播图的详情页，2 是没有轮播图的详情页
    }
  },
  created () {
    this.$nextTick(() => {
      initScroll(this.scroll, this.$refs.televisionWrapper)
    })
  }
}

</script>

<style scoped>
.television{
  background: #971c27;
}
.televisionList{
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
/*.dailySelectionContentList ul{
  width: 100%;
  height: 100%;
}*/
.dailySelectionContentList ul li{
  display: flex;
  width: 100%;
  height: 305px;
  box-sizing: border-box;
  margin-bottom: 15px;
  text-align: center;
}
.dailyTitle{
  color: black;
  margin-top: 15px;
  font-weight: 700;
  font-size: 14px;
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
