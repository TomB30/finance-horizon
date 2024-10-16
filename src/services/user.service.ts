import type { CreateUserPayload, User } from '@/models/user.model'

const USERS_KEY = 'users'

export const userService = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
}

async function createUser(userToCreate: CreateUserPayload) {
  const users = await getUsers()
  const user: User = {
    ...userToCreate,
    id: Date.now() + ''
  }

  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

async function getUsers() {
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

async function updateUser(updatedUser: User) {
  let users = await getUsers()
  users = users.map((user: User) => (user.id === updatedUser.id ? updatedUser : user))
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

async function deleteUser(userId: string) {
  let users = await getUsers()
  users = users.filter((user: User) => user.id !== userId)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
