<template>
  <div class="swipe">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'v-swipe',
  data () {
    return {
      ready: false, // 当前组件是否 mounted
      dragging: false, // 当前是否拖动
      userScrolling: false, // 判断当前的用户操作是否是上下滚动，如果是就不执行
      animating: false, // 当前是否在执行动画（也就是自动切换页面）
      index: 0, // 当前所在的 item 的 index
      pages: [], // 存储当前 child 的 dom
      timer: null, // 自动播放的定时器 timerid
      reInitTimer: null, // item 组件触发 reInit 触发定时器 id
      noDrag: false, // 存储是否运行拖动的标识
      isDone: false // 当前动画是否执行完成
    }
  },
  mounted () {
    this.ready = true
    this.initTimer() // 初始化自动播放的 timer
    this.reInitPages() // 初始化 drag 状态，以及 dom 节点的样式信息
    let element = this.$el
    // 为当前组件的 dom 节点注册 touch 时间
    element.addEventListener('touchstart', (event) => {
      if (this.prevent) event.preventDefault()
      if (this.stopPropagation) event.stopPropagation()
      if (this.animating) return false // 如果当前在执行移动动画，直接返回
      this.dragging = true // 设置 dragging 状态标识（正在拖动）
      this.userScrolling = false // 重置滚动标识
      this.doOnTouchStart(event)
    })
    element.addEventListener('touchmove', (event) => {
      if (!this.dragging) return false // 如果当前处于拖动状态，则停止本函数
      if (this.timer) this.clearTimer() // 将当前自动播放停止
      this.doOnTouchMove(event)
    })
    element.addEventListener('touchend', (event) => {
      if (this.userScrolling) {
        // 纵向滚动，重置状态并返回
        this.dragging = false
        this.dragState = {}
        return false
      }
      if (!this.dragging) return false
      this.initTimer() // 触摸结束，启动自动播放定时器
      this.doOnTouchEnd(event)
      this.dragging = false // 重置拖动标识
    })
  },
  methods: {
    swipeItemCreated () {
      if (!this.ready) return false
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitPages()
      }, 100)
    },
    swipeItemDestroyed () {
      if (!this.ready) return false
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitPages()
      }, 100)
    },
    reInitPages () {
      let children = this.$children
      console.log(children)
      // 设置拖动状态
      this.noDrag = children.length === 1 && this.noDragWhenSingle // 当前只有一个 item，并且设置了只有一个不支持拖动
      let pages = []
      let initDefaultIndex = Math.floor(this.defaultIndex)
      let defaultIndex = (initDefaultIndex >= 0 && initDefaultIndex < children.length) ? initDefaultIndex : 0
      this.index = defaultIndex // 设置当前显示的索引值
      // 初始化显示样式，将当前 index 的 item 显示出来，其他的都隐藏
      children.forEach(function (child, index) {
        pages.push(child.$el)
        this.removeClass(child.$el, 'is-active')
        if (index === defaultIndex) {
          this.addClass(child.$el, 'is-active')
        }
      })
      // 设置所有轮播图的 item 的 dom
      this.pages = pages
    },
    doOnTouchStart (event) {
      // 创建 dragState，包括 touch事件的信息，当前 drag item以及它前后两个 item 并将其显示出来
      if (this.noDrag) return false // 如果不支持拖动
      let element = this.$el
      let dragState = this.dragState
      let touch = event.touches[0]
      // 设置 dragstate 的信息（也就是当前滑动的信息数据）
      dragState.startTime = new Date()
      dragState.startLeft = touch.pageX
      dragState.startTop = touch.pageY
      dragState.startTopAbsolute = touch.clientY
      dragState.pageWidth = element.offsetWidth
      dragState.pageHeight = element.offsetHeight
      let prevPage = this.$children[this.index - 1]
      let dragPage = this.$children[this.index]
      let nextPage = this.$children[this.index + 1]
      if (this.continuous && this.pages.length > 1) {
        // 当前支持循环播放，并且 pages 的长度大于1
        if (!prevPage) {
          prevPage = this.$children[this.$children.length - 1]
        }
        if (!nextPage) {
          nextPage = this.$children[0]
        }
        dragState.prevPage = prevPage ? prevPage.$el : null
        dragState.dragPage = dragPage ? dragPage.$el : null
        dragState.nextPage = nextPage ? nextPage.$el : null
        // 将当前 index 下的前后两个 item 显示出来
        if (dragState.prevPage) {
          dragState.prevPage.style.display = 'block'
        }
        if (dragState.next) {
          dragState.nextPage.style.display = 'block'
        }
      }
    },
    doOnTouchMove () {
      if (!this.noDrag) return false
      let dragState = this.dragState
      let touch = event.touches[0]
      dragState.currentLeft = touch.pageX
      dragState.currentTop = touch.pageY
      dragState.currentTopAbsolute = touch.clientY
      // 计算滑动距离
      let offsetLeft = dragState.currentLeft - dragState.startLeft
      let offsetTop = dragState.currentTop - dragState.startTopAbsolute
      let distanceX = Math.abs(offsetLeft)
      let distanceY = Math.abs(offsetTop)
      // 判断是横屏滚动还是竖屏滚动
      if (distanceX < 5 || distanceX >=5 && distanceY >= 1.73 * distanceY) {
        // 当前是竖屏滚动，不允许执行 drag 动作
        this.userScrolling = true
      }
    }
  }
}
</script>

<style>

</style>
