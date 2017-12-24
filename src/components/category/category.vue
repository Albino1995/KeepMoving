<template>
  <div>
    <router-link :to="`/category/${$route.params.item1}/${$route.params.item2}?ordering=price`">
      <span>价格↑</span>
    </router-link>
    <router-link :to="`/category/${$route.params.item1}/${$route.params.item2}?ordering=-price`">
      <span>价格↓</span>
    </router-link>
    <router-link :to="`/category/${$route.params.item1}/${$route.params.item2}?ordering=sold_num`">
      <span>人气↑</span>
    </router-link>
    <router-link :to="`/category/${$route.params.item1}/${$route.params.item2}?ordering=-sold_num`">
      <span>人气↓</span>
    </router-link>
    <good-list :title="title" :goods="category"></good-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getGood} from 'api/api'
  import GoodList from 'base/good-list/good-list'

  export default {
    data() {
      return {
        category: [],
        title: '',
        params: {
          gender1: '',
          gender2: '',
          category: '',
          is_sale: '',
          is_new: '',
          is_hot: '',
          ordering: ''
        }
      }
    },
    created() {
      this.__init()
    },
    watch: {
      '$route.params': '__init'
    },
    methods: {
      __init() {
        this.category = []
        this.item1 = this.$route.params.item1
        this.item2 = this.$route.params.item2
        this.params = {
          gender1: '',
          gender2: '',
          category: '',
          is_sale: '',
          is_new: '',
          is_hot: '',
          ordering: ''
        }
        this._getGoods()
        this._normalizeTitle()
      },
      _normalizeTitle() {
        let bread1 = ''
        let bread2 = ''
        if (this.item1 === 'male') {
          bread1 = '男士'
        }
        if (this.item1 === 'female') {
          bread1 = '女士'
        }
        if (this.item1 === 'new') {
          bread1 = '新品'
        }
        if (this.item1 === 'sale') {
          bread1 = '大减价'
        }
        if (this.item2 === 'sneakers') {
          bread2 = '踩的'
        }
        if (this.item2 === 'clothing') {
          bread2 = '穿的'
        }
        if (this.item2 === 'accessories') {
          bread2 = '戴的'
        }
        this.title = bread1 + ' / ' + bread2
      },
      _normalizeItem() {
        if (this.item1 === 'male' || this.item1 === 'female') {
          this.params.gender1 = this.item1
          this.params.gender2 = 'neutral'
        }
        if (this.item1 === 'new') {
          this.params.is_new = true
        }
        if (this.item1 === 'sale') {
          this.params.is_sale = true
        }
        if (this.item2 === 'sneakers') {
          this.params.category = '踩的'
        }
        if (this.item2 === 'clothing') {
          this.params.category = '穿的'
        }
        if (this.item2 === 'accessories') {
          this.params.category = '戴的'
        }
        // 排序
        let href = window.location.href
        let val = href.match(/ordering=(.*)/)
        if (val) {
          this.params.ordering = val[1]
        }
        return this.params
      },
      _getGoods() {
        getGood(this._normalizeItem()).then((res) => {
          this.category = res.data.results
          return this.category
        })
      }
    },
    components: {
      GoodList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
