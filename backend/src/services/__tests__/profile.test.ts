import { ProfileModel } from 'domain/models/profile'
import { IRepository } from 'repository'
import { ProfileQuery } from 'repository/sequelize/profile'
import { NewProfile, ProfileService } from 'services/profile'
import { createMock } from 'ts-auto-mock'
import { ConflictError, NotFoundError } from 'types/express/errors'

describe('Profile Service', () => {
  const profile = createMock<ProfileModel>()

  describe('create', () => {
    const repo = createMock<IRepository>({
      create: jest.fn().mockResolvedValue(profile),
      findAll: jest.fn().mockResolvedValue([])
    })

    const data = createMock<NewProfile>({ nome: 'teste' })

    it('should create a new profile', async () => {
      const sut = new ProfileService(repo)

      const result = await sut.create(data)

      expect(result).toEqual(profile)
      expect(repo.create).toBeCalledWith(data)
      expect(repo.findAll).toBeCalledWith({
        nome: data.nome,
        deleted: false
      })
    })

    it('should throw ConflictError if profile name already exists', async () => {
      const repo = createMock<IRepository>({
        findAll: jest.fn().mockResolvedValue([profile])
      })

      const sut = new ProfileService(repo)

      const shouldThrow = async () => {
        await sut.create(data)
      }

      expect(shouldThrow).rejects.toThrow(ConflictError)
    })
  })

  describe('findOne', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(profile)
    })

    it('should find and return an existing profile', async () => {
      const sut = new ProfileService(repo)

      const result = await sut.findOne(1)

      expect(result).toEqual(profile)
      expect(repo.findOne).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if profile does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })

      const sut = new ProfileService(repo)

      const shouldThrow = async () => {
        await sut.findOne(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    const repo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue([profile])
    })

    it('should return all profiles which matches que query', async () => {
      const query: ProfileQuery = { nome: 'teste' }
      const sut = new ProfileService(repo)

      const result = await sut.findAll(query)

      expect(result).toEqual([profile])
      expect(repo.findAll).toBeCalledWith(query)
    })

    it('should return all profiles if no query is provided', async () => {
      const sut = new ProfileService(repo)

      await sut.findAll()

      expect(repo.findAll).toBeCalledWith({})
    })
  })

  describe('delete', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(profile),
      destroy: jest.fn().mockResolvedValue(profile)
    })

    it('should destroy an existing profile by id', async () => {
      const sut = new ProfileService(repo)

      const result = await sut.delete(1)

      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.destroy).toBeCalledWith(1)
      expect(result).toEqual(profile)
    })

    it('should throw a NotFoundError if profile does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })

      const sut = new ProfileService(repo)

      const shouldThrow = async () => {
        await sut.delete(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('update', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(profile),
      update: jest.fn().mockResolvedValue(profile)
    })

    const data: Partial<ProfileModel> = {
      nome: 'teste',
      permissoes: {
        actor_create: 'all'
      }
    }

    it('should update an existing profile', async () => {
      const sut = new ProfileService(repo)

      const result = await sut.update(1, data)

      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.update).toBeCalledWith(1, data)
      expect(result).toEqual(profile)
    })

    it('should throw a NotFoundError if profile does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })

      const sut = new ProfileService(repo)

      const shouldThrow = async () => {
        await sut.update(1, data)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })
})
