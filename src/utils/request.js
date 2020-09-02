import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$base = 'http://localhost:3000'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // console.log('token失效拉')
    // 1. 跳转到登录页面
    router.push('/login')
    // 2. 清除失效的信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 3. 给提示  用户验证失败
    Toast.fail('登录信息失效')
  }
  return response
})
