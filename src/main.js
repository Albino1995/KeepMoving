import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import Viewer from 'v-viewer'
import Element from 'element-ui'
import store from './store'

import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'common/stylus/index.styl'

Vue.use(Viewer)

Vue.use(Element, { size: 'small' })

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
