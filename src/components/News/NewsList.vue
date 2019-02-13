<template>
  <transition name="move">
    <div class="newsList">
      <div class="listContent">
        <div class="carouselMap">
          <v-carousel></v-carousel>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import VCarousel from '../Carousel/Carousel'
export default {
  name: 'news-list',
  components: {VCarousel},
  data () {
    return {
      newsList: [] // 新闻列表
    }
  },
  // created适合操作数据
  created () {
    /* this.$axios.get('getnewslist')
      .then(res => {
        this.newsList = res.data.message
      })
      .catch(err => console.log('新闻列表异常', err)) */
  }
}
</script>

<style scoped>
  .cms-s-header {
    background-color: #f7f7f7
  }
  .newsList{
    transition: all 0.5s linear;
  }
  .move-enter, .move-leave-active{
    transform: translate3d(100%,0,0)
  }
  .mapList li{
    width: 100%;
    height: 200px;
  }
  .mapList img{
    width: 100%;
  }
</style>
