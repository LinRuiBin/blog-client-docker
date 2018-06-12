import http from './public'

export const login = (params) => {
  return http.fetchPost('/login/', params)
}

// 注册
export const register = (params) => {
  return http.fetchPost('/users/', params)
}

// 短信
export const getMessage = (params) => {
  return http.fetchPost('/code/', params)
}

// 获取用户信息
export const getUserDetail = () => {
  return http.fetchGet('/users/1/')
}

// 修改用户信息
export const updateUserInfo = (params) => {
  return http.fetchPatch('/users/1/', params)
}
