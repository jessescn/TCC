import { FormField, FormModel, FormularioStatus } from 'models/formulario'
import { faker } from '@faker-js/faker'

export class FormularioMockBuilder {
  private id = faker.datatype.number()
  private nome = faker.word.noun()
  private campos: FormField[] = []
  private status: FormularioStatus = 'inativo'

  fill() {
    this.id = faker.datatype.number()
    this.nome = faker.word.noun()

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
      nome: this.nome,
      campos: this.campos,
      status: this.status
    }
  }
}
