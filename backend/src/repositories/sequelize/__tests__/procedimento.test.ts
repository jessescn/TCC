import { CreateProcedimento } from 'repositories/sequelize/procedimento'
import Procedimento, {
  ProcedimentoAttributes,
  ProcedimentoModel,
  Revisao,
  Status
} from 'domain/models/procedimento'
import TipoProcedimento from 'domain/models/tipo-procedimento'
import { createMock, createMockList } from 'ts-auto-mock'
import { ProcedimentoRepository } from '../procedimento'
import Actor from 'domain/models/actor'
import { createUpdatableElement } from './voto.test'

describe('Procedimento Repository', () => {
  const procedimento = createMock<ProcedimentoModel>({
    status: [{ data: new Date().toISOString(), status: 'correcoes_pendentes' }]
  })
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
      expect(Procedimento.findOne).toBeCalled()
    })
  })

  describe('findAll', () => {
    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findAll')
        .mockResolvedValue(procedimentos as ProcedimentoAttributes[])
    })

    it('should return all procedimentos', async () => {
      const result = await sut.findAll()

      expect(result).toEqual(procedimentos)
      expect(Procedimento.findAll).toBeCalledWith({
        include: [
          {
            model: Actor,
            attributes: ['nome']
          },
          {
            model: TipoProcedimento,
            where: {}
          }
        ],
        where: { deleted: false },
        order: [['updatedAt', 'DESC']]
      })
    })

    it('should return all procedimentos which query applies on', async () => {
      const query = { tipo: 2 }
      const term = '1'

      const result = await sut.findAll(query, term)

      expect(result).toEqual(procedimentos)
      expect(Procedimento.findAll).toBeCalledTimes(2)
    })
  })

  describe('findAllByStatus', () => {
    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findAll')
        .mockResolvedValue([procedimento] as ProcedimentoAttributes[])
    })

    it('should return all procedimentos with specific status', async () => {
      const result = await sut.findAllByStatus('correcoes_pendentes')

      expect(result).toEqual([procedimento])
      expect(Procedimento.findAll).toBeCalled()
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
    const procedimentoWithSpies =
      createUpdatableElement<ProcedimentoAttributes>(procedimento)

    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimentoWithSpies)
    })

    it('should update an existing procedimento', async () => {
      const data = { tipo: 2 }

      const result = await sut.update(1, data)

      expect(result).toEqual(procedimentoWithSpies)
      expect(Procedimento.findOne).toBeCalled()
      expect(procedimentoWithSpies.save).toBeCalled()
      expect(procedimentoWithSpies.set).toBeCalledWith(data)
    })
  })

  describe('destroy', () => {
    const procedimentoWithSpies =
      createUpdatableElement<ProcedimentoAttributes>(procedimento)

    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimentoWithSpies as any)
    })

    it('should delete an existing procedimento setting the deleted flag as true', async () => {
      const result = await sut.destroy(1)

      expect(result).toEqual(procedimentoWithSpies)
      expect(Procedimento.findOne).toBeCalled()
      expect(procedimentoWithSpies.save).toBeCalled()
      expect(procedimentoWithSpies.set).toBeCalledWith({ deleted: true })
    })
  })

  describe('updateStatus', () => {
    const procedimentoWithSpies =
      createUpdatableElement<ProcedimentoAttributes>(procedimento)

    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimentoWithSpies as any)
    })

    it('should update the procedimento status', async () => {
      const status: Status = {
        data: new Date().toISOString(),
        status: 'em_homologacao'
      }

      const result = await sut.updateStatus(10, status)

      expect(result).toEqual(procedimentoWithSpies)
      expect(Procedimento.findOne).toBeCalled()
      expect(procedimentoWithSpies.set).toBeCalledWith({
        status: [...procedimentoWithSpies.status, status]
      })
      expect(procedimentoWithSpies.save).toBeCalled()
    })
  })

  describe('newRevisao', () => {
    const revisao = createMock<Revisao>()

    const procedimentoWithSpies =
      createUpdatableElement<ProcedimentoAttributes>(procedimento)

    beforeEach(() => {
      jest
        .spyOn(Procedimento, 'findOne')
        .mockResolvedValueOnce(procedimentoWithSpies as any)
    })

    it('should add a new revisao to an existing procedimento', async () => {
      const result = await sut.newRevisao(1, revisao)

      expect(result).toEqual(procedimentoWithSpies)
      expect(Procedimento.findOne).toBeCalled()
      expect(procedimentoWithSpies.set).toBeCalledWith({ revisoes: [revisao] })
      expect(procedimentoWithSpies.save).toBeCalled()
    })
  })
})
