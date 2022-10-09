import { baseSetup } from 'controllers/__mocks__'
import { FormularioModel } from 'domain/models/formulario'
import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadFormularioController } from '../read'
import { ProfileModel } from 'domain/models/profile'

describe('ReadFormulario Controller', () => {
  const formulario = createMock<FormularioModel>()
  const { actor, response, spies } = baseSetup('formulario_read')

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue([formulario])
    } as any

    return { sut: new ReadFormularioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should respond with all formularios', async () => {
    const request = createMock<Request>({ actor })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({})
    expect(response.json).toBeCalledWith([formulario])
  })

  it('should respond with only formularios createdBy actor', async () => {
    const actorWithLimitedPrivileges = createMock<ActorModel>({
      profile: createMock<ProfileModel>({
        permissoes: { formulario_read: 'owned' }
      })
    })
    const request = createMock<Request>({ actor: actorWithLimitedPrivileges })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({
      createdBy: actorWithLimitedPrivileges.id
    })
  })

  it('should respond with UnauthorizedError if actor does not have privileges', async () => {
    const actorWithoutPrivileges = createMock<ActorModel>({
      profile: createMock<ProfileModel>({
        permissoes: {}
      })
    })
    const request = createMock<Request>({ actor: actorWithoutPrivileges })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).not.toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
