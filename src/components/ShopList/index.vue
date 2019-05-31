<template>
  <div class="shop_list">
    <div class="goodsListItemStatus" @click="selectOne">
      <svg-icon
        v-if="selectedShop"
        icon-class="selected"
        style="width: 18px;height: 18px;background: #ff6a20;border-radius: 50%;"
      ></svg-icon>
      <div v-else class="selected"></div>
    </div>
    <!-- <slot name="shop_select" :selectedShop="selectedShop"  @click="selectOne"></slot> -->
    <slot name="shop_item" :selectedShop="selectedShop"></slot>
  </div>
</template>
<script>
import { offEventHubListener } from '@/utils/index'
export default {
  data() {
    return {
      selectedShop: false
    };
  },
  mounted () {
    this.$root.eventHub.$on('selectAll', (val) => {
      this.selectedShop = val
      // console.log('hello')
    })
  },
  methods: {
    selectOne () {
      this.selectedShop = !this.selectedShop
      if (this.selectedShop) {
        this.$root.eventHub.$emit('selectCount', this.selectedShop)
      }
    }
  },
  beforeDestroy () {
    offEventHubListener(this, 'selectCount')
  }
};
</script>
<style scoped>
.shop_list {
  position: relative;
  width: 100%;
  height: 90px;
  background: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
}
.goodsListItemStatus{
  position: absolute;
  top: 35px;
  left: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 20px;
}
.goodsListItemStatusActive{
  position: absolute;
  top: 35px;
  left: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 1px solid #fff;
  border-radius: 50%;
  font-size: 20px;
  background:  #ff6b04;
  color: #fff;
}
.selected {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-sizing: border-box;
}
</style>
