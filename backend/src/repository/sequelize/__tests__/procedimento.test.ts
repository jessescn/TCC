import { CreateProcedimento } from 'repository/sequelize/procedimento'
import Comentario from 'domain/models/comentario'
import Procedimento, {
  ProcedimentoAttributes,
  ProcedimentoModel,
  Revisao,
  Status,
  VotoProcedimento
} from 'domain/models/procedimento'
import TipoProcedimento from 'domain/models/tipo-procedimento'
import { createMock, createMockList } from 'ts-auto-mock'
import { includeableUser, ProcedimentoRepository } from '../procedimento'
import { ProcedimentoStatusService } from 'services/procedimento-status'

describe('Procedimento Repository', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const procedimentos = createMockList<ProcedimentoModel>(2)

  const sut = new ProcedimentoRepository()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('findOne', () => {
    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimento as ProcedimentoAttributes)
    })

    it('should return a specific procedimento by id', async () => {
      const result = await sut.findOne(1)

      expect(result).toEqual(procedimento)
      expect(Procedimento.findOne).toBeCalledWith({
        where: { id: 1, deleted: false },
        include: [TipoProcedimento, Comentario, includeableUser]
      })
    })
  })

  describe('findAll', () => {
    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findAll')
        .mockResolvedValueOnce(procedimentos as ProcedimentoAttributes[])
    })

    it('should return all procedimentos', async () => {
      const result = await sut.findAll()

      expect(result).toEqual(procedimentos)
      expect(Procedimento.findAll).toBeCalledWith({
        include: [TipoProcedimento, Comentario, includeableUser],
        where: { deleted: false }
      })
    })

    it('should return all procedimentos which query applies on', async () => {
      const query = { tipo: 2 }

      const result = await sut.findAll(query)

      expect(result).toEqual(procedimentos)
      expect(Procedimento.findAll).toBeCalledWith({
        include: [TipoProcedimento, Comentario, includeableUser],
        where: { deleted: false, ...query }
      })
    })
  })

  describe('create', () => {
    const createProcedimento = createMock<CreateProcedimento>()
    const date = new Date()

    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(date.getTime())

      jest
        .spyOn(Procedimento, 'create')
        .mockResolvedValueOnce(procedimento as ProcedimentoAttributes)
    })

    it('should create a new procedimento with an initial status', async () => {
      const statusCreated: Status = {
        data: date.toISOString(),
        status: 'criado'
      }

      const result = await sut.create(createProcedimento)

      expect(result).toEqual(procedimento)
      expect(Procedimento.create).toBeCalledWith({
        ...createProcedimento,
        status: [statusCreated]
      })
    })
  })

  describe('update', () => {
    const procedimentoWithSpies = {
      ...procedimento,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimentoWithSpies as any)
    })

    it('should update an existing procedimento', async () => {
      const data = { tipo: 2 }

      const result = await sut.update(1, data)

      expect(result).toEqual(procedimentoWithSpies)
      expect(Procedimento.findOne).toBeCalledWith({
        where: { id: 1, deleted: false },
        include: [TipoProcedimento, Comentario, includeableUser]
      })
      expect(procedimentoWithSpies.save).toBeCalled()
      expect(procedimentoWithSpies.set).toBeCalledWith(data)
    })
  })

  describe('destroy', () => {
    const procedimentoWithSpies = {
      ...procedimento,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimentoWithSpies as any)
    })

    it('should delete an existing procedimento setting the deleted flag as true', async () => {
      const result = await sut.destroy(1)

      expect(result).toEqual(procedimentoWithSpies)
      expect(Procedimento.findOne).toBeCalledWith({
        where: { id: 1, deleted: false },
        include: [TipoProcedimento, Comentario, includeableUser]
      })
      expect(procedimentoWithSpies.save).toBeCalled()
      expect(procedimentoWithSpies.set).toBeCalledWith({ deleted: true })
    })
  })

  describe('updateVote', () => {
    const vote = createMock<VotoProcedimento>()

    const procedimentoWithSpies = {
      ...procedimento,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimentoWithSpies as any)
    })

    it("should insert/update the procedimento's votes", async () => {
      const result = await sut.updateVote(1, vote)

      expect(result).toEqual(procedimentoWithSpies)
      expect(Procedimento.findOne).toBeCalledWith({
        where: { id: 1, deleted: false },
        include: [TipoProcedimento, Comentario, includeableUser]
      })
      expect(procedimentoWithSpies.set).toBeCalledWith({ votos: [vote] })
      expect(procedimentoWithSpies.save).toBeCalled()
    })
  })

  describe('removeVote', () => {
    const vote = createMock<VotoProcedimento>({ autor: 1 })

    const procedimentoWithSpies = {
      ...procedimento,
      votos: [vote],
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimentoWithSpies as any)
    })

    it('should delete a vote by its autor', async () => {
      const result = await sut.removeVote(1, 1)

      expect(result).toEqual(procedimentoWithSpies)
      expect(Procedimento.findOne).toBeCalledWith({
        where: { id: 1, deleted: false },
        include: [TipoProcedimento, Comentario, includeableUser]
      })
      expect(procedimentoWithSpies.set).toBeCalledWith({ votos: [] })
      expect(procedimentoWithSpies.save).toBeCalled()
    })
  })

  describe('updateStatus', () => {
    const procedimentoWithSpies = {
      ...procedimento,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimentoWithSpies as any)

      jest
        .spyOn(ProcedimentoStatusService, 'changeProcedimentoStatus')
        .mockResolvedValueOnce(procedimento as ProcedimentoAttributes)
    })

    it('should update the procedimento status', async () => {
      const result = await sut.updateStatus(10, 'em_homologacao')

      expect(result).toEqual(procedimento)
      expect(Procedimento.findOne).toBeCalledWith({
        where: { id: 10, deleted: false },
        include: [TipoProcedimento, Comentario, includeableUser]
      })
      expect(ProcedimentoStatusService.changeProcedimentoStatus).toBeCalledWith(
        procedimentoWithSpies,
        'em_homologacao'
      )
    })
  })

  describe('newRevisao', () => {
    const revisao = createMock<Revisao>()

    const procedimentoWithSpies = {
      ...procedimento,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimentoWithSpies as any)
    })

    it('should add a new revisao to an existing procedimento', async () => {
      const result = await sut.newRevisao(1, revisao)

      expect(result).toEqual(procedimentoWithSpies)
      expect(Procedimento.findOne).toBeCalledWith({
        where: { id: 1, deleted: false },
        include: [TipoProcedimento, Comentario, includeableUser]
      })
      expect(procedimentoWithSpies.set).toBeCalledWith({ revisoes: [revisao] })
      expect(procedimentoWithSpies.save).toBeCalled()
    })
  })
})
