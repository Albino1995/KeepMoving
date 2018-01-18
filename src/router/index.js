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

const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module)
  })
}

const Register = (resolve) => {
  import('components/register/register').then((module) => {
    resolve(module)
  })
}

const Favourites = (resolve) => {
  import('components/favourites/favourites').then((module) => {
    resolve(module)
  })
}

const UserCenter = (resolve) => {
  import('components/user-center/user-center').then((module) => {
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
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/me',
      redirect: '/me/info'
    },
    {
      path: '/me/info',
      component: UserCenter
    },
    {
      path: '/favourites',
      component: Favourites
    }
  ]
})
