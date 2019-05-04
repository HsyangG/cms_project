/**
 * 请求拦截器
 * 统一封装 axios
 */
import Vue from 'vue'
import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    let token = getToken()
    if (token) {
      config.headers['Authorization'] = 'atlantic' + token // 让每个请求都带上自定义的 token
    }
    config.headers['Cache-Control'] = 'no-cache'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Accept'] = 'application/x-www-form-urlencoded'
    config.withCredentials = true
    config.credentials = 'same-origin'

    console.log(config.data.password)
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code == 40410432) {
      return Promise.reject(res)
    }
    if (res.code !== 0) {
      // Vue.$vux.toast.text(res.msg)
      // 401: token 已过期
      if (res.code == 401) {
        // 清空失效的 token
        setTimeout(() => {
          removeToken()
          console.log('重定向到首页')
          window.location.href = process.env.BASE_API + '/login'
        }, 1500)
      }
      return reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log(error)
    let message = '网络出现了一点小问题...'
    if (error.response && error.response.data && error.response.data.msg) {
      message = error.response.data.msg
    }
    // Vue.$vux.toast.text(message)
    return Promise.reject(error)
  }
)

export default service
