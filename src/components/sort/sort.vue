<template>
  <div class="sort wrapper" ref="wrapper">
    <div class="content" ref="content">
      我是分类
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <bt-menu></bt-menu>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      touchIndex: 0,
      startIndex: 0,
      tranX: 0
    }
  },
  created () {
    this.swipeX()
  },
  methods: {
    swipeX () {
      this.$nextTick(() => {
        this.$refs.content.addEventListener('touchmove', () => {
          event.preventDefault()
          this.touchIndex = event.changedTouches[0].pageX
          this.startIndex = document.body.clientWidth / 2
          this.tranX = this.touchIndex - this.startIndex
          if (this.tranX < -50) {
            this.$router.push('/find')
          }
          if (this.tranX > 50) {
            this.$router.push('/home')
          }
        })
        // console.log(this.$refs.content)
      })
    }
  }
}
</script>

<style>
.sort{
  width: 100%;
  height: 100%;
}
  .fade-enter, .fade-leave-action{
    opacity: 0;
    background: rgba(7, 17, 27, 0)
  }
</style>
