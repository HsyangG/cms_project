import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Sort from '@/components/Sort/Sort'
import Find from '@/components/Find/Find'
import Me from '@/components/Me/Me'
import Member from '@/components/Member/Member'
import Search from '@/components/Search/Search'
import Shopcart from '@/components/Shopcart/Shopcart'
import NewsList from '@/components/News/NewsList'
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
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    // 新闻列表
    {
      name: 'news.list',
      path: '/news/list', // 锚点值
      component: NewsList
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
