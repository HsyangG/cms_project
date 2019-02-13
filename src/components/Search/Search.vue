<template>
  <transition name="move">
    <div class="search">
      <v-header :scanShow="scanShow" :searchShow="searchShow" :delBtn="delBtn" :magShow="magShow" :linkTo="linkTo" :review="review"></v-header>
      <div class="searchBody">
        <div class="recommendationSearch">
          <p>热门搜索</p>
          <img src="./../../assets/img/tuijiansousuo.jpg" alt="...">
          <div class="rcdContent" ref="redContent">
            <div>{{redContent}}</div>
          </div>
        </div>
        <div class="split" v-show="showHty"></div>
        <div class="searchRecord" v-show="showHty">
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
      showHty: false
    }
  },
  mounted () {
    this.$root.eventHub.$on('showSearch', this.showHistory)
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
    }
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
    width: 90%;
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
