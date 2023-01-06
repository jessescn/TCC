import { ActorModel } from 'domain/models/actor'
import { ProcedimentoModel, Status } from 'domain/models/procedimento'
import { ProfileModel } from 'domain/models/profile'
import { VotoModel } from 'domain/models/voto'
import { IActorRepository } from 'repositories/sequelize/actor'
import { IProcedimentoRepo } from 'repositories/sequelize/procedimento'
import { CreateVoto, IVotoRepository } from 'repositories/sequelize/voto'
import { ColegiadoService } from 'services/colegiado'
import { createMock } from 'ts-auto-mock'
import { BadRequestError, NotFoundError } from 'types/express/errors'

describe('Colegiado Service', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const status = createMock<Status>()
  const voto = createMock<VotoModel>({
    aprovado: true,
    autorId: 1,
    procedimentoId: 1
  })

  const statusService = {
    execute: jest.fn().mockResolvedValue(status)
  } as any

  const actorRepo = createMock<IActorRepository>()
  const votoRepo = createMock<IVotoRepository>()

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
  })

  describe('homologate', () => {
    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento),
      updateStatus: jest.fn().mockResolvedValue(procedimento)
    })

    it("should update status of an existing procedimento to 'homologate'", async () => {
      const sut = new ColegiadoService(repo, statusService, actorRepo, votoRepo)

      const result = await sut.homologate(1)

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.updateStatus).toBeCalledWith(1, {
        status: 'deferido',
        data: new Date('2020-01-01').toISOString()
      })
    })

    it('should throw a NotFoundError if procedimento does not exists', async () => {
      const repo = createMock<IProcedimentoRepo>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })

      const sut = new ColegiadoService(repo, statusService, actorRepo, votoRepo)

      const shouldThrow = async () => {
        await sut.homologate(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('vote', () => {
    const procedimento = createMock<ProcedimentoModel>({
      status: [{ data: new Date().toISOString(), status: 'em_homologacao' }]
    })

    const statusService = {
      execute: jest.fn().mockResolvedValue(status)
    } as any

    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento),
      updateStatus: jest.fn().mockResolvedValue(procedimento)
    })

    const getColegiado = () => {
      return createMock<ActorModel>({
        profile: createMock<ProfileModel>({ nome: 'colegiado' })
      })
    }

    const colegiados = Array(4)
      .fill(0)
      .map(() => getColegiado())

    const actorRepo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue(colegiados)
    })
    const votoRepo = createMock<IVotoRepository>({
      findAll: jest.fn().mockResolvedValue([voto])
    })

    it('should create/update a vote of a procedimento', async () => {
      const data = createMock<CreateVoto>({ procedimentoId: 1 })
      const sut = new ColegiadoService(repo, statusService, actorRepo, votoRepo)

      const result = await sut.vote(data)

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(1)
      expect(votoRepo.createOrUpdate).toBeCalled()
      expect(votoRepo.findAll).toBeCalled()
    })

    it("should update status to 'deferido' if reach positive majority of votes", async () => {
      const actorRepo = createMock<IActorRepository>({
        findAll: jest.fn().mockResolvedValue([colegiados[0], colegiados[1]])
      })
      const votoRepo = createMock<IVotoRepository>({
        findAll: jest.fn().mockResolvedValue([voto])
      })

      const statusService = {
        execute: jest.fn().mockResolvedValue(status)
      } as any

      const data = createMock<VotoModel>()
      const sut = new ColegiadoService(repo, statusService, actorRepo, votoRepo)

      await sut.vote(data)

      expect(statusService.execute).toBeCalledWith(procedimento, 'deferido')
    })

    it("should update status to índeferido' if reach negative majority of votes", async () => {
      const voto = createMock<VotoModel>({
        aprovado: false,
        autorId: 1,
        procedimentoId: 1
      })
      const actorRepo = createMock<IActorRepository>({
        findAll: jest.fn().mockResolvedValue([colegiados[0], colegiados[1]])
      })
      const votoRepo = createMock<IVotoRepository>({
        findAll: jest.fn().mockResolvedValue([voto])
      })

      const statusService = {
        execute: jest.fn().mockResolvedValue(status)
      } as any

      const data = createMock<VotoModel>()
      const sut = new ColegiadoService(repo, statusService, actorRepo, votoRepo)

      await sut.vote(data)

      expect(statusService.execute).toBeCalledWith(procedimento, 'indeferido')
    })

    it("should throw BadRequestError if procedimento isn't on 'em_homologacao' status", async () => {
      const procedimento = createMock<ProcedimentoModel>({
        status: []
      })

      const statusService = {
        execute: jest.fn().mockResolvedValue(status)
      } as any

      const repo = createMock<IProcedimentoRepo>({
        findOne: jest.fn().mockResolvedValue(procedimento)
      })

      const data = createMock<VotoModel>()
      const sut = new ColegiadoService(repo, statusService, actorRepo, votoRepo)

      const shouldThrow = async () => {
        await sut.vote(data)
      }

      expect(shouldThrow).rejects.toThrow(BadRequestError)
    })
  })

  describe('deleteVote', () => {
    const procedimento = createMock<ProcedimentoModel>({
      id: 2,
      status: [{ data: new Date().toISOString(), status: 'em_homologacao' }]
    })

    const votoRepo = createMock<IVotoRepository>({
      findAll: jest.fn().mockResolvedValue([voto])
    })

    const statusService = {
      execute: jest.fn().mockResolvedValue(status)
    } as any

    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento)
    })

    it('should destroy an existing actor vote from a specific procedimento', async () => {
      const sut = new ColegiadoService(repo, statusService, actorRepo, votoRepo)

      const result = await sut.deleteVote(2, 1)

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(2)
      expect(votoRepo.findAll).toBeCalledWith({ autorId: 1, procedimentoId: 2 })
      expect(votoRepo.destroy).toBeCalledWith(voto.id)
    })

    it('should throw a notFoundError if voto does not exists', async () => {
      const votoRepo = createMock<IVotoRepository>({
        findAll: jest.fn().mockResolvedValue([])
      })

      const sut = new ColegiadoService(repo, statusService, actorRepo, votoRepo)

      const shouldThrow = async () => {
        await sut.deleteVote(2, 1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })
})
