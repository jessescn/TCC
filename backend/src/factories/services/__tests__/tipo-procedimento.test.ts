import { TipoProcedimentoService } from 'services/tipo-procedimento'
import { makeTipoProcedimentoService } from '../tipo-procedimento-factory'

describe('TipoProcedimentoService Factory', () => {
  it('should create a instance of TipoProcedimentoService', () => {
    const result = makeTipoProcedimentoService()

    expect(result).toBeInstanceOf(TipoProcedimentoService)
  })
})
