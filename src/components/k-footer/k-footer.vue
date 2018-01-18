<template>
  <div class="footer-wrapper">
    <div class="line"></div>
    <div class="footer">
      <div class="footer-list">
        <bottom-list :title="'男士'" :link="'male'"></bottom-list>
        <bottom-list :title="'女士'" :link="'female'"></bottom-list>
        <bottom-list :title="'新品'" :link="'new'"></bottom-list>
        <bottom-list :title="'大减价'" :link="'sale'"></bottom-list>
      </div>
      <div class="footer-bottom">
        <img width="50" height="50" src="../../common/image/default.png"/>
        <p>© Albino</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BottomList from 'base/bottom-list/bottom-list'

  export default {
    components: {
      BottomList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .footer-wrapper
    display: flex
    flex-direction: column
    background-color: #000000
    color: #f5f5f5
    .line
      padding: 30px 0 0 0
      border-bottom: 0.5px solid #f5f5f5
    .footer
      margin: 0 auto
      text-align: center
      .footer-list
        padding-top: 30px
        text-align: center
      .footer-bottom
        font-size: 12px
        margin-top: 50px
        p
          padding: 15px 0 60px 0

</style>
