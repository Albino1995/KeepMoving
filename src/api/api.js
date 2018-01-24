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
// 获取购物车
export const getShoppingCart = () => {
  return axios.get(`${host}/shoppingcarts/`)
}
// 添加购物车
export const addShoppingCart = params => {
  return axios.post(`${host}/shoppingcarts/`, params)
}
// 删除购物车
export const deleteShoppingCart = id => {
  return axios.delete(`${host}/shoppingcarts/` + id + '/')
}
// 更新购物车
export const updateShoppingCart = (id, params) => {
  return axios.patch(`${host}/shoppingcarts/` + id + '/', params)
}
// 登录
export const login = params => {
  return axios.post(`${host}/login/`, params)
}
// 注册
export const register = params => {
  return axios.post(`${host}/users/`, params)
}
// 验证码
export const getCode = params => {
  return axios.post(`${host}/codes/`, params)
}
// 获取用户收藏
export const getUserFav = id => {
  if (id) {
    return axios.get(`${host}/userfavs/` + id + '/')
  }
  return axios.get(`${host}/userfavs/`)
}
// 添加用户收藏
export const addUserFav = params => {
  return axios.post(`${host}/userfavs/`, params)
}
// 删除用户收藏
export const deleteUserFav = id => {
  return axios.delete(`${host}/userfavs/` + id + '/')
}
// 获取用户信息
export const getUserInfo = () => {
  return axios.get(`${host}/users/1/`)
}
// 修改用户信息
export const updateUserInfo = (params) => {
  return axios.patch(`${host}/users/1/`, params)
}
// 获取收货地址
export const getAddress = () => {
  return axios.get(`${host}/address/`)
}
