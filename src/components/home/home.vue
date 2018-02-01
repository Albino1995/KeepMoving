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
    <loading v-show="!newGoods.length"></loading>
    <good-list :title="isHot" :goods="hotGoods"></good-list>
    <loading v-show="!hotGoods.length"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import GoodList from 'base/good-list/good-list'
  import Loading from 'base/loading/loading'
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
    activated() {
      document.title = 'KeepMoving商城'
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
          ordering: '',
          page: 1
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
          ordering: '',
          page: 1
        }).then((res) => {
          this.hotGoods = res.data.results.slice(0, 4)
        })
      }
    },
    components: {
      Slider,
      GoodList,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .home-wrapper
    display: flex
    flex-direction: column
    padding-bottom: 30px
    .slider-wrapper
      overflow: hidden
</style>
