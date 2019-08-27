import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import notfont from '@/views/404'
import store from '@/store'
import test from '@/views/test'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/test', component: test },
    {
      path: '/',
      component: home,
      children: [
        { path: '/', name: 'welcome', component: welcome }
      ]
    },
    { path: '*', name: 'notfont', component: notfont }
  ]
})

// 前置守卫
router.beforeEach((to, from, next) => {
  // if (to.path === '/login') return next() // 去的路径是登录的时候放行
  // if (!store.getUser().token) return next('/login') // 不是登录的时候 且 并没有登录 拦截登录页面
  // next() // 其他情况 放行
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
