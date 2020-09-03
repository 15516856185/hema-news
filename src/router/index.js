import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import Edit from '../views/user/Edit.vue'
import myfollow from '../views/user/MyFollow.vue'
import photo from '../views/user/photo.vue'
import comment from '../views/user/MyComment.vue'
import mystar from '../views/user/mystar.vue'
import index from '../views/index/index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: Edit, name: 'edit' },
  { path: '/myfollow', component: myfollow, name: 'myfollow' },
  { path: '/photo', component: photo, name: 'photo' },
  { path: '/comment', component: comment, name: 'comment' },
  { path: '/mystar', component: mystar, name: 'mystar' },
  { path: '/', component: index, name: 'index' }
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
  const arr = ['user', 'edit', 'myfollow', 'comment', 'mystar']
  if (!arr.includes(to.name) || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})
export default router
