import { FormularioModel } from 'models/formulario'
import { TipoProcedimentoModel } from 'models/tipo-procedimento'
import { UserModel } from 'models/user'
import { IRepository } from 'repository'
import {
  NewTipoProcedimento,
  TipoProcedimentoQuery
} from 'repository/sequelize/tipo-procedimento'
import { TipoProcedimentoService } from 'services/tipo-procedimento'
import { createMock, createMockList } from 'ts-auto-mock'
import { BadRequestError, NotFoundError } from 'types/express/errors'

describe('TipoProcedimento Service', () => {
  const formularios = createMockList<FormularioModel>(2)
  const tipoProcedimento = createMock<TipoProcedimentoModel>()
  const tipoProcedimentos = createMockList<TipoProcedimentoModel>(2)

  const formularioRepo = createMock<IRepository>({
    findAll: jest.fn().mockResolvedValue(formularios)
  })

  describe('create', () => {
    const tipoProcedimentoRepo = createMock<IRepository>({
      create: jest.fn().mockResolvedValue(tipoProcedimento)
    })

    const formularioRepo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(formularios)
    })

    const usuario = createMock<UserModel>({ id: 1 })
    const data = createMock<NewTipoProcedimento>()

    it('should create a new tipoProcedimento', async () => {
      const sut = new TipoProcedimentoService(
        tipoProcedimentoRepo,
        formularioRepo
      )
      const result = await sut.create(usuario, data)

      expect(result).toEqual(tipoProcedimento)
      expect(formularioRepo.findAll).not.toBeCalled()
    })

    it('should throw a badRequestError if some formulario does not exists', async () => {
      const data = createMock<NewTipoProcedimento>({ formularios: [1, 2] })
      const formularioRepo = createMock<IRepository>({
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
        id: { in: data.formularios }
      })
    })
  })

  describe('findOne', () => {
    const repo = createMock<IRepository>({
      findOne: jest.fn().mockResolvedValue(tipoProcedimento)
    })

    it('should return an existing tipoProcedimento by id', async () => {
      const sut = new TipoProcedimentoService(repo, formularioRepo)

      const result = await sut.findOne(1)

      expect(result).toEqual(tipoProcedimento)
      expect(repo.findOne).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if tipoProcedimento does not exists', async () => {
      const repoWithUndefined = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new TipoProcedimentoService(repoWithUndefined, formularioRepo)

      const shouldThrow = async () => {
        await sut.findOne(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    const repo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(tipoProcedimentos)
    })

    it('should return all tipoProcedimentos', async () => {
      const sut = new TipoProcedimentoService(repo, formularioRepo)

      const result = await sut.findAll()

      expect(result).toEqual(tipoProcedimentos)
      expect(repo.findAll).toBeCalledWith({})
    })

    it('should return only tipoProcedimentos which matches the query', async () => {
      const query: TipoProcedimentoQuery = { nome: 'teste' }
      const sut = new TipoProcedimentoService(repo, formularioRepo)

      const result = await sut.findAll(query)

      expect(result).toEqual(tipoProcedimentos)
      expect(repo.findAll).toBeCalledWith(query)
    })
  })

  describe('update', () => {
    const repo = createMock<IRepository>({
      update: jest.fn().mockResolvedValue(tipoProcedimento),
      findOne: jest.fn().mockResolvedValue(tipoProcedimento)
    })

    const data: Partial<TipoProcedimentoModel> = { descricao: 'teste' }

    it('should update an existing tipoProcedimento', async () => {
      const sut = new TipoProcedimentoService(repo, formularioRepo)

      const result = await sut.update(1, data)

      expect(result).toEqual(tipoProcedimento)
      expect(repo.update).toBeCalledWith(1, data)
    })

    it('should throw a NotFoundError if tipoProcedimento does not exists', async () => {
      const repoWithUndefined = createMock<IRepository>({
        update: jest.fn().mockResolvedValue(tipoProcedimento),
        findOne: jest.fn().mockResolvedValue(undefined)
      })

      const sut = new TipoProcedimentoService(repoWithUndefined, formularioRepo)

      const shouldThrow = async () => {
        await sut.update(1, data)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('delete', () => {
    const repo = createMock<IRepository>({
      destroy: jest.fn().mockResolvedValue(tipoProcedimento),
      findOne: jest.fn().mockResolvedValue(tipoProcedimento)
    })

    it('should delete an existing tipoProcedimento', async () => {
      const sut = new TipoProcedimentoService(repo, formularioRepo)

      const result = await sut.delete(1)

      expect(result).toEqual(tipoProcedimento)
      expect(repo.destroy).toBeCalledWith(1)
    })

    it('should throw a NotFoundError if tipoProcedimento does not exists', async () => {
      const repoWithUndefined = createMock<IRepository>({
        destroy: jest.fn().mockResolvedValue(tipoProcedimento),
        findOne: jest.fn().mockResolvedValue(undefined)
      })

      const sut = new TipoProcedimentoService(repoWithUndefined, formularioRepo)

      const shouldThrow = async () => {
        await sut.delete(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })
})