<!--<template>
  <div class="carousel-container">
    <div class="slide-img">
      <transition name="slide-fade">
        <ul class="carousel-img-container">
          <li v-for="(item, index) in carouselList"
              :key="index"
              v-if="index===currentIndex">
            <img :src="item" class="carousel-img">
          </li>
        </ul>
      </transition>
      <transition name="slide-fade">
        <ul class="slide-div">
          <li v-for="(item, index) in carouselList"
              :key="index"
              v-if="index===currentIndex">
            <img :src="item" alt="">
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-carousel',
  data () {
    return {
      /**
       * 轮播图数据
       */
      carouselList: ['http://localhost:3000/public/img/01.jpg',
        'http://localhost:3000/public/img/02.jpg',
        'http://localhost:3000/public/img/03.jpg',
        'http://localhost:3000/public/img/04.jpg'],
      slideList: [
        {title: 1},
        {title: 2},
        {title: 3},
        {title: 4}
      ],
      /**
       * 当前正在显示的图片
       */
      currentIndex: 0,
      /**
       * 切换图片定时器
       */
      carouselTimer: null,
      isShow: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._begin()
    })
  },
  methods: {
    /**
     * 点击切换图片
     */
    changePic (e) {
      this.currentIndex = parseInt(e.target.dataset.index)
    },
    /**
     * 定时切换图片
     */
    autoPlay () {
      this.isShow = false
      if (this.currentIndex < this.carouselList.length - 1) {
        this.isShow = true
        this.currentIndex++
      } else {
        this.isShow = true
        this.currentIndex = 0
      }
      console.log(this.currentIndex)
    },
    /**
     * 开始定时切换图片
     */
    _begin () {
      this.carouselTimer = setInterval(this.autoPlay, 6000)
    },
    /**
     * 停止定时切换图片
     */
    _stop () {
      clearInterval(this.carouselTimer)
    }
  }
}
</script>

<style>
  .slide-fade-enter-active {
    transition: all 0.5s linear;
  }
  .slide-fade-enter {
    transform: translate3d(100%,0,0);
  }
  .carousel-img-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 200px;
  }
  .carousel-img-container li {
    width: 100%;
    height: 100%;
  }
  /*动画*/
  .carousel-img {
    width: 100%;
    height: 100%;
  }
  .slide-div{
    position: relative;
    width: 100%;
    height: 100px;
    line-height: 100px;
  }
  .slide-div li{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    float: left;
    background: pink;
  }
  .slide-div li img {
    width: 100%;
    height: 100%;
  }
</style>-->
<!--<template>
  <div class="slider-show">
    <div class="slide-img">
      <transition name="slide-trans">
        <img v-if="isShow" :src="img[nowIndex].src">
      </transition>
      <transition name="slide-trans-old">
        <img v-if="!isShow" :src="img[nowIndex].src">
      </transition>
    </div>
    <div class="mask">
      <ul class="control">
        <li v-for="(item,index) in img" :key="index" :class="{'on': index===nowIndex}">
          <a @click="goto (index)"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-carousel',
  data () {
    return {
      inv: 5000,
      nowIndex: 0,
      isShow: true,
      img: [
        {
          src: require('./01.jpg')
        },
        {
          src: require('./15.jpg')
        },
        {
          src: require('./13.jpg')
        },
        {
          src: require('./23.jpg')
        }
      ]
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.img.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      if (this.nowIndex === this.img.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    }
  },
  mounted () {
    setInterval(() => {
      this.runInv()
    }, this.inv)
  },
  methods: {
    goto (index) {
      this.isShow = false
      setTimeout(() => {
        this.nowIndex = index
        this.isShow = true
        // console.log(this.nowIndex)
      }, 20)
    },
    runInv () {
      console.log(this.nowIndex)
      this.goto(this.nextIndex)
    },
    clearInv () {
      clearInterval(this.invId)
    }
  }
}
</script>

