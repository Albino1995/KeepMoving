import axios from 'axios'
import store from '../../store'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.userInfo.token) {
      config.headers.Authorization = `JWT ${store.state.userInfo.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error.response.data)
  })
