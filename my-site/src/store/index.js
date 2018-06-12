import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './action'
import * as getters from './getters'
Vue.use(Vuex)

const state = {
  login: false, // 是否登录
  // 用户信息
  userInfo: {
    'name': '',
    'token': '',
    'avatar': ''
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
