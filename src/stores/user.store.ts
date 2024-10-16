import type { CreateUserPayload, User } from '@/models/user.model'
import { defineStore } from 'pinia'
import { userService } from '@/services/user.service'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[]
  }),
  actions: {
    async createUser(user: CreateUserPayload) {
      await userService.createUser(user)
      await this.getUsers()
    },
    async getUsers() {
      this.users = await userService.getUsers()
    },
    async updateUser(updatedUser: User) {
      await userService.updateUser(updatedUser)
      await this.getUsers()
    },
    async deleteUser(userId: string) {
      await userService.deleteUser(userId)
      await this.getUsers()
    }
  }
})
