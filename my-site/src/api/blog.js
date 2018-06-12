import http from './public'
// 商品列表
export const getAllArticles = (params) => {
  return http.fetchGet('/articles/', params)
}

export const getArticleByPage = page => {
  return http.fetchGet('/articles/' + '?page=' + page)
}

export const createArticle = (params) => {
  return http.fetchPost('/articles/', params)
}

export const getArticle = articleId => {
  return http.fetchGet('/articles/' + articleId + '/')
}

export const getAllLabels = (params) => {
  return http.fetchGet('/labels/', params)
}

export const getArticlesForLabel = labelId => {
  return http.fetchGet('/labels/' + labelId + '/')
}

export const getArticlesForLabelByPage = (labelId, pageId) => {
  return http.fetchGet('/labels/' + labelId + '/' + '?page=' + pageId)
}

export const getHomeArticles = (params) => {
  return http.fetchGet('/homeArticles/', params)
}
