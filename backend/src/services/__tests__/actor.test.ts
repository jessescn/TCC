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
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError
} from 'types/express/errors'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ActorHelper } from 'domain/helpers/actor'
import { IProfileRepository } from 'repositories/sequelize/profile'
import { ITipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
import { MailSender } from 'repositories/nodemailer/mail'
import jwt from 'jsonwebtoken'

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
    jest.spyOn(MailSender, 'send')

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
      expect(MailSender.send).toBeCalled()
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

  describe('getSidebarInfo', () => {
    const actor = createMock<ActorModel>({ publico: ['teste2'] })
    const tipoProcedimento = createMock<TipoProcedimentoModel>({
      dataInicio: new Date('01-01-1999').toISOString(),
      dataFim: new Date('01-01-2050').toISOString(),
      publicos: ['teste1', 'teste2']
    })
    const tipoProcedimentoOutOfTime = createMock<TipoProcedimentoModel>({
      dataInicio: new Date('01-01-1999').toISOString(),
      dataFim: new Date('01-01-2000').toISOString(),
      publicos: ['teste1', 'teste2']
    })
    const tipoProcedimentoOutOfPublico = createMock<TipoProcedimentoModel>({
      publicos: ['teste1', 'teste3']
    })
    const tipoRepo = createMock<ITipoProcedimentoRepository>({
      findAll: jest
        .fn()
        .mockResolvedValue([
          tipoProcedimento,
          tipoProcedimentoOutOfTime,
          tipoProcedimentoOutOfPublico
        ])
    })

    const repo = createMock<IActorRepository>({
      findOne: jest.fn().mockResolvedValue(actor)
    })

    it('should return all opened tipos by actorID', async () => {
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const result = await sut.getSidebarInfo(1)

      expect(result.open).toEqual([tipoProcedimento])
      expect(repo.findOne).toBeCalledWith(1)
      expect(tipoRepo.findAll).toBeCalledWith({
        status: 'ativo',
        deleted: false
      })
    })
  })

  describe('sendConfirmationCode', () => {
    const actor = createMock<ActorModel>({ verificado: false })
    const repo = createMock<IActorRepository>()
    const sut = new ActorService(repo, profileRepo, tipoRepo)

    jest.spyOn(MailSender, 'send')

    it('should send a confirmation code via email', async () => {
      await sut.sendConfirmationCode(actor)

      expect(MailSender.send).toBeCalled()
    })

    it('should throw a BadRequestError if actor is already verified', async () => {
      const verifiedActor = createMock<ActorModel>({ verificado: true })

      const shouldThrow = async () => {
        await sut.sendConfirmationCode(verifiedActor)
      }

      expect(shouldThrow).rejects.toThrow(BadRequestError)
    })
  })

  describe('verifyActorByCode', () => {
    const data = createMock<ActorModel>({ email: 'teste@teste.com' })
    const repo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue([actor])
    })

    const code = jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5m'
    })

    it('should verify actor with code', async () => {
      const sut = new ActorService(repo, profileRepo, tipoRepo)
      const result = await sut.verifyActorByCode(code)

      expect(result).toEqual(actor)
      expect(repo.findAll).toBeCalledWith({ email: data.email })
      expect(repo.update).toBeCalledWith(actor.id, { verificado: true })
    })

    it('should throw UnauthorizedError if code is expired', async () => {
      const code = jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
        expiresIn: '0m'
      })

      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const shouldThrow = async () => {
        await sut.verifyActorByCode(code)
      }

      expect(shouldThrow).rejects.toThrow(UnauthorizedError)
    })

    it('should throw UnauthorizedError if code is invalid', async () => {
      const data = createMock<ActorModel>({ email: null })
      const code = jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
        expiresIn: '5m'
      })

      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const shouldThrow = async () => {
        await sut.verifyActorByCode(code)
      }

      expect(shouldThrow).rejects.toThrow(UnauthorizedError)
    })

    it('should throw NotFoundError if actor does not exists', async () => {
      const repo = createMock<IActorRepository>({
        findAll: jest.fn().mockResolvedValue([])
      })
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const shouldThrow = async () => {
        await sut.verifyActorByCode(code)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('sendChangePasswordEmail', () => {
    const email = 'teste@teste.com'
    jest.spyOn(MailSender, 'send')

    const repo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue([actor])
    })

    it('should send change password email', async () => {
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      await sut.sendChangePasswordEmail(email)

      expect(MailSender.send).toBeCalled()
      expect(repo.findAll).toBeCalledWith({ email })
    })

    it('should throw a NotFoundError if actor does not exists with provided email', async () => {
      const repo = createMock<IActorRepository>({
        findAll: jest.fn().mockResolvedValue([])
      })

      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const shouldThrow = async () => {
        await sut.sendChangePasswordEmail(email)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('changeActorPasswordByCode', () => {
    const newPassword = 'teste password'
    const data = createMock<ActorModel>({ email: 'teste@teste.com' })
    const repo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue([actor])
    })

    const code = jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5m'
    })

    it('should change actor password with code', async () => {
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const result = await sut.changeActorPasswordByCode(code, newPassword)

      expect(result).toEqual(actor)
      expect(repo.findAll).toBeCalledWith({ email: data.email })
    })

    it('should throw a NotFoundError if actor does not exists', async () => {
      const repo = createMock<IActorRepository>({
        findAll: jest.fn().mockResolvedValue([])
      })
      const sut = new ActorService(repo, profileRepo, tipoRepo)

      const shouldThrow = async () => {
        await sut.changeActorPasswordByCode(code, newPassword)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })
})
