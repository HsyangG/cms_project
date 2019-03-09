<template>
  <div class="phone">
    <div class="phoneList phoneListWrapper" ref="phoneListWrapper">
      <div class="listContent" ref="listContent">
        <div class="carouselMap">
          <v-carousel></v-carousel>
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
          <li>
            <div class="hotSellListItem"></div>
            <div class="hotSellListItem"></div>
            <div class="hotSellListItem"></div>
            <div class="hotSellListItem"></div>
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
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      initScroll(this.scroll, this.$refs.phoneListWrapper)
      // console.log(this.$refs.phoneListWrapper, this.$refs.listContent)
    })
  },
  methods: {
  }
}
</script>

<style scoped>
  .phoneList {
    width: 100%;
    height: 0; /* wrapper 的高度设为0，即可使 swiper 生效*/
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
    margin-top: 20px;
  }
  .hotSellListItem{
    width: 100%;
    height: 460px;
    background: #e0e3f4;
  }
</style>
