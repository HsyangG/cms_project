/**
 * 获取 token
 */
import Cookie from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookie.get(TokenKey)
}

export function setToken(token) {
  return Cookie.set(TokenKey, token)
}

export function removeToken() {
  return Cookie.remove(TokenKey)
}

// 检查是否登录，如果未登录则跳转至登录页并抛出异常，中断操作
export function isLogin (redirect = false) {
  return new Promise ((resolve, reject) => {
    let token = getToken()
    if (!token) {
      // 未登录则强制登录
      if (redirect) {
        window.location.href = process.env.BASE_API + '/login'
      }
      return reject('该用户尚未登陆')
    }
    return resolve()
  })
}
