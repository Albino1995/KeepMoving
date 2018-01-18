<template>
  <div class="no-result">
    <div class="no-result-icon">
      <img src="./star.png" height="128" width="128"/>
    </div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .no-result
    text-align: center
    .no-result-icon
      margin-top: 30px
    .no-result-text
      margin: 30px 0
      font-size: 14px
      color: #696969
</style>
