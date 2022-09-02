import { createMock } from 'ts-auto-mock'
import { ProcedimentoModel, Status } from 'models/procedimento'
import { getCurrentStatus } from 'utils/procedimento'

describe('Tests for procedimento utils', () => {
  describe('getCurrentStatus', () => {
    const status: Status[] = [
      { data: '', status: 'criado' },
      { data: '', status: 'correcoes_pendentes' }
    ]

    const procedimento = createMock<ProcedimentoModel>({ status })

    const sut = getCurrentStatus

    it('should return the last procedimento status', () => {
      const result = sut(procedimento as any)
      expect(result).toEqual(status[1].status)
    })
  })
})
