<template>
  <div class="search-wrapper">
    <input :placeholder="placeholder" v-model=keyword />
    <router-link v-if="keyword" :to="`/search-results/${keyword}`" tag="img" class="search" src='../../../static/search.png' width="14" height="14">
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        keyword: ''
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '搜索商品...'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .search-wrapper
    position: absolute
    width: 150px
    right: 30px
    top: 110px
    input
      width: 145px
      padding: 5px 0 5px 5px
      font-size: 14px
      letter-spacing: 1px
      outline: none
      border-bottom: 1px solid #000000
    .search
      position: inherit
      right: 0px
      top: 5px
      cursor: pointer
</style>
