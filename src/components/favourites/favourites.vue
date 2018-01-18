<template>
  <div class="favourites-wrapper">
    <span class="title">收藏</span>
    <div class="form-wrapper">
      <span class="favourites-num">{{favourites.length}}商品</span>
      <ul>
        <li v-for="item in favourites">
          <router-link tag="a" :to="`/good/${item.goods.goods_sn}`">
            <img :src="item.goods.goods_front_image" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUserFav} from 'api/api'

  export default {
    data() {
      return {
        favourites: []
      }
    },
    activated() {
      getUserFav().then((res) => {
        this.favourites = res.data
        console.log(this.favourites)
      })
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
      .favourites-num
        margin-top: 20px
        font-size: 13px
      ul
        margin-bottom: 30px
        li
          padding: 50px
          margin: 10px 0
          width: 700px
          border: 1px solid #000000
</style>
