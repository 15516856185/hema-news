import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/User.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/user', component: User },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})

export default router
