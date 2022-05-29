import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
import '@/permission'

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
Vue.prototype.$baseUrl = 'http://49.232.203.36:2022'

Vue.use(ElementUI)

Vue.config.productionTip = false
// console.log = function() {}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
