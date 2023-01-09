import Actor from 'domain/models/actor'
import Comentario, {
  ComentarioAttributes,
  ComentarioModel
} from 'domain/models/comentario'
import Profile from 'domain/models/profile'
import { createMock, createMockList } from 'ts-auto-mock'
import { ComentarioRepository, CreateComentario } from '../comentario'
import { createUpdatableElement } from './voto.test'

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
        include: [
          {
            model: Actor,
            attributes: ['nome', 'email'],
            include: [Profile]
          }
        ],
        where: { deleted: false },
        order: [['createdAt', 'ASC']]
      })
    })

    it('should pass the query to model method', async () => {
      await sut.findAll({ id: 2 })

      expect(Comentario.findAll).toBeCalledWith({
        include: [
          {
            model: Actor,
            attributes: ['nome', 'email'],
            include: [Profile]
          }
        ],
        where: { deleted: false, id: 2 },
        order: [['createdAt', 'ASC']]
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
      expect(Comentario.findOne).toBeCalled()
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
      expect(Comentario.create).toBeCalled()
    })
  })

  describe('update', () => {
    const comentarioWithSpies = createUpdatableElement<ComentarioAttributes>()

    beforeEach(() => {
      jest
        .spyOn(Comentario, 'findOne')
        .mockResolvedValueOnce(comentarioWithSpies)
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
    const comentarioWithSpies = createUpdatableElement<ComentarioAttributes>()

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
