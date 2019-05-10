<template>
  <div class="television_list">
    <div class="list_header">
      <!-- <div class="go_back" @click.prevent.prevent="goBack">
        <svg-icon icon-class="houtui"></svg-icon>
      </div> -->
      <v-header :scanShow="false"></v-header>
    </div>
    <div class="television_wrapper" ref="televisionWrapper">
      <div class="listContent">
        <div class="title">
          <span v-if="title == 'computer'">电脑</span>
          <span v-else-if="title == 'television'">电视</span>
          <span v-else> </span>
        </div>
        <ul>
          <li v-for="item in shopList" :key="item.id"  v-if="item.type == title" @click="toRecommendInfo(item.id)">
            <div class="list_item">
              <div class="item_image">
                <img v-if="item.picture" :src="item.picture" alt="" style="width: 100%;height: 100%">
              </div>
              <div class="item_info">
                <div class="item_info_title">{{item.name}}</div>
                <div class="item_info_description">{{item.description}}</div>
                <div class="item_info_price">&yen;{{item.price}} <span>起</span></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { initScroll } from '@/utils/index'
export default {
  data () {
    return {
      title: '',
      shopList: null
    }
  },
  created () {
    this.title = this.$route.query.type || ''
    this.getShopList()
  },
  mounted () {
    initScroll(this.scroll, this.$refs.televisionWrapper)
  },
  methods: {
    goBack () {
      this.$router.push('/home')
    },
    getShopList () {
      this.$axios.get('/api/get_shops_info')
      .then((response) => {
        if (response.data.code == 0) {
          this.shopList = response.data.data
        } else {
          console.log(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    toRecommendInfo (val) {
      this.$router.push('/recommend/recommend_info?id=' + val)
    }
  }
}
</script>

<style scoped>
.television_wrapper{
  width: 100%;
  height: 560px;
  overflow: hidden;
}
.listContent{
  width: 100%;
  height: 3000px;
}
.list_header{
    position: relative;
  }
  .go_back{
    position: absolute;
    top: 11px;
    left: 10px;
    width: 24px;
    height: 24px;
    font-size: 20px;
    z-index: 100;
  }
  .header{
    background: #fafafa;
  }
.title{
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: 700;
  box-sizing: border-box;
  padding: 0 15px;
  line-height: 50px;
  text-align: left;
}
  .listContent{
    width: 100%;
    height: 3000px;
    overflow: hidden;
  }
.list_item{
  display: flex;
  width: 100%;
  height: 200px;
}
.item_image{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.2);
}
.item_info{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 25px 0 0 15px;
  text-align: left;
}
.item_info_title{
  font-weight: 700;
  word-break: break-all;
}
.item_info_description{
  margin-top: 5px;
  font-size: 12px;
  padding-right: 10px;
}
.item_info_price{
  font-size: 14px;
  /* font-weight: 700; */
  margin-top: 10px;
  color: #eb635b;
}
</style>
