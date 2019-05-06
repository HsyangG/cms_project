<template>
  <div class="cartcontrol">
    <div class="goodsListItemCount" v-if="good">
      <div :disabled="is_disabled" style="border-right: 1px solid #ccc;" @click="onLess">
        <svg-icon icon-class="jian" />
      </div>
      <div style="font-size: 14px;">{{good.shop_count}}</div>
      <div :disabled="is_disabled" style="border-left: 1px solid #ccc;" @click="onAdd">
        <svg-icon icon-class="tianjia" />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    good: {
      type: Object
    }
  },
  data () {
    return {
      is_disabled: false
    }
  },
  created () {
    // console.log(this.good)
  },
  methods: {
    onLess () {
      if (this.good.shop_count && this.good.shop_count > 0) {
        this.is_disabled = false
        this.good.shop_count --
        this.$root.eventHub.$emit('lessShop', {
          id: this.good.id,
          shop_count: this.good.shop_count,
          total_price: this.good.shop_count*this.good.price
        })
      } else {
        this.is_disabled = true
      }
    },
    onAdd () {
      // if (!this.good.shop_count) {
      //   Vue.set(this.good.shop_count, 'shop_count', 1)
      // } else {

      // }
      if (this.good.shop_count < 5) {
        this.is_disabled = false
        this.good.shop_count ++
        this.$root.eventHub.$emit('addShop', {
          id: this.good.id,
          shop_count: this.good.shop_count,
          total_price: this.good.shop_count*this.good.price
        })
      } else {
        this.is_disabled = true
      }
      // 提交addGood事件给父组件，target是要传递的参数
      // this.$emit('addGood', event.target)
    },
    offEventHubListener () {
      this.$root.eventHub.$off('lessShop')
      this.$root.eventHub.$off('addShop')
    }
  },
  beforeDestroy () {
    /**
     * 在目标组件销毁之前需要解绑事件监听
     * 否则会触发多次
     * 因为组件销毁时 this.$root.eventHub 不会销毁
     * 所有的监听事件会叠加
     */
    this.offEventHubListener()
  }
}
</script>
<style scoped>
.goodsListItemCount{
  display: flex;
  position: absolute;
  right:15px;
  bottom: 15px;
  width: 69px;
  height: 23px;
  font-size: 16px;
  /*background: rgba(0,0,0,0.5);*/
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.goodsListItemCount div{
  width: 100%;
  height: 21px;
  line-height: 21px;
  text-align: center;
}
</style>

