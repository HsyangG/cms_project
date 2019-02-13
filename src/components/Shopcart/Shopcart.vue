<template>
  <div class="shopcart wrapper" ref="wrapper">
    <div class="content" ref="content">我是购物车</div>
    <bt-menu></bt-menu>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      touchIndex: 0,
      startIndex: 0,
      tranX: 0
    }
  },
  created () {
    this.initScroll()
    this.swipeX()
  },
  methods: {
    initScroll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            scrollX: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    swipeX () {
      this.$nextTick(() => {
        this.$refs.content.addEventListener('touchmove', () => {
          event.preventDefault()
          this.touchIndex = event.changedTouches[0].pageX
          this.startIndex = document.body.clientWidth / 2
          this.tranX = this.touchIndex - this.startIndex
          if (this.tranX < -50) {
            this.$router.push('/me')
          }
          if (this.tranX > 50) {
            this.$router.push('/find')
          }
        })
        // console.log(this.$refs.content)
      })
    }
  }
}
</script>

<style>
.shopcart{
  width: 100%;
  height: 100%;
}
</style>
