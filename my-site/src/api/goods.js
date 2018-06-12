import http from './public'
// 商品列表
export const getAllGoods = (params) => {
  return http.fetchGet('/goods/allGoods', params)
}

// 加入购物车
export const addCart = (params) => {
  return 'success'
}
