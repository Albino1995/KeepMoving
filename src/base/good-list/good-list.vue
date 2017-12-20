<template>
  <div class="good-list">
    <span>{{title}}</span>
    <ul>
      <li v-for="item in IndexGoods">
        <div class="item">
          <router-link tag="a" class="item-link" :to="`/good/${item.goods_sn}`">
            <img :src="item.goods_front_image">
            <p>{{item.name}}</p>
            <p class="item-bottom">￥{{item.price}}</p>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      goods: {
        type: Array,
        default: []
      }
    },
    computed: {
      // 首页只显示四条数据
      IndexGoods() {
        return this.goods.slice(0, 4)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .good-list
    text-align: center
    span
      display: block
      font-size: 30px
      font-weight:  lighter
      padding-top: 30px
      letter-spacing: 2px
      position: relative
      &:before, &:after
        content: ''
        position: absolute
        top: 70%
        background: #a9a9a9
        width: 15%
        height: 1px
      &:before
        left: 25%
      &:after
        right: 25%
    ul
      padding-top: 10px
      li
        display: inline
        .item
          margin: 20px 30px 10px 30px
          display: inline-block
          width: 20%
          box-sizing: border-box
          .item-link:hover
            opacity: 0.6
            transition: all 0.2s
          p
            color: #000000
          img
            padding-bottom: 10px
          .item-bottom
            padding-bottom: 10px

</style>
