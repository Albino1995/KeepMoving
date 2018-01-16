import * as types from './mutation-types'
import cookie from 'common/js/cookie'

const mutations = {
  [types.SET_USER_INFO](state) {
    state.userInfo = {
      name: cookie.getCookie('name'),
      token: cookie.getCookie('token')
    }
  }
}

export default mutations
