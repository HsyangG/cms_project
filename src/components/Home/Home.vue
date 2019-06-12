<template>
  <div class="home wrapper" ref="wrapper">
    <div class="content" ref="content">
      <v-header></v-header>
      <v-nav></v-nav>
      <v-swiper :list="routersList"></v-swiper>
      <div style="width: 100%;height: 42px;"></div>
      <bt-menu></bt-menu>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import nav from './nav/nav'
import swiper from './swiper/swiper'
export default {
  data () {
    return {
      imgs: [], // 轮播图数据
      routersList: [
        {router: {name: 'recommend'}, component: () => import('@/components/Recommend/RecommendList')},
        {router: {name: 'phoneList'}, component: () => import('@/components/views/phone/phone')},
        {router: {name: 'intelligenceList'}, component: () => import('@/components/views/intelligence/intelligence')},
        {router: {name: 'televisionList'}, component: () => import('@/components/views/television/television')},
        {router: {name: 'computer_list'}, component: () => import('@/components/views/computer/index')},
        {router: {name: 'lifeList'}, component: () => import('@/components/views/life/life')}
      ]
    }
  },
  components: {
    'v-nav': nav,
    'v-swiper': swiper
  }
}
</script>
