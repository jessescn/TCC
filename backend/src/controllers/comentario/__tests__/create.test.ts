import { UserModel } from 'models/user'
import { ComentarioService, NewComentario } from 'services/comentario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { bootstrap } from '../__mocks__'
import { CreateComentarioController } from '../create'

describe('CreateComentario Controller', () => {
  const { user, comentario, response, spies } = bootstrap('comentario_create')

  const newComentario = createMock<NewComentario>({
    conteudo: 'test',
    procedimento: 1
  })

  const makeSut = () => {
    const service = createMock<ComentarioService>({
      create: jest.fn().mockResolvedValue(comentario)
    })

    return { sut: new CreateComentarioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
  })

  it('should receive a request and response with the created comentario', async () => {
    const request = createMock<Request>({ body: newComentario, user })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).toBeCalledWith(request.user, newComentario)
    expect(response.status).toBeCalledWith(HttpStatusCode.created)
    expect(spies.sendSpy).toBeCalledWith(comentario)
  })

  it('should response with unauthorized error code if user does not have access', async () => {
    const userWithoutAccess = createMock<UserModel>({
      permissoes: { comentario_create: 'not_allowed' }
    })

    const request = createMock<Request>({
      body: newComentario,
      user: userWithoutAccess
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
    expect(spies.sendSpy).toBeCalledWith('no permission to access the resource')
  })

  it('should response with bad request error code if request does not have mandatory fields', async () => {
    const incompleteNewComentario = createMock<NewComentario>()
    delete incompleteNewComentario.conteudo

    const request = createMock<Request>({ body: incompleteNewComentario, user })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
    expect(spies.sendSpy).toBeCalledWith('invalid request')
  })
})
