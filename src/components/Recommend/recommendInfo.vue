<template>
  <div class="recommendInfo">
    <div class="listContent">
      <div class="carouselMap">
        <v-carousel></v-carousel>
        <div class="go_back">
          <svg-icon icon-class="go_back_white"></svg-icon>
        </div>
        <div class="more"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
.carouselMap{
  position: relative;
  width: 100%;
  height: 400px;
  background: rgba(0,0,0,0.2);
}
.go_back{
  width: 30px;
  height: 30px;
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
}
</style>
