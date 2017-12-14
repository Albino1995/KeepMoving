<template>
  <div class="header-wrapper">
    <div class="menu">
      <div class="client-menu">
        <ul class="client-menu-list">
          <li>
            <img src="../../common/image/icon/me.png"/>
            <span>
              <router-link class="text" tag="a" to="/me">我的KeepMoving</router-link>
            </span>
          </li>
          <li>
            <img src="../../common/image/icon/login.png"/>
            <span>
              <router-link class="text" tag="a" to="/login">登录</router-link>
            </span>
          </li>
          <li>
            <img src="../../common/image/icon/collect.png"/>
            <span>
              <router-link class="text" tag="a" to="/collection">收藏</router-link>
            </span>
          </li>
          <li>
            <img src="../../common/image/icon/shoppingcart.png"/>
            <span>
              <router-link class="text" tag="a" to="/shopping_cart">购物车</router-link>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <router-link to="/" class="header-pic" tag="a">
      <img src='../../../static/title.png'/>
    </router-link>
    <div class="categories">
      <ul class="categories-list">
        <li class="categories-list-detail">
          <router-link tag="a" to="/male">男士</router-link>
        </li>
        <li class="categories-list-detail">
          <router-link tag="a" to="/female">女士</router-link>
        </li>
        <li class="categories-list-detail">
          <router-link tag="a" to="/child">儿童</router-link>
        </li>
        <li class="categories-list-detail">
          <router-link tag="a" to="/new">新品</router-link>
        </li>
        <li class="categories-list-detail">
          <router-link tag="a" to="/sale">大减价</router-link>
        </li>
      </ul>
      <div class="search-wrapper">搜索框</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  a
    color: #000000
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
            span
              .text
                margin-left: 4px
                &:hover
                  transition: all 0.3s
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
            transition: all 0.2s
            padding-bottom: 4px
            border-bottom: 2px solid #ffA500
      .search-wrapper
        position: absolute
        display: inline
        right: 30px
</style>
