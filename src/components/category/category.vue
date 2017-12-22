<template>
  <div>
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
        title: ''
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
        let params = {
          gender: '',
          category: '',
          is_sale: '',
          is_new: ''
        }
        if (this.item1 === 'male' || this.item1 === 'female') {
          params.gender = this.item1
        }
        if (this.item1 === 'new') {
          params.is_new = true
        }
        if (this.item1 === 'sale') {
          params.is_sale = true
        }
        if (this.item2 === 'sneakers') {
          params.category = '踩的'
        }
        if (this.item2 === 'clothing') {
          params.category = '穿的'
        }
        if (this.item2 === 'accessories') {
          params.category = '戴的'
        }
        return params
      },
      _getGoods() {
        getGood(this._normalizeItem()).then((res) => {
          this.category = res.data.results
          if (!this._normalizeItem().gender) {
            return this.category
          }
          if (this._normalizeItem().gender !== '') {
            this._pushNeutral()
          }
        })
      },
      _pushNeutral() {
        let params = {
          gender: 'neutral',
          category: this._normalizeItem().category,
          is_sale: '',
          is_new: ''
        }
        getGood(params).then((res) => {
          this.category = this.category.concat(res.data.results)
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
