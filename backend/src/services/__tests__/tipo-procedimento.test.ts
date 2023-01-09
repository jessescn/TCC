import { FormularioModel } from 'domain/models/formulario'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ActorModel } from 'domain/models/actor'
import { Pagination } from 'repositories'
import {
  ITipoProcedimentoRepository,
  NewTipoProcedimento,
  TipoProcedimentoQuery
} from 'repositories/sequelize/tipo-procedimento'
import { TipoProcedimentoService } from 'services/tipo-procedimento'
import { createMock, createMockList } from 'ts-auto-mock'
import { BadRequestError, NotFoundError } from 'types/express/errors'
import { IFormularioRepository } from 'repositories/sequelize/formulario'

describe('TipoProcedimento Service', () => {
  const formularios = createMockList<FormularioModel>(2)
  const tipoProcedimento = createMock<TipoProcedimentoModel>()
  const tipoProcedimentos = createMockList<TipoProcedimentoModel>(2)

  const formularioRepo = createMock<IFormularioRepository>({
    findAll: jest.fn().mockResolvedValue(formularios)
  })

  describe('create', () => {
    const tipoProcedimentoRepo = createMock<ITipoProcedimentoRepository>({
      create: jest.fn().mockResolvedValue(tipoProcedimento)
    })

    const formularioRepo = createMock<IFormularioRepository>({
      findAll: jest.fn().mockResolvedValue(formularios)
    })

    const usuario = createMock<ActorModel>({ id: 1 })
    const data = createMock<NewTipoProcedimento>()
    const data2 = createMock<NewTipoProcedimento>({ formularios: [1, 2] })

    it('should create a new tipoProcedimento', async () => {
      const sut = new TipoProcedimentoService(
        tipoProcedimentoRepo,
        formularioRepo
      )
      const result = await sut.create(usuario, data)

      expect(result).toEqual(tipoProcedimento)
      expect(formularioRepo.findAll).not.toBeCalled()

      const result2 = await sut.create(usuario, data2)

      expect(result2).toEqual(tipoProcedimento)
      expect(formularioRepo.findAll).toBeCalledWith({ id: data2.formularios })
    })

    it('should throw a badRequestError if some formulario does not exists', async () => {
      const data = createMock<NewTipoProcedimento>({ formularios: [1, 2] })
      const formularioRepo = createMock<IFormularioRepository>({
        findAll: jest.fn().mockResolvedValue([])
      })

      const sut = new TipoProcedimentoService(
        tipoProcedimentoRepo,
        formularioRepo
      )

      const shouldThrow = async () => {
        await sut.create(usuario, data)
      }

      expect(shouldThrow).rejects.toThrow(BadRequestError)
      expect(formularioRepo.findAll).toBeCalledWith({
        id: data.formularios
      })
    })
  })

  describe('findOne', () => {
    const repo = createMock<ITipoProcedimentoRepository>({
      findAll: jest.fn().mockResolvedValue([tipoProcedimento])
    })

    it('should return an existing tipoProcedimento by id', async () => {
      const sut = new TipoProcedimentoService(repo, formularioRepo)

      const result = await sut.findOne(1)

      expect(result).toEqual(tipoProcedimento)
      expect(repo.findAll).toBeCalled()
    })

    it('should throw a NotFoundError if tipoProcedimento does not exists', async () => {
      const repoWithUndefined = createMock<ITipoProcedimentoRepository>({
        findAll: jest.fn().mockResolvedValue([])
      })
      const sut = new TipoProcedimentoService(repoWithUndefined, formularioRepo)

      const shouldThrow = async () => {
        await sut.findOne(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    const repo = createMock<ITipoProcedimentoRepository>({
      findAll: jest.fn().mockResolvedValue(tipoProcedimentos)
    })
    const pagination: Pagination = {
      per_page: 1000,
      page: 1,
      term: null
    }

    it('should return all tipoProcedimentos', async () => {
      const sut = new TipoProcedimentoService(repo, formularioRepo)

      const result = await sut.findAll({}, pagination)

      expect(result.data).toEqual(tipoProcedimentos)
      expect(repo.findAll).toBeCalled()
    })

    it('should return only tipoProcedimentos which matches the query', async () => {
      const query: TipoProcedimentoQuery = { nome: 'teste' }
      const sut = new TipoProcedimentoService(repo, formularioRepo)

      const result = await sut.findAll(query, pagination)

      expect(result.data).toEqual(tipoProcedimentos)
      expect(repo.findAll).toBeCalled()
    })
  })

  describe('update', () => {
    const repo = createMock<ITipoProcedimentoRepository>({
      update: jest.fn().mockResolvedValue(tipoProcedimento),
      findAll: jest.fn().mockResolvedValue([tipoProcedimento])
    })

    const data: Partial<TipoProcedimentoModel> = { descricao: 'teste' }

    it('should update an existing tipoProcedimento', async () => {
      const sut = new TipoProcedimentoService(repo, formularioRepo)

      const result = await sut.update(1, data)

      expect(result).toEqual(tipoProcedimento)
      expect(repo.update).toBeCalledWith(1, data)
    })

    it('should throw a NotFoundError if tipoProcedimento does not exists', async () => {
      const repoWithUndefined = createMock<ITipoProcedimentoRepository>({
        update: jest.fn().mockResolvedValue(tipoProcedimento),
        findAll: jest.fn().mockResolvedValue([])
      })

      const sut = new TipoProcedimentoService(repoWithUndefined, formularioRepo)

      const shouldThrow = async () => {
        await sut.update(1, data)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('delete', () => {
    const repo = createMock<ITipoProcedimentoRepository>({
      destroy: jest.fn().mockResolvedValue(tipoProcedimento),
      findAll: jest.fn().mockResolvedValue([tipoProcedimento])
    })

    it('should delete an existing tipoProcedimento', async () => {
      const sut = new TipoProcedimentoService(repo, formularioRepo)

      const result = await sut.delete(1)

      expect(result).toEqual(tipoProcedimento)
      expect(repo.destroy).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if tipoProcedimento does not exists', async () => {
      const repoWithUndefined = createMock<ITipoProcedimentoRepository>({
        destroy: jest.fn().mockResolvedValue(tipoProcedimento),
        findAll: jest.fn().mockResolvedValue([])
      })

      const sut = new TipoProcedimentoService(repoWithUndefined, formularioRepo)

      const shouldThrow = async () => {
        await sut.delete(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })
})
