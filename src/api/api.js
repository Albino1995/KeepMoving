import axios from 'axios'

let host = 'http://127.0.0.1:8000'

// 获取轮播图
export const getBanner = () => {
  return axios.get(`${host}/banners/`)
}
// 获取商品
export const getGood = params => {
  if (params.gender2 === 'neutral') {
    return axios.get(`${host}/goods/?is_new=${params.is_new}&is_sale=${params.is_sale}&is_hot=${params.is_hot}&gender=${params.gender1}&gender=${params.gender2}&category=${params.category}&ordering=${params.ordering}&page=${params.page}`)
  }
  return axios.get(`${host}/goods/`, {params: params})
}
// 添加购物车
export const addShoppingCart = params => {
  return axios.post(`${host}/shoppingcarts/`, params)
}
// 添加收藏
export const addFavourite = params => {
  return axios.post(`${host}/userfavs/`, params)
}
// 登录
export const login = params => {
  return axios.post(`${host}/login/`, params)
}
// 注册
export const register = params => {
  return axios.post(`${host}/users/`, params)
}
