<template>
  <div class="nav navWrapper" ref="navWrapper">
    <ul class="nav-list navList" ref="navList">
      <li class="item" v-for="(item, index) in navList" :key="index" :class="{'active': nowIndex===index}" @click.prevent="tabClick(index)">
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      navList: [
        {className: 'cms-recommend', title: '推荐', router: {name: 'recommend'}},
        {className: 'cms-phone', title: '手机', router: {name: 'phoneList'}},
        {className: 'cms-intelligence', title: '智能', router: {name: 'intelligenceList'}},
        {className: 'cms-television', title: '电视', router: {name: 'televisionList'}},
        {className: 'cms-laptop', title: '笔记本', router: {name: 'computer_list'}},
        {className: 'cms-life', title: '生活周边', router: {name: 'lifeList'}}
        // {className: 'cms-callMe', title: '联系我们', router: {name: 'login'}}
      ],
      nowIndex: 0
    }
  },
  mounted () {
    /* this.$nextTick(() => {
      // 初始化，保证刷新页面后内容区和导航栏一致
      this.initPage()
    }) */
    // 接收 swiper 组件发射的 index 进行导航按钮切换高亮和更新模版地址
    setTimeout(() => {
      clearTimeout()
      this.$nextTick(() => {
        this._initScroll()
      })
    }, 100)
    this.$root.eventHub.$on('slideTab', this.slideTab)
  },
  methods: {
    /* initPage () {
      this.nowIndex = this.$route.path === '/one' ? 0 : this.$route.path === '/two' ? 1 : this.$route.path === '/three' ? 2 : this.route.path === '/four' ? 3 : this.$route.path === '/five' ? 4 : 0
    }, */
    _initScroll () {
      let navWidth = 64
      let width = (navWidth + 25) * this.navList.length
      this.$refs.navList.style.width = width + 'px'
      if (!this.navScroll) {
        this.navScroll = new BScroll(this.$refs.navWrapper, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      } else {
        this.navScroll.refresh()
      }
    },
    tabClick (index) {
      this.nowIndex = index
      this.$root.eventHub.$emit('tabChange', index)
    },
    slideTab (index) {
      this.nowIndex = index
      // let href = index === 0 ? '/one' : index === 1 ? '/two' : index === 2 ? '/three' : index === 3 ? '/four' : index === 4 ? '/five' : '/one'
      // this.$router.push(href)
      console.log(this.nowIndex)
    },
    offEventHubListener () {
      this.$root.eventHub.$off('slideTab')
    }
  },
  beforeDestroy () {
    this.offEventHubListener()
  }
}
</script>

<style scoped>
  .nav-list{
    width: 100%;
    overflow: hidden;
    white-space: nowrap; /*文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止*/
  }
  .item{
    display: inline-block;
    text-align: center;
    height: 35px;
    line-height: 35px;
    margin: 0 25px
  }
  .active{
    box-sizing: border-box;
    color: #ff7035;
    border-bottom: 2px solid #ff4b02;
  }
  .line{
    width: 100%;
    height: 1px;
    background: #ccc;
  }
</style>
