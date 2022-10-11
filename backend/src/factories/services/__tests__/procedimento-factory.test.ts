import { ProcedimentoService } from 'services/procedimento'
import { makeProcedimentoService } from '../procedimento-factory'

describe('ProcedimentoService Factory', () => {
  it('should create a instance of ProcedimentoService', () => {
    const result = makeProcedimentoService()

    expect(result).toBeInstanceOf(ProcedimentoService)
  })
})
