// 引入vue
// import Vue from 'vue'
import axios from 'axios'
// 全局状态控制引入
import store from '../store'
// import * as types from '../store/mutation-types'
// import router from '../router'
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.userInfo.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `JWT ${store.state.userInfo.token}`
      console.log('带上获得token' + store.state.userInfo.token)
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  undefined,
  error => {
    let res = error.response
    // DEBUG:
    console.log('网络拦截器' + res)
    switch (res.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        // store.commit(types.LOGOUT);
        // alert('您尚未登录哦')
        // router.replace({
        //   path: '/login',
        //   query: {redirect: router.currentRoute.fullPath}
        // })
        break
      case 403:
        // alert('您没有该操作权限')
        // alert('您没有该操作权限');
        break
      case 500:
        // console.log('服务器错误')
        // alert('服务器错误');
        break
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })
