<template>
  <div class="header-wrapper">
    <div class="menu">
      <div class="client-menu">
        <ul class="client-menu-list">
          <li v-show="userInfo.token">
            <i class="fa fa-user"></i>
            <span>
              <router-link class="text" tag="a" to="/me">{{userInfo.name}}</router-link>
            </span>
          </li>
          <li v-show="!userInfo.token">
            <i class="fa fa-star"></i>
            <span>
              <router-link class="text" tag="a" to="/login">登录</router-link>
            </span>
          </li>
          <li>
            <i class="fa fa-heart"></i>
            <span>
              <router-link class="text" tag="a" to="/favourites">收藏</router-link>
            </span>
          </li>
          <li>
            <i class="fa fa-shopping-cart"></i>
            <span>
              <router-link class="text" tag="a" to="/shopping_cart">购物车</router-link>
            </span>
          </li>
          <li v-show="userInfo.token">
            <i class="fa fa-star-half"></i>
            <span @click="logout">
              登出
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
                    <router-link tag="a" class="item" :to="`/category/${item.link}/sneakers`">
                      <img :src="item.caide">
                      <p>踩的</p>
                    </router-link>
                  </div>
                </li>
                <li>
                  <div class="pop">
                    <router-link tag="a" class="item" :to="`/category/${item.link}/clothing`">
                      <img :src="item.chuande">
                      <p>穿的</p>
                    </router-link>
                  </div>
                </li>
                <li>
                  <div class="pop">
                    <router-link tag="a" class="item" :to="`/category/${item.link}/accessories`">
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
      <search-box></search-box>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBox from 'base/search-box/search-box'
  import { mapGetters, mapMutations } from 'vuex'
  import cookie from 'common/js/cookie'

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
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      overCategories(index) {
        this.showPopup = index
      },
      outCategories() {
        this.showPopup = -1
      },
      logout() {
        cookie.delCookie('token')
        cookie.delCookie('name')
        this.setUserInfo()
        this.$router.go(0)
      },
      ...mapMutations({
        setUserInfo: 'SET_USER_INFO'
      })
    },
    components: {
      SearchBox
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  a
    color: #000000
  .header-wrapper
    display: flex
    flex-direction column
    padding: 15px 0 30px 0
    .menu
      text-align: right
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
            span
              cursor: pointer
              .text
                margin-left: 4px
                &:hover
                  transition: all 0.3s
                  color: #808080
    .header-pic
      align-self: center
      width: 300px
      margin-top: 20px
      text-align: center
      img
        width: 300px
        height: 50px
    .categories
      margin-top: 20px
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
            /*margin-top: 6px*/
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
  .slide-enter-active, .slide-leave-active
    transition: all 0.4s
  .slide-enter, .slide-leave-to
    opacity: 0
</style>
