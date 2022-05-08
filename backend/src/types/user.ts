export type UserModel = {
  id: number
  name: string
  email: string
  password: string
  deleted: boolean
  permissions: Record<string, string>
  createdAt?: Date
  updatedAt?: Date
}
