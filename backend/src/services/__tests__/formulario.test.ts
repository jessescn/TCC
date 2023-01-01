import { ActorModel } from 'domain/models/actor'
import { FormularioModel } from 'domain/models/formulario'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { IRepository, Pagination } from 'repositories'
import {
  FormularioQuery,
  NewFormulario
} from 'repositories/sequelize/formulario'
import { FormularioService } from 'services/formulario'
import { createMock, createMockList } from 'ts-auto-mock'
import { NotFoundError } from 'types/express/errors'

describe('Formulario Service', () => {
  const formulario = createMock<FormularioModel>({ id: 1 })
  const formularios = createMockList<FormularioModel>(2)

  const tipoRepo = createMock<IRepository>()

  describe('create', () => {
    const repo = createMock<IRepository>({
      create: jest.fn().mockResolvedValue(formulario)
    })

    const usuario = createMock<ActorModel>({ id: 1 })
    const newFormulario = createMock<NewFormulario>()

    it('should create a new formulario', async () => {
      const sut = new FormularioService(repo, tipoRepo)
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
      const sut = new FormularioService(repo, tipoRepo)
      const result = await sut.findOne(1)

      expect(result).toEqual(formulario)
      expect(repo.findOne).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if formulario cannot be found', async () => {
      const repoWithUndefined = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new FormularioService(repoWithUndefined, tipoRepo)

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
    const pagination: Pagination = {
      per_page: 1000,
      page: 1,
      term: null
    }

    it('should find all formularios', async () => {
      const sut = new FormularioService(repo, tipoRepo)
      const result = await sut.findAll({}, pagination)

      expect(result.data).toEqual(formularios)
      expect(repo.findAll).toBeCalledWith({}, null)
    })

    it('should find formularios which matches the provided query', async () => {
      const query: FormularioQuery = { campos: [] }
      const sut = new FormularioService(repo, tipoRepo)

      const result = await sut.findAll(query, pagination)

      expect(result.data).toEqual(formularios)
      expect(repo.findAll).toBeCalledWith(query, null)
    })
  })

  describe('delete', () => {
    const tipoProcedimento = createMock<TipoProcedimentoModel>({
      formularios: [1]
    })
    const tipoProcedimentoWithSpies = {
      ...tipoProcedimento,
      set: jest.fn(),
      save: jest.fn()
    }
    const tipoRepo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue([tipoProcedimentoWithSpies])
    })

    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(formulario),
      destroy: jest.fn().mockResolvedValue(formulario)
    })

    it('should delete an existing formulario', async () => {
      const sut = new FormularioService(repo, tipoRepo)
      const result = await sut.delete(1)

      expect(result).toEqual(formulario)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.destroy).toBeCalledWith(1)
    })

    it('should throw an NotFoundError if formulario does not exist', async () => {
      const repoWithUndefined = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new FormularioService(repoWithUndefined, tipoRepo)

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
      const sut = new FormularioService(repo, tipoRepo)

      const result = await sut.update(1, data)

      expect(result).toEqual(formulario)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.update).toBeCalledWith(1, data)
    })
  })

  describe('findByTipo', () => {
    const repo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(formularios)
    })

    const tipoProcedimentos = [
      createMock<TipoProcedimentoModel>({ formularios: [1] })
    ]

    const tipoRepo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(tipoProcedimentos)
    })

    it('should return formularios filtered by tipo', async () => {
      const sut = new FormularioService(repo, tipoRepo)

      const result = await sut.findByTipo(1)

      expect(result).toEqual(formularios)
    })

    it('should throw error if tipoProcedimento does not exists', async () => {
      const tipoRepo = createMock<IRepository>({
        findAll: jest.fn().mockResolvedValue([])
      })
      const sut = new FormularioService(repo, tipoRepo)

      const shouldThrow = async () => {
        await sut.findByTipo(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })

    it('should return an empty list if tipoProcedimento does not have formularios related', async () => {
      const tipoProcedimentos = [
        createMock<TipoProcedimentoModel>({ formularios: [] })
      ]

      const tipoRepo = createMock<IRepository>({
        findAll: jest.fn().mockResolvedValue(tipoProcedimentos)
      })
      const sut = new FormularioService(repo, tipoRepo)

      const result = await sut.findByTipo(1)

      expect(result).toEqual([])
    })
  })
})
