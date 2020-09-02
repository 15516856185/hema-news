import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
// 引入rem
import 'amfe-flexible'
// 引入全局组件
import './utils/global'
// 引入ajax请求
import './utils/request'
// 引入vant组件
import './utils/vant'
// 引入过滤器
import './utils/fiflter'
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
