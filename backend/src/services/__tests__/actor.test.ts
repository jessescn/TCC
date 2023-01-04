import { BadRequestError } from './../../types/express/errors'
import { ProfileModel } from 'domain/models/profile'
import { ActorModel } from 'domain/models/actor'
import { IRepository, Pagination } from 'repositories'
import {
  NewActor,
  ActorQuery,
  IActorRepository
} from 'repositories/sequelize/actor'
import { ActorService } from 'services/actor'
import { createMock } from 'ts-auto-mock'
import { ConflictError, NotFoundError } from 'types/express/errors'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ActorHelper } from 'domain/helpers/actor'
import { IProfileRepository } from 'repositories/sequelize/profile'
import { ITipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'

describe('Actor Service', () => {
  const actor = createMock<ActorModel>({ verificado: false })
  const profile = createMock<ProfileModel>()
  const tipoProcedimento = createMock<TipoProcedimentoModel>()
  const pagination: Pagination = {
    page: 1,
    per_page: 1000,
    term: null
  }

  const actors = [
    createMock<ActorModel>({ publico: ['publico1', 'publico2'] }),
    createMock<ActorModel>({ publico: ['publico2', 'publico3'] })
  ]

  const profileRepo = createMock<IProfileRepository>({
    findOne: jest.fn().mockResolvedValue(profile),
    findAll: jest.fn().mockResolvedValue([profile])
  })

  const tipoRepo = createMock<ITipoProcedimentoRepository>({
    findAll: jest.fn().mockResolvedValue([tipoProcedimento])
  })

  describe('create', () => {
    const repo = createMock<IActorRepository>({
      create: jest.fn().mockResolvedValue(actor),
      findAll: jest.fn().mockResolvedValue([])
    })
    const data = createMock<NewActor>()

    it('should create a new actor', async () => {
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const result = await sut.create(data)

      expect(result).toEqual(actor)
      expect(repo.create).toBeCalledWith({
        email: data.email,
        nome: data.nome,
        senha: data.senha,
        profile: profile.id
      })
      expect(repo.findAll).toBeCalled()
    })

    it('should throw a ConflictError if has some user with same email', async () => {
      const repo = createMock<IRepository>({
        create: jest.fn().mockResolvedValue(actor),
        findAll: jest.fn().mockResolvedValue(actors)
      })
      const sut = new ActorService(repo, profileRepo, tipoRepo)

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
      const sut = new ActorService(repo, profileRepo, tipoRepo)

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
      const sut = new ActorService(repo, profileRepo, tipoRepo)

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
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const result = await sut.findOne(1)

      expect(result).toEqual(actor)
      expect(repo.findOne).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if user does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new ActorService(repo, profileRepo, tipoRepo)

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
      const sut = new ActorService(repo, profileRepo, tipoRepo)
      const result = await sut.findAll({}, pagination)

      expect(result.data).toEqual(actors)
      expect(repo.findAll).toBeCalledWith({}, null)
    })

    it('should return only actors which matches the query', async () => {
      const sut = new ActorService(repo, profileRepo, tipoRepo)
      const query: ActorQuery = { email: 'teste@email.com' }

      const result = await sut.findAll(query, pagination)

      expect(result.data).toEqual(actors)
      expect(repo.findAll).toBeCalledWith(query, null)
    })
  })

  describe('update', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(actor),
      update: jest.fn().mockResolvedValue(actor)
    })
    const data: Partial<ActorModel> = { nome: 'test name' }

    it('should update an existing actor', async () => {
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const result = await sut.update(1, data)

      expect(result).toEqual(actor)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.update).toBeCalledWith(1, data)
    })

    it('should throw a NotFoundError if user does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new ActorService(repo, profileRepo, tipoRepo)

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
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const result = await sut.getPublicos()

      expect(result).toEqual(['publico1', 'publico2', 'publico3'])
    })
  })

  describe('bulkCreate', () => {
    const filepath = `jest/files/bulk-create-user.csv`

    const repo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue(actor)
    })

    jest.spyOn(ActorHelper, 'parserCSV').mockResolvedValue([
      {
        email: 'usuario@teste.com',
        nome: 'user test',
        profile: 1,
        publico: []
      }
    ])

    it('should create a list o actors from a csv file', async () => {
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const result = await sut.bulkCreate(filepath)

      expect(result).toEqual([actor])
    })

    it('should throw an error if some user already exists', async () => {
      const repo = createMock<IRepository>({
        findAll: jest.fn().mockResolvedValue([actor])
      })
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const shouldThrow = async () => {
        await sut.bulkCreate(filepath)
      }

      expect(shouldThrow).rejects.toThrow(ConflictError)
    })

    it('should handle some error from create repo method', async () => {
      const repo = createMock<IRepository>({
        findAll: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockRejectedValue(new BadRequestError())
      })

      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const shouldThrow = async () => {
        await sut.bulkCreate(filepath)
      }

      expect(shouldThrow).rejects.toThrow(BadRequestError)
    })
  })
})
