import { ComentarioModel } from 'models/comentario'
import { UserModel } from 'models/user'
import { ComentarioService } from 'services/comentario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { NotFoundError } from 'types/express/errors'
import { DeleteComentarioController } from '../delete'

describe('RemoveComentario Controller', () => {
  const comentario = createMock<ComentarioModel>({ user: { id: 2 } })

  const user = createMock<UserModel>({
    permissoes: { comentario_delete: 'all' }
  })

  const makeSut = () => {
    const service = createMock<ComentarioService>({
      delete: jest.fn().mockResolvedValue(comentario),
      findOne: jest.fn().mockResolvedValue(comentario)
    })

    return { sut: new DeleteComentarioController(service), service }
  }

  const sendSpy = jest.fn()
  const jsonSpy = jest.fn()

  const response = {
    status: jest.fn().mockReturnValue({ send: sendSpy }),
    json: jsonSpy
  }

  afterEach(() => {
    response.status.mockClear()
    sendSpy.mockClear()
    jsonSpy.mockClear()
  })

  it('should receive a request with id and remove the respective comentario', async () => {
    const request = createMock<Request>({ params: { id: '1' }, user })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.delete).toBeCalledWith(1)
    expect(response.json).toBeCalledWith(comentario)
  })

  it('should response with unauthorized error if user cannot delete the comentario', async () => {
    const userWithoutPermission = createMock<UserModel>({
      permissoes: { comentario_delete: 'not_allowed' }
    })

    const request = createMock<Request>({
      params: { id: '1' },
      user: userWithoutPermission
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.delete).not.toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })

  it('should response with unauthorized error if user hasnt scope to delete the comentario', async () => {
    const userWithoutPermission = createMock<UserModel>({
      permissoes: { comentario_delete: 'owned' }
    })

    const request = createMock<Request>({
      params: { id: '1' },
      user: userWithoutPermission
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.delete).not.toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })

  it('should response with notFound error if comentario does not exists', async () => {
    const service = createMock<ComentarioService>({
      delete: jest.fn().mockRejectedValue(new NotFoundError())
    })

    const sut = new DeleteComentarioController(service)

    const request = createMock<Request>({
      params: { id: '1' },
      user
    })

    await sut.exec(request, response as any)

    expect(service.delete).toBeCalledWith(1)
    expect(response.status).toBeCalledWith(HttpStatusCode.notFound)
  })
})
