import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 在跨域时发送cookie
  timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 做一些事情，在请求拦截之前

    if (store.getters.token !== '') {
      // 请求携带token
      // ['X-Token'] is a custom headers key
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(

  response => {
    const res = response
    // 状态码不为200显示错误
    if (res.data.code !== 200 && res.data.code !== 204) {
      Message({
        message: res.data.msg || '错误',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:不合法token; 50012:其他客户端登录; 50014: Token 过期;
      if (res.data.code === 50008 || res.data.code === 50012 || res.data.code === 50014) {
        // to re-login
        MessageBox.confirm('你已经登出, 你可以取消等待在这个页面, 或者再次登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.data.msg || '错误'))
    } else {
      return res
    }
  },
  error => {
    console.log('错误' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
