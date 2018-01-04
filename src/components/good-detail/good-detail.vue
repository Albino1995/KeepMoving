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
      <div class="product-img" v-viewer="options" v-show="$route.params.id">
        <div class="like-button">
          <vue-star animate="animated bounceIn" color="#F05654">
            <i slot="icon" class="fa fa-heart" ref="icon"></i>
          </vue-star>
        </div>
        <img :src=img width="450" height="450"/>
      </div>
      <div class="product-img-preview">
        <vue-select-image :dataImages="dataImages"
                          @onSelectImage="onSelectImage"
        >
        </vue-select-image>
      </div>
      <div class="product-description">
        <p v-html="good.goods_desc"></p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VueSelectImage from 'vue-select-image'
  import VueStar from 'vue-star'
  import {getGood} from 'api/api'

  export default {
    data() {
      return {
        params: {
          search: ''
        },
        good: {},
        gender: '',
        img: '',
        dataImages: [],
        options: {
          'toolbar': false,
          'title': false
        }
      }
    },
    activated() {
      this._getGoodDetail()
    },
    watch: {
      // 切换至不同id的详情页重新初始化
      '$route.params.id': '_getGoodDetail'
    },
    methods: {
      onSelectImage(data) {
        this.img = data.src
      },
      _getGoodDetail() {
        this.params.search = this.$route.params.id
        if (!this.params.search) {
          return
        }
        getGood(this.params).then((res) => {
          this.good = res.data.results[0]
          this._getGender()
          this._getImageData()
        })
      },
      _getImageData() {
        this.img = this.good.cs[0].img[0].image
        // 清空图片数据
        if (this.dataImages.length) {
          this.dataImages.splice(0, this.dataImages.length)
        }
        for (let i = 0; i < this.good.cs[0].img.length; i++) {
          this.dataImages.push({
            id: i + 1,
            src: this.good.cs[0].img[i].image
          })
        }
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
    },
    components: {
      VueSelectImage,
      VueStar
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .content
    position: relative
    width: 1000px
    margin: 0 auto
    .product-wrapper
      position: inherit
      width: 520px
      margin: 20px 40px 0 240px
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
        margin-top: 20px
        width: 520px
        height: 505px
        cursor: zoom-in
        .like-button
          color: #d3d3d3
          position: absolute
          width: 100px
          height: 100px
          left: 420px
          cursor: pointer
        img
          margin: 50px 35px 0
      .product-description
        margin-top: 30px
        color: #000000
        font-size: 13px
        p
          margin-left: 35px
      .product-img-preview
        position absolute
        top 100px
        left: -120px
        div
          width 100px
  .fa
    font-size: 1.5em
</style>
