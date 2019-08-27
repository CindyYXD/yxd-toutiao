// 负责用户 存储 获取 删除
const key = 'toutiao-user'
export default {
  setUser (user) {
    // 储存用户信息
    // 转为json格式
    const jsonStr = JSON.stringify(user)
    // 保存数据
    window.sessionStorage.setItem(key, jsonStr)
  },
  getUser () {
    //   获取用户信息
    const jsonStr = window.sessionStorage.getItem(key) || '{}'
    // {}.token  返回的值是 undefined  不会报错
    return JSON.parse(jsonStr)
  },
  delUser () {
    //   删除用户信息
    window.sessionStorage.removeItem(key)
  }
}
