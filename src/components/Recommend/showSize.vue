<template>
  <div class="show_size">
    <div class="listContent" v-show="showSizeFlag">
      <div class="good_size_info">
        我是详细信息
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShowSize',
  props: {
    showSizeFlag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.showSizeFlag)
  }
}
</script>
<style scoped>
.listContent{
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5)
}
.good_size_info{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 460px;
  background: #ccc;
}
</style>
