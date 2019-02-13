<template>
  <div class="swipe-item">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'v-swipe-item',
  data () {
    return {}
  },
  mounted () {
    // 页面显示的时候触发
    // 内部实现：调用父组件的 reInit() 业务
    this.$parent && this.$parent.swipeItemCreated(this)
  },
  destroyed () {
    // item 隐藏的时候触发
    this.$parent && this.$parent.swipeItemDestroyed(this) // 内部实现同上
  }
}
</script>

<style>

</style>
