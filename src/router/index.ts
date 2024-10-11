import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home-page.vue'
import RetirementPage from '@/views/retirement-page.vue'
import InvestmentPage from '@/views/investment-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/retirement',
      name: 'retirement',
      component: RetirementPage
    },
    {
      path: '/investment',
      name: 'investment',
      component: InvestmentPage
    }
  ]
})

export default router
