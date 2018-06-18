import axios from 'axios'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
let host = 'http://127.0.0.1:8888'
export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      console.log('调用接口' + host + url)
      axios.get(host + url, params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(host + url, params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPatch (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.patch(host + url, params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
