import { ComentarioModel } from 'domain/models/comentario'
import { UserModel } from 'domain/models/user'
import { IRepository } from 'repository'
import { NewComentario } from 'repository/sequelize/comentario'
import { ComentarioService } from 'services/comentario'
import { createMock, createMockList } from 'ts-auto-mock'
import { NotFoundError } from 'types/express/errors'

describe('Comentario Service', () => {
  const comentario = createMock<ComentarioModel>()
  const comentarios = createMockList<ComentarioModel>(2)

  describe('create', () => {
    const repo = createMock<IRepository>({
      create: jest.fn().mockResolvedValue(comentario)
    })
    const newComentario = createMock<NewComentario>()
    const usuario = createMock<UserModel>()

    it('should create a new comentario', async () => {
      const sut = new ComentarioService(repo)
      const result = await sut.create(usuario, newComentario)

      expect(result).toEqual(comentario)
      expect(repo.create).toBeCalledWith({
        conteudo: newComentario.conteudo,
        procedimentoId: newComentario.procedimento,
        createdBy: usuario.id
      })
    })
  })

  describe('findOne', () => {
    it('should return an existing comentario by id', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(comentario)
      })
      const sut = new ComentarioService(repo)

      const result = await sut.findOne(1)

      expect(result).toEqual(comentario)
      expect(repo.findOne).toBeCalledWith(1)
    })

    it('should throw error if comentario does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new ComentarioService(repo)

      const shouldThrow = async () => {
        await sut.findOne(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all comentarios', async () => {
      const repo = createMock<IRepository>({
        findAll: jest.fn().mockResolvedValue(comentarios)
      })
      const sut = new ComentarioService(repo)

      const result = await sut.findAll()

      expect(result).toEqual(comentarios)
      expect(repo.findAll).toBeCalledWith({})
    })

    it('should return all comentarios which queries applies on', async () => {
      const query = { conteudo: '' }
      const repo = createMock<IRepository>({
        findAll: jest.fn().mockResolvedValue(comentarios)
      })
      const sut = new ComentarioService(repo)

      await sut.findAll(query)

      expect(repo.findAll).toBeCalledWith(query)
    })
  })

  describe('delete', () => {
    it('should delete an existing comentario', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(comentario),
        destroy: jest.fn().mockResolvedValue(comentario)
      })
      const sut = new ComentarioService(repo)

      const result = await sut.delete(1)

      expect(result).toEqual(comentario)
      expect(repo.destroy).toBeCalledWith(1)
    })

    it('should throw error if comentario does not exists', () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new ComentarioService(repo)

      const shouldThrow = async () => {
        await sut.delete(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('update', () => {
    it('should update an existing comentario', async () => {
      const data = { conteudo: 'teste' }
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(comentario),
        update: jest.fn().mockResolvedValue(comentario)
      })
      const sut = new ComentarioService(repo)

      const result = await sut.update(1, data)

      expect(result).toEqual(comentario)
      expect(repo.update).toBeCalledWith(1, data)
    })

    it('should throw error if comentario does not exists', async () => {
      const repo = createMock<IRepository>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })
      const sut = new ComentarioService(repo)

      const shouldThrow = async () => {
        await sut.update(1, { procedimentoId: 1 })
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })
})
