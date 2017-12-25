<template>
  <div>
    <div class="button-wrapper">
      <rd-drop-button text="筛选">
        <rd-button>
          <router-link :to="`/category/${$route.params.item1}/${$route.params.item2}?ordering=price`">
            <span>价格 ↑</span>
          </router-link>
        </rd-button>
        <rd-button>
          <router-link :to="`/category/${$route.params.item1}/${$route.params.item2}?ordering=-price`">
            <span>价格 ↓</span>
          </router-link>
        </rd-button>
        <rd-button>
          <router-link :to="`/category/${$route.params.item1}/${$route.params.item2}?ordering=sold_num`">
            <span>销量 ↑</span>
          </router-link>
        </rd-button>
        <rd-button>
          <router-link :to="`/category/${$route.params.item1}/${$route.params.item2}?ordering=-sold_num`">
            <span>销量 ↓</span>
          </router-link>
        </rd-button>
      </rd-drop-button>
    </div>
    <good-list :title="title" :goods="category"></good-list>
    <loading v-show="showMore && total > 12"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getGood} from 'api/api'
  import GoodList from 'base/good-list/good-list'
  import Loading from 'base/loading/loading'
  import {rdDropButton, rdButton} from 'radon-ui'
  import 'radon-ui/dist/radon-ui.css'

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
          ordering: '',
          page: '1'
        },
        showMore: true,
        flag: true,
        total: 0
      }
    },
    created() {
      this.__init()
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
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
          ordering: '',
          page: '1'
        }
        this.showMore = true
        this.flag = true
        this.total = 0
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
          this.total = res.data.count
          this.category = res.data.results
        })
      },
      handleScroll() {
        if (!this.flag) {
          return
        }
        const footerHeight = 1000
        const pageSize = 12
        // 滚动到底部
        if (document.body.scrollHeight - window.scrollY < footerHeight) {
          this.flag = false
          if (!this.showMore || this.total <= pageSize || !this.total) {
            return
          }
          this.params.page ++
          this.getMore()
        }
      },
      getMore() {
        getGood(this._normalizeItem()).then((res) => {
          if (!res.data.next) {
            this.showMore = false
          }
          this.category = this.category.concat(res.data.results)
          this.flag = true
        })
      }
    },
    components: {
      GoodList,
      Loading,
      rdDropButton,
      rdButton
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .button-wrapper
    position: absolute
    right: 30px
    top: 240px
    z-index: 50
    span
      letter-spacing: 1px
</style>
