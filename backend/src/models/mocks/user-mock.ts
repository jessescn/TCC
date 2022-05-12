import { UserModel } from 'src/types/user'

import { faker } from '@faker-js/faker'

export class UserMock {
  private id = 0
  private permissions = {}
  private email = ''
  private name = ''
  private password = ''
  private deleted = false
  private createdAt = new Date()
  private updatedAt = new Date()

  fill() {
    this.id = faker.datatype.number()
    this.email = faker.internet.email()
    this.name = faker.name.findName()
    this.password = faker.internet.password()
    this.deleted = faker.datatype.boolean()
    this.createdAt = faker.date.past()
    this.updatedAt = faker.date.past()

    return this
  }

  generate(size = 1) {
    const result = []

    for (let i = 0; i < size; i++) {
      result.push(this.fill().build())
    }

    return result
  }

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
