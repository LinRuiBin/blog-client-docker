import * as types from './mutation-types'
import Vue from 'vue'
import Axios from 'axios'
import { getStore } from '../utils/storage'
Vue.prototype.$http = Axios

export default {
  [types.SET_INFO] (state) {
    state.userInfo = {
      name: getStore('name'),
      token: getStore('token')
    }
    console.log('缓存token' + state.userInfo)
  }
}
