<template>
  <!-- vif 防止在异步未获取数据时 mounted已经执行初始化betterscroll-->
  <div class="home-wrapper">
    <div v-if="banners.length" class="slider-wrapper">
      <slider>
        <div v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image">
          </a>
        </div>
      </slider>
    </div>
    <good-list :title="isNew" :goods="newGoods"></good-list>
    <good-list :title="isHot" :goods="hotGoods"></good-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import GoodList from 'base/good-list/good-list'
  import {getBanner, getGood} from 'api/api'
  export default {
    data() {
      return {
        banners: [],
        newGoods: [],
        hotGoods: [],
        isNew: '新品上架',
        isHot: '热销商品'
      }
    },
    created() {
      this._getSlide()
      this._getNewGoods()
      this._getHotGoods()
    },
    methods: {
      _getSlide() {
        getBanner().then((res) => {
          this.banners = res.data
        })
      },
      _getNewGoods() {
        getGood({
          is_new: true,
          is_sale: '',
          is_hot: '',
          gender1: '',
          gender2: '',
          category: '',
          ordering: ''
        }).then((res) => {
          this.newGoods = res.data.results.slice(0, 4)
        })
      },
      _getHotGoods() {
        getGood({
          is_new: '',
          is_hot: true,
          is_sale: '',
          gender1: '',
          gender2: '',
          category: '',
          ordering: ''
        }).then((res) => {
          this.hotGoods = res.data.results.slice(0, 4)
        })
      }
    },
    components: {
      Slider,
      GoodList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .home-wrapper
    position: relative
    width: 100%
    padding-bottom: 30px
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
</style>
