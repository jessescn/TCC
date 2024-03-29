import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { TipoProcedimentoHelper } from '../tipo-procedimento'

describe('TipoProcedimento Helper', () => {
  const sut = TipoProcedimentoHelper

  describe('belongsToPublico', () => {
    const user1 = createMock<ActorModel>({ publico: ['publico2'] })
    const user2 = createMock<ActorModel>({ publico: ['publico4'] })

    const tipoProcedimento = createMock<TipoProcedimentoModel>({
      publicos: ['publico1', 'publico2', 'publico3']
    })

    it('should return user belongs to tipoProcedimento publico scope', () => {
      const result1 = sut.belongsToPublico(user1, tipoProcedimento)
      const result2 = sut.belongsToPublico(user2, tipoProcedimento)

      expect(result1).toBeTruthy()
      expect(result2).toBeFalsy()
    })

    it("should return true if tipoProcedimento doesn't have publicos", () => {
      const tipoProcedimentoEmpty = createMock<TipoProcedimentoModel>({
        publicos: []
      })

      const result1 = sut.belongsToPublico(user1, tipoProcedimentoEmpty)
      const result2 = sut.belongsToPublico(user2, tipoProcedimentoEmpty)

      expect(result1).toBeTruthy()
      expect(result2).toBeTruthy()
    })
  })
})
