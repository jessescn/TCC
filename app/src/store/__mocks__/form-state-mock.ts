import { FormModel } from 'domain/models/form'
import { State, initialState } from 'store/ducks/form'

export class FormStateMockBuilder {
  private forms: FormModel[] = []

  withForms(value: FormModel[]) {
    this.forms = value
    return this
  }

  build(): State {
    return { ...initialState, forms: this.forms }
  }
}