<style scoped>
  /*动画样式*/
  .slide-trans-enter-active {
    transition: all .5s linear;
  }
  .slide-trans-enter {
    transform: translateX(90%);
  }
  .slide-trans-leave-active {
    transition: all 0s linear;
  }
  .slide-trans-old-leave-active {
    transition: all .5s linear;
    transform: translateX(-90%);
  }
  .slider-show {
    width: 100%;
    height: 200px;
    position: relative;
    overflow: hidden;
  }
  .slide-img {
    width: 100%;
    height: 200px;
  }
  .slide-img img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .img-title {
    font-size: 14px;
    color: #ddd;
  }
  .control {
    position: absolute;
    right: 5px;
    bottom: 5px;
    height: 11px;
    text-align: center;
    line-height: 11px;
  }
  .control li {
    width: 5px;
    height: 5px;
    float: left;
    cursor: pointer;
    margin: 3px 10px 0 0;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
  }
  .control li a {
    width: 100%;
    height: 100%;
  }
  .on {
    border: 3px solid #fff;
    margin-top: 0;
  }
  .mask {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    line-height: 30px;
    height: 30px;
    background-color: rgba(0,0,0,0.5);
    z-index: 999;
  }
</style>-->
<template>
  <div class="carousel-container" ref="carouselContainer">
    <!--<div class="slide-img">
      <ul class="container" :style="containerStyle">
        &lt;!&ndash;列表最前面的辅助图，它和最后一张图一样，用于无限滚动&ndash;&gt;
        <li>
          <img :src="carouselList[carouselList.length - 1]" alt="">
        </li>
        &lt;!&ndash;需要滚动的图片&ndash;&gt;
        <li v-for="(item, index) in carouselList"
            :key="index"
            v-if="index===currentIndex">
          <img :src="item" alt="">
        </li>
        &lt;!&ndash;列表最后面的辅助图&ndash;&gt;
        <li>
          <img :src="carouselList[0]" alt="">
        </li>
      </ul>
      <ul class="dots">
        <li v-for="(dot, index) in carouselList"
            :key="index"
            :class="{'dotted': index===currentIndex}"></li>
      </ul>
    </div>-->
    <mt-swipe :auto="4000">
        <!--<mt-swipe-item v-for="img in imgs" v-bind:key="img.index">
          <img :src="img.img" alt="">
        </mt-swipe-item>-->
        <mt-swipe-item>
          <img src="http://localhost:3000/public/img/01.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="http://localhost:3000/public/img/02.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="http://localhost:3000/public/img/03.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="http://localhost:3000/public/img/04.jpg" alt="">
        </mt-swipe-item>
      </mt-swipe>
  </div>
</template>

<script>
import {toStopPrevent} from '../../utils'

export default {
  name: 'v-carousel',
  data () {
    return {
      /**
       * 轮播图数据
       */
      carouselList: ['http://localhost:3000/public/img/01.jpg',
        'http://localhost:3000/public/img/02.jpg',
        'http://localhost:3000/public/img/03.jpg',
        'http://localhost:3000/public/img/04.jpg'],
      slideList: [
        {title: 1},
        {title: 2},
        {title: 3},
        {title: 4}
      ],
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
  computed: {
    containerStyle: function () {
      // 计算属性，用 transform 来移动整个图片列表
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      }
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this._begin()
    })
    // 在页面加载完毕的时候执行该事件，阻止事件冒泡
    // this.toStopDefault()
    toStopPrevent(this.$refs.carouselContainer)
  },
  methods: {
    /**
     * 点击切换图片
     */
    changePic (e) {
      this.currentIndex = parseInt(e.target.dataset.index)
    },
    /**
     * 定时切换图片
     */
    autoPlay () {
      this.isShow = false
      if (this.currentIndex < this.carouselList.length - 1) {
        this.isShow = true
        this.currentIndex++
      } else {
        this.isShow = true
        this.currentIndex = 0
      }
    },
    /**
     * 开始定时切换图片
     */
    _begin () {
      this.carouselTimer = setInterval(this.autoPlay, 6000)
    },
    /**
     * 停止定时切换图片
     */
    _stop () {
      clearInterval(this.carouselTimer)
    }
    /**
     *  阻止事件穿透
     *  用来阻止滑动轮播图的时候产生的事件冒泡，影响到父组件
     */
    // toStopDefault () {
    //   let stop = this.$refs.carouselContainer
    //   stop.addEventListener('touchmove', (event) => {
    //     event.preventDefault() // 阻止默认行为
    //     event.stopPropagation() // 阻止事件冒泡
    //   }, false)
    // }
  }
}
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all 0.5s linear;
  }
  .slide-fade-enter {
    transform: translate3d(100%,0,0);
  }
  .carousel-img-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 200px;
  }
  .carousel-img-container li {
    width: 100%;
    height: 100%;
  }
  /*动画*/
  .carousel-img {
    width: 100%;
    height: 100%;
  }
  .container{
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
  }
  img {
    width: 100%;
  }
</style>
