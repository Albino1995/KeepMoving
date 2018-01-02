<template>
  <div>
    <div class="button-wrapper">
      <rd-drop-button text="筛选" v-show="total !== 0">
        <rd-button>
          <router-link :to="`/search-results/${$route.params.keyword}?ordering=price`">
            <span>价格 ↑</span>
          </router-link>
        </rd-button>
        <rd-button>
          <router-link :to="`/search-results/${$route.params.keyword}?ordering=-price`">
            <span>价格 ↓</span>
          </router-link>
        </rd-button>
        <rd-button>
          <router-link :to="`/search-results/${$route.params.keyword}?ordering=sold_num`">
            <span>销量 ↑</span>
          </router-link>
        </rd-button>
        <rd-button>
          <router-link :to="`/search-results/${$route.params.keyword}?ordering=-sold_num`">
            <span>销量 ↓</span>
          </router-link>
        </rd-button>
      </rd-drop-button>
    </div>
    <good-list :title="title" :goods="category" :adjust=true v-if="params.search !== ''"></good-list>
    <loading v-show="showMore && params.search !== ''"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSearchResults} from 'api/api'
  import GoodList from 'base/good-list/good-list'
  import Loading from 'base/loading/loading'
  import {rdDropButton, rdButton} from 'radon-ui'
  import 'radon-ui/dist/radon-ui.css'

  const footerHeight = 1000
  const pageSize = 12

  export default {
    data() {
      return {
        category: [],
        title: '',
        params: {
          search: '',
          page: '1'
        },
        getGoodFlag: false,
        getMoreFlag: true,
        flag: true,
        total: 0
      }
    },
    created() {
      this._initCategory()
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    watch: {
      '$route.params': '_initCategory'
    },
    methods: {
      _initCategory() {
        this.category = []
        this.params.search = this.$route.params.keyword
        this.params.page = 1
        this.showMore = true
        this.getGoodFlag = false
        this.getMoreFlag = true
        this.total = 0
        if (!this.params.search || this.params.search.match(/^\s+$/)) {
          this.params.search = ''
          return
        }
        if (this.params.search) {
          this._getGoods()
        }
      },
      _normalizeTitle() {
        this.title = '搜索结果 / ' + this.total + '件商品'
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
        getSearchResults(this._normalizeItem()).then((res) => {
          this.category = res.data.results
          this.total = res.data.count
          this._normalizeTitle()
          if (this.total < pageSize) {
            this.showMore = false
          }
          this.getGoodFlag = true
        })
      },
      handleScroll() {
        // 没获取到total或者获取更多商品没完成直接返回
        if (!this.getGoodFlag || !this.getMoreFlag) {
          return
        }
        // 滚动到底部
        if (document.body.scrollHeight - window.scrollY < footerHeight) {
          this.getMoreFlag = false
          if (this.total <= pageSize || this.showMore === false) {
            return
          }
          this.params.page++
          this.getMore()
        }
      },
      getMore() {
        getSearchResults(this._normalizeItem()).then((res) => {
          if (!res.data.next) {
            this.showMore = false
          }
          this.category = this.category.concat(res.data.results)
          this.getMoreFlag = true
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
