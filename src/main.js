// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 配置axios
import Axios from 'axios'
import '@/icons' // icon
// 配置MinUI
import MinUI from 'mint-ui'
// 引入css
import 'mint-ui/lib/style.css'
// import 'assets/css/global.css'
import './assets/css/style.css'

// 引入自己的组件
import MyUl from '@/components/Common/MyUl'
import MyLi from '@/components/Common/MyLi'
import BtMenu from '@/components/BtMenu/BtMenu'
import Header from '@/components/Header/Header'
import Carousel from '@/components/Carousel/Carousel'

// 安装插件 注册全局组件以及挂载属性
Vue.use(MinUI)
// 配置公共URL
// https://www.sinya.online/api/   tapi/random.php
Axios.defaults.baseURL = 'http://localhost:3000'

// 注册全局组件
Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)
Vue.component(BtMenu.name, BtMenu)
Vue.component(Header.name, Header)
Vue.component(Carousel.name, Carousel)
// 挂载属性，让所有组件都能用
Vue.prototype.$axios = Axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    eventHub: new Vue() // 使用集中的事件处理器，一劳永逸的在任何组件调用事件发射、接受方法
  }
})
