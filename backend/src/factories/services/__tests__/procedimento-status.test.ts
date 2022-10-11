import { ProcedimentoStatusService } from 'services/procedimento-status'
import { makeProcedimentoStatusService } from '../procedimento-status-factory'

describe('ProcedimentoStatusService Factory', () => {
  it('should create a instance of ProcedimentoStatusService', () => {
    const result = makeProcedimentoStatusService()

    expect(result).toBeInstanceOf(ProcedimentoStatusService)
  })
})
