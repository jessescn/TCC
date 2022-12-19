import { ProcedimentoModel } from 'domain/models/procedimento'
import { VotoModel } from 'domain/models/voto'
import { createMock } from 'ts-auto-mock'
import { ProcedimentoHelper } from '../procedimento'

describe('Procedimento Helper', () => {
  const sut = ProcedimentoHelper
  const votes = [
    createMock<VotoModel>({ autorId: 1, aprovado: true }),
    createMock<VotoModel>({ autorId: 2, aprovado: true })
  ]

  describe('isMaioria', () => {
    it('should return if a list of votes is majority to make a verdict', () => {
      const result1 = sut.isMaioria([], 4)
      const result2 = sut.isMaioria(votes, 4)

      expect(result1).toBeFalsy()
      expect(result2).toBeTruthy()
    })
  })

  describe('getCurrentStatus', () => {
    const procedimento = createMock<ProcedimentoModel>({
      status: [
        { data: new Date().toISOString(), status: 'criado' },
        { data: new Date().toISOString(), status: 'correcoes_pendentes' }
      ]
    })

    it('should return the current status (the last from status list)', () => {
      const result = sut.getCurrentStatus(procedimento)

      expect(result).toEqual(procedimento.status[1].status)
    })

    it('should return undefined if procedimento has an empty status list', () => {
      const procedimento = createMock<ProcedimentoModel>({ status: [] })

      const result = sut.getCurrentStatus(procedimento)

      expect(result).toBeUndefined()
    })
  })

  describe('isProcedimentoAprovado', () => {
    it('should return if procedimento have approve from majority of votes', () => {
      const result1 = sut.isProcedimentoAprovado([
        createMock<VotoModel>({ autorId: 1, aprovado: true }),
        createMock<VotoModel>({ autorId: 2, aprovado: true })
      ])
      const result2 = sut.isProcedimentoAprovado([
        createMock<VotoModel>({ autorId: 1, aprovado: true }),
        createMock<VotoModel>({ autorId: 2, aprovado: false })
      ])
      const result3 = sut.isProcedimentoAprovado([
        createMock<VotoModel>({ autorId: 1, aprovado: false }),
        createMock<VotoModel>({ autorId: 2, aprovado: false }),
        createMock<VotoModel>({ autorId: 3, aprovado: true })
      ])

      expect(result1).toBeTruthy()
      expect(result2).toBeFalsy()
      expect(result3).toBeFalsy()
    })
  })
})
