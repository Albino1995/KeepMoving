<template>
  <div class="pic-wrapper">
    <img src="../../../static/success.jpg" :width="width"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        width: document.body.clientWidth
      }
    },
    activated() {
      document.title = '订单已支付|KeepMoving'
      setTimeout(() => {
        this.$router.push({path: '/me/order'})
      }, 5000)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pic-wrapper
    img
      margin-top: 30px
</style>
