export type UserModel = {
  id: number
  name: string
  email: string
  deleted: boolean
  permissions: {
    [permission: string]: string
  }
  createdAt: string
  updatedAt: string
}
