import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home-page.vue'
import RetirementPage from '@/views/retirement-page.vue'
import InvestmentPage from '@/views/investment-page.vue'
import LoginPage from '@/views/login-page.vue'
import userPage from '@/views/user-page.vue'
import { useAuthStore } from '@/stores/auth.store'
import OverviewPage from '@/views/overview-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        hideMenu: true
      }
    },
    {
      path: '/overview',
      name: 'overview',
      component: OverviewPage
    },
    {
      path: '/retirement',
      name: 'retirement',
      component: RetirementPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/investment',
      name: 'investment',
      component: InvestmentPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/user',
      name: 'user',
      component: userPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth) {
    if (!authStore.isLoggedIn) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
