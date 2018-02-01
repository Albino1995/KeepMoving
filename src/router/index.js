import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

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

const ShoppingCart = (resolve) => {
  import('components/shopping-cart/shopping-cart').then((module) => {
    resolve(module)
  })
}

const UserCenter = (resolve) => {
  import('components/user-center/user-center').then((module) => {
    resolve(module)
  })
}

const Address = (resolve) => {
  import('components/address/address').then((module) => {
    resolve(module)
  })
}

const Order = (resolve) => {
  import('components/order/order').then((module) => {
    resolve(module)
  })
}

const Checkout = (resolve) => {
  import('components/checkout/checkout').then((module) => {
    resolve(module)
  })
}

const Success = (resolve) => {
  import('components/success/success').then((module) => {
    resolve(module)
  })
}

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/index',
      component: Home,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/good/:id',
      component: GoodDetail,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/category/:item1/:item2',
      component: Category,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/search-results/:keyword',
      component: SearchResults,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/me',
      redirect: '/me/info',
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/me/info',
      component: UserCenter,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/favourites',
      component: Favourites,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/shopping_cart',
      component: ShoppingCart,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/me/address',
      component: Address,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/me/order',
      component: Order,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/checkout',
      component: Checkout,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/success',
      component: Success,
      meta: {
        requireLogin: true
      }
    }
  ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    if (store.state.userInfo.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
