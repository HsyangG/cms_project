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
  mode: 'history',
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
      path: '/shopcart/settlement',
      name: 'settlement',
      component: () => import('@/components/shopcart/settlement'),
      meta: { title: '支付订单', keepAlive: false }
    },
    {
      path: '/shopcart/add_address',
      name: 'select_address',
      component: () => import('@/components/shopcart/selectedAddress'),
      meta: { title: '选择地址' }
    },
    {
      path: '/shopcart/pay_success',
      name: 'pay_success',
      component: () => import('@/components/shopcart/orderSuccess'),
      meta: { title: '下单成功' }
    },
    {
      name: 'me',
      path: '/me',
      component: Me
    },
    {
      path: '/me/user_information',
      name: 'user_information',
      component: () => import('@/components/views/userInformation/index'),
      meta: { title: '个人资料' }

    },
    {
      name: 'my_order',
      path: '/me/mine_order',
      component: () => import('@/components/Me/mine_order')
    },
    {
      path: '/me/setting',
      name: 'setting',
      component: () => import('@/components/Me/setting'),
      meta: { title: '设置' }
    },
    {
      path: '/me/mine_address',
      name: 'mine_address',
      component: () => import('@/components/Me/mine_address'),
      meta: { title: '我的地址' }
    },
    {
      path: '/me/mine_address_add',
      name: 'add_address',
      component: () => import('@/components/Me/mine_address_add'),
      meta: { title: '添加地址' }
    },
    {
      path: '/me/setting/about',
      name: 'about_bubble',
      component: () => import('@/components/Me/about'),
      meta: { title: '关于气泡' }
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
      path: '/views/computer/index',
      name: 'computer_list',
      component: () => import('@/components/views/computer/index')
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
