<template>
  <div class="shopcart">
    <div class="headTitle">购物车</div>
    <div class="content" ref="content">
      <div class="toLogin" v-if="login_status == 0" @click="toLogin">
        <div class="toLoginTips">登录后享受更多优惠</div>
        <div class="toLoginText">
          <div>
            <span>去登录</span>
            <img
              src="@/assets/svg/gengduo.svg"
              style="display: inline-block;width: 12px;margin: 0 0 0 5px"
            >
          </div>
        </div>
      </div>
      <!-- 这里用 v-if 会报错，用 v-show 则不会 -->

      <div v-show="login_status == 1" class="listContent" ref="listContentWrapper">
        <div class="goodsList">
          <!-- <div class="goodsListItem" v-for="item in selected" :key="item.id">
            <div class="goodsListItemStatus" @click="selectOne(item)">
              <svg-icon
                v-if="item.selected == 1"
                icon-class="selected"
                style="width: 18px;height: 18px;background: #ff6a20;border-radius: 50%;"
              ></svg-icon>
              <div v-else class="selected"></div>
            </div>
            <div class="goodsListItemInfo">
              <div class="goodsListItemImage">
                <img
                  v-if="item.picture"
                  :src="item.picture"
                  alt=""
                  style="width: 100%;height: 100%;"
                >
              </div>
              <div class="goodsListItemInfoComtent">
                <div class="goodsListItemInfoTitle">{{item.name}}</div>
                <div class="goodsListItemInfoDescription">{{item.format}}</div>
                <div class="goodsListItemInfoPrice">
                  <span class="newPrice">&yen;{{item.price}}</span>
                  <span class="oldPrice" v-if="item.price != item.old_price">&yen;{{item.old_price}}</span>
                </div>
              </div>
            </div> -->
            <!-- 负责维护购物车商品数量的购车控制组件 -->
            <!-- <v-cartcontrol :good="item"></v-cartcontrol>
          </div> -->
          <ShopList v-for="item in selected" :key="item.id">
            <template v-slot:shop_item>
              <div class="goodsListItemInfo">
                <div class="goodsListItemImage">
                  <img
                    v-if="item.picture"
                    :src="item.picture"
                    alt=""
                    style="width: 100%;height: 100%;"
                  >
                </div>
                <div class="goodsListItemInfoComtent">
                  <div class="goodsListItemInfoTitle">{{item.name}}</div>
                  <div class="goodsListItemInfoDescription">{{item.format}}</div>
                  <div class="goodsListItemInfoPrice">
                    <span class="newPrice">&yen;{{item.price}}</span>
                    <span class="oldPrice" v-if="item.price != item.old_price">&yen;{{item.old_price}}</span>
                  </div>
                </div>
              </div>
              <v-cartcontrol :good="item"></v-cartcontrol>
            </template>
          </ShopList>
          <div v-if="!shopList" class="no_data">
            <img
              src="@/assets/placeholder.png"
              alt=""
              style="display: inline-block;width: 60%;height: 60%"
            >
            <p class="no_data_tips">购物车里什么都没有！</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-show="login_status == 1">
      <div class="settlement">
        <div class="settlement_left">
          <div class="settlementSelect" @click="handleSelectAll">
            <div v-if="!selectedAll" class="selected"></div>
            <svg-icon v-if="selectedAll" icon-class="selected" style="width: 18px;height: 18px;background: #ff6a20;border-radius: 50%;"></svg-icon>
            <p style="font-size: 14px;margin-left: 5px;">全选</p>
          </div>

          <div class="settlementCount">
            <div class="settlementCountText">合计:</div>
            <div class="settlementCountPrice">&yen; {{total_price}}</div>
          </div>
        </div>
        <div class="settlement_right_selected" @click="toSettlement" v-if="shop_count > 0">
          <span>结算</span>
          <span>({{shop_count}})</span>
        </div>
        <div class="settlement_right" v-else>
          <span>结算</span>
          <span>(0)</span>
        </div>
      </div>
    </div>
    <bt-menu></bt-menu>
  </div>
</template>

<script type="text/ecmascript-6">
import { initScroll } from "../../utils";
import Cartchntrol from "./../cartcontrol/index";
import ShopList from "@/components/ShopList/index";
import qs from "qs";
import { setTimeout, clearTimeout } from "timers";
import { offEventHubListener } from '@/utils/index'

