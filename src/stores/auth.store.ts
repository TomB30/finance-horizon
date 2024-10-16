import type { User, UserCredentials } from '@/models/user.model'
import { defineStore } from 'pinia'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedInUser: null as User | null
  }),
  getters: {
    isLoggedIn: (state) => !!state.loggedInUser
  },
  actions: {
    async login(userCredentials: UserCredentials) {
      try {
        this.loggedInUser = await authService.login(userCredentials.email, userCredentials.password)
      } catch (error) {
        console.error(error)
      }
    },
    async logout() {
      await authService.logout()
      this.loggedInUser = null
    },
    async getAuthenticatedUser() {
      this.loggedInUser = await authService.getAuthenticatedUser()
    }
  }
})
