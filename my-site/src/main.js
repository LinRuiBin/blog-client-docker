// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 全局加载resource拦截器
import './axios/'
import Axios from 'axios'
Vue.prototype.$http = Axios

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(mavonEditor)
Vue.use(VueLazyload, {
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
