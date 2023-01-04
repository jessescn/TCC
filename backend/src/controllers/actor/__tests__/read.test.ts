import { baseSetup } from 'controllers/__mocks__'
import { ActorModel } from 'domain/models/actor'
import { ProfileModel } from 'domain/models/profile'
import { createMock, createMockList } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadActorController } from '../read'

describe('ReadUsuario Controller', () => {
  const usuarios = createMockList<ActorModel>(2)
  const pagination = { page: 1, per_page: 1000, term: null }
  const { actor, response, spies } = baseSetup('actor_read')

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue(usuarios)
    }

    return { sut: new ReadActorController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should respond with all usuarios', async () => {
    const request = createMock<Request>({ actor })
    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalled()
    expect(response.json).toBeCalledWith(usuarios)
  })

  it('should respond only with usuarios owned by user', async () => {
    const actorWithLimitedScope = createMock<ActorModel>({
      profile: createMock<ProfileModel>({
        permissoes: { actor_read: 'owned' }
      })
    })
    const request = createMock<Request>({ actor: actorWithLimitedScope })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith(
      { id: actorWithLimitedScope.id },
      pagination
    )
    expect(response.json).toBeCalledWith(usuarios)
  })

  it('should respond with Unauthorized if user does not have permission', async () => {
    const actorWithoutPermission = createMock<ActorModel>({
      profile: createMock<ProfileModel>({
        permissoes: {}
      })
    })
    const request = createMock<Request>({ actor: actorWithoutPermission })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
