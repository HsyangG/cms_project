<template>
  <div class="submenu">
    <ul>
      <li v-for="(item, index) in submitItemList" :class="item.class" ref="submitList" :key="index">
        <div v-if="submenuType == 1" class="submenu-item" @click.prevent="toList(index)">
          <img :src="item.imgUrl" alt="" style="margin-top: 5px">
          <p style="margin-top: 3px">{{ item.text }}</p>
        </div>
        <div v-if="submenuType == 2" class="submenu-item" @click.prevent="toListWithoutCarousel(index)">
          <img :src="item.imgUrl" alt="" style="margin-top: 5px">
          <p style="margin-top: 3px">{{ item.text }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    submitItemList: {
      type: Array,
      default: function () {
        return [
          {
            imgUrl: 'http://localhost:3000/public/img/shop/crown.png',
            text: '新品发布',
            class: 'submitList'
          },
          {
            imgUrl: 'http://localhost:3000/public/img/shop/bell.png',
            text: '每日臻选',
            class: 'submitList'
          },
          {
            imgUrl: 'http://localhost:3000/public/img/shop/monitor.png',
            text: '电视热卖',
            class: 'submitList'
          },
          {
            imgUrl: 'http://localhost:3000/public/img/shop/donut.png',
            text: '礼品卡',
            class: 'submitList'
          },
          {
            imgUrl: 'http://localhost:3000/public/img/shop/ad.png',
            text: '超值特卖',
            class: 'submitList'
          }
        ]
      }
    },
    submenuType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {}
  },
  methods: {
    toList (index) {
      this.$router.push('/recommend/recommend_list?id=' + index)
    },
    toListWithoutCarousel (index) {
      this.$router.push('/views/television/list?id=' + index)
    }
  }
}
</script>

<style>
  .submenu ul {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 20px 10px;
    /*line-height: 64px;*/
    text-align: center;
  }
  .submitList{
    display: inline-block;
    /*float: left;*/
  }
  .submenu li div{
    width: 64px;
    height: 64px;
    font-size: 12px;
    text-align: center;
    /*line-height: 64px;*/
  }
  .submenu li div img{
    display: inline-block; /*将图片变成行内块级元素，可以实现图片居中*/
    width: 36px;
    height: 36px;
  }
</style>
