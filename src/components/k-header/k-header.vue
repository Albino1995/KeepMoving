<template>
  <div class="header-wrapper">
    <div class="menu">
      <div class="client-menu">
        <ul class="client-menu-list">
          <li>
            <img src="../../common/image/icon/me.png"/>
            <router-link class="text" tag="span" to="/me">我的KeepMoving</router-link>
          </li>
          <li>
            <img src="../../common/image/icon/login.png"/>
            <router-link class="text" tag="span" to="/login">登录</router-link>
          </li>
          <li>
            <img src="../../common/image/icon/collect.png"/>
            <router-link class="text" tag="span" to="/collection">收藏</router-link>
          </li>
          <li>
            <img src="../../common/image/icon/shoppingcart.png"/>
            <router-link class="text" tag="span" to="/shopping_cart">购物车</router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-link to="/" class="header-pic" tag="div">
      <img src='../../../static/title.png'/>
    </router-link>
    <div class="categories">
      <ul class="categories-list">
        <router-link tag="li" class="categories-list-detail" to="/male">男士</router-link>
        <router-link tag="li" class="categories-list-detail" to="/female">女士</router-link>
        <router-link tag="li" class="categories-list-detail" to="/child">儿童</router-link>
        <router-link tag="li" class="categories-list-detail" to="/new">新品</router-link>
        <router-link tag="li" class="categories-list-detail" to="/sale">大减价</router-link>
      </ul>
      <div class="search-wrapper">搜索框</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
  .header-wrapper
    position: relative
    padding: 15px 0 30px 0
    width: 100%
    .menu
      float: right
      padding: 0 15px
      .client-menu
        font-size: 12px
        .client-menu-list
          list-style-type: none
          margin: 0
          padding: 0
          li
            height: 19px
            display: inline
            margin-left: 25px
            img
              height: 16px
              width: 16px
            .text
              margin-left: 4px
              &:hover
                color: #808080
    .header-pic
      position: absolute
      width: 100%
      top: 34px
      text-align: center
      img
        width: 300px
        height: 50px
    .categories
      padding: 50px 0 0 0
      width: 100%
      margin-top: 53px
      text-align: center
      padding-bottom: 30px
      border-bottom: 0.5px solid #a9a9a9
      .categories-list
        display inline
        list-style-type: none
        margin: 0
        padding: 0
        .categories-list-detail
          display: inline
          margin: 0 20px
          font-size: 14px
          font-weight: 600
          letter-spacing: 1px
          &:hover
            padding-bottom: 4px
            border-bottom: 2px solid #ffA500
      .search-wrapper
        position: absolute
        display: inline
        right: 30px
</style>
