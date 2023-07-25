import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw>  = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/HomeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
