export interface User {
  password: string
  email: string
  fullName: string
  id: string
}

export interface CreateUserPayload {
  password: string
  email: string
  fullName: string
}

export interface UserCredentials {
  email: string
  password: string
}
