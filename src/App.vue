<template>
  <div id="app">
    <k-header></k-header>
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
    <k-footer></k-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import KHeader from 'components/k-header/k-header'
  import KFooter from 'components/k-footer/k-footer'

  export default {
    components: {
      KHeader,
      KFooter
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
