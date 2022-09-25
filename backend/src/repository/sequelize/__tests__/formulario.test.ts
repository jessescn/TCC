import Formulario, {
  FormularioAttributes,
  FormularioModel
} from 'domain/models/formulario'
import User from 'domain/models/user'
import { includeableUser } from 'repository'
import { createMock, createMockList } from 'ts-auto-mock'
import { CreateFormulario, FormularioRepository } from '../formulario'

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
        include: [includeableUser],
        where: { deleted: false }
      })
    })

    it('should pass the query to model method', async () => {
      const query = { nome: 'test' }

      await sut.findAll(query)

      expect(Formulario.findAll).toBeCalledWith({
        include: [includeableUser],
        where: { deleted: false, ...query }
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
        include: [includeableUser]
      })
    })
  })

  describe('create', () => {
    const createFormulario = createMock<CreateFormulario>()

    beforeEach(() => {
      jest
        .spyOn(Formulario, 'create')
        .mockResolvedValueOnce(formulario as FormularioAttributes)
    })

    it('should create a new formulario', async () => {
      const result = await sut.create(createFormulario)

      expect(result).toEqual(formulario)
      expect(Formulario.create).toBeCalledWith(createFormulario, {
        include: [User]
      })
    })
  })

  describe('update', () => {
    const formularioWithSpies = {
      ...formulario,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest
        .spyOn(Formulario, 'findOne')
        .mockResolvedValueOnce(formularioWithSpies as any)
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
    const formularioWithSpies = {
      ...formulario,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest
        .spyOn(Formulario, 'findOne')
        .mockResolvedValueOnce(formularioWithSpies as any)
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
