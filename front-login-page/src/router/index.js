import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
  ]
})

export default router
