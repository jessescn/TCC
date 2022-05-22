import { faker } from '@faker-js/faker'
import { UserModel } from 'models/user'

export class UserMockBuilder {
  private id = 0
  private permissions = {}
  private email = ''
  private name = ''
  private password = ''
  private deleted = false

  fill() {
    this.id = faker.datatype.number()
    this.email = faker.internet.email()
    this.name = faker.name.findName()
    this.password = faker.internet.password()
    this.deleted = faker.datatype.boolean()

    return this
  }

  generate(size = 1) {
    const result: UserModel[] = []

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
      permissions: this.permissions
    }
  }
}
