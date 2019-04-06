<template>
  <div class="wait_receipt" ref="waitReceiptWrapper">
    <div class="container">
      <div class="listContent">
        <ul>
          <li class="goods_list" v-for="(item, index) in list" :key="index">
            <div class="goods_list_item">
              <div class="item_header">
                <div class="item_header_time">{{ item.created_at }}</div>
                <div class="item_header_status">{{ item.status }}</div>
              </div>
              <div class="item_content">
                <ul>
                  <li class="order_list" v-for="elem in item.shop_list" :key="elem.index">
                    <div class="order_list_item">
                      <div class="order_list_item_image">
                        <img :src="elem.image" alt="">
                      </div>
                      <div class="order_list_item_title">
                        <p style="font-size: 14px;font-weight: 700;">{{ elem.name }}</p>
                        <p style="font-size: 12px;color: #a1a1a1;margin-top: 5px;">{{ elem.color }}</p>
                      </div>
                      <div class="order_list_item_price">
                        <p>&yen;{{ elem.price }}</p>
                        <p style="margin-top: 5px;"><span style="font-size: 10px;color: #a1a1a1;">x</span>{{ elem.count }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="item_footer">
                <div class="item_footer_info">
                  <span>共{{ item.total }}件商品 合计:</span><span style="font-size: 16px;color: #9c9c9c">&nbsp;&nbsp;&yen;152.90</span>
                </div>
                <div class="item_footer_button">
                  <button>查看物流</button><button style="border: 1px solid #ff6a20;color: #ff6a20;">评价晒单</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { initScroll } from '@/utils/index'
export default {
  data () {
    return {
      list: [
        {
          created_at: '2019-04-05 19:24:25',
          status: '0', // 0 未出库 1 已出库 2 未收货  3 已收货 4 已取消
          shop_list: [
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: 'Free Tie 真皮板鞋 米家定制男款',
              price: '129.00',
              color: '黑色 44',
              count: 1
            },
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: '8H凉感眼罩',
              price: '23.90',
              color: '混灰色',
              count: 1
            },
          ],
          total: 2,
          total_price: 152.90
        },
         {
          created_at: '2019-04-05 19:24:25',
          status: '1', // 0 未出库 1 已出库 2 未收货  3 已收货 4 已取消
          shop_list: [
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: 'Free Tie 真皮板鞋 米家定制男款',
              price: '129.00',
              color: '黑色 44',
              count: 1
            },
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: '8H凉感眼罩',
              price: '23.90',
              color: '混灰色',
              count: 1
            },
          ],
          total: 2,
          total_price: 152.90
        },
         {
          created_at: '2019-04-05 19:24:25',
          status: '2', // 0 未出库 1 已出库 2 未收货  3 已收货 4 已取消
          shop_list: [
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: 'Free Tie 真皮板鞋 米家定制男款',
              price: '129.00',
              color: '黑色 44',
              count: 1
            },
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: '8H凉感眼罩',
              price: '23.90',
              color: '混灰色',
              count: 1
            },
          ],
          total: 2,
          total_price: 152.90
        },
         {
          created_at: '2019-04-05 19:24:25',
          status: '3', // 0 未出库 1 已出库 2 未收货  3 已收货 4 已取消
          shop_list: [
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: 'Free Tie 真皮板鞋 米家定制男款',
              price: '129.00',
              color: '黑色 44',
              count: 1
            },
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: '8H凉感眼罩',
              price: '23.90',
              color: '混灰色',
              count: 1
            },
          ],
          total: 2,
          total_price: 152.90
        },
         {
          created_at: '2019-04-05 19:24:25',
          status: '4', // 0 未出库 1 已出库 2 未收货  3 已收货 4 已取消 5 待评价
          shop_list: [
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: 'Free Tie 真皮板鞋 米家定制男款',
              price: '129.00',
              color: '黑色 44',
              count: 1
            },
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: '8H凉感眼罩',
              price: '23.90',
              color: '混灰色',
              count: 1
            },
          ],
          total: 2,
          total_price: 152.90
        },
        {
          created_at: '2019-04-05 19:24:25',
          status: '4', // 0 未出库 1 已出库 2 未收货  3 已收货 4 已取消 5 待评价
          shop_list: [
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: 'Free Tie 真皮板鞋 米家定制男款',
              price: '129.00',
              color: '黑色 44',
              count: 1
            },
            {
              image: 'http://localhost:3000/public/img/nut/sanzhisongshuSVG-8.png',
              name: '8H凉感眼罩',
              price: '23.90',
              color: '混灰色',
              count: 1
            },
          ],
          total: 2,
          total_price: 152.90
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      initScroll(this.scroll, this.$refs.waitReceiptWrapper)
    })
  }
}
</script>
<style scoped>
.wait_receipt{
  width: 100%;
  height: 560px;
  overflow: hidden;
}
.listContent{
  width: 100%;
  height: 3000px;
  overflow: hidden;
  background: #fafafa;
}
.goods_list{
  margin-top: 10px;
  background: #fff;
}
.item_header{
  display: flex;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  line-height: 39px;
  border-bottom: 1px solid #ccc;
  padding: 0 15px;
}
.item_header_time{
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 10px;
  color: #a1a1a1;
}
.item_header_status{
  width: 100%;
  height: 100%;
  text-align: right;
  color: #ff6a20;
}
.item_content ul{
  /* padding-left: 15px; */
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
.order_list{
  padding-left: 15px;
  box-sizing: border-box;
}
.order_list_item{
  position: relative;
  display: flex;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
.order_list:last-child .order_list_item{
  border: none;
}
.order_list_item_image{
  width: 60px;
  box-sizing: border-box;
  padding: 28px 0;
}
.order_list_item_image img{
  width: 100%;
  height: 100%;
}
.order_list_item_title{
  width: 100%;
  padding: 28px 0;
  text-align: left;
  box-sizing: border-box;
   padding-left: 10px;
}
.order_list_item_price{
  width: 70px;
  text-align: right;
  font-size: 14px;
  padding: 30px 15px 28px 0;
  color: #a1a1a1;
}
.item_footer_info{
  width: 100%;
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  text-align: right;
  box-sizing: border-box;
  padding: 0 15px;
}
.item_footer_button{
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 10px 15px;
  text-align: right;
}
.item_footer_button button{
  width: 80px;
  height: 36px;
  margin: 0;
  padding: 0;
  outline: none;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  color: #9c9c9c;
  font-size: 12px;
}
</style>
