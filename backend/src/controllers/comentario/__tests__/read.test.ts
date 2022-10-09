import { baseSetup } from 'controllers/__mocks__'
import { ComentarioModel } from 'domain/models/comentario'
import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadComentarioController } from '../read'
import { ProfileModel } from 'domain/models/profile'

describe('ReadComentario Controller', () => {
  const comentario = createMock<ComentarioModel>({ actor: { id: 2 } })
  const { actor, response, spies } = baseSetup('comentario_read')

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue([comentario])
    } as any

    return { sut: new ReadComentarioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should respond with all comentarios', async () => {
    const request = createMock<Request>({ actor })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({})
    expect(response.json).toBeCalledWith([comentario])
  })

  it('should respond with only comentario owned by actor if scope is "owned"', async () => {
    const actorWithLimitedScope = createMock<ActorModel>({
      profile: createMock<ProfileModel>({
        permissoes: { comentario_read: 'owned' }
      })
    })

    const request = createMock<Request>({ actor: actorWithLimitedScope })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({
      createdBy: actorWithLimitedScope.id
    })
    expect(response.json).toBeCalledWith([comentario])
  })

  it('should respond with unauthorized error if actor hasnt privileges to access the resource', async () => {
    const actorWithoutPrivilege = createMock<ActorModel>({
      profile: createMock<ProfileModel>({
        permissoes: {}
      })
    })

    const request = createMock<Request>({ actor: actorWithoutPrivilege })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
