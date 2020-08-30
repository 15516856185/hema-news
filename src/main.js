import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import MyHeader from './compoents/MyHeader.vue'
import mylogo from './compoents/MyLogo.vue'
import axios from 'axios'
import Navitem from './compoents/Navitem.vue'
import moment from 'moment'
// import moment from 'moment'
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(Vant)
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
Vue.component('navitem', Navitem)
Vue.config.productionTip = false
Vue.component('MyHeader', MyHeader)
Vue.component('Mylogo', mylogo)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
