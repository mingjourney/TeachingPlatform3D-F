import axios from 'axios'
import { store } from '../redux/store'

const service = axios.create({
  timeout: 5000
})
// 设置axios的基本URL，根据前端开发或后端开发环境来切换
service.defaults.baseURL = '/api' // 后端开发测试
service.defaults.timeout = 1000

// 请求拦截器
service.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : ''
    token && (config.headers.token = token)
    store.dispatch({
      type: 'change_loading',
      isLoading: true
    })
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  function (response) {
    const res = response.data
    store.dispatch({
      type: 'change_loading',
      isLoading: false
    })
    if (res.code !== '20000') {
      console.log('接口信息报错', res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  function (error) {
    // 当响应出错时，也将isLoading设置为false
    store.dispatch({
      type: 'change_loading',
      isLoading: false
    })
    console.log('接口信息报错' + error)

    return Promise.reject(error)
  }
)
export default service
