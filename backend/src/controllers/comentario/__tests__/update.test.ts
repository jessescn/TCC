import { baseSetup } from 'controllers/__mocks__'
import { ComentarioModel } from 'domain/models/comentario'
import { UserModel } from 'domain/models/user'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { UpdateComentarioController } from '../update'

describe('UpdateComentario Controller', () => {
  const comentario = createMock<ComentarioModel>({ user: { id: 2 } })
  const { response, spies, user } = baseSetup('comentario_update')

  const makeSut = () => {
    const service = {
      update: jest.fn().mockResolvedValue(comentario),
      findOne: jest.fn().mockResolvedValue(comentario)
    } as any

    return { sut: new UpdateComentarioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should update an existing comentario and respond with the result', async () => {
    const data: Partial<ComentarioModel> = { conteudo: '' }
    const request = createMock<Request>({
      params: { id: '1' },
      user,
      body: data
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.update).toBeCalledWith(1, data)
    expect(response.json).toBeCalledWith(comentario)
  })

  it('should respond with BadRequestError error if user try to update an invalid field', async () => {
    const data: Partial<ComentarioModel> = { createdAt: new Date() }
    const request = createMock<Request>({
      params: { id: '1' },
      user,
      body: data
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })

  it('should respond with unauthorizedError if user does not have privileges to update the comentario', async () => {
    const data: Partial<ComentarioModel> = { conteudo: '' }
    const userWithoutPrivileges = createMock<UserModel>({
      id: 1,
      permissoes: {
        comentario_update: 'not_allowed'
      }
    })

    const request = createMock<Request>({
      params: { id: '1' },
      user: userWithoutPrivileges,
      body: data
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
