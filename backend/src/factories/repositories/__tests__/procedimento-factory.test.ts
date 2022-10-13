import { ProcedimentoRepository } from 'repositories/sequelize/procedimento'
import { makeProcedimentoRepository } from '../procedimento-factory'

describe('ProcedimentoRepository Factory', () => {
  it('should create a instance of ProcedimentoRepository', () => {
    const result = makeProcedimentoRepository()

    expect(result).toBeInstanceOf(ProcedimentoRepository)
  })
})
