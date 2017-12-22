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
        <li v-for="(item, index) in categories"
            class="categories-list-detail"
            @mouseover="overCategories(index)"
            @mouseleave="outCategories"
        >
          <span class="select">{{ item.name }}</span>
          <transition name="slide">
            <div class="pop-up-layer" v-show="showPopup === index">
            <ul>
              <li>
                <div class="pop">
                  <router-link tag="a" class="item" :to="`/category/${item.link}/sneakers`" @click.native="reload()">
                    <img :src="item.caide">
                    <p>踩的</p>
                  </router-link>
                </div>
              </li>
               <li>
                <div class="pop">
                  <router-link tag="a" class="item" :to="`/category/${item.link}/clothing`" @click.native="reload()">
                    <img :src="item.chuande">
                    <p>穿的</p>
                  </router-link>
                </div>
              </li>
               <li>
                <div class="pop">
                  <router-link tag="a" class="item" :to="`/category/${item.link}/accessories`" @click.native="reload()">
                    <img :src="item.daide">
                    <p>戴的</p>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
          </transition>
        </li>
      </ul>
      <div class="search-wrapper">搜索框</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        categories: [
          {
            name: '男士',
            link: 'male',
            caide: '/static/male_caide.jpg',
            chuande: '/static/male_chuande.jpg',
            daide: '/static/male_daide.jpg'
          },
          {
            name: '女士',
            link: 'female',
            caide: '/static/female_caide.jpg',
            chuande: '/static/female_chuande.jpg',
            daide: '/static/female_daide.jpg'
          },
          {
            name: '新品',
            link: 'new',
            caide: '/static/new.jpg',
            chuande: '/static/new.jpg',
            daide: '/static/new.jpg'
          },
          {
            name: '大减价',
            link: 'sale',
            caide: '/static/sale.jpg',
            chuande: '/static/sale.jpg',
            daide: '/static/sale.jpg'
          }
        ],
        showPopup: -1
      }
    },
    methods: {
      overCategories(index) {
        this.showPopup = index
      },
      outCategories() {
        this.showPopup = -1
      },
      reload() {
        location.reload()
      }
    }
  }
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
        display: inline
        list-style-type: none
        margin: 0
        padding: 0
        .categories-list-detail
          display: inline
          margin: 0 20px
          font-size: 14px
          font-weight: 600
          letter-spacing: 1px
          .select
            &:hover
              transition: all 0.2s
              padding-bottom: 4px
              border-bottom: 1px solid #ffA500
          .pop-up-layer
            position: absolute
            padding: 15px 0 20px 0
            text-align: center
            width: 100%
            background-color: #ffffff
            margin-top: 6px
            z-index: 50
            ul
              li
                display: inline-block
                margin: 0 40px 0 40px
                .pop
                  .item
                    display: block
                    &:hover
                      text-decoration: underline

      .search-wrapper
        position: absolute
        display: inline
        right: 30px
  .slide-enter-active, .slide-leave-active
    transition: all 0.4s
  .slide-enter, .slide-leave-to
    opacity: 0
</style>
