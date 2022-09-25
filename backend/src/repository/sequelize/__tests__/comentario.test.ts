import { ComentarioRepository, CreateComentario } from '../comentario'
import Comentario, {
  ComentarioAttributes,
  ComentarioModel
} from 'domain/models/comentario'
import { createMock, createMockList } from 'ts-auto-mock'
import { includeableUser } from 'repository'
import Procedimento from 'domain/models/procedimento'

describe('Comentario Repository', () => {
  const sut = new ComentarioRepository()

  const comentarios = createMockList<ComentarioModel>(2)
  const comentario = createMock<ComentarioModel>()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findAll', () => {
    beforeEach(() => {
      jest
        .spyOn(Comentario, 'findAll')
        .mockResolvedValueOnce(comentarios as ComentarioAttributes[])
    })

    it('should return all comentarios', async () => {
      const result = await sut.findAll()

      expect(result).toEqual(comentarios)
      expect(Comentario.findAll).toBeCalledWith({
        include: [includeableUser, Procedimento],
        where: { deleted: false }
      })
    })

    it('should pass the query to model method', async () => {
      await sut.findAll({ id: 2 })

      expect(Comentario.findAll).toBeCalledWith({
        include: [includeableUser, Procedimento],
        where: { deleted: false, id: 2 }
      })
    })
  })

  describe('findOne', () => {
    beforeEach(() => {
      jest
        .spyOn(Comentario, 'findOne')
        .mockResolvedValueOnce(comentario as ComentarioAttributes)
    })

    it('should find one comentario by id', async () => {
      const result = await sut.findOne(2)

      expect(result).toEqual(comentario)
      expect(Comentario.findOne).toBeCalledWith({
        where: { id: 2, deleted: false },
        include: [includeableUser, Procedimento]
      })
    })
  })

  describe('create', () => {
    const createComentario = createMock<CreateComentario>()

    beforeEach(() => {
      jest
        .spyOn(Comentario, 'create')
        .mockResolvedValueOnce(comentario as ComentarioAttributes)
    })

    it('should create a new comentario', async () => {
      const result = await sut.create(createComentario)

      expect(result).toEqual(comentario)
      expect(Comentario.create).toBeCalledWith(createComentario, {
        include: [includeableUser, Procedimento]
      })
    })
  })

  describe('update', () => {
    const comentarioWithSpies = {
      ...comentario,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest
        .spyOn(Comentario, 'findOne')
        .mockResolvedValueOnce(comentarioWithSpies as any)
    })

    it('should update an existing comentario', async () => {
      const data = { conteudo: '' }

      const result = await sut.update(1, data)

      expect(result).toEqual(comentarioWithSpies)
      expect(Comentario.findOne).toBeCalled()
      expect(comentarioWithSpies.set).toBeCalledWith({ ...data })
      expect(comentarioWithSpies.save).toBeCalled()
    })
  })

  describe('destroy', () => {
    const comentarioWithSpies = {
      ...comentario,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest
        .spyOn(Comentario, 'findOne')
        .mockResolvedValueOnce(comentarioWithSpies as any)
    })

    it('should delete a comentario setting the deleted flag as true', async () => {
      const result = await sut.destroy(1)

      expect(result).toEqual(comentarioWithSpies)
      expect(Comentario.findOne).toBeCalled()
      expect(comentarioWithSpies.set).toBeCalledWith({ deleted: true })
      expect(comentarioWithSpies.save).toBeCalled()
    })
  })
})
