import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
// import qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 15000, // 请求超时时间
  transformRequest: [(data, config) => {
    console.log(data, config)
    return data
  }]
})

// request拦截器
service.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'multipart/form-data'
    // 如果存储的有 token 则添加到 header 中
    if (store.getters.token) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data.state
    if (res.code === '00') {
      return response.data.data
    } else if (res.code === '10') {
      Message({
        message: res.msg,
        type: 'success',
        duration: 5 * 1000
      })
      return response.data.data
    } else if (res.code === '0010002' || res.code === '0010003') {
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (res.code[0] === '1') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject('error')
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
