<template>
  <div>
    <div class="content">
      <loading title="拼命加载中..." v-show="!showFlag"></loading>
      <div class="product-img-preview" v-show="showFlag">
        <vue-select-image :dataImages="dataImages"
                          @onSelectImage="onSelectImage"
        >
        </vue-select-image>
      </div>
      <div class="product-wrapper" v-show="showFlag">
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
            <vue-star color="#F05654">
              <i slot="icon" class="fa fa-heart" ref="icon" @click="addFavourites"></i>
            </vue-star>
          </div>
          <img :src=img width="450" height="450"/>
        </div>
        <div class="product-description">
          <p v-html="good.goods_desc"></p>
        </div>
      </div>
      <div class="size-buy-wrapper" v-show="showFlag">
        <span>型号: {{params.search}}</span>
        <span>选择款式</span>
        <div class="color-selection">
          <el-radio-group v-model="colorItem" @change="selectColorItem">
            <el-radio v-for="item in color" :key="item" :label=item>{{ item }}</el-radio>
          </el-radio-group>
        </div>
        <span>选择尺码</span>
        <div class="size-selection">
          <el-select v-model="sizeItem" placeholder="请选择" @change="selectSizeItem">
            <el-option
              v-for="item in size"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <span class="alert" v-show="alertFlag">{{ alertText }}</span>
        <button class="shopping-cart" @click="addShoppingCart">
          <i class="fa fa-shopping-cart"></i>
          &nbsp;添加到购物车
        </button>
      </div>
    </div>
    <good-list :adjust=true title="随便看看" :goods="extraGood" v-show="showFlag"></good-list>
  </div>

</template>

<script type="text/ecmascript-6">
  import loading from 'base/loading/loading'
  import GoodList from 'base/good-list/good-list'
  import VueSelectImage from 'vue-select-image'
  import VueStar from 'vue-star'
  import {getGood, addShoppingCart, addFavourite} from 'api/api'

  const FavouriteNumberDefault = 1

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
        },
        size: [],
        color: [],
        colorItem: '',
        sizeItem: '',
        showFlag: false,
        singleColor: '',
        singleSize: '',
        alertFlag: false,
        alertText: '',
        extraGood: [],
        sw: ''
      }
    },
    created() {
      this._initGoodDetail()
    },
    watch: {
      // 切换至不同id的详情页重新初始化
      '$route.params.id': '_initGoodDetail'
    },
    methods: {
      onSelectImage(data) {
        this.img = data.src
      },
      selectColorItem(color) {
        this.singleColor = color
        this.dataImages.splice(0, this.dataImages.length)
        for (let i = 0; i < this.good.cs.length; i++) {
          if (this.good.cs[i].goods_color === color) {
            this.img = this.good.cs[i].img[0].image
            for (let j = 0; j < this.good.cs[i].img.length; j++) {
              this.dataImages.push({
                id: j + 1,
                src: this.good.cs[i].img[j].image
              })
            }
            break
          }
        }
      },
      selectSizeItem(size) {
        this.singleSize = size
      },
      addShoppingCart() {
        if (!this.singleColor) {
          this.alertFlag = true
          this.alertText = '请选择款式'
          return
        }
        if (!this.singleSize) {
          this.alertFlag = true
          this.alertText = '请选择尺码'
          return
        }
        this.good.cs.forEach((item) => {
          if (item.goods_color === this.singleColor && item.goods_size === this.singleSize) {
            if (item.goods_num === 0) {
              this.alertFlag = true
              this.alertText = '商品暂缺'
              return
            }
            let params = {}
            params.goods = String(item.id)
            params.nums = FavouriteNumberDefault
            addShoppingCart(params).then((res) => {
              console.log(res.data)
            })
          }
        })
      },
      addFavourites() {
        let params = {}
        params.goods = String(this.good.id)
        addFavourite(params).then((res) => {
          console.log(res.data)
        })
      },
      _initGoodDetail() {
        this.showFlag = false
        this.alertFlag = false
        this.alertText = ''
        this.colorItem = ''
        this.sizeItem = ''
        this.singleColor = ''
        this.singleSize = ''
        this.extraGood = []
        this._getGoodDetail()
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
          this._getSize()
          this._getColor()
          this._getExtraGood()
          this.showFlag = true
          console.log(this.dataImages)
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
      _getSize() {
        if (this.size.length) {
          this.size.splice(0, this.size.length)
        }
        let temp = []
        for (let i = 0; i < this.good.cs.length; i++) {
          temp.push(this.good.cs[i].goods_size)
        }
        let result = Array.from(new Set(temp))
        for (let i = 0; i < result.length; i++) {
          this.size.push(
            {
              value: result[i],
              label: result[i]
            }
          )
        }
      },
      _getColor() {
        if (this.color.length) {
          this.color.splice(0, this.color.length)
        }
        let temp = []
        for (let i = 0; i < this.good.cs.length; i++) {
          temp.push(this.good.cs[i].goods_color)
        }
        let result = Array.from(new Set(temp))
        for (let i = 0; i < result.length; i++) {
          this.color.push(result[i])
        }
      },
      _getExtraGood() {
        let params = {}
        this.showFlag = false
        getGood(params).then((res) => {
          let extra = new Set()
          while (extra.size < 4) {
            // 生成随机数
            let random = Math.floor(Math.random() * (res.data.results.length))
            // 推荐列表不能显示本页面商品
            if ((this.good.id - 1) === random) {
              continue
            }
            extra.add(random)
          }
          Array.from(extra).forEach((item) => {
            this.extraGood.push(res.data.results[item])
          })
          this.showFlag = true
        })
      }
    },
    components: {
      loading,
      VueSelectImage,
      VueStar,
      GoodList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .content
    display: flex
    justify-content: center
    margin-top: 20px
    .product-wrapper
      width: 520px
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
        position: relative
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
      width: 258px
      margin-top: 150px
      div
        margin-left: 50px
        width: 115px
    .size-buy-wrapper
      height: 500px
      display: flex
      margin-top: 70px
      margin-left: 30px
      flex-direction: column
      justify-content: center
      span
        font-size: 12px
        letter-spacing: 1px
        margin: 10px 0
      .alert
        color: #8b0000
        font-size: 13px
      .shopping-cart
        margin-top 50px
        color: #ffffff
        background-color: #8b0000
        border: none
        height: 50px
        width: 250px
        outline: none
        &:hover
          color: #8b0000
          background-color: #ffffff
          border: 0.5px solid #8b0000
          transition: all 0.3s

  .fa
    font-size: 1.5em
</style>
