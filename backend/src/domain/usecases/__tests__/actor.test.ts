import { ActorModel } from 'domain/models/actor'
import { ProfileModel } from 'domain/models/profile'
import { createMock } from 'ts-auto-mock'
import { ActorUseCase } from '../actor'

describe('Actor UseCases', () => {
  const sut = ActorUseCase

  describe('filterByRole', () => {
    const usuarios = [
      createMock<ActorModel>({
        profile: createMock<ProfileModel>({ nome: 'admin' })
      }),
      createMock<ActorModel>({
        profile: createMock<ProfileModel>({ nome: 'coordenacao' })
      })
    ]

    it('should filter users by specific role', () => {
      const result1 = sut.filterByRole(usuarios, 'admin')
      const result2 = sut.filterByRole(usuarios, 'usuario')

      expect(result1).toEqual([usuarios[0]])
      expect(result2).toEqual([])
    })
  })

  describe('getPublicos', () => {
    const usuarios = [
      createMock<ActorModel>({ publico: ['publico1'] }),
      createMock<ActorModel>({
        publico: ['publico1', 'publico2', 'publico3']
      }),
      createMock<ActorModel>({
        publico: ['publico2', 'publico4']
      })
    ]

    it('should return all publicos from usuarios without duplication', () => {
      const result = sut.getPublicos(usuarios)

      expect(result).toEqual(['publico1', 'publico2', 'publico3', 'publico4'])
    })
  })
})
