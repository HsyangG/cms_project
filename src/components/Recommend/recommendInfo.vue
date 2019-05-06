<template>
  <div class="recommendInfo" ref="recommendInfoWrapper">
    <div class="listContent">
      <div class="carouselMap">
        <v-carousel v-if="carouselList" :carouselList="carouselList" :height="400"></v-carousel>
        <div class="go_back" @click.prevent="goBack">
          <svg-icon icon-class="go_back_white"></svg-icon>
        </div>
        <div class="more">
          <svg-icon icon-class="icon_more"></svg-icon>
        </div>
      </div>
      <div class="header" v-if="shop_info">
        <div class="title">{{shop_info.name}}</div>
        <div class="description">
          <span class="underline" style="color: #ff6a20">{{shop_info.format}} {{shop_info.specification}}</span><span> {{shop_info.description}}
          </span>
        </div>
        <div class="price">
          <span class="new_price">&yen;{{shop_info.price}}</span><span class="old_price" v-show="shop_info.price != shop_info.old_price">&yen;{{shop_info.old_price}}</span><span v-if="shop_info.tag" class="discount">{{shop_info.tag}}</span>
        </div>
      </div>
      <div class="div_split"></div>
      <div class="size_and_address" v-if="shop_info">
        <ul>
          <li class="good_size" @click.prevent="showSizeList">
            <div class="good_size_item">
              <div class="good_selected">已选</div>
              <div class="good_name">{{shop_info.name}} {{shop_info.format}} <span style="font-size: 12px">x</span>1</div>
              <div class="go_ahead"><svg-icon icon-class="qianjin"></svg-icon></div>
            </div>
          </li>
          <li class="good_size">
            <!-- 地址 -->
            <div class="good_size_item">
              <div class="good_selected">送至</div>
              <div class="good_name">深圳市 龙岗区 <span style="color: #ff6a20;">有现货</span></div>
              <div class="go_ahead"><svg-icon icon-class="qianjin"></svg-icon></div>
            </div>
          </li>
          <li class="good_size">
            <!-- 退货标志 -->
            <div class="good_size_item" style="border: none;">
              <div class="good_selected"></div>
              <div class="good_name" style="font-weight: 500;color: #9c9c9c;"><svg-icon icon-class="icon_selected"></svg-icon> 支持7天无理由退货</div>
              <div class="go_ahead"></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="div_split"></div>
      <div class="evaluation">
        <div class="evaluation_header">
          <div class="user_evaluation_count">用户评价(16933)</div>
          <div class="satisfaction"><span>92.9%</span>满意</div>
          <div class="go_ahead" style="line-height: 39px;"><svg-icon icon-class="qianjin"></svg-icon></div>
        </div>
        <div class="evaluation_body">
          <div class="evaluation_content">
            <div class="evaluation_content_header">
              <img src="./../../assets/img/avatar_default.png">
              <div style="display: inline-block;">渣渣辉</div>
            </div>
            <div class="evaluation_info">
              第一批预购的幸运者，东西先用了一段时间，现在才来评论，超级满意的，真好~
            </div>
            <div class="evaluation_image"></div>
          </div>
          <div class="others_like">
            <div class="others_like_info">
              <svg-icon icon-class="like_b_default"></svg-icon>
              <span style="font-size: 12px;"> 1,006</span>
            </div>
          </div>
        </div>
        <div class="div_split"></div>
      </div>
    </div>
    <v-show-size :showSizeFlag="showSizeFlag"></v-show-size>
    <div class="footer">
      <div class="footer_menu">
        <div class="favorite">
          <div><svg-icon icon-class="favorite_default"></svg-icon></div>
          <div style="font-size: 12px">喜欢</div>
        </div>
        <div class="shopcart" @click="toShopCart">
          <div><svg-icon icon-class="icon_shopcart"></svg-icon></div>
          <div style="font-size: 12px">购物车</div>
        </div>
        <div class="add_to_shopcart">
          <button :class="{'unused': login_status == 0}" @click="addShop">加入购物车</button>
        </div>
      </div>
      <div class="shop_count" v-if="count > 0">{{count}}</div>
    </div>
    <div class="tips_container">
      <div class="login_tips" v-if="showTips">{{addTips}}</div>
    </div>
  </div>
