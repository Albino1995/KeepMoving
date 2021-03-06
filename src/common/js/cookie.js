let cookie = {
  // 创建cookie
  setCookie (cName, value, expiredays) {
    let exdate = new Date()
    exdate.setTime(exdate.getTime() + expiredays)
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = cName + '=' + escape(value) + ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString())
  },
  // 获取cookie
  getCookie(cName) {
    let reg = new RegExp('(^| )' + cName + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return (arr[2])
    } else {
      return null
    }
  },
  // 删除cookie
  delCookie(cName) {
    let cVal = cookie.getCookie(cName)
    if (cVal !== null) {
      document.cookie = cName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
  }
}

export default cookie
