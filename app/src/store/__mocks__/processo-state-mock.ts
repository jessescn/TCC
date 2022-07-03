import { ProcessoModel } from 'domain/models/processo'
import { State, initialState } from 'store/ducks/processo'

export class ProcessoStateMockBuilder {
  private processos: ProcessoModel[] = []

  withProcessos(value: ProcessoModel[]) {
    this.processos = value
    return this
  }

  build(): State {
    return { ...initialState, processos: this.processos }
  }
}
