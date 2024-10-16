import type { User } from '@/models/user.model'
import { userService } from './user.service'

const AUTH_USER_KEY = 'authUser'

export const authService = {
  login,
  logout,
  getAuthenticatedUser
}

async function login(email: string, password: string) {
  const users = await userService.getUsers()
  const user = users.find((user: User) => user.email === email && user.password === password)

  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    return user
  } else {
    throw new Error('Invalid username or password')
  }
}

async function logout() {
  localStorage.removeItem(AUTH_USER_KEY)
}

async function getAuthenticatedUser() {
  const user = localStorage.getItem(AUTH_USER_KEY)
  return user ? JSON.parse(user) : null
}
