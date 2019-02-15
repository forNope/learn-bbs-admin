import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/map/js/china'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
window.vue = Vue
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
window.router = router
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
