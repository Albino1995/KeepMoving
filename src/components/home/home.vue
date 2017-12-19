<template>
  <!-- vif 防止在异步未获取数据时 mounted已经执行初始化betterscroll-->
  <div v-if="banners.length" class="slider-wrapper">
    <slider>
      <div v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" height="75%" width="100%">
        </a>
      </div>
    </slider>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import {getBanner} from 'api/api'
  export default {
    data() {
      return {
        banners: []
      }
    },
    created() {
      this._getSlide()
    },
    methods: {
      _getSlide() {
        getBanner().then((res) => {
          this.banners = res.data
        })
      }
    },
    components: {
      Slider
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slider-wrapper
    position: relative
    width: 100%
    overflow: hidden
    padding-bottom: 30px
</style>
