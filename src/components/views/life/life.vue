<template>
  <div class="life">
    <div class="lifeList lifeWrapper" ref="lifeWrapper">
      <div class="listContent">
        <div class="carouselMap">
          <v-carousel></v-carousel>
        </div>
        <v-submenu></v-submenu>
        <div class="splitDiv"></div>
        <div class="dailySelectionTitle">热卖爆品</div>
        <div class="dailySelectionContentList">
          <ul>
            <li>
              <!--想要两个 div 平均水平排列，需要用到 flex 布局，在标签上设置宽度，不能统一设置-->
              <div class="dailySelectContentListLeft"  style="width: 100%;height: 100%;">
                <img src="http://localhost:3000/public/img/commodities/redminode7.png" alt="" style="width: 100%;height: 230px;">
                <p class="dailyTitle">小米8</p>
                <p class="dailyDescription">相机全新升级，骁龙845</p>
                <div class="dailyPrice">
                  <span class="dailyPriceNew">&yen;2299&nbsp;起 </span><span class="dailyPriceOld"> &yen;2699</span>
                </div>
              </div>
              <div class="splitLine"></div>
              <div class="dailySelectContentListRight"  style="width: 100%;height: 100%;">
                <img src="http://localhost:3000/public/img/commodities/redminode7.png" alt="" style="width: 100%;height: 230px;">
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
</template>

<script type="text/ecmascript-6">
import Submenu from './../../Submenu/submenu'
import { initScroll } from './../../../utils'

export default {
  components: {
    'v-submenu': Submenu
  },
  data () {
    return {}
  },
  mounted () {
    this.$nextTick(() => {
      initScroll(this.scroll, this.$refs.lifeWrapper)
    })
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
/*.dailySelectionContentList ul{
  width: 100%;
  height: 100%;
}*/
.dailySelectionContentList ul li{
  display: flex;
  width: 100%;
  height: 310px;
  box-sizing: border-box;
  margin-bottom: 15px;
  text-align: left;
  /*background: rgba(0,0,0,0.5);*/
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
