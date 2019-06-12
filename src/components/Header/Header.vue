<template>
  <div class="header">
    <div class="header_content">
      <div class="go_back" @click="goBack">
        <div class="back_logo">
          <svg-icon icon-class="houtui"></svg-icon>
        </div>
      </div>
      <div class="search_content">
        <input class="input_style" type="search" v-show="searchShow" v-model="inputPlaceholder" ref="input">
        <div class="input_text" v-show="!searchShow" @click.prevent="toHome">{{inputPlaceholder}}</div>
      </div>
      <div class="search_text" @click="sendToSearch">
        <div>搜索</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'v-header',
  props: {
    scanShow: {
      type: Boolean,
      default: true
    },
    searchShow: {
      type: Boolean,
      default: false
    },
    delBtn: {
      type: Boolean,
      default: false
    },
    magShow: {
      type: Boolean,
      default: true
    },
    linkTo: {
      type: String,
      default: ''
    },
    inputList: {
      type: Array,
      default: () => {
        return []
      }
    },
    review: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      inputPlaceholder: '点读派'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    toHome (str) {
      if (str === '/home') {
        this.$router.push(str)
      } else {
        this.$router.push('/search')
      }
    },
    sendToSearch () {
      // this.inputPlaceholder = []
      let input = this.inputList
      input.push((this.$refs.input.value).replace(/\s+/g, '')) // 去除输入字符串的空格
      let _input = this.removeDuplicates(input) // 去除重复的输入内容
      console.log(_input)
      this.$root.eventHub.$emit('showSearch', _input)
      this.$axios.get('/api/shops/search', {
        params: {
          search: _input[0]
        }
      }, {
        headers: {
          'Content-Type':'application/json;charset=UTF-8'
        }
      })
      .then((response) => {
        // 获得传递值之后，将结果传递给父组件
        this.$root.eventHub.$emit('on_search', response.data)
      }).catch((err) => {
        console.log(err)
      });
    },
    unique (arr) {
      // 如果从头部传入的值在数组中已存在，则删除这个相同的值
      let hash = []
      for (let i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i]) === i) {
          hash.push(arr[i])
        }
      }
      return hash
    },
    removeDuplicates (arr) {
      let history = this.unique(arr) // 如果从头部传入的值在数组中已存在，则删除这个相同的值
      for (let i = 0; i < history.length; i++) {
        let hist = history[i]
        if (hist === '') {
          history.splice(i, 1) // 如果传入空串，则不显示搜索记录，并删除空串
        }
      }
      return history
    },
    offEventHubListener () {
      this.$root.eventHub.$off('showSearch')
      this.$root.eventHub.$off('on_search')
    }
  },
  beforeDestroy () {
    this.offEventHubListener()
  }
}
</script>

<style>
.header{
  width: 100%;
  height: 50px;
}
/* .headerContent{
  position: relative;
  line-height: 50px;
  font-size: 20px;
  text-align: left;
  padding: 0 10px;
}
.scan{
  position: relative;
  width: 20px;
  height: 20px;
  line-height: 0;
  padding: 5px
}
.headerContent div{
  display: inline-block;
}
.search-group{
  position: relative;
  left: 0;
  top: 5px;
  width: 79%;
  height: 25px;
  border: 1px solid #ccc;
  text-align: left;
  background: #fff;
}
.magnifier{
  position: absolute;
  top: 1px;
  left: 0;
  line-height: 0;
  font-size: 14px;
  padding: 5px;
}
.search-group input{
  position: absolute;
  left: 24px;
  top: 4px;
  width: 90%;
  outline: none;
  border: none;
}
.inputText{
  position: absolute;
  left: 24px;
  top: 0;
  width: 90%;
  height: 27px;
  line-height: 27px;
  font-size: 14px;
  text-align: left;
  padding-left: 10px;
}
.search-group input::-webkit-search-cancel-button{
  display: none;
}
.del{
  position: absolute;
  top: 1px;
  right: 0;
  line-height: 0;
  font-size: 18px;
  padding: 3px;
  color: #b2b2b2;
}
.news{
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 5px;
  line-height: 0;
}
.news span{
  display: inline-block;
  width: 35px;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
} */
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
</style>
