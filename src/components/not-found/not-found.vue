<template>
  <div class="not-found-wrapper">
    <router-link to="/" class="index-pic" tag="a">
      <img src='../../../static/title.png' />
    </router-link>
    <div class="not-found-pic">
      <img src='../../../static/not-found.png' width="491" height="262"/>
    </div>
    <div class="text">
      <span class="tips">您要找的页面不存在</span>
      <span class="detail">可能是因为您的链接地址有误、商品下架或其他信息有误。</span>
    </div>
    <div class="button-wrapper">
      <button class="home-button" @click="goHome">返回「KeepMoving」主页</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    activated() {
      document.title = '出错啦|KeepMoving'
    },
    methods: {
      goHome() {
        this.$router.push({path: '/'})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .not-found-wrapper
    position: fixed
    display: flex
    flex-direction: column
    padding: 40px
    top: 0
    bottom: 0
    left: 0
    right: 0
    background: #ffffff
    .index-pic
      img
        width: 200px
        height: 40px
    .not-found-pic
      text-align center
      margin: 50px 0 30px 0
    .text
      text-align center
      span
        display: block
      .tips
        font-size: 20px
        font-weight: 700
        margin-bottom: 15px
      .detail
        font-size: 13px
    .button-wrapper
      text-align: center
      margin: 20px 0
      .home-button
        cursor: pointer
        height: 50px
        width: 200px
        margin: 10px 0
        color: #ffffff
        background-color: #000000
        border: none
        outline: none
        border-radius: 40px
        &:hover
          color: #000000
          background-color: #ffffff
          border: 0.5px solid #9a9a9a
          transition: all 0.3s
</style>
