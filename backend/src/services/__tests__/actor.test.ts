import { ProfileModel } from 'domain/models/profile'
import { ActorModel } from 'domain/models/actor'
import { IRepository } from 'repository'
import { NewActor, ActorQuery } from 'repository/sequelize/actor'
import { ActorService } from 'services/actor'
import { createMock } from 'ts-auto-mock'
import { ConflictError, NotFoundError } from 'types/express/errors'

describe('Actor Service', () => {
  const actor = createMock<ActorModel>()
  const profile = createMock<ProfileModel>()
  const actors = [
    createMock<ActorModel>({ publico: ['publico1', 'publico2'] }),
    createMock<ActorModel>({ publico: ['publico2', 'publico3'] })
  ]

  const profileRepo = createMock<IRepository>({
    findOne: jest.fn().mockResolvedValue(profile),
    findAll: jest.fn().mockResolvedValue([profile])
  })

  describe('create', () => {
    const repo = createMock<IRepository>({
      create: jest.fn().mockResolvedValue(actor),
      findAll: jest.fn().mockResolvedValue([])
    })
    const data = createMock<NewActor>()

    it('should create a new actor', async () => {
      const sut = new ActorService(repo, profileRepo)

      const result = await sut.create(data)

      expect(result).toEqual(actor)
      expect(repo.create).toBeCalledWith({
        email: data.email,
        nome: data.nome,
        senha: data.senha,
        permissoes: profile.id
      })
      expect(repo.findAll).toBeCalled()
    })

    it('should throw a ConflictError if has some user with same email', async () => {
      const repo = createMock<IRepository>({
        create: jest.fn().mockResolvedValue(actor),
        findAll: jest.fn().mockResolvedValue(actors)
      })
      const sut = new ActorService(repo, profileRepo)

      const shouldThrow = async () => {
        await sut.create(data)
      }

      expect(shouldThrow).rejects.toThrow(ConflictError)
    })
  })

  describe('delete', () => {
    const repo = createMock<IRepository>({
      destroy: jest.fn().mockResolvedValue(actor),
      findOne: jest.fn().mockResolvedValue(actor)
    })

    it('should delete an existing user', async () => {
      const sut = new ActorService(repo, profileRepo)

      const result = await sut.delete(1)

      expect(result).toEqual(actor)
      expect(repo.destroy).toBeCalledWith(1)
      expect(repo.findOne).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if user does not exists', async () => {
      const repo = createMock<IRepository>({
        destroy: jest.fn().mockResolvedValue(actor),
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new ActorService(repo, profileRepo)

      const shouldThrow = async () => {
        await sut.delete(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findOne', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(actor)
    })

    it('should find an existing actor', async () => {
      const sut = new ActorService(repo, profileRepo)

      const result = await sut.findOne(1)

      expect(result).toEqual(actor)
      expect(repo.findOne).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if user does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new ActorService(repo, profileRepo)

      const shouldThrow = async () => {
        await sut.findOne(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    const repo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(actors)
    })

    it('should return all actors', async () => {
      const sut = new ActorService(repo, profileRepo)
      const result = await sut.findAll()

      expect(result).toEqual(actors)
      expect(repo.findAll).toBeCalledWith({})
    })

    it('should return only actors which matches the query', async () => {
      const sut = new ActorService(repo, profileRepo)
      const query: ActorQuery = { email: 'teste@email.com' }

      const result = await sut.findAll(query)

      expect(result).toEqual(actors)
      expect(repo.findAll).toBeCalledWith(query)
    })
  })

  describe('update', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(actor),
      update: jest.fn().mockResolvedValue(actor)
    })
    const data: Partial<ActorModel> = { nome: 'test name' }

    it('should update an existing actor', async () => {
      const sut = new ActorService(repo, profileRepo)

      const result = await sut.update(1, data)

      expect(result).toEqual(actor)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.update).toBeCalledWith(1, data)
    })

    it('should throw a NotFoundError if user does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new ActorService(repo, profileRepo)

      const shouldThrow = async () => {
        await sut.update(1, data)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('getPublicos', () => {
    const repo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(actors)
    })

    it('should return all publicos from users in database', async () => {
      const sut = new ActorService(repo, profileRepo)

      const result = await sut.getPublicos()

      expect(result).toEqual(['publico1', 'publico2', 'publico3'])
    })
  })
})
