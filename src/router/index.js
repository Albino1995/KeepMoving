import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (resolve) => {
  import('components/home/home').then((module) => {
    resolve(module)
  })
}

const GoodDetail = (resolve) => {
  import('components/good-detail/good-detail').then((module) => {
    resolve(module)
  })
}

const Category = (resolve) => {
  import('components/category/category').then((module) => {
    resolve(module)
  })
}

const SearchResults = (resolve) => {
  import('components/search-results/search-results').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Home
    },
    {
      path: '/good/:id',
      component: GoodDetail
    },
    {
      path: '/category/:item1/:item2',
      component: Category
    },
    {
      path: '/category/:item1/:item2',
      component: Category
    },
    {
      path: '/search-results/:keyword',
      component: SearchResults
    }
  ]
})
