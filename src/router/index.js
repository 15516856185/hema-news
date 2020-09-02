import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import myfollow from '../views/MyFollow.vue'
import photo from '../views/photo.vue'
import comment from '../views/MyComment.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: Edit, name: 'edit' },
  { path: '/myfollow', component: myfollow, name: 'myfollow' },
  { path: '/photo', component: photo, name: 'photo' },
  { path: '/comment', component: comment, name: 'comment' }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function (to, from, next) {
  // if (to.name === 'user') {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }
  const token = localStorage.getItem('token')
  const arr = ['user', 'edit', 'myfollow', 'comment']
  if (!arr.includes(to.name) || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})
export default router