export default {
  components: {
    "v-cartcontrol": Cartchntrol,
    ShopList
  },
  data() {
    return {
      login_status: 0,
      shopList: null,
      count: 0,
      // shop_count: 0,
      less_item: 0,
      add_item: 0,
      selectCount: 0,
      // total_price: 0,
      selectedAll: false,
      currentIndex: 0,
      form: {
        phone: "",
        shop_id: "",
        shop_count: 0,
        total_price: 0.0,
        selected: ""
      },
      selected: "",
      form_update_shopcart: {
        // 用于保存shopList数组，传到服务器
        shopList: null
      },
      success_code: "" // 保存更新购物车的成功状态码
    };
  },
  computed: {
    total_price: {
      get: function() {
        let total = 0;
        if (this.shopList) {
          for (let i = 0; i < this.shopList.length; i++) {
            total = total + this.shopList[i].total_price;
          }
        }
        return total;
      },
      set: function() {}
    },
    shop_count: {
      get: function() {
        let count = 0;
        if (this.shopList) {
          for (let i = 0; i < this.shopList.length; i++) {
            count = count + this.shopList[i].shop_count;
          }
        }
        return count;
      },
      set: function() {}
    }
  },
  mounted() {
    this.login_status = localStorage.login_status;
    if (this.login_status == 1) {
      initScroll(this.scroll, this.$refs.listContentWrapper);
      this.getShopList();
    }
    // console.log(good)
    this.$root.eventHub.$on("addShop", this.onAdd);
    this.$root.eventHub.$on("lessShop", this.onLess);
    this.$root.eventHub.$on('selectCount', (val) => {
      this.selectCount ++
      console.log(this.selectCount)
    })
  },
  methods: {
    getShopList() {
      this.$axios
        .get("/api/get_shopcart_shop")
        .then(response => {
          if (response.data.code == 0) {
            this.shopList = response.data.data;
            this.selected = response.data.data;
            for (let i = 0; i < this.shopList.length; i++) {
              this.total_price =
                this.total_price + this.shopList[i].total_price;
              this.shopList[i].phone = localStorage.phone;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm() {
      this.form = {
        phone: "",
        shop_id: "",
        shop_count: "",
        total_price: "",
        selected: ""
      };
    },
    toLogin() {
      this.$router.push("/callme/logp");
    },
    onLess(data) {
      // 当修改购物车数据的时候同时修改shopList的内容以保持同步
      // console.log(data)
      this.less_item = data;
      // this.total_price = this.less_item.total_price
      for (let i = 0; i < this.shopList.length; i++) {
        if (this.less_item.id == this.shopList[i].id) {
          this.shopList[i].total_price = this.less_item.total_price;
          this.shopList[i].shop_count = this.less_item.shop_count;
        }
      }
      console.log(this.shopList);
    },
    onAdd(data) {
      // console.log(data)
      this.add_item = data;
      // this.total_price = this.add_item.total_price
      for (let i = 0; i < this.shopList.length; i++) {
        if (this.add_item.id == this.shopList[i].id) {
          this.shopList[i].total_price = this.add_item.total_price;
          this.shopList[i].shop_count = this.add_item.shop_count;
        }
      }
      console.log(this.shopList);
    },
    selectOne(row) {
      console.log(row);
      this.currentIndex = row.id;
      // this.selectedOne = true
      for (let i = 0; i < this.selected.length; i++) {
        let item = this.selected[i];
        if (!item.selected || item.selected == "" || item.selected == 0) {
          this.selected[i].selected == 1;
          console.log("1");
        } else if (item.selected == 1) {
          this.selected[i].selected == 0;
          console.log("0");
        }
      }
    },
    handleSelectAll() {
      this.selectedAll = !this.selectedAll;
      this.$root.eventHub.$emit('selectAll', this.selectedAll)
    },
    toSettlement() {
      this.updateShopCart();
      // success_code == 0，则更新成功，跳转到支付页面
      if (this.success_code == 0) {
        // 这里延迟200ms再请求跳转到支付页面，目的是为了
        // 为了等数据库更新完毕再拉取新的数据
        // 200ms的延迟用户是几乎没有感觉的，提高用户体验
        setTimeout(() => {
          this.$router.push("/shopcart/settlement?phone=" + localStorage.phone);
          clearTimeout;
        }, 300);
      }
    },
    /**
     * 因为axios的qs.stringify直接将数组序列化后，在后端接收的数据会出现问题
     * 所以要将需要传递的数组保存到一个对象中，在保存之前先将数组转换成字符串
     * 后端通过JSON.parse再将序列化后的数组转换成对象，就能获取到正确的数据了
     */
    updateShopCart() {
      let shopData = JSON.stringify(this.shopList);
      this.form_update_shopcart.shopList = shopData;
      // console.log(shopData)
      this.$axios
        .post("/api/leave_and_update", qs.stringify(this.form_update_shopcart))
        .then(response => {
          if (response.data.code == 0) {
            // console.log(response.data.data)
            this.success_code = response.data.code;
          } else {
            console.log(response.data.msg);
            this.success_code = response.data.code;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  beforeDestroy() {
    // 当用户离开购物车时，更新一次购物车信息
    this.updateShopCart();
    offEventHubListener(this, 'selectAll')
  }
};
</script>

<style scoped>
.shopcart {
  width: 100%;
  height: 560px;
  overflow: hidden;
}
.listContent {
  position: relative;
  width: 100%;
  height: 560px;
  overflow: hidden;
}
.headTitle {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #fafafa;
  color: #000;
}
.toLogin {
  display: flex;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  font-size: 12px;
}
.toLoginTips {
  width: 100%;
  padding: 0 15px;
  text-align: left;
  line-height: 40px;
}
.toLoginText {
  width: 100%;
  text-align: right;
}
.toLoginText div {
  display: inline-block;
  height: 14px;
  padding: 13px 10px;
  font-size: 12px;
}
.goodsList {
  width: 100%;
  height: 3000px;
}
.goodsListItem {
  position: relative;
  width: 100%;
  height: 90px;
  background: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
}
.goodsListItemStatus {
  position: absolute;
  top: 35px;
  left: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 20px;
}
.goodsListItemStatusActive {
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
  background: #ff6b04;
  color: #fff;
}
.goodsListItemInfo {
  position: absolute;
  top: 10px;
  left: 40px;
  width: 90%;
  height: 70px;
  box-sizing: border-box;
  text-align: left;
}
.goodsListItemImage {
  position: absolute;
  top: 5px;
  left: 0;
  display: inline-block;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
}
.goodsListItemInfoComtent {
  position: absolute;
  top: 0;
  left: 60px;
  display: inline-block;
  width: 70%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px 10px;
}
.goodsListItemInfoTitle {
  font-size: 14px;
}
.goodsListItemInfoDescription {
  font-size: 12px;
  margin-top: 3px;
  color: #919191;
}
.goodsListItemInfoPrice {
  font-size: 12px;
  margin-top: 3px;
}
.newPrice {
  color: #ff6b04;
}
.oldPrice {
  font-size: 10px;
  text-decoration: line-through;
  margin-left: 5px;
  color: #a1a1a1;
}
.goodsListItemCount {
  display: flex;
  position: absolute;
  right: 15px;
  bottom: 15px;
  width: 69px;
  height: 23px;
  font-size: 16px;
  /*background: rgba(0,0,0,0.5);*/
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.goodsListItemCount div {
  width: 100%;
  height: 21px;
  line-height: 21px;
  text-align: center;
}
.settlement {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 47px;
  width: 100%;
  height: 54px;
  box-sizing: border-box;
}
.settlement_left {
  width: 140%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.settlementSelect {
  display: flex;
  position: absolute;
  top: 17px;
  left: 10px;
  width: 60px;
  height: 20px;
  box-sizing: border-box;
  font-size: 20px;
  text-align: left;
  line-height: 18px;
}
.settlementCount {
  text-align: right;
  /* text-align: left; */
  font-size: 14px;
  padding: 7px 20px 7px 0;
}
.settlementCount div {
  display: inline-block;
}
.settlementCountPrice {
  margin-left: 5px;
  color: #ff6b04;
}
.settlement_right {
  width: 60%;
  height: 100%;
  background: #ccc;
  line-height: 54px;
  text-align: center;
  color: #fff;
}
.settlement_right_selected {
  width: 60%;
  height: 100%;
  background: #ff6b04;
  line-height: 54px;
  text-align: center;
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
.checkedbox {
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 50%;
  -webkit-appearance: none;
  outline: none;
}
.no_data {
  width: 100%;
  padding-top: 100px;
}
.no_data_tips {
  margin-top: 30px;
  color: #9c9c9c;
}
</style>
