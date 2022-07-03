import { UserModel } from 'domain/models/user'
import { faker } from '@faker-js/faker'

export class UserMockBuilderBuilder {
  private email = faker.internet.email()
  private id = faker.datatype.number()
  private nome = faker.word.noun()

  fill() {
    this.email = faker.internet.email()
    this.id = faker.datatype.number()
    this.nome = faker.word.noun()
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
      nome: this.nome
    }
  }
}
