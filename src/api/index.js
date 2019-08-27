// 配置一个符合项目需要的axios，到处去进行全局配置
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 公共根地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 请求头  token
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

// 请求拦截器
axios.interceptors.request.use(config => {
  // 修改配置 加token
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 获取状态码
  const status = err.response.status
  if (status === 401) {
    // 清空无效token
    store.delUser()
    // 跳转登陆
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
