<template>
  <transition name="move">
    <div class="search">
      <div class="header">
        <div class="header_content">
          <div class="go_back" @click="goBack">
            <div class="back_logo">
              <svg-icon icon-class="houtui"></svg-icon>
            </div>
          </div>
          <div class="search_content">
            <input class="input_style" type="search" v-model="inputPlaceholder" ref="input">
          </div>
          <div class="search_text" @click="sendToSearch">
            <div>搜索</div>
          </div>
        </div>
      </div>
      <div class="searchBody">
        <div class="recommendationSearch">
          <p>搜索结果</p>
          <!-- <img src="./../../assets/img/tuijiansousuo.jpg" alt="..."> -->
          <div class="rcdContent" ref="redContent" v-if="searchResult" v-for="item in searchResult" :key="item.id">
            <div>{{item.name}}</div>
          </div>
          <div v-if="!searchResult" style="padding-bottom: 15px;color: #ccc;background: #fff;">{{err_message}}</div>
        </div>
        <div class="split"></div>
        <div class="searchRecord">
          <p>搜索记录</p>
          <div class="line"></div>
          <div class="hsyWrapper" ref="hsyWrapper">
            <ul class="hsyList">
              <li class="historyList" v-for="item in history" :key="item.index">
                <div class="time">
                  <i class="icon-shijian"></i>
                </div>
                <div class="hsyContent" @showSearch="showHistory">{{item}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      scanShow: false,
      searchShow: true,
      delBtn: false,
      magShow: false,
      linkTo: '/home',
      review: false,
      redContent: '净水滤芯免费领',
      history: [],
      showHty: false,
      searchResult: null,
      inputList: [],
      inputPlaceholder: '点读派',
      err_message: '暂无商品信息'
    }
  },
  mounted () {
    // this.$root.eventHub.$on('showSearch', this.showHistory)
    // this.$root.eventHub.$on('on_search', this.getSearchResult)
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    showHistory (data) {
      let history = data
      if (history.length !== 0) {
        this.showHty = true
      }
      this.history = history
      return this.history
    },
    initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.hsyWrapper, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    sendToSearch () {
      // this.inputPlaceholder = []
      let input = this.inputList
      input.push((this.inputPlaceholder).replace(/\s+/g, '')) // 去除输入字符串的空格
      // let _input = this.removeDuplicates(input) // 去除重复的输入内容
      // this.$root.eventHub.$emit('showSearch', _input)
      this.history = input
      this.$axios.get('/api/shops/search', {
        params: {
          // 把首尾的空格去掉
          search: this.inputPlaceholder.replace(/\s+/g, '')
        }
      }, {
        headers: {
          'Content-Type':'application/json;charset=UTF-8'
        }
      })
      .then((response) => {
        if (response.data.code == 0) {
          this.searchResult = response.data.data
        } else {
          console.log(response.data.msg)
          this.searchResult = null
          this.err_message = response.data.msg
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    // unique (arr) {
    //   // 如果从头部传入的值在数组中已存在，则删除这个相同的值
    //   let hash = []
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr.indexOf(arr[i]) === i) {
    //       hash.push(arr[i])
    //     }
    //   }
    //   return hash
    // },
    // removeDuplicates (arr) {
    //   let history = this.unique(arr) // 如果从头部传入的值在数组中已存在，则删除这个相同的值
    //   for (let i = 0; i < history.length; i++) {
    //     let hist = history[i]
    //     if (hist === '') {
    //       history.splice(i, 1) // 如果传入空串，则不显示搜索记录，并删除空串
    //     }
    //   }
    //   return history
    // },
  }
}
</script>

<style>
  .search{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    background: #fafafa;
    transition: all 0.2s linear;
    transform: translate3d(0,0,0);
    overflow: hidden;
  }
  .move-enter-active{
    transform: translate3d(100%,0,0);
  }
  .move-leave-active{
    transition: all 0s linear;
    transform: translate3d(0,0,0);
  }
  .recommendationSearch{
    background: #fff;
  }
  .recommendationSearch p{
    display: block;
    width: 90%;
    padding: 12px 15px;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
  }
  .recommendationSearch img{
    width: 100%;
  }
  .rcdContent{
    /* width: 90%; */
    display: inline-block;
    padding: 11px 0 15px 15px;
    text-align: left;
  }
  .rcdContent div{
    width: 85px;
    font-size: 12px;
    background: #f6ebe7;
    border: 1px solid #ccc;
    padding: 7px 10px 7px 10px;
  }
  .hsyWrapper{
    width: 100%;
    height: 350px;
    background: #fff;
    overflow: hidden;
  }
  .header_content{
  display: flex;
  width: 100%;
  /* height: 100%; */
  /* background: rgba(0,0,0,0.5); */
  padding: 0 15px;
  box-sizing: border-box;
}
.back_logo{
  width: 30px;
  padding: 15px 0;
  margin-right: 10px;
}
.search_content{
  padding: 15px 0;
  width: 100%;
}
.input_style{
  width: 100%;
  outline: none;
  border: none;
}
.input_text{
  text-align: left;
  border: 1px solid #ccc;
  font-size: 14px;
}
.search_text{
  padding: 15px 0;
  width: 70px;
  text-align: right;
}
  .searchRecord p{
    background: #fff;
    padding: 11px 15px;
    text-align: left;
  }
  .searchRecord ul{
    padding: 0 20px;
  }
  .historyList{
    background: #fff;
    text-align: left;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #ccc;
  }
  .time{
    display: inline-block;
    font-size: 20px;
  }
  .hsyContent{
    display: inline-block;
    font-size: 14px;
  }
  .split{
    width: 100%;
    height: 7px;
    background: #f4f4f4;
  }
  .line{
    width: 100%;
    height: 1px;
    background: #ccc;
  }
</style>
