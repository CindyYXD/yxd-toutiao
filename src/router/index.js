import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import notfont from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
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

export default router
