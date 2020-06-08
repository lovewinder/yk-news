import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // 配置路由规则
  routes: [
    { path: '/', component: Home }
  ]
})

// const AuthUrls = [
//   '/profile',
//   '/edit-profile',
//   '/follow',
//   '/my-comments',
//   '/my-favorite'
// ]
// 给路由对象注册前置导航守卫
// to: 到哪儿去
// from: 从哪儿来
// next: 是一个函数, next(): 表示放行
// router.beforeEach(function (to, from, next) {
//   // 判断用户是否登录
//   const token = localStorage.getItem('token')
//   // 如果是去个人中心,不判断,直接去
//   if (AuthUrls.includes(to.path)) {
//     if (token) {
//       next()
//     } else {
//       // 在未登录的情况下,从首页跳转到个人中心,最终会跳转到login, profile没有正确的跳转
//       // next('/login') 会报一个错, 是vue-router的缘故
//       // 推荐使用
//       router.push('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router
