import { UserModel } from 'domain/models/user'
import { faker } from '@faker-js/faker'

export class UserMockBuilder {
  private email = faker.internet.email()
  private id = faker.datatype.number()
  private name = faker.word.noun()

  fill() {
    this.email = faker.internet.email()
    this.id = faker.datatype.number()
    this.name = faker.word.noun()
    return this
  }

  generate(quantity = 2) {
    const result: UserModel[] = []

    for (let i = 0; i < quantity; i++) {
      result.push(this.fill().build())
    }

    return result
  }

  build(): UserModel {
    return {
      email: this.email,
      id: this.id,
      name: this.name
    }
  }
}
