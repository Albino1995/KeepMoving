<template>
  <div class="favourites-wrapper">
    <span class="title">收藏</span>
    <!--收藏列表长度为0时显示的提示区块-->
    <div class="form-wrapper" v-show="!favourites.length && getFavFlag">
      <div class="tips-box">
        <i class="fa fa-heart fa-2x"></i>
        <span class="tips-title">收藏您喜欢的商品</span>
        <span class="tips-content">希望收藏喜欢的商品？点击商品右上方的心形符号，便可在此处显示。</span>
        <button class="check-button" @click="goIndex">现在查看</button>
      </div>
    </div>
    <div class="form-wrapper" v-show="favourites.length">
      <span class="favourites-num">{{favourites.length}}商品</span>
      <ul>
        <li v-for="item in favourites">
          <router-link tag="a" :to="`/good/${item.goods.goods_sn}`">
            <img class="font-img" v-lazy="item.goods.goods_front_image"/>
          </router-link>
          <div class="item-property">
            <span>{{item.goods.name}}</span>
            <span>￥{{item.goods.price}}</span>
            <span>商品编号:&nbsp;&nbsp;&nbsp;{{item.goods.goods_sn}}</span>
          </div>
          <div class="button-group">
            <button class="delete" @click="_showConfirm(item)">
              <i class="fa fa-trash"></i>
              删 除
            </button>
            <button class="detail" @click="goDetail(item)">
              <i class="fa fa-plus-square"></i>
              详 情
            </button>
          </div>
        </li>
      </ul>
    </div>
    <loading v-show="!getFavFlag"></loading>
    <confirm text="确定将该商品从收藏列表移除吗？" @confirm="deleteFav" ref="confirm"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUserFav, deleteUserFav} from 'api/api'
  import Loading from 'base/loading/loading'
  import Confirm from 'base/confirm/confirm'

  export default {
    data() {
      return {
        favourites: [],
        deleteItem: {},
        getFavFlag: false
      }
    },
    activated() {
      document.title = '收藏|KeepMoving'
      this.getFavFlag = false
      this.deleteItem = {}
      this.getFav()
    },
    methods: {
      goIndex() {
        this.$router.push({path: '/'})
      },
      goDetail(item) {
        this.$router.push({path: `/good/${item.goods.goods_sn}`})
      },
      getFav() {
        getUserFav().then((res) => {
          this.favourites = res.data
          this.getFavFlag = true
        })
      },
      deleteFav() {
        deleteUserFav(this.deleteItem.goods.id).then(() => {
          this.$router.go(0)
        })
      },
      _showConfirm(item) {
        this.deleteItem = item
        this.$refs.confirm.show()
      }
    },
    components: {
      Loading,
      Confirm
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .favourites-wrapper
    display: flex
    flex-direction: column
    align-content: center
    .title
      text-align center
      font-size: 25px
      font-weight: bolder
      margin: 20px 0 30px 0
    .form-wrapper
      align-self: center
      margin-bottom: 30px
      .tips-box
        width: 700px
        border: 1px solid #000000
        padding: 50px
        display: flex
        flex-direction: column
        i
          align-self: center
          color: #F05654
        .tips-title
          text-align: center
          font-size: 20px
          margin: 20px 0
          font-weight: bolder
        .tips-content
          text-align: center
          font-size: 13px
          margin-bottom: 30px
        .check-button
          color: #ffffff
          align-self: center
          background-color: #000000
          border: none
          height: 50px
          width: 130px
          outline: none
          &:hover
            color: #000000
            background-color: #ffffff
            border: 0.5px solid #9a9a9a
            transition: all 0.3s
      .favourites-num
        margin-top: 20px
        font-size: 13px
      ul
        li
          display: flex
          padding: 20px
          margin: 10px 0
          width: 700px
          border: 1px solid #000000
          .font-img
            &:hover
              opacity: 0.7
              transition: all 0.3s
          .item-property
            width: 230px
            margin: 30px 0 0 20px
            display: flex
            flex-direction: column
          .button-group
            display: flex
            justify-content space-between
            width: 300px
            margin-left: 20px
            button
              cursor: pointer
            .delete
              align-self: flex-end
              color: #000000
              background-color: #ffffff
              border: 0.5px solid #a9a9a9
              height: 30px
              width: 130px
              outline: none
              &:hover
                color: #ffffff
                background-color: #000000
                transition: all 0.3s
                border: none
            .detail
              color: #ffffff
              align-self: flex-end
              background-color: #000000
              border: none
              height: 30px
              width: 130px
              outline: none
              &:hover
                color: #000000
                background-color: #ffffff
                border: 0.5px solid #9a9a9a
                transition: all 0.3s
</style>
