import { ProcedimentoModel, VotoProcedimento } from 'domain/models/procedimento'
import { createMock } from 'ts-auto-mock'
import { ProcedimentoHelper } from '../procedimento'

describe('Procedimento Helper', () => {
  const sut = ProcedimentoHelper
  const votes = [
    createMock<VotoProcedimento>({ autor: 1, aprovado: true }),
    createMock<VotoProcedimento>({ autor: 2, aprovado: true })
  ]

  describe('insertOrUpdateVote', () => {
    it("should insert into vote list if vote isn't in the list by autor", () => {
      const newVote = createMock<VotoProcedimento>({
        autor: 3,
        aprovado: false
      })

      const result = sut.insertOrUpdateVote(votes, newVote)

      expect(result).toEqual([...votes, newVote])
    })

    it('should update an existing vote if the vote already in the list', () => {
      const updatedVote = createMock<VotoProcedimento>({
        autor: 1,
        aprovado: false
      })

      const result = sut.insertOrUpdateVote(votes, updatedVote)

      expect(result).toEqual([updatedVote, votes[1]])
    })
  })

  describe('isMaioria', () => {
    it('should return if a list of votes is majority to make a verdict', () => {
      const result1 = sut.isMaioria([], 4)
      const result2 = sut.isMaioria(votes, 4)

      expect(result1).toBeFalsy()
      expect(result2).toBeTruthy()

      expect(process.env.COLEGIADO_QUANTITY).toEqual('3')
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
    const procedimento1 = createMock<ProcedimentoModel>({
      votos: [
        createMock<VotoProcedimento>({ autor: 1, aprovado: true }),
        createMock<VotoProcedimento>({ autor: 2, aprovado: true })
      ]
    })
    const procedimento2 = createMock<ProcedimentoModel>({
      votos: [
        createMock<VotoProcedimento>({ autor: 1, aprovado: true }),
        createMock<VotoProcedimento>({ autor: 2, aprovado: false })
      ]
    })

    const procedimento3 = createMock<ProcedimentoModel>({
      votos: [
        createMock<VotoProcedimento>({ autor: 1, aprovado: false }),
        createMock<VotoProcedimento>({ autor: 2, aprovado: false }),
        createMock<VotoProcedimento>({ autor: 3, aprovado: true })
      ]
    })

    it('should return if procedimento have approve from majority of votes', () => {
      const result1 = sut.isProcedimentoAprovado(procedimento1)
      const result2 = sut.isProcedimentoAprovado(procedimento2)
      const result3 = sut.isProcedimentoAprovado(procedimento3)

      expect(result1).toBeTruthy()
      expect(result2).toBeFalsy()
      expect(result3).toBeFalsy()
    })
  })
})
