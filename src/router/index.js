import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Sort from '@/components/Sort/Sort'
import Find from '@/components/Find/Find'
import Me from '@/components/Me/Me'
import Member from '@/components/Member/Member'
import Search from '@/components/Search/Search'
import Shopcart from '@/components/Shopcart/Shopcart'
import RecommendList from '@/components/Recommend/RecommendList'
import Login from '@/components/Login/Login'
import Logp from '@/components/Logp/Logp'
import Register from '@/components/Register/Register'
// 注册全局组件 router-view router-link

// 未来所有的组件中的this对象，就具备了该属性，未来所有的this其实就是vue的子类对象
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 首先进行重定向，重定向到首页
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/sort',
      name: 'sort',
      component: Sort
    },
    {
      name: 'find',
      path: '/find',
      component: Find
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },
    {
      name: 'me',
      path: '/me',
      component: Me
    },
    {
      name: 'my_order',
      path: '/me/mine_order',
      component: () => import('@/components/Me/mine_order')
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    // 推荐列表
    {
      name: 'recommendList',
      path: '/recommend/list', // 锚点值
      component: RecommendList
    },
    {
      name: 'recommendList',
      path: '/recommend/recommend_list',
      component: () => import('@/components/Recommend/list')
    },
    {
      name: 'recommendInfo',
      path: '/recommend/recommend_info',
      component: () => import('@/components/Recommend/recommendInfo')
    },
    {
      name: 'phoneList',
      path: '/views/phone/phone',
      component: () => import('@/components/views/phone/phone')
    },
    {
      name: 'intelligenceList',
      path: '/views/intelligence/intelligence',
      component: () => import('@/components/views/intelligence/intelligence')
    },
    {
      name: 'televisionList',
      path: '/views/television/television',
      component: () => import('@/components/views/television/television')
    },
    {
      name: 'television_list_item',
      path: '/views/television/list',
      component: () => import('@/components/views/television/list')
    },
    {
      name: 'lifeList',
      path: '/views/life/life',
      component: () => import('@/components/views/life/life')
    },
    // 登录
    {
      name: 'login',
      path: '/callme/login',
      component: Login
    },
    {
      name: 'logp',
      path: '/callme/logp',
      component: Logp
    },
    // 注册
    {
      name: 'register',
      path: '/callme/register',
      component: Register
    }
  ]
})
