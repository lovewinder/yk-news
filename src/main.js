import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'lib-flexible'

import './styles/base.css'
import './styles/iconfont.css'

import YkButton from './components/YkButton.vue'
import YkInput from './components/YkInput.vue'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.component('yk-button', YkButton)
Vue.component('yk-input', YkInput)

// 会将所有的vant组件都全局注册
Vue.use(Vant)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
