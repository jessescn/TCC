import { FormField, FormModel } from 'models/form'
import { faker } from '@faker-js/faker'

export class FormMockBuilder {
  private id = faker.datatype.number()
  private name = faker.word.noun()
  private fields: FormField[] = []
  private status = 'inativo'

  fill() {
    this.id = faker.datatype.number()
    this.name = faker.word.noun()

    return this
  }

  generate(quantity = 1) {
    const result: FormModel[] = []

    for (let i = 0; i < quantity; i++) {
      result.push(this.fill().build())
    }

    return result
  }

  build(): FormModel {
    return {
      id: this.id,
      name: this.name,
      fields: this.fields,
      status: this.status
    }
  }
}
