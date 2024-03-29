import Actor from 'domain/models/actor'
import Formulario, {
  FormularioAttributes,
  FormularioModel
} from 'domain/models/formulario'
import { Op } from 'sequelize'
import { createMock, createMockList } from 'ts-auto-mock'
import { CreateFormulario, FormularioRepository } from '../formulario'
import { createUpdatableElement } from './voto.test'

describe('Formulario Repository', () => {
  const formulario = createMock<FormularioModel>()
  const formularios = createMockList<FormularioModel>(2)

  const sut = new FormularioRepository()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findAll', () => {
    beforeEach(() => {
      jest
        .spyOn(Formulario, 'findAll')
        .mockResolvedValueOnce(formularios as FormularioAttributes[])
    })

    it('should return all formularios', async () => {
      const result = await sut.findAll()

      expect(result).toEqual(formularios)
      expect(Formulario.findAll).toBeCalledWith({
        where: {},
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: Actor,
            attributes: ['nome']
          }
        ]
      })
    })

    it('should pass the query to model method', async () => {
      const query = { nome: 'test' }
      const term = '1'

      await sut.findAll(query, term)

      const searchQuery = {
        [Op.or]: [
          { nome: { [Op.iLike]: '%' + term + '%' } },
          { id: { [Op.eq]: term } }
        ]
      }

      expect(Formulario.findAll).toBeCalledWith({
        where: { ...query, ...searchQuery },
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: Actor,
            attributes: ['nome']
          }
        ]
      })
    })
  })

  describe('findOne', () => {
    beforeEach(() => {
      jest
        .spyOn(Formulario, 'findOne')
        .mockResolvedValueOnce(formulario as FormularioAttributes)
    })

    it('should find one formulario by id', async () => {
      const result = await sut.findOne(2)

      expect(result).toEqual(formulario)
      expect(Formulario.findOne).toBeCalledWith({
        where: { id: 2, deleted: false },
        include: [
          {
            model: Actor,
            attributes: ['nome']
          }
        ]
      })
    })
  })

  describe('create', () => {
    const createFormulario = createMock<CreateFormulario>()

    beforeEach(() => {
      jest
        .spyOn(Formulario, 'create')
        .mockResolvedValueOnce(formulario as FormularioAttributes)

      jest
        .spyOn(Formulario, 'findOne')
        .mockResolvedValueOnce(formulario as FormularioAttributes)
    })

    it('should create a new formulario', async () => {
      const result = await sut.create(createFormulario)

      expect(result).toEqual(formulario)
      expect(Formulario.create).toBeCalledWith(createFormulario)
    })
  })

  describe('update', () => {
    const formularioWithSpies = createUpdatableElement<FormularioAttributes>()

    beforeEach(() => {
      jest
        .spyOn(Formulario, 'findOne')
        .mockResolvedValueOnce(formularioWithSpies)
    })

    it('should update a existing formulario', async () => {
      const data = { descricao: 'description test' }

      const result = await sut.update(1, data)

      expect(result).toEqual(formularioWithSpies)
      expect(Formulario.findOne).toBeCalled()
      expect(formularioWithSpies.set).toBeCalledWith({ ...data })
      expect(formularioWithSpies.save).toBeCalled()
    })
  })

  describe('destroy', () => {
    const formularioWithSpies = createUpdatableElement<FormularioAttributes>()

    beforeEach(() => {
      jest
        .spyOn(Formulario, 'findOne')
        .mockResolvedValueOnce(formularioWithSpies)
    })

    it('should destroy a formulario setting the deleted flag as true', async () => {
      const result = await sut.destroy(1)

      expect(result).toEqual(formularioWithSpies)
      expect(Formulario.findOne).toBeCalled()
      expect(formularioWithSpies.set).toBeCalledWith({ deleted: true })
      expect(formularioWithSpies.save).toBeCalled()
    })
  })
})
