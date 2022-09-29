import { UserModel } from 'domain/models/user'
import { createMock } from 'ts-auto-mock'
import { UsuarioUseCase } from '../usuario'

describe('Usuario UseCases', () => {
  const sut = UsuarioUseCase

  describe('filterByRole', () => {
    const usuarios = [
      createMock<UserModel>({ roles: ['admin'] }),
      createMock<UserModel>({
        roles: ['colegiado', 'coordenacao', 'admin']
      })
    ]

    it('should filter users by specific role', () => {
      const result1 = sut.filterByRole(usuarios, 'admin')
      const result2 = sut.filterByRole(usuarios, 'coordenacao')
      const result3 = sut.filterByRole(usuarios, 'usuario')

      expect(result1).toEqual(usuarios)
      expect(result2).toEqual([usuarios[1]])
      expect(result3).toEqual([])
    })
  })

  describe('getPublicos', () => {
    const usuarios = [
      createMock<UserModel>({ publico: ['publico1'] }),
      createMock<UserModel>({
        publico: ['publico1', 'publico2', 'publico3']
      }),
      createMock<UserModel>({
        publico: ['publico2', 'publico4']
      })
    ]

    it('should return all publicos from usuarios without duplication', () => {
      const result = sut.getPublicos(usuarios)

      expect(result).toEqual(['publico1', 'publico2', 'publico3', 'publico4'])
    })
  })
})
