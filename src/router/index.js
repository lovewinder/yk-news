import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile.vue'
import EditProfile from '../pages/EditProfile.vue'
import Follow from '../pages/Follow.vue'
import Test from '../pages/Test.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // 配置路由规则
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile },
    { path: '/edit-profile', component: EditProfile },
    { path: '/follow', component: Follow },
    { path: '/test', component: Test }
  ]
})

const AuthUrls = [
  '/profile',
  '/edit-profile',
  '/follow'
]
// 给路由对象注册前置导航守卫
// to: 到哪儿去
// from: 从哪儿来
// next: 是一个函数, next(): 表示放行
router.beforeEach(function (to, from, next) {
  // 判断用户是否登录
  const token = localStorage.getItem('token')
  // 如果是去个人中心,不判断,直接去
  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
