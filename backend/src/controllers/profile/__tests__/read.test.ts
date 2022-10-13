import { baseSetup } from 'controllers/__mocks__'
import { ActorModel } from 'domain/models/actor'
import { ProfileModel } from 'domain/models/profile'
import { createMock, createMockList } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadProfileController } from '../read'

describe('ReadProfile Controller', () => {
  const profiles = createMockList<ProfileModel>(2)
  const { actor, spies, response } = baseSetup('profile_read')

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue(profiles)
    }

    return {
      sut: new ReadProfileController(service as any),
      service
    }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should return all profiles', async () => {
    const request = createMock<Request>({ actor })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({})
    expect(response.json).toBeCalledWith(profiles)
  })

  it('should return only profiles owned by actor', async () => {
    const actorWithLimitedScope = createMock<ActorModel>({
      profile: createMock<ProfileModel>({
        id: 1,
        permissoes: { profile_read: 'owned' }
      })
    })
    const request = createMock<Request>({ actor: actorWithLimitedScope })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({
      id: actorWithLimitedScope.profile.id
    })
  })

  it('should throw an UnauthorizedError if actor does not have permission', async () => {
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
