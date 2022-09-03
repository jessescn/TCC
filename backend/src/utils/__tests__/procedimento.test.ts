import { createMock } from 'ts-auto-mock'
import { ProcedimentoModel, Status } from 'models/procedimento'
import { belongsToPublico, getCurrentStatus } from 'utils/procedimento'
import { UserModel } from 'models/user'
import { TipoProcedimentoModel } from 'models/tipo-procedimento'

describe('Procedimento utils Tests', () => {
  describe('getCurrentStatus', () => {
    const status: Status[] = [
      { data: '', status: 'criado' },
      { data: '', status: 'correcoes_pendentes' }
    ]

    const procedimento = createMock<ProcedimentoModel>({ status })
    const procedimentoWithEmptyStatus = createMock<ProcedimentoModel>({
      status: []
    })

    const sut = getCurrentStatus

    it('should return the last procedimento status', () => {
      const result = sut(procedimento)
      expect(result).toEqual(status[1].status)
    })

    it('should return undefined when procedimento status list is empty', () => {
      const result = sut(procedimentoWithEmptyStatus)
      expect(result).toBeUndefined()
    })
  })

  describe('belongsToPublico', () => {
    const sut = belongsToPublico

    it('should return "true" if user contains at least one publico from tipo', () => {
      const user = createMock<UserModel>({ publico: ['user', 'admin'] })
      const tipo = createMock<TipoProcedimentoModel>({
        publicos: ['admin', 'professores']
      })

      const result = sut(user, tipo)
      expect(result).toBeTruthy()
    })

    it('should return "false" if user doesn`t contains any intersection', () => {
      const user = createMock<UserModel>({ publico: ['user'] })
      const tipo = createMock<TipoProcedimentoModel>({
        publicos: ['professores', 'admin']
      })

      const result = sut(user, tipo)
      expect(result).toBeFalsy()
    })

    it('should return "true" if tipo have publicos.length equals zero', () => {
      const user = createMock<UserModel>({ publico: ['user', 'admin'] })
      const tipoWithoutPublicos = createMock<TipoProcedimentoModel>({
        publicos: []
      })

      const result = sut(user, tipoWithoutPublicos)
      expect(result).toBeTruthy()
    })
  })
})
