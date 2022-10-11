import { TipoProcedimentoRepository } from 'repository/sequelize/tipo-procedimento'
import { makeTipoProcedimentoRepository } from '../tipo-procedimento-factory'

describe('TipoProcedimentoRepository Factory', () => {
  it('should create a instance of TipoProcedimentoRepository', () => {
    const result = makeTipoProcedimentoRepository()

    expect(result).toBeInstanceOf(TipoProcedimentoRepository)
  })
})
