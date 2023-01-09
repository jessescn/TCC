import TipoProcedimento, {
  TipoProcedimentoAttributes,
  TipoProcedimentoModel
} from 'domain/models/tipo-procedimento'
import { Op } from 'sequelize'
import { createMock, createMockList } from 'ts-auto-mock'
import {
  CreateTipoProcedimento,
  TipoProcedimentoRepository
} from '../tipo-procedimento'
import { createUpdatableElement } from './voto.test'

describe('Tipo Procedimento Repository', () => {
  const tipoProcedimento = createMock<TipoProcedimentoModel>()
  const tipoProcedimentos = createMockList<TipoProcedimentoModel>(2)

  const sut = new TipoProcedimentoRepository()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findAll', () => {
    beforeEach(() => {
      jest
        .spyOn(TipoProcedimento, 'findAll')
        .mockResolvedValueOnce(
          tipoProcedimentos as TipoProcedimentoAttributes[]
        )
    })

    it('should return all tipoProcedimentos', async () => {
      const result = await sut.findAll({})

      expect(result).toEqual(tipoProcedimentos)
      expect(TipoProcedimento.findAll).toBeCalledWith({
        where: {},
        order: [['updatedAt', 'DESC']]
      })
    })

    it('should return only the tipoProcedimento which the query applies on', async () => {
      const query = { status: 'ativo' }

      const term = '1'
      const result = await sut.findAll(query, term)

      const searchQuery = {
        [Op.or]: [
          { nome: { [Op.iLike]: '%' + term + '%' } },
          { status: { [Op.eq]: term } },
          { id: { [Op.eq]: term } }
        ]
      }

      expect(result).toEqual(tipoProcedimentos)
      expect(TipoProcedimento.findAll).toBeCalledWith({
        where: { ...query, ...searchQuery },
        order: [['updatedAt', 'DESC']]
      })
    })
  })

  describe('findOne', () => {
    jest
      .spyOn(TipoProcedimento, 'findOne')
      .mockResolvedValueOnce(tipoProcedimento as TipoProcedimentoAttributes)

    it('should return a tipoProcedimento by id', async () => {
      const result = await sut.findOne(1)

      expect(result).toEqual(tipoProcedimento)
      expect(TipoProcedimento.findOne).toBeCalledWith({
        where: { id: 1 }
      })
    })
  })

  describe('create', () => {
    const createTipoProcedimento = createMock<CreateTipoProcedimento>()

    jest
      .spyOn(TipoProcedimento, 'create')
      .mockResolvedValueOnce(tipoProcedimento as TipoProcedimentoAttributes)

    it('should create a new tipoProcedimento', async () => {
      const result = await sut.create(createTipoProcedimento)

      expect(result).toEqual(tipoProcedimento)
      expect(TipoProcedimento.create).toBeCalledWith(createTipoProcedimento)
    })
  })

  describe('update', () => {
    const tipoProcedimentoWithSpies =
      createUpdatableElement<TipoProcedimentoAttributes>(tipoProcedimento)

    jest
      .spyOn(TipoProcedimento, 'findOne')
      .mockResolvedValueOnce(tipoProcedimentoWithSpies as any)

    it('should update an existing tipoProcedimento', async () => {
      const result = await sut.update(1, { colegiado: true })

      expect(result).toEqual(tipoProcedimentoWithSpies)
      expect(TipoProcedimento.findOne).toBeCalled()
      expect(tipoProcedimentoWithSpies.set).toBeCalledWith({ colegiado: true })
      expect(tipoProcedimentoWithSpies.save).toBeCalled()
    })
  })

  describe('destroy', () => {
    const tipoProcedimentoWithSpies =
      createUpdatableElement<TipoProcedimentoAttributes>(tipoProcedimento)

    jest
      .spyOn(TipoProcedimento, 'findOne')
      .mockResolvedValueOnce(tipoProcedimentoWithSpies as any)

    it('should update an existing tipoProcedimento', async () => {
      const result = await sut.destroy(1)

      expect(result).toEqual(tipoProcedimentoWithSpies)
      expect(TipoProcedimento.findOne).toBeCalled()
      expect(tipoProcedimentoWithSpies.set).toBeCalledWith({ deleted: true })
      expect(tipoProcedimentoWithSpies.save).toBeCalled()
    })
  })
})
