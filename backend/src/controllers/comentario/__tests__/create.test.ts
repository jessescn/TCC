import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { CreateComentarioController } from '../create'
import { NewComentario } from 'repositories/sequelize/comentario'
import { baseSetup } from 'controllers/__mocks__'
import { ComentarioModel } from 'domain/models/comentario'
import { ProfileModel } from 'domain/models/profile'

describe('CreateComentario Controller', () => {
  const comentario = createMock<ComentarioModel>({ actor: { id: 2 } })
  const { actor, response, spies } = baseSetup('comentario_create')

  const newComentario = createMock<NewComentario>({
    conteudo: 'test',
    procedimento: 1
  })

  const makeSut = () => {
    const service = {
      create: jest.fn().mockResolvedValue(comentario)
    } as any

    return { sut: new CreateComentarioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
  })

  it('should receive a request and response with the created comentario', async () => {
    const request = createMock<Request>({ body: newComentario, actor })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).toBeCalledWith(request.actor, newComentario)
    expect(response.status).toBeCalledWith(HttpStatusCode.created)
    expect(spies.sendSpy).toBeCalledWith(comentario)
  })

  it('should response with unauthorized error code if actor does not have access', async () => {
    const actorWithoutAccess = createMock<ActorModel>({
      profile: createMock<ProfileModel>({ permissoes: {} })
    })

    const request = createMock<Request>({
      body: newComentario,
      actor: actorWithoutAccess
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
    expect(spies.sendSpy).toBeCalledWith('no permission to access the resource')
  })

  it('should response with bad request error code if request does not have mandatory fields', async () => {
    const incompleteNewComentario = createMock<NewComentario>()
    delete incompleteNewComentario.conteudo

    const request = createMock<Request>({
      body: incompleteNewComentario,
      actor
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
    expect(spies.sendSpy).toBeCalledWith('invalid request')
  })
})
