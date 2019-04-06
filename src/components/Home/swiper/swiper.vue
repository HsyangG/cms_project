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
import Swiper from 'swiper/dist/js/swiper.min'
import 'swiper/dist/css/swiper.min.css'
import { offEventHubListener } from '@/utils/index'
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [
          {router: {name: 'recommend'}, component: () => import('@/components/Recommend/RecommendList')},
          {router: {name: 'phoneList'}, component: () => import('@/components/views/phone/phone')},
          {router: {name: 'intelligenceList'}, component: () => import('@/components/views/intelligence/intelligence')},
          {router: {name: 'televisionList'}, component: () => import('@/components/views/television/television')},
          {router: {name: 'televisionList'}, component: () => import('@/components/views/television/television')},
          {router: {name: 'lifeList'}, component: () => import('@/components/views/life/life')}
          // {router: {name: 'news.list'}, component: NewsList},
          // {router: {name: 'logp'}, component: Logp}
        ]
      }
    }
  },
  data () {
    return {
      currentIndex: 0,
    }
  },
  mounted () {
    let mySwiper = new Swiper('.swiper-container')

    mySwiper.on('slideChange', () => {
      // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到 nav 组件
      this.$root.eventHub.$emit('slideTab', mySwiper.activeIndex)
    })

    // 接收 nav 组件传过来的导航按钮索引值，跳转到相应的内容区
    this.$root.eventHub.$on('tabChange', (index) => {
      this.currentIndex = index
      mySwiper.slideTo(this.currentIndex, 1000, false)
    })
    this.$root.eventHub.$on('orderTabChange', (index) => {
      console.log('hello')
      this.currentIndex = index
      mySwiper.slideTo(this.currentIndex, 1000, false)
    }) // 刷新页面数据会被清空
  },
  methods: {
    offEventHubListener () {
      this.$root.eventHub.$off('orderTabChange')
      this.$root.eventHub.$off('tabChange')
    }
  },
  beforeDestroy () {
    /**
     * 在目标组件销毁之前需要解绑事件监听
     * 否则会触发多次
     * 因为组件销毁时 this.$root.eventHub 不会销毁
     * 所有的监听事件会叠加
     */
    this.offEventHubListener()
  }
}
</script>

<style scoped>

</style>
