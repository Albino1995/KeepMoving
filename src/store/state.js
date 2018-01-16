import cookie from 'common/js/cookie'

const state = {
  userInfo: {
    name: cookie.getCookie('name') || '',
    token: cookie.getCookie('token') || ''
  }
}

export default state
