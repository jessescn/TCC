import { UserModel } from 'domain/models/user'
import { IRepository } from 'repository'
import { NewUsuario, UsuarioQuery } from 'repository/sequelize/usuario'
import { UsuarioService } from 'services/usuario'
import { createMock } from 'ts-auto-mock'
import { ConflictError, NotFoundError } from 'types/express/errors'

describe('Usuario Service', () => {
  const usuario = createMock<UserModel>()
  const usuarios = [
    createMock<UserModel>({ publico: ['publico1', 'publico2'] }),
    createMock<UserModel>({ publico: ['publico2', 'publico3'] })
  ]

  describe('create', () => {
    const repo = createMock<IRepository>({
      create: jest.fn().mockResolvedValue(usuario),
      findAll: jest.fn().mockResolvedValue([])
    })
    const data = createMock<NewUsuario>()

    it('should create a new usuario', async () => {
      const sut = new UsuarioService(repo)

      const result = await sut.create(data)

      expect(result).toEqual(usuario)
      expect(repo.create).toBeCalledWith(data)
      expect(repo.findAll).toBeCalled()
    })

    it('should throw a ConflictError if has some user with same email', async () => {
      const repo = createMock<IRepository>({
        create: jest.fn().mockResolvedValue(usuario),
        findAll: jest.fn().mockResolvedValue(usuarios)
      })
      const sut = new UsuarioService(repo)

      const shouldThrow = async () => {
        await sut.create(data)
      }

      expect(shouldThrow).rejects.toThrow(ConflictError)
    })
  })

  describe('delete', () => {
    const repo = createMock<IRepository>({
      destroy: jest.fn().mockResolvedValue(usuario),
      findOne: jest.fn().mockResolvedValue(usuario)
    })

    it('should delete an existing user', async () => {
      const sut = new UsuarioService(repo)

      const result = await sut.delete(1)

      expect(result).toEqual(usuario)
      expect(repo.destroy).toBeCalledWith(1)
      expect(repo.findOne).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if user does not exists', async () => {
      const repo = createMock<IRepository>({
        destroy: jest.fn().mockResolvedValue(usuario),
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new UsuarioService(repo)

      const shouldThrow = async () => {
        await sut.delete(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findOne', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(usuario)
    })

    it('should find an existing usuario', async () => {
      const sut = new UsuarioService(repo)

      const result = await sut.findOne(1)

      expect(result).toEqual(usuario)
      expect(repo.findOne).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if user does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new UsuarioService(repo)

      const shouldThrow = async () => {
        await sut.findOne(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    const repo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(usuarios)
    })

    it('should return all usuarios', async () => {
      const sut = new UsuarioService(repo)
      const result = await sut.findAll()

      expect(result).toEqual(usuarios)
      expect(repo.findAll).toBeCalledWith({})
    })

    it('should return only usuarios which matches the query', async () => {
      const sut = new UsuarioService(repo)
      const query: UsuarioQuery = { email: 'teste@email.com' }

      const result = await sut.findAll(query)

      expect(result).toEqual(usuarios)
      expect(repo.findAll).toBeCalledWith(query)
    })
  })

  describe('update', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(usuario),
      update: jest.fn().mockResolvedValue(usuario)
    })
    const data: Partial<UserModel> = { nome: 'test name' }

    it('should update an existing usuario', async () => {
      const sut = new UsuarioService(repo)

      const result = await sut.update(1, data)

      expect(result).toEqual(usuario)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.update).toBeCalledWith(1, data)
    })

    it('should throw a NotFoundError if user does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new UsuarioService(repo)

      const shouldThrow = async () => {
        await sut.update(1, data)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('getPublicos', () => {
    const repo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(usuarios)
    })

    it('should return all publicos from users in database', async () => {
      const sut = new UsuarioService(repo)

      const result = await sut.getPublicos()

      expect(result).toEqual(['publico1', 'publico2', 'publico3'])
    })
  })
})
