import axios from 'axios'

let host = 'http://127.0.0.1:8000'

// 获取轮播图
export const getBanner = () => {
  return axios.get(`${host}/banners/`)
}
// 获取商品
export const getGood = params => {
  if (params.gender2 === 'neutral') {
    return axios.get(`${host}/goods/?is_new=${params.is_new}&is_sale=${params.is_sale}&is_hot=${params.is_hot}&gender=${params.gender1}&gender=${params.gender2}&category=${params.category}&ordering=${params.ordering}`)
  }
  if (params.gender1 === '' && params.gender2 === '') {
    return axios.get(`${host}/goods/?is_new=${params.is_new}&is_sale=${params.is_sale}&is_hot=${params.is_hot}&category=${params.category}&ordering=${params.ordering}`)
  }
}
