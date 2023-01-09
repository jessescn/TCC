import { baseSetup } from 'controllers/__mocks__'
import { ActorModel } from 'domain/models/actor'
import { SidebarInfo } from 'services/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { SidebarInfoController } from '../sidebar'

describe('ConfirmEmail Controller', () => {
  const sidebarInfo = createMock<SidebarInfo>()
  const { actor, response, spies } = baseSetup('actor_read')

  const makeSut = () => {
    const service = {
      getSidebarInfo: jest.fn().mockResolvedValue(sidebarInfo)
    }

    return { sut: new SidebarInfoController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should verify actor email', async () => {
    const request = createMock<Request>({ actor })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.getSidebarInfo).toBeCalledWith(actor.id)
    expect(response.json).toBeCalledWith(sidebarInfo)
  })

  it('should respond with unaothorized if actor does not have permission', async () => {
    const unathorizedActor = createMock<ActorModel>({
      profile: { permissoes: {} }
    })
    const request = createMock<Request>({ actor: unathorizedActor })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
