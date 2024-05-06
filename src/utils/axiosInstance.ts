import axios from 'axios'
// import { message } from 'antd'
// import { useDispatch } from 'react-redux'
import { store } from '@/store/store'
import { showMessage } from '@/store/features/messageSlice'
// import { showMessage } from '@/store/features/messageSlice'
const service = axios.create()
// 设置axios的基本URL，根据前端开发或后端开发环境来切换
service.defaults.baseURL = '/api' // 后端开发测试
service.defaults.timeout = 5000
// const count = useSelector((state: RootState) => state.counter.value)
// const dispatch = useDispatch()
// 请求拦截器
service.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem('token')
      ? sessionStorage.getItem('token')
      : ''
    token && (config.headers['x-auth-token'] = token)
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
    const { code, message } = res
    store.dispatch(showMessage({ type: 'info', content: message }))
    if (code !== '20000') {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // dispatch(showMessage({ type: 'info', content: message }))
      return res
    }
  },
  function (error) {
    // 当响应出错时，也将isLoading设置为false
    // store.dispatch({
    //   type: 'change_loading',
    //   isLoading: false
    // })
    console.log('接口信息报错' + error)

    return Promise.reject(error)
  }
)
export default service
