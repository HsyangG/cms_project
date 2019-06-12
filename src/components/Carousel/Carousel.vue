<template>
  <div class="carousel-container" ref="carouselContainer">
    <mt-swipe :auto="4000" :style="{ height: height + 'px' }">
        <mt-swipe-item v-if="carouselList" v-for="(item, index) in carouselList" :key="index" :style="{ height: height + 'px' }">
          <img :src="item.link" alt="" :style="{ height: height + 'px' }">
        </mt-swipe-item>
      </mt-swipe>
  </div>
</template>

<script>
import {toStopPrevent} from '../../utils'
import { link } from 'fs';

export default {
  name: 'v-carousel',
  props: {
    carouselList: {
      type: Array,
      default: () => {
        return null
      }
    },
    height: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      /**
       * 当前正在显示的图片
       */
      currentIndex: 0,
      /**
       * 切换图片定时器
       */
      carouselTimer: null,
      isShow: true,
      distance: -600
    }
  },
  mounted () {
    // 在页面加载完毕的时候执行该事件，阻止事件冒泡
    // this.toStopDefault()
    toStopPrevent(this.$refs.carouselContainer)
  },
}
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all 0.5s linear;
  }
  .slide-fade-enter {
    transform: translate3d(100%,0,0);
  }
  /* .carousel-img-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 200px;
  } */
  .carousel-img-container li {
    width: 100%;
    height: 100%;
  }
  /*动画*/
  .carousel-img {
    width: 100%;
    height: 100%;
  }
  /* .container{
    position: relative;
    width: 100%;
    height: 200px;
    line-height: 200px;
  }
  .container li{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    float: left;
    background: pink;
  }
  .container li img {
    width: 100%;
    height: 100%;
  }
  .mint-swipe {
    height: 200px;
  } */
  img {
    width: 100%;
  }
</style>
