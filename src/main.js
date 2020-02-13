import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import 'lib-flexible'

import './styles/base.css'
import './styles/iconfont.css'

import YkButton from './components/YkButton.vue'
import YkInput from './components/YkInput.vue'
import YkCellNav from './components/YkCellNav.vue'
import YkHeader from './components/YkHeader.vue'

import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'

import moment from 'moment'

Vue.config.productionTip = false
Vue.component('yk-button', YkButton)
Vue.component('yk-input', YkInput)
Vue.component('yk-cell-nav', YkCellNav)
Vue.component('yk-header', YkHeader)

// 会将所有的vant组件都全局注册
Vue.use(Vant)

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
// 拦截器
axios.interceptors.request.use(function (request) {
  const token = localStorage.getItem('token')
  if (token) {
    request.headers.Authorization = token
  }
  // request是请求相关的配置,并不是request本身
  return request
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 如果响应401,都跳转到登录页面
  // 感觉这里应该用'||'
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')

    // 给一个提示消息
    Toast.fail('用户信息验证失败')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

Vue.filter('time', function (input) {
  return moment(input).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
