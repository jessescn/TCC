import { FormularioModel } from 'domain/models/formulario'
import { ActorModel } from 'domain/models/actor'
import { IRepository } from 'repository'
import { FormularioQuery, NewFormulario } from 'repository/sequelize/formulario'
import { FormularioService } from 'services/formulario'
import { createMock, createMockList } from 'ts-auto-mock'
import { NotFoundError } from 'types/express/errors'

describe('Formulario Service', () => {
  const formulario = createMock<FormularioModel>()
  const formularios = createMockList<FormularioModel>(2)

  describe('create', () => {
    const repo = createMock<IRepository>({
      create: jest.fn().mockResolvedValue(formulario)
    })

    const usuario = createMock<ActorModel>({ id: 1 })
    const newFormulario = createMock<NewFormulario>()

    it('should create a new formulario', async () => {
      const sut = new FormularioService(repo)
      const result = await sut.create(usuario, newFormulario)

      expect(result).toEqual(formulario)
      expect(repo.create).toBeCalledWith({
        campos: newFormulario.campos,
        nome: newFormulario.nome,
        descricao: newFormulario.descricao,
        createdBy: usuario.id
      })
    })
  })

  describe('findOne', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(formulario)
    })

    it('should find an existing formulario by id', async () => {
      const sut = new FormularioService(repo)
      const result = await sut.findOne(1)

      expect(result).toEqual(formulario)
      expect(repo.findOne).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if formulario cannot be found', async () => {
      const repoWithUndefined = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new FormularioService(repoWithUndefined)

      const shouldThrow = async () => {
        await sut.findOne(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    const repo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(formularios)
    })

    it('should find all formularios', async () => {
      const sut = new FormularioService(repo)
      const result = await sut.findAll()

      expect(result).toEqual(formularios)
      expect(repo.findAll).toBeCalledWith({})
    })

    it('should find formularios which matches the provided query', async () => {
      const query: FormularioQuery = { campos: [] }
      const sut = new FormularioService(repo)

      const result = await sut.findAll(query)

      expect(result).toEqual(formularios)
      expect(repo.findAll).toBeCalledWith(query)
    })
  })

  describe('delete', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(formulario),
      destroy: jest.fn().mockResolvedValue(formulario)
    })

    it('should delete an existing formulario', async () => {
      const sut = new FormularioService(repo)
      const result = await sut.delete(1)

      expect(result).toEqual(formulario)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.destroy).toBeCalledWith(1)
    })

    it('should throw an NotFoundError if formulario does not exist', async () => {
      const repoWithUndefined = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new FormularioService(repoWithUndefined)

      const shouldThrow = async () => {
        await sut.delete(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('update', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(formulario),
      update: jest.fn().mockResolvedValue(formulario)
    })

    const data: Partial<FormularioModel> = { descricao: 'test' }

    it('should update an existing formulario', async () => {
      const sut = new FormularioService(repo)

      const result = await sut.update(1, data)

      expect(result).toEqual(formulario)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.update).toBeCalledWith(1, data)
    })
  })
})
