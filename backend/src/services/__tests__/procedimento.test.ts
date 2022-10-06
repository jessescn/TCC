import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ProcedimentoModel, Resposta, Status } from 'domain/models/procedimento'
import { UserModel } from 'domain/models/user'
import { IProcedimentoRepo, IRepository } from 'repository'
import {
  NewProcedimento,
  NewRevisao,
  ProcedimentoQuery
} from 'repository/sequelize/procedimento'
import { ProcedimentoService } from 'services/procedimento'
import { IProcedimentoStatusService } from 'services/procedimento-status'
import { createMock, createMockList } from 'ts-auto-mock'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from 'types/express/errors'

describe('Procedimento Service', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const procedimentos = createMockList<ProcedimentoModel>(2)

  const status = createMock<Status>()
  const baseRepo = createMock<IRepository>()

  const statusService = createMock<IProcedimentoStatusService>({
    execute: jest.fn().mockResolvedValue(status)
  })

  describe('create', () => {
    const tipoProcedimento = createMock<TipoProcedimentoModel>()
    const usuario = createMock<UserModel>({ id: 1 })
    const data = createMock<NewProcedimento>({ tipo: 1 })

    const repo = createMock<IProcedimentoRepo>({
      create: jest.fn().mockResolvedValue(procedimento),
      updateStatus: jest.fn().mockResolvedValue(procedimento)
    })

    const tipoRepo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(tipoProcedimento)
    })

    const statusService = createMock<IProcedimentoStatusService>({
      execute: jest.fn().mockResolvedValue(status)
    })

    it('should create a new procedimento', async () => {
      const sut = new ProcedimentoService(repo, tipoRepo, statusService)
      const result = await sut.create(usuario, data)

      expect(tipoRepo.findOne).toBeCalledWith(data.tipo)
      expect(repo.create).toBeCalledWith({
        respostas: data.respostas,
        tipo: data.tipo,
        createdBy: usuario.id,
        votos: []
      })
      expect(statusService.execute).toBeCalledWith(procedimento, 'em_analise')
      expect(repo.updateStatus).toBeCalledWith(procedimento.id, status)
      expect(result).toEqual(procedimento)
    })

    it('should throw BadRequestError if tipoProcedimento does not exists', async () => {
      const tipoRepo = createMock<IRepository>({
        findOne: jest.fn()
      })

      const sut = new ProcedimentoService(repo, tipoRepo, statusService)

      const shouldThrow = async () => {
        await sut.create(usuario, data)
      }

      expect(shouldThrow).rejects.toThrow(BadRequestError)
    })

    it('should throw UnauthorizedError if user does not belongs to tipoProcedimento publico', async () => {
      const tipoWithPublico = createMock<TipoProcedimentoModel>({
        publicos: ['publico1']
      })
      const tipoRepo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(tipoWithPublico)
      })

      const sut = new ProcedimentoService(repo, tipoRepo, statusService)

      const shouldThrow = async () => {
        await sut.create(usuario, data)
      }

      expect(shouldThrow).rejects.toThrow(UnauthorizedError)
    })
  })

  describe('delete', () => {
    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento),
      destroy: jest.fn().mockResolvedValue(procedimento)
    })

    it('should delete an existing procedimento by id', async () => {
      const sut = new ProcedimentoService(repo, baseRepo, statusService)
      const result = await sut.delete(1)

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.destroy).toBeCalledWith(1)
    })

    it('should throw NotFoundError if procedimento does not exists', async () => {
      const repo = createMock<IProcedimentoRepo>({
        findOne: jest.fn(),
        destroy: jest.fn().mockResolvedValue(procedimento)
      })
      const sut = new ProcedimentoService(repo, baseRepo, statusService)

      const shouldThrow = async () => {
        await sut.delete(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findOne', () => {
    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento)
    })

    it('should find an existing procedimento by id', async () => {
      const sut = new ProcedimentoService(repo, baseRepo, statusService)
      const result = await sut.findOne(1)

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(1)
    })
  })

  describe('findAll', () => {
    const repo = createMock<IProcedimentoRepo>({
      findAll: jest.fn().mockResolvedValue(procedimentos)
    })

    it('should return all procedimentos', async () => {
      const sut = new ProcedimentoService(repo, baseRepo, statusService)
      const result = await sut.findAll()

      expect(result).toEqual(procedimentos)
      expect(repo.findAll).toBeCalledWith({})
    })

    it('should return procedimentos which matches the query', async () => {
      const sut = new ProcedimentoService(repo, baseRepo, statusService)
      const query: ProcedimentoQuery = { deleted: true }

      await sut.findAll(query)

      expect(repo.findAll).toBeCalledWith(query)
    })
  })

  describe('updateStatus', () => {
    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento),
      updateStatus: jest.fn().mockResolvedValue(procedimento)
    })

    it('should update the status of an existing procedimento', async () => {
      const sut = new ProcedimentoService(repo, baseRepo, statusService)
      const result = await sut.updateStatus(1, 'deferido')

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(1)
      expect(statusService.execute).toBeCalledWith(procedimento, 'deferido')
      expect(repo.updateStatus).toBeCalledWith(1, status)
    })
  })

  describe('update', () => {
    const procedimento = createMock<ProcedimentoModel>({
      status: [createMock<Status>({ status: 'correcoes_pendentes' })]
    })

    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento),
      update: jest.fn().mockResolvedValue(procedimento),
      updateStatus: jest.fn().mockResolvedValue(procedimento)
    })

    const data: Partial<ProcedimentoModel> = {
      respostas: [createMock<Resposta>()]
    }

    it('should update an existing procedimento', async () => {
      const sut = new ProcedimentoService(repo, baseRepo, statusService)
      const result = await sut.update(1, data)

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.update).toBeCalledWith(1, data)
      expect(repo.updateStatus).toBeCalledWith(1, status)
    })

    it("should throw BadRequestError if current procedimento status isnt ''correcoes_pendentes'", async () => {
      const procedimento = createMock<ProcedimentoModel>({
        status: [createMock<Status>({ status: 'criado' })]
      })

      const repo = createMock<IProcedimentoRepo>({
        findOne: jest.fn().mockResolvedValue(procedimento),
        update: jest.fn().mockResolvedValue(procedimento),
        updateStatus: jest.fn().mockResolvedValue(procedimento)
      })

      const sut = new ProcedimentoService(repo, baseRepo, statusService)

      const shouldThrow = async () => {
        await sut.update(1, data)
      }

      expect(shouldThrow).rejects.toThrow(BadRequestError)
    })
  })

  describe('newReview', () => {
    const tipoProcedimento = createMock<TipoProcedimentoModel>({
      colegiado: true
    })
    const usuario = createMock<UserModel>()

    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento),
      newRevisao: jest.fn().mockResolvedValue(procedimento),
      updateStatus: jest.fn().mockResolvedValue(procedimento)
    })

    const statusService = createMock<IProcedimentoStatusService>({
      execute: jest.fn().mockResolvedValue(status)
    })

    const tipoRepo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(tipoProcedimento)
    })

    const data = createMock<NewRevisao>({ aprovado: true })

    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
    })

    it('should add a newRevisao to an existing procedimento', async () => {
      const sut = new ProcedimentoService(repo, tipoRepo, statusService)
      const result = await sut.newReview(1, usuario, data)

      const revisao = {
        ...data,
        data: new Date('2020-01-01').toISOString(),
        autor: usuario
      }

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.newRevisao).toBeCalledWith(1, revisao)
      expect(tipoRepo.findOne).toBeCalledWith(procedimento.tipo)
      expect(statusService.execute).toBeCalledWith(
        procedimento,
        'em_homologacao'
      )
    })

    it("should update the status to 'deferido' if tipoProcedimento shouldn't forward to colegiado", async () => {
      const tipoProcedimento = createMock<TipoProcedimentoModel>({
        colegiado: false
      })
      const statusService = createMock<IProcedimentoStatusService>({
        execute: jest.fn().mockResolvedValue(status)
      })

      const tipoRepo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(tipoProcedimento)
      })

      const sut = new ProcedimentoService(repo, tipoRepo, statusService)

      await sut.newReview(1, usuario, data)

      expect(statusService.execute).toBeCalledWith(procedimento, 'deferido')
    })

    it("should update the status to 'correcoes_pendentes' if hasn't been approved", async () => {
      const statusService = createMock<IProcedimentoStatusService>({
        execute: jest.fn().mockResolvedValue(status)
      })

      const sut = new ProcedimentoService(repo, tipoRepo, statusService)
      const data = createMock<NewRevisao>({ aprovado: false })

      await sut.newReview(1, usuario, data)

      expect(statusService.execute).toBeCalledWith(
        procedimento,
        'correcoes_pendentes'
      )
    })
  })
})
