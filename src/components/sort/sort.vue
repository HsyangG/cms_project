<template>
  <div class="sort">
    <v-header></v-header>
    <div class="sort-content">
      <div class="goodsWrapper" ref="goodsWrapper">
        <ul>
          <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'active': currentIndex === index || index === goods.length}" @click.prevent.prevent="selectMenu(index)">
            <div class="text">{{ item.name }}</div>
          </li>
          <!--<li>-->
            <!--<div style="width: 100%;height: 65px;"></div>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="listWrapper" ref="listWrapper">
        <ul>
          <li v-for="(item, index) in goods" :key="index" class="food-list">
            <h1 class="title">----&nbsp;&nbsp;&nbsp;&nbsp;{{ item.title }}&nbsp;&nbsp;&nbsp;&nbsp;----</h1>
            <ul>
              <li v-for="(list, index) in item.list" class="food-item" :key="index">
                <div class="goodImage">
                  <img :src="list.image" alt="">
                </div>
                <div class="listContent">{{ list.name }}</div>
              </li>
            </ul>
          </li>
          <!--<li>-->
            <!--<div style="width: 100%;height: 80px;"></div>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
    <bt-menu></bt-menu>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      goods: [
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        },
        {
          name: '新品',
          title: '众筹好物',
          list: [
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            },
            {
              name: '投影仪 青春版',
              image: ''
            }
          ]
        }
      ],
      listHeight: [],
      currentY: 0,
      selectedList: {},
      list: null,
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let heightBottom = this.listHeight[i] // 获取区间顶部
        let heightTop = this.listHeight[i + 1] // 获取区间底部
        // console.log(heightTop, heightBottom)
        // 对滑动后 currentY 值不足的情况进行修正
        let _this = this
        let deff = Math.abs(this.currentY - heightTop)
        if (deff < 5) {
          _this.currentY = heightTop
        }
        if (!heightTop || (this.currentY >= heightBottom && this.currentY < heightTop)) {
          // 当区间底部不存在，或者顶部小于 scrollY 小于底部时
          return i
        }
      }
      return 0
    },
    selectList () {
      let list = [] // 用来存放选中的list.item
      this.goods.forEach((listItem) => {
        listItem.list.forEach(item => {
          if (item.count) {
            list.push(item)
          }
        })
      })
      return list
    }
  },
  created () {
    this.getClasscification()
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._calculateHeight()
    })
  },
  methods: {
    getClasscification () {
      this.$axios.get('/api/shops/classcification')
      .then((response) => {
        if (response.data.code == 0) {
          this.list = response.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    selectMenu (index) {
      // console.log(this.currentIndex, index)
      // console.log(this.currentY)
      let foodList = this.$refs.listWrapper.getElementsByClassName('food-list')
      let el = foodList[index]
      // console.log(el)
      this.listScroll.scrollToElement(el, 300)
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.goodsWrapper, {
        click: true
      })
      this.listScroll = new BScroll(this.$refs.listWrapper, {
        probeType: 3, // probeType: 3 是指实时滚动的时候能获取到当前的位置
        click: true
      })
      let _this = this
      this.listScroll.on('scroll', pos => {
        _this.currentY = Math.abs(Math.round(pos.y)) // 将滚动位置的值转为正数
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.listWrapper.getElementsByClassName('food-list')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i] // 获取每一个 foodList
        height += item.clientHeight // 通过 DOM 的 clientHeight 方法获取到每行第一个 li 的高度，再累加，得到每个区间的高度
        this.listHeight.push(height)
      }
    },
    selectFood (food) {
      this.selectedList = food
    }
  }
}
</script>

<style scoped>
.header{
  background: #fafafa;
}
.sort-content{
  display: flex;
  position: absolute;
  /*top: 174px;*/
  top: 50px;
  bottom: 46px;
  width: 100%;
  height: 650px;
  overflow: hidden;
  border-top: 1px solid #ccc;
}
.content{
  width: 100%;
  height: 3000px;
  background: rgba(0,0,0,0.5);
}
.goodsWrapper{
  touch-action: none;
  position: relative;
  flex: 0 0 80px;
  background: #fefefe;
  border-right: 1px solid #ccc;
}
.menu-item{
  display: table;
  height: 54px;
  width: 100%;
  /*padding: 0 12px;*/
  line-height: 54px;
}
.menu-item:last-child{
  padding-bottom: 65px;
}
.active {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  font-weight: 700;
  color: #ff6c02;
}
.active div {
  display: inline-block;
  width: 100%;
  height: 18px;
  line-height: 18px;
  box-sizing: border-box;
  border-left: 2px solid #ff6c02;
  border-right: 2px solid #fff;
}
.text{
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  font-size: 14px;
}
.listWrapper{
  touch-action: none;
  position: relative;
  flex: 1;
}
.title{
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: rgb(147,153,157);
}
.food-list {
  /*margin-top: 10px;*/
  padding-top: 15px;
}
.food-list:last-child{
  padding-bottom: 80px;
}
.food-list ul {
  justify-content: space-between;
}
.food-item{
  display: inline-block;
  width: 33.33%;
  height: 150px;
  background: rgba(0,0,0,0.5);
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
}
.goodImage{
  width: 100%;
  height: 80px;
}
.listContent {
  font-size: 12px;
  margin-top: 30px;
}
  .fade-enter, .fade-leave-action{
    opacity: 0;
    background: rgba(7, 17, 27, 0)
  }
</style>