</template>
<script>
import { initScroll } from '@/utils/index'
import ShowSize from '@/components/Recommend/showSize'
import { setTimeout, clearInterval } from 'timers'
import qs from 'qs'
export default {
  components: {
    'v-show-size': ShowSize
  },
  data () {
    return {
      showSizeFlag: true,
      listQuery: {
        shop_id: '',
        phone: ''
      },
      shop_info: null,
      carouselList: null,
      shop_picture: null,
      login_status: '',
      showTips: false,
      timer: null,
      count: 0,
      shop_count: 0, // 数据回显
      addTips: '您还未登录',
      shopcart_info: null,
      form: {
        phone: '',
        shop_id: '',
        shop_count: '',
        total_price: ''
      }
    }
  },
  // watch: {
  //   showSizeFlag (newVal, oldVal) {
  //     console.log(newVal)
  //   }
  // },
  created () {
    this.listQuery.shop_id = this.$route.query.id || ''
    this.login_status = localStorage.login_status
    this.listQuery.phone = localStorage.phone
    this.getShopInfo()
    this.getShopPicture()
    this.getShopcartInfo()
    // console.log(localStorage)
  },
  mounted () {
    initScroll(this.scroll, this.$refs.recommendInfoWrapper)
  },
  methods: {
    getShopInfo () {
      this.$axios.get('/api/get_shops_info', {
        params: {
          id: this.listQuery.shop_id
        }
      })
      .then((response) => {
        if (response.data.code == 0) {
          this.shop_info = response.data.data[0]
          // console.log(this.shop_info)
        } else {
          console.log(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    getShopPicture () {
      this.$axios.get('/api/get_shop_picture', {
        params: {
          id: this.listQuery.shop_id
        }
      })
      .then((response) => {
        if (response.data.code == 0) {
          this.carouselList = response.data.data
        } else {
          console.log(response.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    getShopcartInfo () {
      this.$axios.get('/api/get_shopcart_shop', {
        params: this.listQuery
      })
      .then((response) => {
        if (response.data.code == 0) {
          this.shopcart_info = response.data.data[0]
          this.count = this.shopcart_info.shop_count
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    resetForm () {
      this.form = {
        phone: '',
        shop_id: '',
        shop_count: '',
        total_price: ''
      }
    },
    goBack () {
      this.$router.push('/home')
    },
    showSizeList () {
      this.showSizeFlag = true
    },
    toShopCart () {
      this.resetForm()
      if (!this.shopcart_info) {
        this.form.phone = localStorage.phone
      } else {
        this.form.phone = this.shopcart_info.phone
      }
      this.form.shop_id = this.listQuery.shop_id
      this.form.shop_count = this.count
      this.form.total_price = this.count * this.shop_info.price
      if (localStorage.login_status == 1) {
        if (this.count == 0) {
          this.$router.push('/shopcart')
          return true
        }
        this.$axios.post('/api/update_shopcart', qs.stringify(this.form))
        .then((response) => {
          if (response.data.code == 0) {
            this.$router.push('/shopcart')
          } else {
            console.log(response.data.msg)
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.$router.push('/callme/logp')
      }
    },
    addShop () {
      if (this.login_status == 0) {
        this.addTips = '您还未登录'
        this.showTips = true
        this.timer = setTimeout(() => {
          this.showTips = false
          clearInterval(this.timer)
        }, 1000)
      } else {
        if (this.count >= 5) {
          this.addTips = '已经达到最大数量了哦'
          this.showTips = true
          this.timer = setTimeout(() => {
            this.showTips = false
            clearInterval(this.timer)
          }, 1000)
          return false
        }
        this.count ++
      }
    }
  }
}
</script>
<style scoped>
.recommendInfo{
  width: 100%;
  height: 560px;
}
.listContent{
  width: 100%;
  height: 2000px;
}
.carouselMap{
  position: relative;
  width: 100%;
  height: 400px;
  background: rgba(0,0,0,0.2);
}
.go_back{
  position: absolute;
  top: 10px;
  left: 10px;
  width: 28px;
  height: 28px;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  line-height: 28px;
  text-align: center;
  font-size: 18px;
}
.more{
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
}
.header{
  width: 100%;
  height: 142px;
  box-sizing: border-box;
  padding: 15px;
  text-align: left;
}
.title{
  font-size: 18px;
  font-weight: 700;
}
.description{
  margin-top: 5px;
  font-size: 12px;
  color: 9c9c9c;
}
.price{
  width: 100%;
  height: 20px;
  margin-top: 15px;
}
.new_price{
  font-size: 18px;
  color: #ff6a20;
  margin-right: 5px;
}
.old_price{
  font-size: 12px;
  color: #9c9c9c;
  text-decoration: line-through;
  margin-right: 7px;
}
.discount{
  display: inline-block;
  width: 65px;
  height: 18px;
  text-align: center;
  border-radius: 2px;
  background: #ff6a20;
  font-size: 12px;
  color: #fff;
}

.div_split{
  width: 100%;
  height: 10px;
  background: #eee;
}
.size_and_address{
  width: 100%;
  height: 120px;
}
.good_size{
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 0 15px;
  font-size: 12px;
}
.good_size_item{
  display: flex;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #eaeaea;
  line-height: 42px;
  text-align: left;
}
.good_selected{
  width: 50px;
  color: #9c9c9c;
}
.good_name{
  width: 100%;
  font-weight: 700;
}
.go_ahead{
  width: 40px;
  text-align: right;
  font-size: 16px;
  line-height: 42px;
}
.footer{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0 -0.1px 0.1px 0.1px #a1a1a1;
}
.footer_menu{
  display: flex;
  width: 100%;
  height: 100%;
}
.favorite{
  width: 30.5%;
  font-size: 20px;
  box-sizing: border-box;
  border-right: 1px solid #eaeaea;
  padding-top: 5px;
}
.shopcart{
  width: 30%;
  font-size: 20px;
  box-sizing: border-box;
  padding-top: 5px;
}
.add_to_shopcart{
  width: 100%;
  height: 100%;
}
.add_to_shopcart button{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  background: #ff6a20;
  color: #fff;
}
.evaluation_header{
  display: flex;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
  padding: 0 15px;
}
.user_evaluation_count{
  width: 100%;
  height: 100%;
  color: #9c9c9c;
  font-size: 12px;
  line-height: 39px;
  text-align: left;
}
.satisfaction{
  width: 90px;
  height: 100%;
  font-size: 12px;
  color: #9c9c9c;
  text-align: right;
  line-height: 39px;
}
.evaluation_body{
  display: flex;
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  padding: 0 15px;
  /* background: rgba(0,0,0,0.2); */
}
.evaluation_content{
  width: 100%;
  height: 100%;
}
.evaluation_content_header{
  width: 100%;
  height: 54px;
  /* line-height: 54px; */
  position: relative;
  text-align: left;
}
.evaluation_content_header img{
  position: absolute;
  top: 12px;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.evaluation_content_header div{
  height: 54px;
  line-height: 54px;
  font-size: 14px;
  padding-left: 45px;
}
.evaluation_info{
  text-align: left;
  font-size: 12px;
}
.others_like{
  width: 60%;
  height: 100%;
}
.others_like_info{
  width: 100%;
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  text-align: right;
}
.shop_count{
  position: absolute;
  top: 2px;
  left: 110px;
  padding: 2px 5px;
  background: #ff6a20;
  font-size: 10px;
  border-radius: 50%;
  color: #fff;
}
.unused{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  background: #ccc !important;
  color: #fff;
}
.tips_container{
  position: absolute;
  top: 300px;
  left: 0;
  width: 100%;
  /* background: #eee; */
}
.login_tips{
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  background: rgba(0,0,0,0.5);
  color: rgba(255,255,255,0.9);
}
</style>
