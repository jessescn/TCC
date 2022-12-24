import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ProcedimentoModel, Resposta, Status } from 'domain/models/procedimento'
import { ActorModel } from 'domain/models/actor'
import { IRepository, Pagination } from 'repositories'
import {
  IProcedimentoRepo,
  NewProcedimento,
  NewRevisao,
  ProcedimentoQuery
} from 'repositories/sequelize/procedimento'
import { ProcedimentoService } from 'services/procedimento'
import { IProcedimentoStatusService } from 'services/procedimento-status'
import { createMock, createMockList } from 'ts-auto-mock'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from 'types/express/errors'
import { FormularioModel } from 'domain/models/formulario'
import { ComentarioModel } from 'domain/models/comentario'

describe('Procedimento Service', () => {
  const procedimento = createMock<ProcedimentoModel>({ tipo: 1 })
  const procedimentos = createMockList<ProcedimentoModel>(2)
  const tipoProcedimento = createMock<TipoProcedimentoModel>()

  const status = createMock<Status>()
  const baseRepo = createMock<IRepository>()

  const statusService = createMock<IProcedimentoStatusService>({
    execute: jest.fn().mockResolvedValue(status)
  })

  const pagination: Pagination = {
    page: 1,
    per_page: 1000,
    term: null
  }

  describe('create', () => {
    const tipoProcedimento = createMock<TipoProcedimentoModel>({
      colegiado: true,
      revisao_coordenacao: true
    })
    const usuario = createMock<ActorModel>({ id: 1 })
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
      const sut = new ProcedimentoService(
        repo,
        tipoRepo,
        baseRepo,
        baseRepo,
        statusService
      )
      const result = await sut.create(usuario, data)

      expect(tipoRepo.findOne).toBeCalledWith(data.tipo)
      expect(repo.create).toBeCalledWith({
        respostas: data.respostas,
        tipo: data.tipo,
        createdBy: usuario.id
      })
      expect(statusService.execute).toBeCalledWith(procedimento, 'em_analise')
      expect(repo.updateStatus).toBeCalledWith(procedimento.id, status)
      expect(result).toEqual(procedimento)
    })

    it('should throw BadRequestError if tipoProcedimento does not exists', async () => {
      const tipoRepo = createMock<IRepository>({
        findOne: jest.fn()
      })

      const sut = new ProcedimentoService(
        repo,
        tipoRepo,
        baseRepo,
        baseRepo,
        statusService
      )

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

      const sut = new ProcedimentoService(
        repo,
        tipoRepo,
        baseRepo,
        baseRepo,
        statusService
      )

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
      const sut = new ProcedimentoService(
        repo,
        baseRepo,
        baseRepo,
        baseRepo,
        statusService
      )
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
      const sut = new ProcedimentoService(
        repo,
        baseRepo,
        baseRepo,
        baseRepo,
        statusService
      )

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
      const sut = new ProcedimentoService(
        repo,
        baseRepo,
        baseRepo,
        baseRepo,
        statusService
      )
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
      const sut = new ProcedimentoService(
        repo,
        baseRepo,
        baseRepo,
        baseRepo,
        statusService
      )
      const result = await sut.findAll({}, pagination)

      expect(result.data).toEqual(procedimentos)
      expect(result.total).toEqual(procedimentos.length)
      expect(repo.findAll).toBeCalledWith({}, null)
    })

    it('should return procedimentos which matches the query', async () => {
      const sut = new ProcedimentoService(
        repo,
        baseRepo,
        baseRepo,
        baseRepo,
        statusService
      )
      const query: ProcedimentoQuery = { deleted: true }

      await sut.findAll(query, pagination)

      expect(repo.findAll).toHaveBeenCalledWith(query, null)
    })
  })

  describe('details', () => {
    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento)
    })

    const tipoRepo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(tipoProcedimento)
    })

    const comentarios = createMockList<ComentarioModel>(2)

    const comentarioRepo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(comentarios)
    })

    const formularios = createMockList<FormularioModel>(2)

    const formularioRepo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(formularios)
    })

    it('should return details about an specific procedimento and related entities', async () => {
      const sut = new ProcedimentoService(
        repo,
        tipoRepo,
        comentarioRepo,
        formularioRepo,
        statusService
      )

      const result = await sut.details(1)

      expect(result.comentarios).toEqual(comentarios)
      expect(result.formularios).toEqual(formularios)
      expect(result.procedimento).toEqual(procedimento)
      expect(result.tipoProcedimento).toEqual(tipoProcedimento)
    })

    it('should throw error if procedimento does not have related tipoProcedimentoId', async () => {
      const procedimentoWithoutTipo = createMock<ProcedimentoModel>()

      const repo = createMock<IProcedimentoRepo>({
        findOne: jest.fn().mockResolvedValue(procedimentoWithoutTipo)
      })

      const sut = new ProcedimentoService(
        repo,
        tipoRepo,
        comentarioRepo,
        formularioRepo,
        statusService
      )

      const shouldThrow = async () => {
        await sut.details(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAllByStatus', () => {
    const repo = createMock<IProcedimentoRepo>({
      findAllByStatus: jest.fn().mockResolvedValue(procedimentos)
    })

    it('should procedimentos filtered by status paginated', async () => {
      const sut = new ProcedimentoService(
        repo,
        baseRepo,
        baseRepo,
        baseRepo,
        statusService
      )

      const result = await sut.findAllByStatus('criado', pagination)

      expect(result.total).toEqual(procedimentos.length)
      expect(result.data).toEqual(procedimentos)
    })
  })

  describe('updateStatus', () => {
    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento),
      updateStatus: jest.fn().mockResolvedValue(procedimento)
    })

    it('should update the status of an existing procedimento', async () => {
      const sut = new ProcedimentoService(
        repo,
        baseRepo,
        baseRepo,
        baseRepo,
        statusService
      )
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
      const sut = new ProcedimentoService(
        repo,
        baseRepo,
        baseRepo,
        baseRepo,
        statusService
      )
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

      const sut = new ProcedimentoService(
        repo,
        baseRepo,
        baseRepo,
        baseRepo,
        statusService
      )

      const shouldThrow = async () => {
        await sut.update(1, data)
      }

      expect(shouldThrow).rejects.toThrow(BadRequestError)
    })
  })

  describe('newReview', () => {
    const procedimento = createMock<ProcedimentoModel>({
      status: [{ data: new Date().toISOString(), status: 'em_analise' }]
    })
    const tipoProcedimento = createMock<TipoProcedimentoModel>({
      colegiado: true
    })
    const usuario = createMock<ActorModel>()

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
      const sut = new ProcedimentoService(
        repo,
        tipoRepo,
        baseRepo,
        baseRepo,
        statusService
      )
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

      const sut = new ProcedimentoService(
        repo,
        tipoRepo,
        baseRepo,
        baseRepo,
        statusService
      )

      await sut.newReview(1, usuario, data)

      expect(statusService.execute).toBeCalledWith(procedimento, 'deferido')
    })

    it("should update the status to 'correcoes_pendentes' if hasn't been approved", async () => {
      const statusService = createMock<IProcedimentoStatusService>({
        execute: jest.fn().mockResolvedValue(status)
      })

      const sut = new ProcedimentoService(
        repo,
        tipoRepo,
        baseRepo,
        baseRepo,
        statusService
      )
      const data = createMock<NewRevisao>({ aprovado: false })

      await sut.newReview(1, usuario, data)

      expect(statusService.execute).toBeCalledWith(
        procedimento,
        'correcoes_pendentes'
      )
    })

    it('should throw error if procedimento is not in em_analise status', async () => {
      const procedimento = createMock<ProcedimentoModel>({
        status: [{ data: new Date().toISOString(), status: 'criado' }]
      })

      const repo = createMock<IProcedimentoRepo>({
        findOne: jest.fn().mockResolvedValue(procedimento),
        newRevisao: jest.fn().mockResolvedValue(procedimento),
        updateStatus: jest.fn().mockResolvedValue(procedimento)
      })

      const sut = new ProcedimentoService(
        repo,
        tipoRepo,
        baseRepo,
        baseRepo,
        statusService
      )

      const shouldThrow = async () => {
        await sut.newReview(1, usuario, data)
      }

      expect(shouldThrow).rejects.toThrow(BadRequestError)
    })
  })
})
