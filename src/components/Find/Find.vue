<template>
  <div class="find wrapper" ref="wrapper">
    <div class="content" ref="content">我是发现</div>
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
            this.$router.push('/shopcart')
          }
          if (this.tranX > 50) {
            this.$router.push('/sort')
          }
        })
        // console.log(this.$refs.content)
      })
    }
  }
}
</script>

<style>
.find{
  width: 100%;
  height: 100%;
}
</style>
