<template>
  <div class="swiper-box">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in list" :key="index">
          <keep-alive>
            <!--动态组件 <component></component>,
            通过 :is="模版文件"动态加载不同的模版文件-->
            <component :is="item.component"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import NewsList from './../../News/NewsList'
// import Logp from './../../Logp/Logp'
import Phone from './../../views/phone/phone'
import Intelligence from './../../views/intelligence/intelligence'
import Television from './../../views/television/television'
import Life from './../../views/life/life'
import Swiper from 'swiper/dist/js/swiper.min'
import 'swiper/dist/css/swiper.min.css'
export default {
  data () {
    return {
      list: [
        {router: {name: 'newsList'}, component: NewsList},
        {router: {name: 'phoneList'}, component: Phone},
        {router: {name: 'intelligenceList'}, component: Intelligence},
        {router: {name: 'televisionList'}, component: Television},
        {router: {name: 'televisionList'}, component: Television},
        {router: {name: 'lifeList'}, component: Life}
        // {router: {name: 'news.list'}, component: NewsList},
        // {router: {name: 'logp'}, component: Logp}
      ]
    }
  },
  mounted () {
    let mySwiper = new Swiper('.swiper-container', {
      // 设定初始时 slide 的索引
      // initialSlide: this.$route.path === '/one' ? 0 : this.$route.path === '/two' ? 1 : this.$route.path === '/three' ? 2 : this.route.path === '/four' ? 3 : this.$route.path === '/five' ? 4 : 0
    })
    mySwiper.on('slideChange', () => { // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到 nav 组件
      this.$root.eventHub.$emit('slideTab', mySwiper.activeIndex)
    })
    // 接收 nav 组件传过来的导航按钮索引值，跳转到相应的内容区
    this.$root.eventHub.$on('tabChange', (index) => {
      mySwiper.slideTo(index, 1000, false)
    })
    // console.log(mySwiper)
  }
}
</script>

<style>

</style>
