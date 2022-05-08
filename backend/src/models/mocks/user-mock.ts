import { UserModel } from 'src/types/user'

export class UserMock {
  private id = 0
  private permissions = {}
  private email = ''
  private name = ''
  private password = ''
  private deleted = false
  private createdAt = new Date()
  private updatedAt = new Date()

  build(): UserModel {
    return {
      id: this.id,
      email: this.email,
      deleted: this.deleted,
      name: this.name,
      password: this.password,
      permissions: this.permissions,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
