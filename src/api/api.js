import axios from 'axios'

let host = 'http://127.0.0.1:8000'

// 获取轮播图
export const getBanner = () => {
  return axios.get(`${host}/banners/`)
}
// 获取商品
export const getGood = params => {
  return axios.get(`${host}/goods/`, {params: params})
}
