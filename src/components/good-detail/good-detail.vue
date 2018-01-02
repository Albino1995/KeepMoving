<template>
  <div class="content">
    <div class="product-wrapper">
      <div class="name-wrapper">
        <div class="product-name">
          【{{gender}}】<span>{{good.name}}</span>
        </div>
        <div class="product-price">
          价格 <span>￥{{good.price}}</span>
        </div>
      </div>
      <div class="product-img">
        <img :src=img width="450" height="450" />
      </div>
      <div class="product-description">
        <p v-html="good.goods_desc"></p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getGood} from 'api/api'

  export default {
    data() {
      return {
        params: {
          search: ''
        },
        good: {},
        gender: '',
        img: ''
      }
    },
    activated() {
      this._getGoodDetail()
    },
    methods: {
      _getGoodDetail() {
        this.params.search = this.$route.params.id
        getGood(this.params).then((res) => {
          this.good = res.data.results[0]
          this._getGender()
          this.img = this.good.cs[0].img[0].image
        })
      },
      _getGender() {
        if (this.good.gender === 'neutral') {
          this.gender = '男女同款'
        }
        if (this.good.gender === 'male') {
          this.gender = '男款'
        }
        if (this.good.gender === 'female') {
          this.gender = '女款'
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .content
    position: relative
    width: 1000px
    margin: 0 auto
    .product-wrapper
      width: 520px
      margin-left: 240px
      margin-right: 40px
      .name-wrapper
        width: 100%
        text-align: center
        font-size: 24px
        letter-spacing: 0.5px
        color: #000000
        .product-name
          font-weight: bold
        .product-price
          font-weight: bold
      .product-img
        width: 520px
        height: 505px
        img
          margin: 50px 35px 0
      .product-description
        margin-top: 20px
        color: #000000
        font-size: 13px
        p
          margin-left: 35px
</style>
